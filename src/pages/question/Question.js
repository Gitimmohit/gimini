import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../components/common/pagetitle/PageTitle';
import SearchList from '../../components/listDisplay/searchList/SearchList';
import NavBtn from '../../components/btn/NavBtn';
import NumPagination from '../../components/listDisplay/numPagination/NumPagination';
import DataList from '../../components/listDisplay/dataList/DataList';
import { setToggle } from '../../redux/parentFilter/ParentFilter';
import QuestionDataTitle from '../../data/question/QuestionDataTitle';
import QuestionDataFormat from '../../data/question/QuestionDataFormat';
import Filter from '../../components/listDisplay/filter/Filter';
import Title from '../../components/common/title/Title';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CgImport } from 'react-icons/cg';
import { PiExportBold } from 'react-icons/pi';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, FormFeedback, Input, Label, Row, Table } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import toTitleCase from '../../components/toTitleCase/toTitleCase';
import axios from 'axios';
import { ServerAddress } from '../../server/ServerAddress';
import Loader from '../../components/common/Loader';

const Question = () => {
  const dispatch = useDispatch();
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);
  const accessToken = useSelector((state) => state.user.access_token);
  const tog = useSelector((state) => state.pagination.toggle);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);
  // submit state
  const [excelFile, setExcelFile] = useState(null);
  const [excel_file_err, setexcel_file_err] = useState(false);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const [Show, setshow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ExportDataFormat = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Question Data Format');
    // Define headers
    const headers = ['question', 'option1', 'option2', 'option3', 'option4', 'answer', 'age_grup'];
    sheet.addRow(headers);
    // Generate and download
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(blob, 'Question_Data_Format_Template.xlsx');
      toast.success('Excel template downloaded successfully!', { position: 'top-center' });
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.error('Failed to download template.');
    }
  };

  // 1. File Select Handler - Perfect & Safe
  const handleFile = (e) => {
    const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    const selectedFile = e.target.files[0];

    // Reset all states
    setExcelData(null);
    setExcelFile(null);
    setTypeError(null);
    setexcel_file_err(false);

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setExcelFile(event.target.result); // ArrayBuffer
        };
        reader.onerror = () => {
          setTypeError('Error reading file. Please try again.');
          setexcel_file_err(true);
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        setTypeError('Invalid file type! Please upload only .xlsx  files.');
        setexcel_file_err(true);
      }
    } else {
      setTypeError('No file selected');
      setexcel_file_err(true);
    }
  };

  // 2. Submit & Parse Excel - 100% Working with ExcelJS (No xlsx needed)
  const handleSubmit_data = async () => {
    if (!excelFile) {
      setTypeError('Please select an Excel file first');
      return;
    }

    const requiredHeaders = ['question', 'option1', 'option2', 'option3', 'option4', 'answer', 'age_grup'];

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(excelFile);

      const worksheet = workbook.worksheets[0];
      if (!worksheet || worksheet.rowCount <= 1) {
        setTypeError('Excel file is empty or has no data');
        setExcelData(null);
        return;
      }

      // ---------------- HEADER VALIDATION ----------------

      const headerRow = worksheet.getRow(1);
      const headers = headerRow.values?.slice(1) || [];

      const headerMismatchIndex = requiredHeaders.findIndex((req, i) => {
        const actual = headers[i]?.toString().trim().toLowerCase();
        return actual !== req.toLowerCase();
      });

      if (headerMismatchIndex !== -1) {
        setTypeError(`Header mismatch at column ${headerMismatchIndex + 1}!\nExpected: "${requiredHeaders[headerMismatchIndex]}"`);
        setExcelData(null);
        return;
      }

      // ---------------- DATA VALIDATION ----------------

      const data = [];
      const invalidRows = [];
      const validAnswers = ['A', 'B', 'C', 'D'];

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row

        const values = row.values?.slice(1) || [];
        const rowErrors = [];

        // Extract values
        const question = values[0]?.toString().trim();
        const option_a = values[1]?.toString().trim();
        const option_b = values[2]?.toString().trim();
        const option_c = values[3]?.toString().trim();
        const option_d = values[4]?.toString().trim();
        const answerRaw = values[5];
        let age_group = values[6];

        const answer = answerRaw ? answerRaw.toString().trim().toUpperCase() : '';

        // Required fields check
        if (!question) rowErrors.push('question missing');
        if (!option_a || !option_b || !option_c || !option_d) rowErrors.push('one or more options missing');
        if (!answer) rowErrors.push('answer missing');
        if (!age_group) rowErrors.push('age_group missing');

        // Validate answer
        if (answer && !validAnswers.includes(answer)) {
          rowErrors.push(`invalid answer "${answerRaw}" (must be A, B, C, D)`);
        }

        // Validate age group
        const ageNum = parseInt(age_group);
        if (isNaN(ageNum) || ageNum < 10 || ageNum > 90) {
          rowErrors.push(`age_group "${age_group}" must be between 10 and 90`);
        }

        // If row has errors → keep in invalidRows
        if (rowErrors.length > 0) {
          invalidRows.push({
            row: rowNumber,
            errors: rowErrors.join(' | ')
          });
        } else {
          // Valid row → push to data array
          data.push({
            question: question,
            option1: option_a,
            option2: option_b,
            option3: option_c,
            option4: option_d,
            answer: answer,
            age_grup: ageNum
          });
        }
      });

      // ---------------- RESULT ----------------

      if (data.length === 0) {
        setTypeError(`No valid rows found! All ${invalidRows.length} rows have errors.`);
        setExcelData(null);
        return;
      }

      if (invalidRows.length > 0) {
        const sample = invalidRows
          .slice(0, 3)
          .map((r) => `Row ${r.row}: ${r.errors}`)
          .join('\n');

        setTypeError(`Warning: ${invalidRows.length} rows skipped:\n${sample}\n${invalidRows.length > 3 ? `...and ${invalidRows.length - 3} more` : ''}\n\nOnly valid rows imported.`);
      } else {
        setTypeError(null);
      }

      setExcelData(data);

      toast.success(`${data.length} valid questions loaded! ${invalidRows.length > 0 ? `(${invalidRows.length} skipped)` : ''}`, { position: 'top-center', autoClose: 6000 });
    } catch (error) {
      console.error(error);
      setTypeError('Failed to read Excel file. It may be corrupted or password-protected.');
      setExcelData(null);
    }
  };

  // create bulk data by importing excel file
  const send_bulk_data = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${ServerAddress}cards/bulk_create_qestions_details/`,
        {
          qestions_details: excelData || []
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log('send_bulk_data response:', response);
      // Handle success case
      if (response.data.status === 'success') {
        dispatch(setToggle(!tog));
        setIsLoading(false);
        setshow(false);
        setExcelData(null);
        toast.success(`${toTitleCase(response.data.message)}`, { position: 'top-center', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: 'colored' });
        // Handle duplicate case
      } else if (response.data.status === 'error') {
        setIsLoading(false);
        setshow(false);
        setExcelData(null);
        const errorMessage = response.data.errors ? `${response.data.message} Please check the data format.` : response.data.message;
        toast.error(errorMessage, { position: 'top-center', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: 'colored' });
      }
    } catch (error) {
      setIsLoading(false);
      setshow(false);
      setExcelData(null);
      const errorMessage = 'Failed to upload bank statement. Please try again later.';
      toast.error(errorMessage, { position: 'top-center', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: 'colored' });
    }
  };
  return (
    <>
      <ToastContainer />
      {/* Import Bank Statement Modal */}
      <Modal
        contentClassName='content-test'
        show={Show}
        onHide={() => {
          if (!isLoading) {
            setExcelData(null);
            setExcelFile(null);
            setTypeError(null);
            setshow(false);
            setIsLoading(false);
          }
        }}
        size='xl'
        backdrop='static'
        keyboard={false}
        // centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Question Details File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <Row className='align-items-center'>
                <Col lg={3} md={6} sm={6}>
                  <div className='mb-1'>
                    <Label className='header-child'>
                      Question Details File
                      <span className='mandatory'> *</span>
                    </Label>
                    <Input className='form-control d-block from control-md' type='file' id='input' onChange={handleFile} invalid={excel_file_err} />
                    <FormFeedback type='invalid'>Please select a file to upload </FormFeedback>
                  </div>
                </Col>

                <Col lg={2} md={6} sm={6}>
                  <Button
                    type='button'
                    variant='outline-success'
                    size='sm'
                    style={{ width: '120px', height: '32px', marginTop: '16px' }}
                    onClick={() => {
                      if (excelFile === '' || excelFile === null) {
                        setexcel_file_err(true);
                      } else {
                        handleSubmit_data();
                      }
                    }}>
                    Submit File
                  </Button>
                </Col>
              </Row>

              <div
                className='md-4'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                {/* To Export Format */}
                <div style={{ display: 'flex' }}>
                  {(excelData?.length > 0 || excelData !== null) && (
                    <>
                      <Button className='btn btn-primary m-1 cu_btn' type='button' disabled style={{ fontWeight: 'bold' }}>
                        Total Data <span className='bg-primary '>{excelData.length}</span>
                      </Button>
                      {!isLoading ? (
                        <Button
                          className='btn btn-success m-1 cu_btn'
                          type='button'
                          onClick={() => {
                            send_bulk_data();
                          }}>
                          Save
                        </Button>
                      ) : (
                        <Button type='button' className='btn btn-success m-1 cu_btn'>
                          <Loader />
                        </Button>
                      )}
                    </>
                  )}
                  <Button
                    className='btn btn-danger m-1 cu_btn'
                    type='button'
                    disabled={isLoading}
                    onClick={() => {
                      setExcelData(null);
                      setExcelFile(null);
                      setTypeError(null);
                      setshow(false);
                      setIsLoading(false);
                    }}>
                    Close
                  </Button>
                </div>
              </div>

              <div
                style={{
                  color: 'red',
                  textAlign: 'center',
                  // marinTop: "20px",
                  fontSize: '16px'
                }}>
                {typeError}
              </div>
            </div>
            {excelData && (
              <div>
                {/* Scrollable Table Container */}
                <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '400px', borderRadius: '8px' }}>
                  <Table
                    className='table-grid'
                    bordered
                    striped
                    style={{
                      marginBottom: 0,
                      borderCollapse: 'collapse',
                      fontFamily: "'Inter', sans-serif" // Modern font (ensure it's imported)
                    }}>
                    <thead>
                      <tr>
                        {Object.keys(excelData[0]).map((key) => (
                          <th
                            style={{
                              textAlign: 'center',
                              padding: '5px',
                              backgroundColor: '#bae5f1',
                              color: '#000000',
                              position: 'sticky',
                              top: 0,
                              zIndex: 2,
                              fontWeight: '500',
                              textTransform: 'uppercase',
                              fontSize: '0.70rem',
                              borderColor: '#dee2e6'
                            }}
                            key={key}>
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.map((individualExcelData, index) => (
                        <tr
                          key={index}
                          style={{
                            transition: 'background-color 0.2s ease', // Smoother hover
                            backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa' // Striped rows
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e9ecef')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f8f9fa')}>
                          {Object.keys(individualExcelData).map((key) => (
                            <td
                              key={key}
                              style={{
                                textAlign: 'center',
                                padding: '5px',
                                fontSize: '0.75rem',
                                color: '#495057',
                                borderColor: '#dee2e6',
                                whiteSpace: 'nowrap', // Prevent text wrapping
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', // Handle long text gracefully
                                maxWidth: '200px' // Limit column width
                              }}>
                              {individualExcelData[key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      <PageTitle page='Quiz Question' />
      <Title title={'Quiz Question'} parent_title={'Question'} />
      <div className='mx-1'>
        <div className='container-fluid ' style={{ background: 'white' }}>
          <div className='mb-2 row '>
            <div className='col-sm-4'>{<SearchList />}</div>
            <div className='col-sm-8'>
              <div className='text-sm-end'>
                <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-import'>Upload Bank Statement</Tooltip>}>
                  <span style={{ cursor: 'pointer' }}>
                    <PiExportBold size={30} color='blue' onClick={() => setshow(true)} />{' '}
                  </span>
                </OverlayTrigger>
                <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-export'>Download Blank Format</Tooltip>}>
                  <span style={{ cursor: 'pointer' }}>
                    <CgImport size={30} color='green' onClick={() => ExportDataFormat()} />
                  </span>
                </OverlayTrigger>
                <NavBtn btn_name='Add Question' icon={<MdAdd size={15} />} form_path='/quiz/add/question' />
                {/* Filter Tool */}
                {/* <Filter type={"question"} /> */}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList can_delete={true} Data_Title={QuestionDataTitle} Data_Format={QuestionDataFormat} path={`cards/get_question_details/?search=${search}&p=${page_num}&records=${data_len}`} />
          <NumPagination path={'path'} />
        </div>
      </div>
    </>
  );
};
export default Question;
