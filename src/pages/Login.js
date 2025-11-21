// pages/Login.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Email,
  Lock,
  RocketLaunch,
  Visibility,
  VisibilityOff,
  Public,
  Star,
  School,
  BusinessCenter,
  AdminPanelSettings,
  Campaign,
} from "@mui/icons-material";
import "./Login.css";
import axios from "axios";
import { ServerAddress } from "../server/ServerAddress";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // for the login state
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showToastMessage = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  // Generate stars for background
  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      logIn(formData.email, formData.password);
    } else {
      setErrors(newErrors);
    }
  };

  const logIn = async (username, password) => {
    setIsLoading(true);
    setShow(true);
    try {
      const response = await axios.post(`${ServerAddress}ems/authentication/`, {
        username,
        password,
      });

      if (response.status === 200) {
        console.log("data------------", response);
        setIsSubmitting(false);
        dispatch(setAccessToken(response.data.access));
        dispatch(setRefreshToken(response.data.refresh));
        dispatch(setUserDetails(response.data.user_data));
        if (response.data.user_data) {
          if (response.data.user_data.usertype === "STUDENT") {
            if (response.data.user_data.is_approved) {
              navigate("/student");
            } else {
              navigate("/studentapproval");
            }
          } else if (response.data.user_data.usertype === "SALES") {
            if (response.data.user_data.is_approved) {
              navigate("/sales");
            } else {
              navigate("/requestapproval");
            }
          } else if (response.data.user_data.usertype === "PROMOTER") {
            if (response.data.user_data.is_approved) {
              navigate("/promoter");
            } else {
              navigate("/requestapproval");
            }
          } else {
            navigate("/admin");
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsSubmitting(false);
      setShow(false);
      const errorMsg = error.response?.data?.detail;
      if (errorMsg === "Your Channel Access Is Not Correct") {
        showToastMessage("You are not authorized. Please contact the admin.");
      } else if (
        errorMsg === "No active account found with the given credentials"
      ) {
        showToastMessage("Invalid username or password");
      } else {
        showToastMessage("Login failed. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // User type options - updated to match your routes
  const userTypes = [
    {
      value: "student",
      label: "Student",
      icon: <School />,
      description: "Access quizzes & learning materials",
      demoEmail: "student@cosmos.com",
    },
    {
      value: "promoter",
      label: "Promoter",
      icon: <Campaign />,
      description: "Manage campaigns & referrals",
      demoEmail: "promoter@cosmos.com",
    },
    {
      value: "sales",
      label: "Sales Person",
      icon: <BusinessCenter />,
      description: "Manage sales & partnerships",
      demoEmail: "sales@cosmos.com",
    },
    {
      value: "admin",
      label: "Admin",
      icon: <AdminPanelSettings />,
      description: "Manage platform & users",
      demoEmail: "admin@cosmos.com",
    },
  ];

  // Get demo email for selected user type
  const getDemoEmail = () => {
    const userType = userTypes.find((type) => type.value === formData.userType);
    return userType ? userType.demoEmail : "student@cosmos.com";
  };

  return (
    <>
      <ToastContainer />

      <div className="log-page">
        {/* Enhanced Space Background */}
        <div className="log-space-bg">
          {/* Animated Stars */}
          <div className="log-stars-container">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="log-star"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              />
            ))}
          </div>

          {/* Floating Planets */}
          <motion.div
            className="log-planet log-planet-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="log-planet log-planet-2"
            animate={{
              y: [0, 15, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="log-planet log-planet-3"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Shooting Stars */}
          <motion.div
            className="log-shooting-star"
            animate={{
              x: [-100, 2000],
              y: [100, 800],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 15,
            }}
          />

          {/* Nebula Effects */}
          <div className="log-nebula log-nebula-1"></div>
          <div className="log-nebula log-nebula-2"></div>
          <div className="log-nebula log-nebula-3"></div>
        </div>

        <div className="log-container">
          <motion.div
            className="log-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {/* Cosmic Header */}
            <div className="log-card-header">
              <motion.div
                className="log-header-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="log-logo-container"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Public className="log-orbit-icon" />
                  <RocketLaunch className="log-header-icon" />
                </motion.div>
                <div>
                  <h1>Welcome to gemini planetarium</h1>
                  <p>Sign in to explore the universe of possibilities</p>
                </div>
              </motion.div>
            </div>

            <form onSubmit={handleSubmit} className="log-form">
              {/* Email Field */}
              <motion.div
                className="log-form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label>
                  <Email className="log-label-icon" />
                  Email Address *
                </label>
                <div className="log-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "log-error" : ""}
                    placeholder={getDemoEmail()}
                    required
                  />
                </div>
                {errors.email && (
                  <span className="log-error-msg">{errors.email}</span>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                className="log-form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label>
                  <Lock className="log-label-icon" />
                  Password *
                </label>
                <div className="log-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "log-error" : ""}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="log-password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
                {errors.password && (
                  <span className="log-error-msg">{errors.password}</span>
                )}
              </motion.div>

              {/* Options Row */}
              <motion.div
                className="log-options-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/forgotpassword" className="log-forgot-password">
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`log-submit-btn log-cosmic-btn ${
                  isSubmitting ? "log-submitting" : ""
                }`}
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{
                  scale: isSubmitting ? 1 : 1.05,
                  boxShadow: "0 10px 25px rgba(106, 17, 203, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="log-cosmic-spinner"></div>
                    Launching to dashboard...
                  </>
                ) : (
                  <>
                    <RocketLaunch className="log-btn-icon" />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <motion.div
              className="log-card-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p>
                Don't have an account?{" "}
                <Link to="/registerstudent" className="log-footer-link">
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
