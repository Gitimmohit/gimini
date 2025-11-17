// App.js - Updated
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Component Imports
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer'; // ✅ Footer added
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Referral from './pages/Referral';

// Dashboard Imports
import StudentDashboard from './pages/dashboard/StudentDashboard';
import SalesDashboard from './pages/dashboard/SalesDashboard';
import PromoterDashboard from './pages/dashboard/PromoterDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import UpcomingShows from './pages/UpcomingShows';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<UpcomingShows />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            
            {/* Dashboard Routes */}
            <Route path="/student/*" element={<StudentDashboard />} />
            <Route path="/sales/*" element={<SalesDashboard />} />
            <Route path="/promoter/*" element={<PromoterDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <Footer /> {/* ✅ Footer added here */}
      </div>
    </Router>
  );
}

export default App;