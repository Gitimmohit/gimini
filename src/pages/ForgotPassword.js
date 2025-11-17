// pages/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Email,
  RocketLaunch,
  Security,
  LockReset,
  ArrowBack
} from '@mui/icons-material';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Reset password request for:', formData.email);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="for-forgot-password-page">
      {/* Space Background */}
      <div className="for-space-bg">
        {/* Animated Stars */}
        <div className="for-stars-container">
          {Array.from({ length: 100 }, (_, i) => (
            <motion.div
              key={i}
              className="for-star"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Floating Planets */}
        <motion.div 
          className="for-planet for-planet-1"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="for-planet for-planet-2"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Satellite */}
        <motion.div 
          className="for-satellite"
          animate={{
            x: [-50, 120],
            y: [30, 80],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Nebula Effects */}
        <div className="for-nebula for-nebula-1"></div>
        <div className="for-nebula for-nebula-2"></div>
      </div>
      
      <div className="for-container">
        <motion.div
          className="for-forgot-password-card"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Back Button */}
          <motion.div
            className="for-back-nav"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/login" className="for-back-button">
              <ArrowBack className="for-back-icon" />
              Back to Login
            </Link>
          </motion.div>

          {/* Cosmic Header */}
          <div className="for-card-header">
            <motion.div
              className="for-header-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="for-logo-container"
                animate={{ 
                  rotate: 360,
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Security className="for-orbit-icon" />
                <LockReset className="for-header-icon" />
              </motion.div>
              <div>
                <h1 className="for-h1">Reset Your Password</h1>
                <p>We'll send you a cosmic recovery link</p>
              </div>
            </motion.div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="for-forgot-password-form">
              {/* Instruction Text */}
              <motion.div
                className="for-instruction-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p>
                  Enter your email address below and we'll send you a link to reset your password.
                </p>
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="for-form-group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="for-label">
                  <Email className="for-label-icon" />
                  Your Email Address *
                </label>
                <div className="for-input-wrapper">
                  <Email className="for-input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'for-input error' : 'for-input'}
                    placeholder="astronaut@cosmos.com"
                    required
                  />
                </div>
                {errors.email && <span className="for-error-msg">{errors.email}</span>}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`for-cosmic-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ 
                  scale: isSubmitting ? 1 : 1.05,
                  boxShadow: "0 10px 25px rgba(106, 17, 203, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="for-cosmic-spinner"></div>
                    Sending Recovery Link...
                  </>
                ) : (
                  <>
                    <RocketLaunch className="for-btn-icon" />
                    Launch Recovery
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            /* Success State */
            <motion.div
              className="for-success-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="for-success-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  delay: 0.3
                }}
              >
                <Security className="for-success-svg" />
              </motion.div>
              
              <h2>Recovery Link Sent!</h2>
              
              <motion.div
                className="for-success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p>
                  We've sent a password reset link to:
                </p>
                <div className="for-email-display">
                  {formData.email}
                </div>
                <p className="for-instruction">
                  Please check your inbox and follow the instructions to reset your password.
                </p>
              </motion.div>

              <motion.div
                className="for-success-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <p className="for-resend-text">
                  Didn't receive the email?{' '}
                  <button 
                    className="for-resend-link"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Resend recovery link
                  </button>
                </p>
                
                <Link to="/login" className="for-back-to-login">
                  <ArrowBack className="for-back-icon" />
                  Return to Login
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* Security Footer */}
          <motion.div
            className="for-card-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="for-security-info">
              <Security className="for-security-icon" />
              <div className="for-security-text">
                <strong>Cosmic Security:</strong> Your recovery link will expire in 1 hour for security reasons.
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;