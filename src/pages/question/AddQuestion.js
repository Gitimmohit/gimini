import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Form, Input, Col, Card, CardBody, CardTitle, Label, Row, FormFeedback } from 'reactstrap';
import '../../assets/scss/forms/form.scss';
import { ServerAddress } from '../../server/ServerAddress';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../../components/common/pagetitle/PageTitle';
import { IconContext } from 'react-icons';
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import Loader from '../../components/loader/Loader';
import toTitleCase from '../../components/toTitleCase/toTitleCase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NSearchInput from '../../components/nsearchInput/NSearchInput';
import Title from '../../components/common/title/Title';

const AddQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //redux state
  const accessToken = useSelector((state) => state.user.access_token);
  const user_detail = useSelector((state) => state.user.userdetails);
  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [isupdating, setisupdating] = useState(false);
  const [question_id, setquestion_id] = useState('');
  const [question, setquestion] = useState('');
  const [question_err, setquestion_err] = useState(false);
  const [option1, setoption1] = useState('');
  const [option1_err, setoption1_err] = useState(false);
  const [option2, setoption2] = useState('');
  const [option2_err, setoption2_err] = useState(false);
  const [option3, setoption3] = useState('');
  const [option3_err, setoption3_err] = useState(false);
  const [option4, setoption4] = useState('');
  const [option4_error, setoption4_error] = useState(false);
  const [age, setage] = useState('');
  const [age_error, setage_error] = useState(false);
  const [time, settime] = useState('00:00:30');
  const [time_error, settime_error] = useState(false);
  const [show, setshow] = useState(false);
  const [answare_list, setansware_list] = useState([
    ['A', 'Option 1'],
    ['B', 'Option 2'],
    ['C', 'Option 3'],
    ['D', 'Option 4']
  ]);
  const [answare, setansware] = useState('');
  const [answare_id, setansware_id] = useState('');
  const [answare_err, setansware_err] = useState(false);

  const send_question_data = () => {
    setshow(true);
    axios
      .post(
        ServerAddress + 'cards/add_question_details/',
        {
          question: question ? toTitleCase(question).toUpperCase() : question,
          option1: option1 ? toTitleCase(option1).toUpperCase() : option1,
          option2: option2 ? toTitleCase(option2).toUpperCase() : option2,
          option3: option3 ? toTitleCase(option3).toUpperCase() : option3,
          option4: option4 ? toTitleCase(option4).toUpperCase() : option4,
          answare: answare_id ? toTitleCase(answare_id).toUpperCase() : answare_id,
          age_grup: age ? toTitleCase(age).toUpperCase() : age,
          time: time ? time : time
        }
        // {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // }
      )
      .then(function (resp) {
        if (resp.status === 201) {
          setshow(false);
          toast.success(`Question Added successfully !`, { position: 'top-center', autoClose: 2000 });
          //   navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        toast.error(`Error Occur While Adding ${question},${err}`, { position: 'bottom-right', autoClose: 1000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: 'colored', closeButton: false });
        console.error(`Error Occur While Adding ${question},${err}`);
      });
  };
  const update_question_data = () => {
    setshow(true);
    axios
      .put(
        ServerAddress + 'cards/put_question_details/' + question_id,
        {
          question: question ? toTitleCase(question).toUpperCase() : question,
          option1: option1 ? toTitleCase(option1).toUpperCase() : option1,
          option2: option2 ? toTitleCase(option2).toUpperCase() : option2,
          option3: option3 ? toTitleCase(option3).toUpperCase() : option3,
          option4: option4 ? toTitleCase(option4).toUpperCase() : option4,
          answare: answare_id ? toTitleCase(answare_id).toUpperCase() : answare_id,
          age_grup: age ? toTitleCase(age).toUpperCase() : age,
          time: time ? time : time
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`
        //   }
        // }
      )
      .then(function (resp) {
        console.log('resp--', resp);
        if (resp.status === 200) {
          setshow(false);
          toast.success(`Question Updated successfully !`, { position: 'top-center', autoClose: 2000 });
          navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        console.error(`Error Occur While Updating ${option2}, ${err}`);
      });
  };

  useEffect(() => {
    if (option1 !== '') {
      setoption1_err(false);
    }
    if (option2 !== '' && option2 !== null) {
      setoption2_err(false);
    }
    if (option3 !== '' && option3 !== null) {
      setoption3_err(false);
    }
    if (option4 !== '' && option4 !== null) {
      setoption4_error(false);
    }
    if (question !== '' && question !== null) {
      setquestion_err(false);
    }
    if (answare_id !== '' && answare_id !== null) {
      setansware_err(false);
    }
    if (age !== '' && age !== null) {
      setage_error(false);
    }
    if (time !== '' && time !== null) {
      settime_error(false);
    }
  }, [option1, option2, option3, option4, question, answare_id, age, time]);

  useLayoutEffect(() => {
    try {
      let qun_data = location.state.data;
      setisupdating(true);
      setquestion_id(qun_data?.id);
      setquestion(toTitleCase(qun_data?.question));
      setoption1(qun_data?.option1);
      setoption2(toTitleCase(qun_data?.option2));
      setoption3(toTitleCase(qun_data?.option3));
      setoption4(qun_data?.option4);
      setansware_id(qun_data?.answare);
      setage(qun_data?.age_grup);
      settime(qun_data?.time);
    } catch (error) {}
  }, []);

  return (
    <>
      <PageTitle page={isupdating ? 'Update Question' : 'Add Question'} />
      <Title title={isupdating ? 'Update Question' : 'Add Question'} parent_title={'Question'} />
      <Loader show={show} setshow={setshow} />
      <ToastContainer />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!question) {
            setquestion_err(true);
            document.getElementById('question_details').scrollIntoView();
          } else if (!option1) {
            setoption1_err(true);
            document.getElementById('question_details').scrollIntoView();
          } else if (!option2) {
            setoption2_err(true);
            document.getElementById('question_details').scrollIntoView();
          } else if (!option3) {
            setoption3_err(true);
            document.getElementById('question_details').scrollIntoView();
          } else if (!option4) {
            setoption4_error(true);
            document.getElementById('question_details').scrollIntoView();
          } else if (!answare_id) {
            setansware_err(true);
            document.getElementById('question_details').scrollIntoView();
          } else if (!age) {
            setage_error(true);
            document.getElementById('question_details').scrollIntoView();
          } else if (!time) {
            settime_error(true);
            document.getElementById('question_details').scrollIntoView();
          } else {
            isupdating ? update_question_data() : send_question_data();
          }
        }}>
        <div className='m-2' id='question_details'>
          <Card style={{ marginBottom: '0px' }}>
            <CardTitle className='mb-1 header'>
              <div className='header-text-icon header-text'>
                Add Question Details
                <IconContext.Provider
                  value={{
                    className: 'header-add-icon'
                  }}>
                  <div onClick={toggle_circle}>{circle_btn ? <MdRemoveCircleOutline /> : <MdAddCircleOutline />}</div>
                </IconContext.Provider>
              </div>
            </CardTitle>
            {circle_btn ? (
              <CardBody style={{ padding: '5px' }}>
                <Row>
                  <Col lg={12} md={6} sm={6}>
                    <div>
                      <Label className='header-child sm-10'>
                        Question <span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={question}
                        onChange={(e) => {
                          setquestion(e.target.value);
                        }}
                        invalid={question_err}
                        className='form-control-md'
                        name='question'
                        id='input'
                        type='textarea'
                        placeholder='Enter Question '
                        rows={4}
                        // style={{ resize: 'both' }}
                      />
                      {question_err && <FormFeedback type='invalid'>Question is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        option1 <span className='mandatory'> *</span>
                      </Label>
                      <Input
                        onChange={(e) => {
                          setoption1(e.target.value);
                        }}
                        value={option1}
                        invalid={option1_err}
                        type='option1'
                        name='option1'
                        className='form-control-md'
                        id='input'
                        placeholder='Enter Option 1'
                        readOnly={isupdating}
                      />
                      {option1_err && <FormFeedback type='invalid'>Option 1 is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Option 2 <span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={option2}
                        onChange={(e) => {
                          setoption2(e.target.value);
                        }}
                        invalid={option2_err}
                        className='form-control-md'
                        name='option2'
                        id='input'
                        type='text'
                        placeholder='Enter Option 2'
                      />
                      {option2_err && <FormFeedback type='invalid'>Option 2 is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Option 3<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={option3}
                        onChange={(e) => {
                          setoption3(e.target.value);
                        }}
                        invalid={option3_err}
                        className='form-control-md'
                        name='option3'
                        id='input'
                        type='text'
                        placeholder='Enter Option 3'
                      />
                      {option3_err && <FormFeedback type='invalid'>Option 3 is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Option 4<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={option4}
                        onChange={(e) => {
                          setoption4(e.target.value);
                        }}
                        invalid={option4_error}
                        className='form-control-md'
                        name='option4'
                        id='input'
                        type='text'
                        placeholder='Enter Option 4'
                      />
                      {option4_error && <FormFeedback type='invalid'>Option 4 is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Answare<span className='mandatory'> *</span>
                      </Label>
                      <NSearchInput data_list={answare_list} data_item_s={answare} set_data_item_s={setansware} set_id={setansware_id} show_search={false} show_error={true} error_s={answare_err} error_message={'Answare is required'} />
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Age<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={age}
                        onChange={(event) => {
                          const { value } = event.target;
                          if (value.length <= 2) {
                            setage(value);
                          }
                        }}
                        invalid={age_error}
                        className='form-control-md'
                        name='age'
                        id='input'
                        type='number'
                        min={15}
                        max={90}
                        placeholder='Enter Age'
                      />
                      {age_error && <FormFeedback type='invalid'>Age is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Time<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={time}
                        onChange={(e) => {
                          settime(e.target.value);
                        }}
                        invalid={time_error}
                        className='form-control-md'
                        name='time'
                        id='input'
                        type='time'
                        step={1}
                        placeholder='Enter Time'
                      />
                      {time_error && <FormFeedback type='invalid'>Time is required</FormFeedback>}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </div>

        {/*Button */}
        <div className='m-2'>
          <Col lg={12}>
            <div className='mb-1 footer_btn'>
              <button type='submit' className='btn btn-success m-1' style={{ width: '80px' }}>
                {isupdating ? 'Update' : 'Save'}
              </button>
              <button
                type='button'
                className='btn btn-danger m-1'
                onClick={() => {
                  navigate(-1);
                }}>
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
    </>
  );
};

export default AddQuestion;
