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
  const [quiz_date, setquiz_date] = useState('');
  const [quiz_date_error, setquiz_date_error] = useState(false);
  const [show, setshow] = useState(false);

  // premises_list
  const [premises_list, setpremises_list] = useState([]);
  const [premises_list2, setpremises_list2] = useState([]);
  const [premises_page, setpremises_page] = useState(1);
  const [search_premises, setsearch_premises] = useState('');
  const [premises_loaded, setpremises_loaded] = useState(false);
  const [premises_count, setpremises_count] = useState(1);
  const [premises_bottom, setpremises_bottom] = useState(56);
  const [premises_error, setpremises_error] = useState(false);

  const send_quiz_name_data = () => {
    setshow(true);
    let premises_id = premises_list2.map((v) => v[0]);
    let premises_name = premises_list2.map((v) => v[1]);
    let premises_id_list = [...new Set(premises_id.map((v) => `${v}`))].map((v) => parseInt(v.split(',')));
    let premises_name_list = [...new Set(premises_name.map((v) => v.split(',').map((s) => s.trim())))].flat();
    axios
      .post(
        ServerAddress + 'cards/add_quiz_details/',
        {
          quiz_name: quiz_name ? toTitleCase(quiz_name).toUpperCase() : quiz_name,
          age_grup: age ? toTitleCase(age).toUpperCase() : age,
          quiz_date: quiz_date ? quiz_date : quiz_date,
          question: premises_id_list,
          question_name: premises_name_list
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
    // premises_list2 update
    let premises_id_list = premises_list2.map((v) => v[0]).filter((v) => v !== null);
    let premises_ids = [...new Set(premises_id_list.map((v) => `${v}`))].map((v) => parseInt(v.split(',')));
    axios
      .put(
        ServerAddress + 'cards/put_quiz_details/' + quiz_name_id,
        {
          quiz_name: quiz_name ? toTitleCase(quiz_name).toUpperCase() : quiz_name,
          age_grup: age ? toTitleCase(age).toUpperCase() : age,
          quiz_date: quiz_date ? quiz_date : quiz_date,
          question: premises_ids
          // question_name: premises_name_list
        }
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
  }, [quiz_name, age, quiz_date]);

  useLayoutEffect(() => {
    try {
      let qun_data = location.state.data;
      setisupdating(true);
      setquiz_data(qun_data);
      setquiz_name_id(qun_data?.id);
      setquiz_name(toTitleCase(qun_data?.quiz_name));
      setage(qun_data?.age_grup);
      setquiz_date(qun_data?.quiz_date);
    } catch (error) {}
  }, []);

  // get all premises at add branch
  const get_premises_data = () => {
    let temp_2 = [];
    let temp = [];
    axios
      .get(ServerAddress + `cards/get_question_details/?search=${search_premises}&p=${premises_page}&records=${20}`, {
        // headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then((response) => {
        temp = response.data.results;
        if (temp.length > 0) {
          if (response.data.next === null) {
            setpremises_loaded(false);
          } else {
            setpremises_loaded(true);
          }
          if (premises_page === 1) {
            temp_2 = temp.map((v) => [v.id, toTitleCase(v.question)]);
          } else {
            temp_2 = [...premises_list, ...temp.map((v) => [v.id, toTitleCase(v.question)])];
          }
          setpremises_count(premises_count + 2);
          setpremises_list(temp_2);
        } else {
          setpremises_list([]);
        }
      });
  };

  // set the  premises at update  branch
  const get_PremisesBranch = (id) => {
    let branch_temp = [];
    let data = [];
    axios
      .get(ServerAddress + `cards/get_quiz_question/?quiz_id=${id}`, {
        // headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then((response) => {
        data = response.data.quiz_question;
        if (data.length > 0) {
          branch_temp = data.filter((v) => v.premises !== null).map((v) => [v.question, toTitleCase(v.question__question)]);
          setpremises_list2(branch_temp);
        }
      })
      .catch((err) => {
        toast.error(`Error Occur in Get Question List, ${err}`, { position: 'bottom-right', autoClose: 5000 });
      });
  };
  useEffect(() => {
    get_premises_data();
  }, [premises_page, search_premises]);

  useEffect(() => {
    if (location.state !== null && quiz_name_id !== '') {
      get_PremisesBranch(location.state?.data.id);
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
                        Quiz Date<span className='mandatory'> *</span>
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
                        type='date'
                        placeholder='Enter Quiz Date'
                      />
                      {quiz_date_error && <FormFeedback type='invalid'>quiz_date is required</FormFeedback>}
                    </div>
                  </Col>
                  <Label className='header-child' id='premises'>
                    quiz_name List
                    <span className='mandatory'> *</span>
                  </Label>
                  <Col lg={12} md={12} sm={12}>
                    <TransferList list_a={premises_list} setlist_a={setpremises_list} list_b={premises_list2} setlist_b={setpremises_list2} page={premises_page} setpage={setpremises_page} setsearch_item={setsearch_premises} loaded={premises_loaded} count={premises_count} bottom={premises_bottom} setbottom={setpremises_bottom} />
                    {premises_error ? <div style={{ color: '#f46a6a', fontSize: '10.4px' }}>Select At Least One Premises</div> : null}
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
