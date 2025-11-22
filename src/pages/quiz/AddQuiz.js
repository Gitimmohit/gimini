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
import TransferList from '../../components/transferList/TransferList';
import DateTimeConvertor from '../../components/dateConvertor/DateTimeConvertor';

const AddQuiz = () => {
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
  const [quiz_data, setquiz_data] = useState([]);
  const [quiz_name_id, setquiz_name_id] = useState('');
  const [quiz_name, setquiz_name] = useState('');
  const [quiz_name_err, setquiz_name_err] = useState(false);
  const [age, setage] = useState('');
  const [age_error, setage_error] = useState(false);
  const [prize_money, setprize_money] = useState('');
  const [prize_money_error, setprize_money_error] = useState(false);
  const [entry_fee, setentry_fee] = useState('');
  const [entry_fee_error, setentry_fee_error] = useState(false);
  const [quiz_date, setquiz_date] = useState('');
  const [quiz_date_error, setquiz_date_error] = useState(false);
  const [show, setshow] = useState(false);

  // question_list
  const [question_list, setquestion_list] = useState([]);
  const [question_list2, setquestion_list2] = useState([]);
  const [question_page, setquestion_page] = useState(1);
  const [search_question, setsearch_question] = useState('');
  const [question_loaded, setquestion_loaded] = useState(false);
  const [question_count, setquestion_count] = useState(1);
  const [question_bottom, setquestion_bottom] = useState(56);
  const [question_error, setquestion_error] = useState(false);

  const send_quiz_name_data = () => {
    setshow(true);
    let question_id = question_list2.map((v) => v[0]);
    let question_name = question_list2.map((v) => v[1]);
    let question_id_list = [...new Set(question_id.map((v) => `${v}`))].map((v) => parseInt(v.split(',')));
    let question_name_list = [...new Set(question_name.map((v) => v.split(',').map((s) => s.trim())))].flat();
    axios
      .post(
        ServerAddress + 'cards/add_quiz_details/',
        {
          quiz_name: quiz_name ? toTitleCase(quiz_name).toUpperCase() : null,
          age_grup: age ? age : null,
          quiz_date: quiz_date ? quiz_date : null,
          prize_money: prize_money ? toTitleCase(prize_money).toUpperCase() : null,
          entry_fee: entry_fee ? entry_fee : null,
          question: question_id_list,
          question_name: question_name_list
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(function (resp) {
        if (resp.status === 201) {
          setshow(false);
          toast.success(`Quiz Name Added successfully !`, { position: 'top-center', autoClose: 2000 });
          //   navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        toast.error(`Error Occur While Adding ${quiz_name},${err}`, { position: 'bottom-right', autoClose: 1000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: 'colored', closeButton: false });
        console.error(`Error Occur While Adding ${quiz_name},${err}`);
      });
  };
  const update_quiz_name_data = () => {
    setshow(true);
    // question_list2 update
    let question_id_list = question_list2.map((v) => v[0]).filter((v) => v !== null);
    let question_ids = [...new Set(question_id_list.map((v) => `${v}`))].map((v) => parseInt(v.split(',')));
    axios
      .put(
        ServerAddress + 'cards/put_quiz_details/' + quiz_name_id,
        {
          quiz_name: quiz_name ? toTitleCase(quiz_name).toUpperCase() : null,
          age_grup: age ? age : null,
          quiz_date: quiz_date ? quiz_date : null,
          prize_money: prize_money ? toTitleCase(prize_money).toUpperCase() : null,
          entry_fee: entry_fee ? entry_fee : null,
          question: question_ids
          // question_name: question_name_list
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then(function (resp) {
        console.log('resp--', resp);
        if (resp.status === 200) {
          setshow(false);
          toast.success(`Quiz Name Updated successfully !`, { position: 'top-center', autoClose: 2000 });
          navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        console.error(`Error Occur While Updating , ${err}`);
      });
  };

  useEffect(() => {
    if (quiz_name) {
      setquiz_name_err(false);
    }
    if (age) {
      setage_error(false);
    }
    if (quiz_date) {
      setquiz_date_error(false);
    }
    if (prize_money) {
      setprize_money_error(false);
    }
    if (entry_fee) {
      setentry_fee_error(false);
    }
    if (question_list2.length !== 0) {
      setquestion_error(false);
    }
  }, [quiz_name, age, quiz_date, prize_money, entry_fee, question_list2]);

  useLayoutEffect(() => {
    try {
      let qun_data = location.state.data;
      setisupdating(true);
      setquiz_data(qun_data);
      setquiz_name_id(qun_data?.id);
      setquiz_name(toTitleCase(qun_data?.quiz_name));
      setage(qun_data?.age_grup);
      setprize_money(qun_data?.prize_money);
      setentry_fee(qun_data?.entry_fee);
      setquiz_date(qun_data?.quiz_date ? qun_data.quiz_date.substring(0, 16) : '');
    } catch (error) {}
  }, []);

  // get Questions at add Quiz
  const GetQuestionsTransfer = (val) => {
    let temp_2 = [];
    let temp = [];
    axios
      .get(ServerAddress + `cards/get_question_transfer/?search=${search_question}&p=${question_page}&records=${20}&data=${val}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then((response) => {
        temp = response.data.results;
        if (temp.length > 0) {
          if (response.data.next === null) {
            setquestion_loaded(false);
          } else {
            setquestion_loaded(true);
          }
          // Map the response data to the desired format
          const newData = response.data.results.map((v) => [v.id, toTitleCase(v.question)]);
          if (question_page === 1) {
            temp_2 = newData;
          } else {
            temp_2 = [...question_list, ...newData];
          }
          setquestion_count(question_count + 2);
          setquestion_list(temp_2);
        } else {
          setquestion_list([]);
        }
      })
      .catch((err) => {
        toast.error(`Error Occur in Get Question List, ${err}`, { position: 'bottom-right', autoClose: 5000 });
      });
  };

  // set the  Quesations at update  Quiz
  const GetQuizTransfer = (id) => {
    let qun_temp = [];
    let data = [];
    axios
      .get(ServerAddress + `cards/get_quiz_transfer/?quiz_id=${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then((response) => {
        data = response.data.quiz_question;
        if (data.length > 0) {
          qun_temp = data.filter((v) => v.question !== null).map((v) => [v.question, toTitleCase(v.question__question)]);
          setquestion_list2(qun_temp);
        }
      })
      .catch((err) => {
        toast.error(`Error Occur in Get Question List, ${err}`, { position: 'bottom-right', autoClose: 5000 });
      });
  };

  useEffect(() => {
    if (location.state === null) {
      GetQuestionsTransfer('all');
    } else if (location.state !== null) {
      GetQuestionsTransfer(parseInt(location.state.data.id));
    }
  }, [question_page, search_question]);

  useEffect(() => {
    if (location.state !== null && quiz_name_id !== '') {
      GetQuizTransfer(location.state?.data.id);
    }
  }, [quiz_name_id]);

  return (
    <>
      <PageTitle page={isupdating ? 'Update Quiz' : 'Add Quiz'} />
      <Title title={isupdating ? 'Update Quiz' : 'Add Quiz'} parent_title={'Quiz'} />
      <Loader show={show} setshow={setshow} />
      <ToastContainer />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!quiz_name) {
            setquiz_name_err(true);
            document.getElementById('quiz_details').scrollIntoView();
          } else if (!age) {
            setage_error(true);
            document.getElementById('quiz_details').scrollIntoView();
          } else if (!quiz_date) {
            setquiz_date_error(true);
            document.getElementById('quiz_details').scrollIntoView();
          } else if (!prize_money) {
            setprize_money_error(true);
            document.getElementById('quiz_details').scrollIntoView();
          } else if (!entry_fee) {
            setentry_fee_error(true);
            document.getElementById('quiz_details').scrollIntoView();
          } else if (question_list2.length === 0) {
            setquestion_error(true);
            document.getElementById('quiz_details').scrollIntoView();
          } else {
            isupdating ? update_quiz_name_data() : send_quiz_name_data();
          }
        }}>
        <div className='m-2' id='quiz_details'>
          <Card style={{ marginBottom: '0px' }}>
            <CardTitle className='mb-1 header'>
              <div className='header-text-icon header-text'>
                Add Quiz Details
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
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child sm-10'>
                        Quiz Name <span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={quiz_name}
                        onChange={(e) => {
                          setquiz_name(e.target.value);
                        }}
                        invalid={quiz_name_err}
                        className='form-control-md'
                        name='quiz_name'
                        id='input'
                        type='text'
                        placeholder='Enter Quiz Name '
                      />
                      {quiz_name_err && <FormFeedback type='invalid'>Quiz Name is required</FormFeedback>}
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
                        className='form-control-md no-arrows'
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
                        Quiz Date & Time <span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={quiz_date}
                        onChange={(e) => {
                          setquiz_date(e.target.value);
                        }}
                        invalid={quiz_date_error}
                        className='form-control-md'
                        name='quiz_date'
                        id='input'
                        type='datetime-local'
                        placeholder='Enter Quiz Date'
                      />
                      {quiz_date_error && <FormFeedback type='invalid'>Quiz Date & Time is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Prize Money<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={prize_money}
                        onChange={(event) => {
                          setprize_money(event.target.value);
                        }}
                        invalid={prize_money_error}
                        className='form-control-md no-arrows'
                        name='prize_money'
                        id='input'
                        type='text'
                        placeholder='Enter Prize Money'
                      />
                      {prize_money_error && <FormFeedback type='invalid'>Prize Money is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Entry Fee<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={entry_fee}
                        onChange={(event) => {
                          let value = event.target.value;
                          // Allow up to 8 digits + optional . + 2 decimals
                          const decimalRegex = /^\d{0,8}(\.\d{0,2})?$/;
                          if (value === '' || decimalRegex.test(value)) {
                            setentry_fee(value);
                          }
                        }}
                        onBlur={() => {
                          if (entry_fee) {
                            const formatted = parseFloat(entry_fee).toFixed(2);
                            setentry_fee(formatted);
                          }
                        }}
                        invalid={entry_fee_error}
                        className='form-control-md no-arrows'
                        name='entry_fee'
                        id='input'
                        type='text'
                        placeholder='Enter Entry Fee'
                      />
                      {entry_fee_error && <FormFeedback type='invalid'>Entry Fee is required</FormFeedback>}
                    </div>
                  </Col>
                  <Label className='header-child' id='question'>
                    Question List
                    <span className='mandatory'> *</span>
                  </Label>
                  <Col lg={12} md={12} sm={12}>
                    <TransferList list_a={question_list} setlist_a={setquestion_list} list_b={question_list2} setlist_b={setquestion_list2} page={question_page} setpage={setquestion_page} setsearch_item={setsearch_question} loaded={question_loaded} count={question_count} bottom={question_bottom} setbottom={setquestion_bottom} />
                    {question_error ? <div style={{ color: '#f46a6a', fontSize: '10.4px' }}>Select At Least One question</div> : null}
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

export default AddQuiz;
