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

import "./PromoterRegistration.css";
import { Modal } from "react-bootstrap";
import Loader from "../../components/common/Loader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ServerAddress } from "../../server/ServerAddress";
import { useEffect } from "react";

const PromoterRegistration = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    school_name: "",
    usertype: "PROMOTER",
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
        fullname:formData.fullname,
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
    setshow(true);
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

      if (response.data?.message === "User created successfully!") {
        toast.success("User Created Successfully!");
        setOtpp(false);
        showSuccessMessage("User created successfully!");
      } else {
        toast.error(response.data?.error || "Invalid OTP!");
        setErr(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("SERVER ERROR:", error.response.data);
        const msg =
          error.response.data?.error ||
          error.response.data?.message ||
          "Something went wrong!";
        toast.error(msg);
      } else if (error.request) {
        console.error("NO RESPONSE FROM SERVER");
        toast.error("No response from server. Please try again.");
      } else {
        console.error("ERROR:", error.message);
        toast.error("Unexpected error occurred!");
      }
      setErr(true);
    } finally {
      setshow(false);
    }
  };

  return (
    <>
      <div className="compact-promoter-registration">
        <Loader show={show} setshow={setshow} />
        <ToastContainer />
        
        {/* OTP Modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="md"
          centered
          className="compact-otp-modal"
        >
          <Modal.Header closeButton className="compact-modal-header">
            <Modal.Title>Verify OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body className="compact-modal-body">
            <div className="compact-otp-main">
              <p className="compact-otp-description">
                6-digit OTP sent to your email
              </p>
              <div className="compact-otp-inputs">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="compact-otp-input"
                    ref={(input) => (inputRefs.current[index] = input)}
                  />
                ))}
              </div>
              <button className="compact-otp-btn" onClick={handleOtp}>
                Verify OTP
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <div className="compact-space-bg"></div>

        <div className="compact-container">
          <motion.div
            className="compact-registration-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Compact Header */}
            <div className="compact-header">
              <div className="compact-header-content">
                <div className="compact-icon-badge">
                  <RocketLaunch className="compact-header-icon" />
                  <span className="compact-badge">Promoter</span>
                </div>
                <div className="compact-header-text">
                  <h1>Join Gimini Planetarium</h1>
                  <p>Start earning as a promoter</p>
                </div>
              </div>
            </div>

            {/* Compact Form */}
            <form onSubmit={handleSubmit} className="compact-form">
              <div className="compact-form-grid">
                {/* Full Name */}
                <div className="compact-form-group">
                  <label>Full Name *</label>
                  <div className="compact-input-wrapper">
                    <Person className="compact-input-icon" />
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
                    <span className="compact-error">{errors.fullname}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="compact-form-group">
                  <label>Phone *</label>
                  <div className="compact-input-wrapper">
                    <Phone className="compact-input-icon" />
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
                    <span className="compact-error">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="compact-form-group">
                <label>Email *</label>
                <div className="compact-input-wrapper">
                  <Email className="compact-input-icon" />
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
                  <span className="compact-error">{errors.email}</span>
                )}
              </div>

              <div className="compact-form-grid">
                {/* DOB */}
                <div className="compact-form-group">
                  <label>Date of Birth *</label>
                  <div className="compact-input-wrapper">
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={errors.dob ? "error" : ""}
                    />
                  </div>
                  {errors.dob && (
                    <span className="compact-error">{errors.dob}</span>
                  )}
                </div>

                {/* School */}
                <div className="compact-form-group">
                  <label>School/College *</label>
                  <div className="compact-input-wrapper">
                    <School className="compact-input-icon" />
                    <input
                      type="text"
                      name="school_name"
                      value={formData.school_name}
                      onChange={handleChange}
                      className={errors.school_name ? "error" : ""}
                      placeholder="School name"
                    />
                  </div>
                  {errors.school_name && (
                    <span className="compact-error">{errors.school_name}</span>
                  )}
                </div>
              </div>

              <div className="compact-form-grid">
                {/* Password */}
                <div className="compact-form-group">
                  <label>Password *</label>
                  <div className="compact-input-wrapper">
                    <Lock className="compact-input-icon" />
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
                    <span className="compact-error">{errors.password}</span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="compact-form-group">
                  <label>Confirm Password *</label>
                  <div className="compact-input-wrapper">
                    <Lock className="compact-input-icon" />
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
                    <span className="compact-error">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>

              {/* Referral Code */}
              <div className="compact-form-group">
                <label>Referral Code <span className="optional">(Optional)</span></label>
                <div className="compact-input-wrapper">
                  <Campaign className="compact-input-icon" />
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Enter referral code"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`compact-submit-btn ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="compact-spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <RocketLaunch className="compact-btn-icon" />
                    Create Promoter Account
                  </>
                )}
              </motion.button>
            </form>

            {/* Compact Footer */}
            <div className="compact-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="compact-footer-link">
                  Sign In
                </Link>
              </p>
              <p className="compact-terms">
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

export default PromoterRegistration;