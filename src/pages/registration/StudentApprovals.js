import React, { useEffect, useState } from "react";
import "./StudentApproval.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../server/ServerAddress";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "../../redux/slices/userSlice";

const StudentApproval = () => {
  const user = useSelector((state) => state.user.user_details);
  const accessToken = useSelector((state) => state.user.access_token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [transactionId, setTransactionId] = useState("");
  const [studentStatus, setStudentStatus] = useState(user.first_payment);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setshow] = useState(false);
  const qrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=student_approval_123";

  const showSuccessMessage = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId.trim()) {
      alert("Please enter a transaction ID");
      return;
    }

    setIsLoading(true);
    // here add the post function first_payment
    sendPaymentRecipt();
  };

  const sendPaymentRecipt = async () => {
    setshow(true); // show loader

    try {
      const response = await axios.post(
        `${ServerAddress}cards/first_payment_receipt/`,
        {
          transactionId: transactionId,
          request_type: "CR",
          user: user.id,
          is_first_transaction: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("payment Verified", response);

      // ----------- SUCCESS RESPONSE HANDLING -----------
      if (response.data?.status === "success") {
        setIsLoading(false);
        getUserData();
        setStudentStatus("DONE");
        showSuccessMessage("Request Submitted successfully!");
      } else {
        setIsLoading(false);
        toast.error(response.data?.error);
      }
    } catch (error) {
      // ----------- PROPER ERROR HANDLING -----------
      setIsLoading(false);
      if (error.response) {
        // Server responded with 4xx or 5xx error
        console.error("SERVER ERROR:", error.response.data);

        const msg =
          error.response.data?.error ||
          error.response.data?.message ||
          "Something went wrong!";

        toast.error(msg);
      } else if (error.request) {
        // Request sent but no response
        console.error("NO RESPONSE FROM SERVER");
        toast.error("No response from server. Please try again.");
      } else {
        // Something else happened
        console.error("ERROR:", error.message);
        toast.error("Unexpected error occurred!");
      }
    } finally {
      // -------- ALWAYS STOP LOADER --------
      setshow(false);
    }
  };

  const getUserData = async (username, password) => {
    setIsLoading(true);
    setshow(true);
    try {
      const response = await axios.post(
        `${ServerAddress}ems/get_user_info/`,
        {
          username: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        console.log("data------------", response);
        setshow(false);
        dispatch(setAccessToken(response.data.access));
        dispatch(setRefreshToken(response.data.refresh));
        dispatch(setUserDetails(response.data.user_data));
      }
    } catch (error) {
      setIsLoading(false);
      setshow(false);
      toast.error("Error occurs while get user details");
    }
  };

  const GetFirstTranaction = async () => {
    try {
      const response = await axios.get(
        ServerAddress + `cards/getfirst_payment_receipt/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const Data = response.data.results;
      if (response.data.results.length > 0) {
        setTransactionId(Data[0].transactionId);
      } else {
        setTransactionId("");
      }
      console.log("Datat Value is ", Data);
    } catch (err) {
      toast.error("Error occurs while get tranaction");
    }
  };

  useEffect(() => {
    GetFirstTranaction();
  }, []);

  const getStatusColor = () => {
    switch (studentStatus?.toUpperCase()) {
      case "NOT DONE":
        return "stud-status-pending";

      case "DONE":
        return "stud-status-done";

      case "APPROVED":
        return "stud-status-approved";

      case "REJECT":
      case "REJECTED":
        return "stud-status-rejected";

      default:
        return "stud-status-pending";
    }
  };

  const getStatusText = () => {
    switch (studentStatus?.toUpperCase()) {
      case "NOT DONE":
        return "Not Done ❗";

      case "DONE":
        return "Completed ✔️";

      case "APPROVED":
        return "Approved ✅";

      case "REJECT":
      case "REJECTED":
        return "Rejected ❌";

      default:
        return "Pending Review ⏳";
    }
  };

  return (
    <div className="stud-container">
      <Loader show={show} setshow={setshow} />
      <ToastContainer />
      <div className="stud-card">
        <h1 className="stud-title">Student Account Approval</h1>

        {/* QR Code Section */}
        <div className="stud-qr-section">
          <h2 className="stud-section-title">Scan QR Code for Payment</h2>
          <div className="stud-qr-container">
            <img
              src={qrCodeUrl}
              alt="Payment QR Code"
              className="stud-qr-image"
            />
          </div>
          <p className="stud-qr-description">
            Scan this QR code to complete your payment
          </p>
        </div>

        {/* Status Section */}
        <div className="stud-status-section">
          <h2 className="stud-section-title">Account Status</h2>
          <div className={`stud-status-box ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>

        {/* Transaction ID Form */}
        <div className="stud-form-section">
          <h2 className="stud-section-title">
            Submit Transaction for Approval
          </h2>
          <form onSubmit={handleSubmit} className="stud-form">
            <div className="stud-form-group">
              <label htmlFor="transactionId" className="stud-label">
                Transaction ID *
              </label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter your transaction ID"
                className="stud-input"
                required
              />
              <p className="stud-help-text">
                Enter the transaction ID from your payment receipt
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`stud-submit-btn ${isLoading ? "stud-loading" : ""}`}
            >
              {isLoading ? "Submitting..." : "Submit for Approval"}
            </button>
          </form>
        </div>

        {/* Additional Information */}
        <div className="stud-info-section">
          <h3 className="stud-info-title">Important Notes:</h3>
          <ul className="stud-info-list">
            <li>Complete the payment using the QR code above</li>
            <li>Copy the transaction ID from your payment receipt</li>
            <li>Submit the transaction ID for account approval</li>
            <li>Approval typically takes 24-48 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentApproval;
