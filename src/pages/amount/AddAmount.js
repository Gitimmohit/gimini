import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Form,
  Input,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Row,
  FormFeedback,
} from "reactstrap";
import "../../assets/scss/forms/form.scss";
import { ServerAddress } from "../../server/ServerAddress";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../components/common/pagetitle/PageTitle";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import Loader from "../../components/loader/Loader";
import toTitleCase from "../../components/toTitleCase/toTitleCase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NSearchInput from "../../components/nsearchInput/NSearchInput";
import Title from "../../components/common/title/Title";

const AddAmount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  //redux state
  const accessToken = useSelector((state) => state.user.access_token);
  const user_detail = useSelector((state) => state.user.user_details);
  // Toggle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };
  const [isupdating, setisupdating] = useState(false);
  const [trans_id, settrans_id] = useState("");

  const [username, setusername] = useState(
    user_detail?.fullname ? toTitleCase(user_detail?.fullname) : ""
  );
  const [username_err, setusername_err] = useState(false);

  const [user_type, setuser_type] = useState(user_detail?.usertype);
  const [user_type_err, setuser_type_err] = useState(false);

  const [transaction_id, settransaction_id] = useState("");
  const [transaction_id_err, settransaction_id_err] = useState(false);

  const [request_type, setrequest_type] = useState("CR");
  const [request_type_error, setrequest_type_error] = useState(false);

  const [request_amt, setrequest_amt] = useState("");
  const [request_amt_err, setrequest_amt_err] = useState(false);

  const [is_tranaction, setis_tranaction] = useState(false);

  const [show, setshow] = useState(false);

  const [current_status_list, setcurrent_status_list] = useState([
    ["A", "Pending"],
    ["B", "Approved"],
    ["C", "Reject"],
  ]);
  const [current_status, setcurrent_status] = useState("Pending");
  const [current_status_id, setcurrent_status_id] = useState("");
  const [current_status_err, setcurrent_status_err] = useState(false);

  const send_transaction_data = () => {
    setshow(true);
    axios
      .post(
        ServerAddress + "cards/add_tranaction/",
        {
          user:user_detail.id,
          transactionId: transaction_id ? transaction_id : "",
          request_type: request_type
            ? toTitleCase(request_type).toUpperCase()
            : request_type,
          current_status: current_status
            ? toTitleCase(current_status).toUpperCase()
            : current_status,
          transaction_amt: request_amt,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        if (resp.status === 201) {
          setshow(false);
          toast.success(`Transaction successfully !`, {
            position: "top-center",
            autoClose: 2000,
          });
          navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        toast.error(`Error Occur While Adding ${transaction_id},${err}`, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          closeButton: false,
        });
        console.error(`Error Occur While Adding ${trans_id},${err}`);
      });
  };
  const update_transaction_data = () => {
    setshow(true);
    axios
      .put(
        ServerAddress + "cards/put_tranaction/" + trans_id,
        {
          transactionId: transaction_id
            ? toTitleCase(transaction_id).toUpperCase()
            : transaction_id,
          request_type: request_type
            ? toTitleCase(request_type).toUpperCase()
            : request_type,
          current_status: current_status
            ? toTitleCase(current_status).toUpperCase()
            : current_status,
          transaction_amt: request_amt,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (resp) {
        console.log("resp--", resp);
        if (resp.status === 200) {
          setshow(false);
          toast.success(`Transaction successfully !`, {
            position: "top-center",
            autoClose: 2000,
          });
          navigate(-1);
        }
      })
      .catch((err) => {
        setshow(false);
        console.error(`Error Occur While Updating ${username}, ${err}`);
      });
  };

  useEffect(() => {
    if (username !== "") {
      setusername_err(false);
    }
    if (user_type !== "" && user_type !== null) {
      setuser_type_err(false);
    }
    if (transaction_id !== "" && transaction_id !== null) {
      settransaction_id_err(false);
    }
    if (request_type !== "" && request_type !== null) {
      setrequest_type_error(false);
    }

    if (current_status_id !== "" && current_status_id !== null) {
      setcurrent_status_err(false);
    }
    if (request_amt !== "" && request_amt !== null) {
      setrequest_amt_err(false);
    }
  }, [
    username,
    user_type,
    transaction_id,
    request_type,
    current_status_id,
    request_amt,
  ]);

  useLayoutEffect(() => {
    try {
      let qun_data = location.state.data;
      setisupdating(true);
      settrans_id(qun_data?.id);
      setusername(user_detail?.fullname);
      setuser_type(toTitleCase(user_detail?.user_type));
      settransaction_id(toTitleCase(qun_data?.transactionId));
      setrequest_type(qun_data?.request_type);
      setis_tranaction(qun_data.is_transaction_complete);
      setcurrent_status(toTitleCase(qun_data?.current_status));
      setrequest_amt(qun_data?.transaction_amt);
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="main-cont">
        <PageTitle page={isupdating ? "Update Amount" : "Add Amount"} />
        <Title
          title={isupdating ? "Update Amount" : "Add Amount"}
          parent_title={"Amount"}
        />
        <Loader show={show} setshow={setshow} />
        <ToastContainer />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (!transaction_id) {
              settransaction_id_err(true);
              document.getElementById("question_details").scrollIntoView();
            } else if (!request_type) {
              setrequest_type_error(true);
              document.getElementById("question_details").scrollIntoView();
            } else if (!current_status) {
              setcurrent_status_err(true);
              document.getElementById("question_details").scrollIntoView();
            } else if (!request_amt) {
              setrequest_amt_err(true);
              document.getElementById("question_details").scrollIntoView();
            } else {
              isupdating ? update_transaction_data() : send_transaction_data();
            }
          }}
        >
          <div
            className="m-2"
            id="question_details"
            style={{ textAlign: "left" }}
          >
            <Card style={{ marginBottom: "0px" }}>
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Transaction Details
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle}>
                      {circle_btn ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn ? (
                <CardBody style={{ padding: "5px" }}>
                  <Row>
                    <Col lg={3} md={6} sm={6}>
                      <div>
                        <Label className="header-child">
                          User Name <span className="mandatory"> *</span>
                        </Label>
                        <Input
                          onChange={(e) => {
                            setusername(e.target.value);
                          }}
                          value={username}
                          invalid={username_err}
                          type="username"
                          name="username"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter User Name"
                          readOnly={isupdating}
                          disabled
                        />
                        {username_err && (
                          <FormFeedback type="invalid">
                            User Name is required
                          </FormFeedback>
                        )}
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div>
                        <Label className="header-child">
                          User Type <span className="mandatory"> *</span>
                        </Label>
                        <Input
                          value={user_type}
                          onChange={(e) => {
                            setuser_type(e.target.value);
                          }}
                          invalid={user_type_err}
                          disabled
                          className="form-control-md"
                          name="user_type"
                          id="input"
                          type="text"
                          placeholder="Enter User Type"
                        />
                        {user_type_err && (
                          <FormFeedback type="invalid">
                            User Type is required
                          </FormFeedback>
                        )}
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div>
                        <Label className="header-child">
                          Transaction Id<span className="mandatory"> *</span>
                        </Label>
                        <Input
                          value={transaction_id}
                          onChange={(e) => {
                            settransaction_id(e.target.value);
                          }}
                          invalid={transaction_id_err}
                          className="form-control-md"
                          name="transaction_id"
                          id="input"
                          type="text"
                          placeholder="Enter Transaction Id"
                        />
                        {transaction_id_err && (
                          <FormFeedback type="invalid">
                            Transaction Id is required
                          </FormFeedback>
                        )}
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div>
                        <Label className="header-child">
                          Request Type<span className="mandatory"> *</span>
                        </Label>
                        <Input
                          value={request_type}
                          onChange={(e) => {
                            setrequest_type(e.target.value);
                          }}
                          invalid={request_type_error}
                          disabled
                          className="form-control-md"
                          name="request_type"
                          id="input"
                          type="text"
                          placeholder="Enter Request Type"
                        />
                        {request_type_error && (
                          <FormFeedback type="invalid">
                            Request Type is required
                          </FormFeedback>
                        )}
                      </div>
                    </Col>
                    <Col lg={3} md={6} sm={6}>
                      <div>
                        <Label className="header-child">
                          Current Status<span className="mandatory"> *</span>
                        </Label>
                        <NSearchInput
                          data_list={current_status_list}
                          data_item_s={current_status}
                          set_data_item_s={setcurrent_status}
                          set_id={setcurrent_status_id}
                          disable_me={true}
                          show_search={false}
                          show_error={true}
                          error_s={current_status_err}
                          error_message={"Current Status is required"}
                        />
                      </div>
                    </Col>

                    <Col lg={3} md={6} sm={6}>
                      <div>
                        <Label className="header-child">
                          Request Amount<span className="mandatory"> *</span>
                        </Label>
                        <Input
                          value={request_amt}
                          onChange={(event) => {
                            const { value } = event.target;
                            setrequest_amt(value);
                          }}
                          invalid={request_amt_err}
                          className="form-control-md no-arrows"
                          name="request_amt"
                          id="input"
                          type="number"
                          placeholder="Request Amount"
                        />
                        {request_amt_err && (
                          <FormFeedback type="invalid">
                            Request Amount is required
                          </FormFeedback>
                        )}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </div>

          {/*Button */}
          <div className="m-2">
            <Col lg={12}>
              <div className="mb-1 footer_btn">
                <button
                  disabled={is_tranaction}
                  type="submit"
                  className="btn btn-success m-1"
                  style={{ width: "80px" }}
                >
                  {isupdating ? "Update" : "Save"}
                </button>

                <button
                  type="button"
                  className="btn btn-danger m-1"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Cancel
                </button>
              </div>
            </Col>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddAmount;
