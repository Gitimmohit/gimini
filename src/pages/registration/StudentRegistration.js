// pages/Registration.js
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Person,
  Email,
  Phone,
  Lock,
  School,
  Campaign,
  RocketLaunch,
} from "@mui/icons-material";

import "./StudentRegistration.css"; // Regular CSS import
import { Modal } from "react-bootstrap";
import Loader from "../../components/common/Loader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ServerAddress } from "../../server/ServerAddress";
import { useEffect } from "react";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    school_name: "",
    usertype: "STUDENT",
    referralCode: "",
  });

  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [show, setshow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rectoken, setrectoken] = useState(0);

  const [otpp, setOtpp] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);

  const handleClose = () => setshow(false);

  useEffect(() => {
    if (!show) {
      setOtpDigits(["", "", "", "", "", ""]);
    }
  }, [show]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========================
  // VALIDATION
  // ========================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.school_name.trim()) {
      newErrors.school_name = "School/College name is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // ===========================
  // SUBMIT HANDLER
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration Data:", formData);

      // add the post functoin here bro
      sign_up();
    } else {
      setErrors(newErrors);
    }
  };

  // ===========================
  // HANDLE CHANGE
  // ===========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const sign_up = () => {
    setIsLoading(true);
    setshow(true);
    axios
      .post(ServerAddress + "ems/signup/", {
        email: formData.email,
        fullname: formData.fullname,
        password: formData.password,
        mobilenumber: formData.phone,
      })
      .then(function (response) {
        setIsSubmitting(false);
        console.log("sign  Res in resp", response);
        if (
          response.data.error ===
          "Email already exists! Please use another email or login."
        ) {
          toast.error(
            "Email already exists! Please use another email or login"
          );
          setOtpp(false);
          setshow(false);
          setIsLoading(false);
        } else if (response.data.message === "OTP sent successfully!") {
          setrectoken(response.data.token);
          setIsLoading(false);
          setOtpp(true);
        }
      })
      .catch(function (error) {
        toast.error("Signup failed. Please try again.");
        console.log("errr", error);
        setshow(false);
        setIsLoading(false);
      });
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
    }
    if (value && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

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
    navigate("/login");
  };

  const handleOtp = async () => {
    setshow(true); // show loader

    const otp = otpDigits.join("");

    try {
      const response = await axios.post(`${ServerAddress}ems/verify_otp/`, {
        token: rectoken,
        email: formData.email,
        fullname: formData.fullname,
        mobilenumber: formData.phone,
        usertype: formData.usertype,
        dob: formData.dob,
        school_name: formData.school_name,
        referralCode: formData.referralCode,
        otp: otp,
        password: formData.password,
      });

      console.log("OTP Verified", response);

      // ----------- SUCCESS RESPONSE HANDLING -----------
      if (response.data?.message === "User created successfully!") {
        toast.success("User Created Successfully!");
        setOtpp(false);
        showSuccessMessage("User created successfully!");
      } else {
        toast.error(response.data?.error || "Invalid OTP!");
        setErr(true);
      }
    } catch (error) {
      // ----------- PROPER ERROR HANDLING -----------

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

      setErr(true);
    } finally {
      // -------- ALWAYS STOP LOADER --------
      setshow(false);
    }
  };

  return (
    <>
      {/* OTP Modal */}
      <div className="student-registration-page">
        <Loader show={show} setshow={setshow} />
        <ToastContainer />
        <Modal
          show={show} // Changed from true to otpp
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="student-otp-modal"
        >
          <Modal.Header closeButton className="student-modal-header-custom">
            <Modal.Title>Verify OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body className="student-modal-body-custom">
            <div className="student-otp-main">
              <p className="student-otp-description">
                6-digit OTP has been sent to your email
              </p>
              <div className="student-otp-input-container">
                {otpDigits.map((digit, index) => (
                  <input
                    name="otp"
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="student-otp-input"
                    style={{ color: "white" }}
                    ref={(input) => (inputRefs.current[index] = input)}
                  />
                ))}
              </div>
              <div className="student-otp-submit">
                <button className="student-otp-submit-btn" onClick={handleOtp}>
                  Verify OTP
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div className="student-space-bg"></div>

        <div className="student-container">
          <motion.div
            className="student-registration-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="student-card-header">
              <div className="student-header-content">
                <RocketLaunch className="student-header-icon" />
                <div>
                  <h1>Join With Gimini Planetarium</h1>
                  <p>Create your account to explore the universe</p>
                </div>
              </div>
            </div>

            {/* FORM START */}
            <form onSubmit={handleSubmit} className="student-compact-form">
              {/* FULLNAME + PHONE */}
              <div className="student-form-grid">
                {/* FULLNAME */}
                <div className="student-form-group compact">
                  <label>Full Name *</label>
                  <div className="student-input-wrapper">
                    <Person className="student-input-icon" />
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className={errors.fullname ? "error" : ""}
                      placeholder="Your full name"
                    />
                  </div>
                  {errors.fullname && (
                    <span className="student-error-msg">{errors.fullname}</span>
                  )}
                </div>

                {/* PHONE */}
                <div className="student-form-group compact">
                  <label>Phone Number *</label>
                  <div className="student-input-wrapper">
                    <Phone className="student-input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "error" : ""}
                      placeholder="10-digit number"
                    />
                  </div>
                  {errors.phone && (
                    <span className="student-error-msg">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div className="student-form-group compact">
                <label>Email Address *</label>
                <div className="student-input-wrapper">
                  <Email className="student-input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <span className="student-error-msg">{errors.email}</span>
                )}
              </div>

              {/* DOB */}
              <div className="student-form-group compact">
                <label>Date of Birth *</label>
                <div className="student-input-wrapper">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? "error" : ""}
                  />
                </div>
                {errors.dob && (
                  <span className="student-error-msg">{errors.dob}</span>
                )}
              </div>

              {/* SCHOOL NAME */}
              <div className="student-form-group compact">
                <label>School / College Name *</label>
                <div className="student-input-wrapper">
                  <School className="student-input-icon" />
                  <input
                    type="text"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleChange}
                    className={errors.school_name ? "error" : ""}
                    placeholder="Enter your school name"
                  />
                </div>
                {errors.school_name && (
                  <span className="student-error-msg">
                    {errors.school_name}
                  </span>
                )}
              </div>

              {/* PASSWORD + CONFIRM */}
              <div className="student-form-grid">
                <div className="student-form-group compact">
                  <label>Password *</label>
                  <div className="student-input-wrapper">
                    <Lock className="student-input-icon" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "error" : ""}
                      placeholder="Min. 6 characters"
                    />
                  </div>
                  {errors.password && (
                    <span className="student-error-msg">{errors.password}</span>
                  )}
                </div>

                <div className="student-form-group compact">
                  <label>Confirm Password *</label>
                  <div className="student-input-wrapper">
                    <Lock className="student-input-icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "error" : ""}
                      placeholder="Confirm password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="student-error-msg">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              {/* REFERRAL CODE */}
              <div className="student-form-group compact">
                <label>
                  Referral Code{" "}
                  <span className="student-optional">(Optional)</span>
                </label>
                <div className="student-input-wrapper">
                  <Campaign className="student-input-icon" />
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Enter referral code"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                type="submit"
                className={`student-submit-btn compact ${
                  isSubmitting ? "submitting" : ""
                }`}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="student-spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <RocketLaunch className="student-btn-icon" />
                    Create Account
                  </>
                )}
              </motion.button>
            </form>

            {/* FOOTER */}
            <div className="student-card-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="student-footer-link">
                  Sign In
                </Link>
              </p>
              <p className="student-terms-text">
                By creating an account, you agree to our{" "}
                <Link to="/terms">Terms</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StudentRegistration;
