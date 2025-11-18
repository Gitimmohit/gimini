// pages/Dashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import SalesDashboard from '../components/dashboard/SalesDashboard';
import './Dashboard.css';

const Dashboard = () => {
  const { userType } = useParams();

  const renderDashboard = () => {
    switch (userType) {
      case 'admin':
        return <AdminDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'sales':
        return <SalesDashboard />;
      default:
        return <div>Invalid user type</div>;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;