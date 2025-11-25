import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowBack, Visibility, VisibilityOff, Refresh } from '@mui/icons-material';
import './ForgotPassword.css';
import { ServerAddress } from '../server/ServerAddress';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Smart error clearing: Sirf tab dikhe jab zaruri ho
  const clearErrorIfFixed = () => {
    if (!error) return;

    if (isOtpSent) {
      if (otp.length === 6) setError('');
      if (newPass.length >= 8 && newPass === confirmPass) setError('');
    } else {
      if (email.trim() && isValidEmail(email)) setError('');
    }
  };

  const sendOTP = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.post(ServerAddress + 'ems/send_forgot_password_otp/', { email });
      setMessage(res.data.message || 'OTP sent successfully!');
      setIsOtpSent(true);
      setOtp('');
      setNewPass('');
      setConfirmPass('');
      setShowPass(false);
      setShowConfirm(false);
      startCooldown();
    } catch (err) {
      setError(err.response?.data?.message || 'No account found with this email');
    } finally {
      setLoading(false);
    }
  };

  const startCooldown = () => {
    setResendCooldown(30);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetPassword = async () => {
    if (otp.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }
    if (newPass.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPass !== confirmPass) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post(ServerAddress + 'ems/reset_forgot_password_otp/', {
        email,
        otp,
        newPassword: newPass,
        confirmPassword: confirmPass
      });
      setMessage('Password changed successfully! Redirecting...');
      setTimeout(() => navigate('/login'),100);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fp-main'>
      <div className='fp-bg'>
        <div className='fp-stars'></div>
        <motion.div className='fp-planet p1' animate={{ y: [-20, 20] }} transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse' }} />
        <motion.div className='fp-planet p2' animate={{ y: [20, -20] }} transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse' }} />
      </div>

      <motion.div className='fp-card' initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}>
        <Link to='/login' className='fp-back'>
          <ArrowBack fontSize='small' /> Back
        </Link>

        <div className='fp-header'>
          <div className='fp-icon'>Lock</div>
          <h1>Reset Password</h1>
          <p className='fp-subtitle'>{isOtpSent ? `OTP sent to ${email}` : 'Enter your registered email'}</p>
        </div>

        {message && <div className='fp-msg success'>{message}</div>}
        {error && <div className='fp-msg error'>{error}</div>}

        <div className='fp-form'>
          {!isOtpSent ? (
            <>
              <input
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearErrorIfFixed();
                }}
                placeholder='you@example.com'
                className='fp-input'
                autoFocus
              />
              <button onClick={sendOTP} disabled={loading} className='fp-btn primary'>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </>
          ) : (
            <>
              <input
                type='text'
                maxLength='6'
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                  clearErrorIfFixed(); // 6 digit hua? → error gayab!
                }}
                placeholder='000000'
                className='fp-input otp'
                autoFocus
              />

              <div className='fp-input-wrap'>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                    clearErrorIfFixed(); // length 8+ aur match? → error gayab
                  }}
                  placeholder='New Password'
                  className='fp-input'
                />
                <button type='button' onClick={() => setShowPass(!showPass)} className='fp-eye'>
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>

              <div className='fp-input-wrap'>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                    clearErrorIfFixed(); // match ho gaya? → error gayab!
                  }}
                  placeholder='Confirm New Password'
                  className='fp-input'
                />
                <button type='button' onClick={() => setShowConfirm(!showConfirm)} className='fp-eye'>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>

              <button onClick={resetPassword} disabled={loading} className='fp-btn primary' style={{ marginTop: '20px' }}>
                {loading ? 'Changing Password...' : 'Change Password'}
              </button>

              <button onClick={sendOTP} disabled={resendCooldown > 0 || loading} className='fp-btn resend'>
                <Refresh fontSize='small' />
                <span>Resend OTP</span>
                {resendCooldown > 0 && <span className='cooldown'>({resendCooldown}s)</span>}
              </button>
            </>
          )}
        </div>

        <div className='fp-footer'>Secured • Fast • Reliable</div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;