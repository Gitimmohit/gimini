import React from 'react';
import './RequestApproval.css';

const RequestApproval = () => {
  return (
    <div className="stud-approval-container">
      <div className="stud-approval-card">
        {/* Icon Section */}
        <div className="stud-approval-icon">
          <div className="stud-icon-circle">
            ⏳
          </div>
        </div>

        {/* Main Content */}
        <div className="stud-approval-content">
          <h1 className="stud-approval-title">
            Account Pending Approval
          </h1>
          <p className="stud-approval-description">
            Your account is currently under review and has not been approved by the admin yet. 
            Please wait for approval to access all features.
          </p>
        </div>

        {/* Status Badge */}
        <div className="stud-status-badge">
          Waiting for Admin Approval
        </div>

        {/* Additional Info */}
        <div className="stud-additional-info">
          <div className="stud-info-item">
            <span className="stud-info-icon">📧</span>
            <span>You will receive an email once approved</span>
          </div>
          <div className="stud-info-item">
            <span className="stud-info-icon">⏰</span>
            <span>Typically takes 24-48 hours</span>
          </div>
          <div className="stud-info-item">
            <span className="stud-info-icon">📞</span>
            <span>Contact support if waiting longer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestApproval;