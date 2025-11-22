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
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

const AddUser = () => {
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
  const [user_id, setuser_id] = useState('');
  const [fullname, setfullname] = useState('');
  const [fullname_err, setfullname_err] = useState(false);
  const [user_type, setuser_type] = useState('');
  const [user_type_err, setuser_type_err] = useState(false);
  const [email, setemail] = useState('');
  const [email_err, setemail_err] = useState(false);
  const [mobilenumber, setmobilenumber] = useState('');
  const [mobilenumber_error, setmobilenumber_error] = useState(false);
  const [mobile_len_err, setmobile_len_err] = useState(false);
  const [age, setage] = useState('');
  const [age_error, setage_error] = useState(false);
  const [school_name, setschool_name] = useState('');
  const [school_name_error, setschool_name_error] = useState(false);
  const [show, setshow] = useState(false);
  const [is_active, setis_active] = useState(false);
  const [is_active_focus, setis_active_focus] = useState(false);
  const [is_approved, setis_approved] = useState(false);
  const [is_approved_focus, setis_approved_focus] = useState(false);
  const [is_first_quiz, setis_first_quiz] = useState(false);
  const [is_first_quiz_focus, setis_first_quiz_focus] = useState(false);
  const [is_first_show, setis_first_show] = useState(false);
  const [is_first_show_focus, setis_first_show_focus] = useState(false);

  const send_user_data = () => {
    setshow(true);
    axios
      .post(
        ServerAddress + 'cards/add_user_details/',
        {
          fullname: fullname ? toTitleCase(fullname).toUpperCase() : fullname,
          usertype: user_type ? toTitleCase(user_type).toUpperCase() : user_type,
          email: email ? toTitleCase(email).toLowerCase() : email,
          mobilenumber: mobilenumber ? toTitleCase(mobilenumber).toUpperCase() : mobilenumber,
          school_name: school_name ? school_name : school_name,
          dob: age ? age : age,
          is_active: is_active,
          is_approved: is_approved,
          is_first_quiz: is_first_quiz,
          is_first_show: is_first_show
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
          toast.success(`User Added successfully !`, { position: 'top-center', autoClose: 2000 });
          //   navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        toast.error(`Error Occur While Adding,${err}`, { position: 'bottom-right', autoClose: 1000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: 'colored', closeButton: false });
        console.error(`Error Occur While Adding,${err}`);
      });
  };
  const update_user_data = () => {
    setshow(true);
    axios
      .put(
        ServerAddress + 'ems/put_user_details/' + user_id,
        {
          fullname: fullname ? toTitleCase(fullname).toUpperCase() : fullname,
          usertype: user_type ? toTitleCase(user_type).toUpperCase() : user_type,
          email: email ? toTitleCase(email).toLowerCase() : email,
          mobilenumber: mobilenumber ? toTitleCase(mobilenumber).toUpperCase() : mobilenumber,
          school_name: school_name ? school_name : school_name,
          dob: age ? age : age,
          is_active: is_active,
          is_approved: is_approved,
          is_first_quiz: is_first_quiz,
          is_first_show: is_first_show
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
          toast.success(`User Updated successfully !`, { position: 'top-center', autoClose: 2000 });
          navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        console.error(`Error Occur While Updating ${email}, ${err}`);
      });
  };

  useEffect(() => {
    if (fullname) {
      setfullname_err(false);
    }
    if (email) {
      setemail_err(false);
    }
    if (user_type) {
      setuser_type_err(false);
    }
    if (mobilenumber) {
      setmobilenumber_error(false);
    }
    if (age) {
      setage_error(false);
    }
    if (school_name) {
      setschool_name_error(false);
    }
    if (mobilenumber?.length === 10) {
      setmobile_len_err(false);
    }
  }, [fullname, email, user_type, mobilenumber, age, school_name]);

  useLayoutEffect(() => {
    try {
      let qun_data = location.state.data;
      setisupdating(true);
      setuser_id(qun_data?.id);
      setfullname(toTitleCase(qun_data?.fullname));
      setuser_type(toTitleCase(qun_data?.usertype));
      setemail(qun_data?.email);
      setmobilenumber(qun_data?.mobilenumber);
      setschool_name(qun_data?.school_name);
      setage(qun_data?.dob);
      setis_active(qun_data.is_active);
      setis_approved(qun_data.is_approved);
      setis_first_quiz(qun_data.is_first_quiz);
      setis_first_show(qun_data.is_first_show);
    } catch (error) {}
  }, []);

  return (
    <>
      <PageTitle page={isupdating ? 'Update User' : 'Add User'} />
      <Title title={isupdating ? 'Update User' : 'Add User'} parent_title={'User'} />
      <Loader show={show} setshow={setshow} />
      <ToastContainer />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!fullname) {
            setfullname_err(true);
            document.getElementById('user_details').scrollIntoView();
          } else if (!user_type) {
            setuser_type_err(true);
            document.getElementById('user_details').scrollIntoView();
          } else if (!email) {
            setemail_err(true);
            document.getElementById('user_details').scrollIntoView();
          } else if (!mobilenumber) {
            setmobilenumber_error(true);
            document.getElementById('user_details').scrollIntoView();
          } else if (mobilenumber?.length !== 10) {
            setmobile_len_err(true);
            document.getElementById('user_details').scrollIntoView();
          } else if (!school_name) {
            setschool_name_error(true);
            document.getElementById('user_details').scrollIntoView();
          } else if (!age) {
            setage_error(true);
            document.getElementById('user_details').scrollIntoView();
          } else {
            isupdating ? update_user_data() : send_user_data();
          }
        }}>
        <div className='m-2' id='user_details'>
          <Card style={{ marginBottom: '0px' }}>
            <CardTitle className='mb-1 header'>
              <div className='header-text-icon header-text'>
                Add User Details
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
                      <Label className='header-child'>
                        Full Name <span className='mandatory'> *</span>
                      </Label>
                      <Input
                        onChange={(e) => {
                          setfullname(e.target.value);
                        }}
                        value={fullname}
                        invalid={fullname_err}
                        type='fullname'
                        name='fullname'
                        className='form-control-md'
                        id='input'
                        placeholder='Enter Full Name'
                      />
                      {fullname_err && <FormFeedback type='invalid'>Full Name is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        User Type<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={user_type}
                        onChange={(e) => {
                          setuser_type(e.target.value);
                        }}
                        invalid={user_type_err}
                        className='form-control-md'
                        name='user_type'
                        id='input'
                        type='text'
                        placeholder='Enter User Type'
                        disabled
                        readOnly
                      />
                      {user_type_err && <FormFeedback type='invalid'>User Type is required</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Email <span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                        invalid={email_err}
                        className='form-control-md'
                        name='email'
                        id='input'
                        type='text'
                        placeholder='Enter Email'
                        disabled
                        readOnly
                      />
                      {email_err && <FormFeedback type='invalid'>Email is required</FormFeedback>}
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Mobile Number<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={mobilenumber}
                        onChange={(event) => {
                          const { value } = event.target;
                          if (value.length <= 10) {
                            setmobilenumber(value);
                          }
                        }}
                        invalid={mobilenumber_error || mobile_len_err}
                        className='form-control-md no-arrows'
                        name='mobilenumber'
                        id='input'
                        type='number'
                        placeholder='Enter Mobilenumber'
                      />
                      {mobilenumber_error && <FormFeedback type='invalid'>Mobile Number is required</FormFeedback>}
                      {mobile_len_err && <FormFeedback type='invalid'>Mobile Number is required 10 digits</FormFeedback>}
                    </div>
                  </Col>
                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        School Name<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={school_name}
                        onChange={(e) => {
                          setschool_name(e.target.value);
                        }}
                        invalid={school_name_error}
                        className='form-control-md'
                        name='school_name'
                        id='input'
                        type='school_name'
                        step={1}
                        placeholder='Enter School Name'
                      />
                      {school_name_error && <FormFeedback type='invalid'>School Name is required</FormFeedback>}
                    </div>
                  </Col>

                  <Col lg={3} md={6} sm={6}>
                    <div>
                      <Label className='header-child'>
                        Dob<span className='mandatory'> *</span>
                      </Label>
                      <Input
                        value={age}
                        onChange={(e) => {
                          setage(e.target.value);
                        }}
                        invalid={age_error}
                        className='form-control-md'
                        name='age'
                        id='input'
                        type='date'
                        placeholder='Enter Dob'
                      />
                      {age_error && <FormFeedback type='invalid'>Dob is required</FormFeedback>}
                    </div>
                  </Col>
                  {!user_detail?.is_superuser && (
                    <Col lg={1} md={6} sm={6}>
                      <div className='mb-2'>
                        <Label className='header-child'> Is Active</Label>
                        <div
                          tabIndex={0}
                          onClick={() => setis_active(!is_active)}
                          onFocus={() => setis_active_focus(true)}
                          onBlur={() => setis_active_focus(false)}
                          style={{ cursor: 'pointer' }}
                          onKeyDown={(e) => {
                            if (e.key === ' ') {
                              e.preventDefault();
                              setis_active(!is_active);
                            }
                          }}>
                          {is_active ? <FiCheckSquare size={25} color={'blue'} style={{ border: is_active_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_active_focus ? '4px' : '0' }} /> : <FiSquare size={25} style={{ border: is_active_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_active_focus ? '4px' : '0' }} />}
                        </div>
                      </div>
                    </Col>
                  )}
                  <Col lg={1} md={6} sm={6}>
                    <div className='mb-2'>
                      <Label className='header-child'> Is Approved </Label>
                      <div
                        tabIndex={0}
                        onClick={() => setis_approved(!is_approved)}
                        onFocus={() => setis_approved_focus(true)}
                        onBlur={() => setis_approved_focus(false)}
                        style={{ cursor: 'pointer' }}
                        onKeyDown={(e) => {
                          if (e.key === ' ') {
                            e.preventDefault();
                            setis_approved(!is_approved);
                          }
                        }}>
                        {is_approved ? <FiCheckSquare size={25} color={'blue'} style={{ border: is_approved_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_approved_focus ? '4px' : '0' }} /> : <FiSquare size={25} style={{ border: is_approved_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_approved_focus ? '4px' : '0' }} />}
                      </div>
                    </div>
                  </Col>
                  <Col lg={1} md={6} sm={6}>
                    <div className='mb-2'>
                      <Label className='header-child'> Is First Quiz </Label>
                      <div
                        tabIndex={0}
                        onClick={() => setis_first_quiz(!is_first_quiz)}
                        onFocus={() => setis_first_quiz_focus(true)}
                        onBlur={() => setis_first_quiz_focus(false)}
                        style={{ cursor: 'pointer' }}
                        onKeyDown={(e) => {
                          if (e.key === ' ') {
                            e.preventDefault();
                            setis_first_quiz(!is_first_quiz);
                          }
                        }}>
                        {is_first_quiz ? <FiCheckSquare size={25} color={'blue'} style={{ border: is_first_quiz_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_first_quiz_focus ? '4px' : '0' }} /> : <FiSquare size={25} style={{ border: is_first_quiz_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_first_quiz_focus ? '4px' : '0' }} />}
                      </div>
                    </div>
                  </Col>
                  <Col lg={1} md={6} sm={6}>
                    <div className='mb-2'>
                      <Label className='header-child'> Is First Show </Label>
                      <div
                        tabIndex={0}
                        onClick={() => setis_first_show(!is_first_show)}
                        onFocus={() => setis_first_show_focus(true)}
                        onBlur={() => setis_first_show_focus(false)}
                        style={{ cursor: 'pointer' }}
                        onKeyDown={(e) => {
                          if (e.key === ' ') {
                            e.preventDefault();
                            setis_first_show(!is_first_show);
                          }
                        }}>
                        {is_first_show ? <FiCheckSquare size={25} color={'blue'} style={{ border: is_first_show_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_first_show_focus ? '4px' : '0' }} /> : <FiSquare size={25} style={{ border: is_first_show_focus ? '2px solid #4fa8e4' : 'none', borderRadius: is_first_show_focus ? '4px' : '0' }} />}
                      </div>
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

export default AddUser;
