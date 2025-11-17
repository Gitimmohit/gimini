// pages/Registration.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Person,
  Email,
  Phone,
  Lock,
  School,
  BusinessCenter,
  Campaign,
  RocketLaunch
} from '@mui/icons-material';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    referralCode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Registration data:', formData);
      setIsSubmitting(false);
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

  const userTypes = [
    {
      value: 'student',
      label: 'Student',
      icon: <School />,
      description: 'Access shows & student discounts'
    },
    {
      value: 'sales',
      label: 'Sales Person',
      icon: <BusinessCenter />,
      description: 'Earn through ticket sales'
    },
    {
      value: 'promoter',
      label: 'Promoter',
      icon: <Campaign />,
      description: 'Promote shows & earn rewards'
    }
  ];

  return (
    <div className="registration-page">
      {/* Minimal Space Background */}
      <div className="space-bg"></div>
      
      <div className="container">
        <motion.div
          className="registration-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Compact Header */}
          <div className="card-header">
            <div className="header-content">
              <RocketLaunch className="header-icon" />
              <div>
                <h1>Join Cosmic Vision</h1>
                <p>Create your account to explore the universe</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="compact-form">
            {/* Personal Info - Compact Layout */}
            <div className="form-grid">
              <div className="form-group compact">
                <label>Full Name *</label>
                <div className="input-wrapper">
                  <Person className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Your full name"
                    required
                  />
                </div>
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>

              <div className="form-group compact">
                <label>Phone Number *</label>
                <div className="input-wrapper">
                  <Phone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="10-digit number"
                    required
                  />
                </div>
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group compact">
              <label>Email Address *</label>
              <div className="input-wrapper">
                <Email className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="your@email.com"
                  required
                />
              </div>
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Password Fields Side by Side */}
            <div className="form-grid">
              <div className="form-group compact">
                <label>Password *</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Min. 6 characters"
                    required
                  />
                </div>
                {errors.password && <span className="error-msg">{errors.password}</span>}
              </div>

              <div className="form-group compact">
                <label>Confirm Password *</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
              </div>
            </div>

            {/* User Type Selection - Compact */}
            <div className="form-group compact">
              <label>Join As *</label>
              <div className="user-type-compact">
                {userTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`type-option ${formData.userType === type.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={formData.userType === type.value}
                      onChange={handleChange}
                    />
                    <span className="option-icon">{type.icon}</span>
                    <span className="option-text">
                      <span className="option-label">{type.label}</span>
                      <span className="option-desc">{type.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Referral Code - Compact */}
            <div className="form-group compact">
              <label>Referral Code <span className="optional">(Optional)</span></label>
              <div className="input-wrapper">
                <Campaign className="input-icon" />
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
              className={`submit-btn compact ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <RocketLaunch className="btn-icon" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          {/* Compact Footer */}
          <div className="card-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="footer-link">Sign In</Link>
            </p>
            <p className="terms-text">
              By creating an account, you agree to our{' '}
              <Link to="/terms">Terms</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;