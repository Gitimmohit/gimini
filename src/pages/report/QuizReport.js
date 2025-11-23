import React, { useEffect, useState } from 'react';
import ColorLoader from '../../components/loader/ColorLoader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { Card, CardBody, CardTitle, Col, Form, Label, Row } from 'reactstrap';
import NSearchInput from '../../components/nsearchInput/NSearchInput';
import SearchInput from '../../components/searchInput/SearchInput';
import { ServerAddress } from '../../server/ServerAddress';
import axios from 'axios';
import toTitleCase from '../../components/toTitleCase/toTitleCase';
import PageTitle from '../../components/common/pagetitle/PageTitle';
import Title from '../../components/common/title/Title';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const QuizReport = () => {
  const AccessToken = useSelector((state) => state.user.access_token);
  const userDetails = useSelector((state) => state.user.userdetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const [is_loading, setis_loading] = useState(false);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [reportData, setReportData] = useState(null);

  //Dropdown
  const [report, setreport] = useState('Quiz Leaderboard');
  const [report_list, setreport_list] = useState(['Quiz Leaderboard']);
  const [report_err, setreport_err] = useState(false);

  //For Quiz
  const [quiz_name, setquiz_name] = useState('');
  const [quiz_name_id, setquiz_name_id] = useState(0);
  const [quiz_name_list, setquiz_name_list] = useState([]);
  const [quiz_search, setquiz_search] = useState('');
  const [quiz_name_error, setquiz_name_error] = useState(false);
  const [quiz_page, setquiz_page] = useState(1);
  const [quiz_name_loaded, setquiz_name_loaded] = useState(false);
  const [quiz_name_count, setquiz_name_count] = useState(1);
  const [quiz_name_bottom, setquiz_name_bottom] = useState(103);

  // This function is used to Complete Quiz Data
  const GetCompleteQuizData = async () => {
    let temp_list = [];
    try {
      const response = await axios.get(ServerAddress + `cards/get_quiz_details/?search=${quiz_search}&p=${quiz_page}&records=${10}&is_completed=True`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`
        }
      });
      if (response.data.results?.length > 0) {
        if (response.data.next === null) {
          setquiz_name_loaded(false);
        } else {
          setquiz_name_loaded(true);
        }
        if (quiz_page === 1) {
          temp_list = response.data.results.map((v) => [v.id, `${toTitleCase(v?.quiz_name)}`]);
        } else {
          temp_list = [...quiz_name_list, ...response.data.results.map((v) => [v.id, `${toTitleCase(v?.quiz_name)}`])];
        }
        setquiz_name_count(quiz_name_count + 2);
        setquiz_name_list(temp_list);
      } else {
        setquiz_name_list([]);
      }
    } catch (err) {
      alert(`Error occured while gettin Quiz Data ${err}`);
    }
  };

  useEffect(() => {
    GetCompleteQuizData();
  }, [quiz_search, quiz_page]);

  // Get Report Data
  const GetReportData = async () => {
    setis_loading(true);
    try {
      const response = await axios.get(`${ServerAddress}cards/quiz_report_view/?quiz_id=${quiz_name_id}`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`
        }
      });
      console.log('response--', response);
      if (response.data.success) {
        setReportData(response.data);
      } else {
        toast.error(response.data.message, { position: 'top-center', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: 'colored' });
      }
    } catch (error) {
      console.error('Error fetching BankStatement data:', error);
      toast.error('Failed to download BankStatement report. Please try again.', { position: 'top-center', autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, theme: 'colored' });
    } finally {
      setis_loading(false);
    }
  };

  const downloadExcel = async () => {
    if (!reportData) return;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Quiz Leaderboard', {
      pageSetup: { paperSize: 9, orientation: 'landscape' }
    });

    // 1. Title: Quiz Name – Leaderboard
    sheet.addRow([]);
    const titleRow = sheet.addRow([`${reportData.quiz_name} – Leaderboard`]);
    sheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);
    sheet.getCell(`A${titleRow.number}`).font = { size: 18, bold: true, color: { argb: 'FF1976D2' } };
    sheet.getCell(`A${titleRow.number}`).alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.getRow(titleRow.number).height = 45;

    // 2. Total Participants
    const partRow = sheet.addRow([`Total Participants: ${reportData.total_participants}`]);
    sheet.mergeCells(`A${partRow.number}:F${partRow.number}`);
    sheet.getCell(`A${partRow.number}`).font = { size: 14, bold: true };
    sheet.getCell(`A${partRow.number}`).alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.getRow(partRow.number).height = 35;

    // 3. Total Questions (NEW ROW ADDED)
    const totalQ = reportData.total_questions || reportData.leaderboard[0]?.total_questions || 'N/A';
    const quesRow = sheet.addRow([`Total Questions: ${totalQ}`]);
    sheet.mergeCells(`A${quesRow.number}:F${quesRow.number}`);
    sheet.getCell(`A${quesRow.number}`).font = { size: 13, bold: true, color: { argb: 'FF2E7D32' } };
    sheet.getCell(`A${quesRow.number}`).alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.getRow(quesRow.number).height = 30;

    // Empty row for spacing
    sheet.addRow([]);

    // 4. Table Header - Blue Background + White Text
    const headerRow = sheet.addRow(['Sl.No', 'Participant Name', 'Participant Email', 'Score', 'Correct', 'Wrong', 'Time Taken']);

    // Apply styling to entire header row
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1976D2' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
    headerRow.height = 30;
    // Column widths
    sheet.columns = [{ width: 10 }, { width: 34 }, { width: 34 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 18 }];
    // 5. Data Rows
    reportData.leaderboard.forEach((item, index) => {
      const row = sheet.addRow([index + 1, item.username || '-', item.email || '-', item.score, item.correct_answers, item.wrong_answers, item.time_taken || '-']);

      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
          top: { style: 'thin', color: { argb: 'B0BEC5' } },
          left: { style: 'thin', color: { argb: 'B0BEC5' } },
          bottom: { style: 'thin', color: { argb: 'B0BEC5' } },
          right: { style: 'thin', color: { argb: 'B0BEC5' } }
        };
      });
      row.height = 25;
    });

    // Bold Sl.No column
    sheet.getColumn(1).eachCell((cell, rowNumber) => {
      if (rowNumber > 7) cell.font = { bold: true };
    });

    // Download
    const buffer = await workbook.xlsx.writeBuffer();
    const safeName = reportData.quiz_name.replace(/[/\\?%*:|"<>]/g, '_');
    saveAs(new Blob([buffer]), `${safeName}_Leaderboard.xlsx`);

    toast.success('Quiz Leaderboard Excel downloaded!', { position: 'top-center' });
  };
  useEffect(() => {
    setReportData(null);
  }, [report, quiz_name_id]);

  return (
    <div>
      <ToastContainer />
      {is_loading ? <ColorLoader /> : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!report) {
            setreport_err(true);
          } else if (report === 'Quiz Leaderboard') {
            if (!quiz_name_id) {
              setquiz_name_error(true);
            } else {
              GetReportData();
            }
          }
          return false;
        }}>
        <div>
          <PageTitle page={'Quiz Leaderboard'} />
          <Title title={'Quiz Leaderboard'} parent_title='Report' />
        </div>

        <div className='m-2' id='section1'>
          <Card className='bg-white rounded' style={{ marginBottom: '0px' }}>
            <CardTitle className='mb-1 header'>
              <div className='header-text-icon header-text'>
                Quiz Leaderboard
                <IconContext.Provider
                  value={{
                    className: 'header-add-icon'
                  }}>
                  <div onClick={toggle_circle}>{circle_btn ? <MdRemoveCircleOutline /> : <MdAddCircleOutline />}</div>
                </IconContext.Provider>
              </div>
            </CardTitle>
            {circle_btn ? (
              <CardBody style={{ padding: '5px 5px' }}>
                <Row>
                  <Col lg={2} md={6} sm={6}>
                    <div className='mb-2'>
                      <Label className='header-child'>
                        Report Type
                        <span className='mandatory'> *</span>
                      </Label>
                      <NSearchInput data_list={report_list} data_item_s={report} set_data_item_s={setreport} show_search={false} error_s={report_err} error_message={'report type is a required field'} current_width='100%' child_width='92%' />
                    </div>
                  </Col>

                  {report === 'Quiz Leaderboard' && (
                    <React.Fragment>
                      <Col lg={4} md={6} sm={6}>
                        <div className='mb-2'>
                          <Label className='header-child'>
                            Quiz Name List
                            <span className='mandatory'> *</span>
                          </Label>
                          <SearchInput data_list={quiz_name_list} data_item_s={quiz_name} set_data_item_s={setquiz_name} set_id={setquiz_name_id} error_message={'Select Any Quiz'} error_s={quiz_name_error} search_item={quiz_search} setsearch_item={setquiz_search} page={quiz_page} setpage={setquiz_page} loaded={quiz_name_loaded} count={quiz_name_count} bottom={quiz_name_bottom} setbottom={setquiz_name_bottom} />
                        </div>
                      </Col>
                    </React.Fragment>
                  )}
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Button */}
        <div className='m-2'>
          <Col lg={12}>
            <div className='mb-1 footer_btn'>
              <button type='submit' className='btn btn-success' style={{ marginRight: '15px', width: '87px' }}>
                View
              </button>

              <button
                type='button'
                className='btn btn-danger'
                onClick={() => {
                  navigate(-1);
                }}>
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
      {reportData && (
        <Card className='m-2 p-3'>
          <span style={{textAlign:"center"}}>
          <h5>{reportData.quiz_name} – Leaderboard</h5>
          <h6>
            Total Participants: {reportData.total_participants},Total Questions: {reportData.leaderboard[0]?.total_questions}
          </h6>
          </span>

          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Participant Name</th>
                <th>Participant Email</th>
                <th>Score</th>
                <th>Correct</th>
                <th>Wrong</th>
                <th>Time Taken</th>
              </tr>
            </thead>

            <tbody>
              {reportData?.leaderboard && reportData.leaderboard.length > 0 ? (
                reportData.leaderboard.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.username || '-'}</td>
                    <td>{row.email || '-'}</td>
                    <td>{row.score}</td>
                    <td>{row.correct_answers}</td>
                    <td>{row.wrong_answers}</td>
                    <td>{row.time_taken || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='7' className='text-center py-2' style={{ fontSize: '18px', color: '#6c757d' }}>
                    <strong>No Data Found</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Download Button */}
          {reportData !== null && (
            <button className='btn btn-primary' onClick={downloadExcel}>
              Download Excel
            </button>
          )}
        </Card>
      )}
    </div>
  );
};

export default QuizReport;
