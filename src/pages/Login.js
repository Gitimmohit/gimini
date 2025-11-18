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

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    userType: "student", // Default user type
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

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

  // Function to detect user type based on email
  const detectUserType = (email) => {
    // Enhanced detection logic for your specific routes
    if (email.includes("admin") || email.includes("cosmic.admin")) {
      return "admin";
    } else if (email.includes("sales") || email.includes("sales@")) {
      return "sales";
    } else if (email.includes("promoter") || email.includes("promo")) {
      return "promoter";
    } else if (
      email.includes("student") ||
      email.includes("edu") ||
      email.includes("college")
    ) {
      return "student";
    } else {
      // Default to student for demo purposes
      return "student";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Detect user type based on email or other logic
      const userType = detectUserType(formData.email);

      console.log("Login data:", { ...formData, userType });

      // Store user info in localStorage (for demo purposes)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          userType: userType,
          isLoggedIn: true,
          name: formData.email.split("@")[0], // Demo name
        })
      );

      setIsSubmitting(false);

      // Redirect based on user type - matching your route structure
      switch (userType) {
        case "admin":
          navigate("/admin");
          break;
        case "sales":
          navigate("/sales");
          break;
        case "promoter":
          navigate("/promoter");
          break;
        case "student":
        default:
          navigate("/student");
      }
    } else {
      setErrors(newErrors);
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
    <div className="login-page">
      {/* Enhanced Space Background */}
      <div className="space-bg">
        {/* Animated Stars */}
        <div className="stars-container">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="star"
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
          className="planet planet-1"
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
          className="planet planet-2"
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
          className="planet planet-3"
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
          className="shooting-star"
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
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
      </div>

      <div className="container">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Cosmic Header */}
          <div className="card-header">
            <motion.div
              className="header-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="logo-container"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Public className="orbit-icon" />
                <RocketLaunch className="header-icon" />
              </motion.div>
              <div>
                <h1>Welcome to Cosmos</h1>
                <p>Sign in to explore the universe of possibilities</p>
              </div>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* User Type Selection */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label>
                <BusinessCenter className="label-icon" />I am a *
              </label>
              <div className="user-type-selection">
                {userTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`user-type-option ${
                      formData.userType === type.value ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={formData.userType === type.value}
                      onChange={handleChange}
                    />
                    <div className="option-content">
                      <span className="option-icon">{type.icon}</span>
                      <div className="option-text">
                        <span className="option-label">{type.label}</span>
                        <span className="option-desc">{type.description}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label>
                <Email className="label-icon" />
                Email Address *
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  placeholder={getDemoEmail()}
                  required
                />
              </div>
              {errors.email && (
                <span className="error-msg">{errors.email}</span>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label>
                <Lock className="label-icon" />
                Password *
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {errors.password && (
                <span className="error-msg">{errors.password}</span>
              )}
            </motion.div>

            {/* Demo Credentials Hint */}
            <motion.div
              className="demo-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <div className="hint-content">
                <span>💡 Demo Tip: Try these email formats:</span>
                <div className="hint-examples">
                  <code>student@demo.com</code>
                  <code>promoter@demo.com</code>
                  <code>sales@demo.com</code>
                  <code>admin@demo.com</code>
                </div>
                <small>Password can be anything for demo</small>
              </div>
            </motion.div>

            {/* Options Row */}
            <motion.div
              className="options-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="remember-me">
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                </div>
                Remember my journey
              </label>
              <Link to="/forgotpassword" className="forgot-password">
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`submit-btn cosmic-btn ${
                isSubmitting ? "submitting" : ""
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
                  <div className="cosmic-spinner"></div>
                  Launching to {formData.userType} dashboard...
                </>
              ) : (
                <>
                  <RocketLaunch className="btn-icon" />
                  Launch to{" "}
                  {formData.userType.charAt(0).toUpperCase() +
                    formData.userType.slice(1)}{" "}
                  Dashboard
                </>
              )}
            </motion.button>

            {/* Divider */}
            <motion.div
              className="divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span>Or connect through</span>
            </motion.div>

            {/* Social Login */}
            <motion.div
              className="social-login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                type="button"
                className="social-btn starlink"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="social-icon">
                  <i className="fas fa-satellite"></i>
                </div>
                Starlink
              </motion.button>

              <motion.button
                type="button"
                className="social-btn galaxy"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="social-icon">
                  <i className="fas fa-globe-americas"></i>
                </div>
                Galaxy ID
              </motion.button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            className="card-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>
              New to the cosmos?{" "}
              <Link to="/register" className="footer-link">
                Begin your journey
              </Link>
            </p>
            <div className="security-note">
              <Star className="security-icon" />
              <span>Secured by quantum encryption</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
