// components/dashboard/SalesDashboard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  People,
  TrendingUp,
  Payment,
  Schedule,
  Event,
  AccountBalanceWallet,
  BarChart,
  ContentCopy,
  RocketLaunch,
  AttachMoney,
  ShowChart
} from '@mui/icons-material';
import './SalesDashboard.css';

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  const userStats = {
    totalReferrals: 15,
    totalRevenue: 25500,
    availableBalance: 8000,
    activeReferrals: 8,
    conversionRate: 53,
    thisMonthRevenue: 9000
  };

  const referrals = [
    { 
      id: 1, 
      name: "Aarav Sharma", 
      joined: "2024-03-10", 
      status: "Active", 
      sales: 5,
      earnings: "₹2,500",
      lastActivity: "2 days ago"
    },
    { 
      id: 2, 
      name: "Priya Patel", 
      joined: "2024-03-08", 
      status: "Active", 
      sales: 3,
      earnings: "₹1,500",
      lastActivity: "1 day ago"
    },
    { 
      id: 3, 
      name: "Rohan Kumar", 
      joined: "2024-03-05", 
      status: "Inactive", 
      sales: 0,
      earnings: "₹0",
      lastActivity: "1 week ago"
    },
    { 
      id: 4, 
      name: "Neha Gupta", 
      joined: "2024-03-12", 
      status: "Active", 
      sales: 7,
      earnings: "₹3,500",
      lastActivity: "Today"
    }
  ];

  const salesData = [
    { month: "Jan", sales: 15, revenue: 7500, target: 20 },
    { month: "Feb", sales: 22, revenue: 11000, target: 25 },
    { month: "Mar", sales: 18, revenue: 9000, target: 20 },
    { month: "Apr", sales: 25, revenue: 12500, target: 22 }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Fest 2024",
      date: "March 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Delhi University",
      expected: "500+ students",
      registrationFee: "Free",
      commission: "₹200 per referral"
    },
    {
      id: 2,
      title: "Science Exhibition",
      date: "March 25, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "IIT Mumbai",
      expected: "300+ students",
      registrationFee: "₹50",
      commission: "₹150 per referral"
    },
    {
      id: 3,
      title: "Career Fair 2024",
      date: "April 2, 2024",
      time: "11:00 AM - 6:00 PM",
      location: "BITS Pilani",
      expected: "400+ students",
      registrationFee: "Free",
      commission: "₹250 per referral"
    }
  ];

  const withdrawalRequests = [
    { 
      id: 1, 
      amount: "₹5,000", 
      date: "2024-03-12", 
      status: "Pending",
      transactionId: "WD001234"
    },
    { 
      id: 2, 
      amount: "₹3,000", 
      date: "2024-03-08", 
      status: "Approved",
      transactionId: "WD001235"
    },
    { 
      id: 3, 
      amount: "₹2,000", 
      date: "2024-03-01", 
      status: "Completed",
      transactionId: "WD001236"
    }
  ];

  const referralData = {
    totalEarnings: 25500,
    walletBalance: 8000,
    referralCode: "SALESPRO123",
    totalReferrals: 15,
    activeReferrals: 8,
    pendingEarnings: 1200
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sales-dashboard">
      {/* Header with Gradient Background */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <motion.div
            className="welcome-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Welcome, Sales Champion! 💼</h1>
            <p>Grow your network and maximize your earnings</p>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <People className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{userStats.totalReferrals}</h3>
                <span>Total Referrals</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <TrendingUp className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>₹{userStats.totalRevenue.toLocaleString()}</h3>
                <span>Total Revenue</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <AccountBalanceWallet className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>₹{userStats.availableBalance.toLocaleString()}</h3>
                <span>Available Balance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <div className="nav-container">
          {[
            { id: 'overview', label: 'Overview', icon: <RocketLaunch /> },
            { id: 'referrals', label: 'My Referrals', icon: <People /> },
            { id: 'events', label: 'Events', icon: <Event /> },
            { id: 'withdrawals', label: 'Withdrawals', icon: <AccountBalanceWallet /> },
            { id: 'performance', label: 'Performance', icon: <ShowChart /> }
          ].map(tab => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overview-grid"
          >
            {/* Sales Performance Chart */}
            <div className="content-card">
              <div className="card-header">
                <h2>📈 Sales Performance</h2>
                <span className="see-all">View Report</span>
              </div>
              <div className="chart-container">
                {salesData.map((data, index) => (
                  <div key={index} className="chart-bar-container">
                    <div className="bar-info">
                      <div className="month">{data.month}</div>
                      <div className="revenue">₹{data.revenue.toLocaleString()}</div>
                    </div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-value" 
                        style={{ height: `${(data.sales / 30) * 100}%` }}
                      >
                        <span className="sales-count">{data.sales}</span>
                      </div>
                      <div 
                        className="bar-target" 
                        style={{ height: `${(data.target / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
              <div className="stat-box primary">
                <div className="stat-content">
                  <h3>Active Referrals</h3>
                  <div className="stat-value">{userStats.activeReferrals}</div>
                  <p>Currently generating revenue</p>
                </div>
                <People className="stat-box-icon" />
              </div>
              
              <div className="stat-box success">
                <div className="stat-content">
                  <h3>Conversion Rate</h3>
                  <div className="stat-value">{userStats.conversionRate}%</div>
                  <p>Referral success rate</p>
                </div>
                <TrendingUp className="stat-box-icon" />
              </div>
              
              <div className="stat-box warning">
                <div className="stat-content">
                  <h3>This Month</h3>
                  <div className="stat-value">₹{userStats.thisMonthRevenue.toLocaleString()}</div>
                  <p>Current month earnings</p>
                </div>
                <AttachMoney className="stat-box-icon" />
              </div>
            </div>

            {/* Referral Code Section */}
            <div className="content-card">
              <div className="card-header">
                <h2>🎯 Your Referral Code</h2>
              </div>
              <div className="referral-code-section">
                <div className="referral-code-box">
                  <code>{referralData.referralCode}</code>
                  <button 
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={copyReferralCode}
                  >
                    <ContentCopy />
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <p className="referral-note">
                  Share this code to earn ₹200 for every successful referral. Your friends get ₹100 off on their first quiz!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'referrals' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="referrals-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>👥 Your Referral Network</h2>
                <p>Track your referrals and their performance</p>
              </div>
              <div className="referrals-table">
                <div className="table-header">
                  <span>Referral</span>
                  <span>Join Date</span>
                  <span>Sales</span>
                  <span>Earnings</span>
                  <span>Status</span>
                </div>
                {referrals.map(ref => (
                  <div key={ref.id} className="table-row">
                    <div className="referral-info">
                      <div className="referral-name">{ref.name}</div>
                      <div className="referral-activity">Last active: {ref.lastActivity}</div>
                    </div>
                    <span className="join-date">{ref.joined}</span>
                    <span className="sales-count">{ref.sales} sales</span>
                    <span className="earnings">{ref.earnings}</span>
                    <span className={`status ${ref.status.toLowerCase()}`}>
                      {ref.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="events-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📅 Upcoming Events</h2>
                <p>Participate in these events to grow your network</p>
              </div>
              <div className="events-grid">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <div className="event-badge">High Commission</div>
                    </div>
                    <div className="event-details">
                      <div className="detail">
                        <Schedule />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="detail">
                        <span>📍 {event.location}</span>
                      </div>
                      <div className="detail">
                        <span>👥 {event.expected}</span>
                      </div>
                    </div>
                    <div className="event-commission">
                      <div className="commission-info">
                        <AttachMoney className="commission-icon" />
                        <span>{event.commission}</span>
                      </div>
                      <div className="registration-fee">
                        Registration: {event.registrationFee}
                      </div>
                    </div>
                    <button className="register-event-btn">
                      Register for Event
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'withdrawals' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="withdrawals-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>💰 Withdrawal Management</h2>
                <div className="wallet-balance">
                  <AccountBalanceWallet />
                  <span>Available Balance: ₹{referralData.walletBalance.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="withdrawal-section">
                <div className="balance-card">
                  <div className="balance-info">
                    <h3>Ready to Withdraw?</h3>
                    <p>Transfer your earnings to your bank account</p>
                    <div className="balance-amount">₹{referralData.walletBalance.toLocaleString()}</div>
                  </div>
                  <button className="withdraw-btn">
                    Request Withdrawal
                  </button>
                </div>
                
                <div className="requests-section">
                  <h3>Recent Withdrawal Requests</h3>
                  <div className="requests-list">
                    {withdrawalRequests.map(request => (
                      <div key={request.id} className="request-item">
                        <div className="request-info">
                          <div className="amount">{request.amount}</div>
                          <div className="date">{request.date}</div>
                          <div className="transaction-id">{request.transactionId}</div>
                        </div>
                        <span className={`status ${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="performance-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📊 Performance Analytics</h2>
                <p>Detailed insights into your sales performance</p>
              </div>
              <div className="performance-stats">
                <div className="performance-grid">
                  <div className="performance-card">
                    <div className="performance-icon">
                      <TrendingUp />
                    </div>
                    <div className="performance-info">
                      <h3>Total Revenue</h3>
                      <div className="performance-value">₹{userStats.totalRevenue.toLocaleString()}</div>
                      <div className="performance-change">+12% this month</div>
                    </div>
                  </div>
                  
                  <div className="performance-card">
                    <div className="performance-icon">
                      <People />
                    </div>
                    <div className="performance-info">
                      <h3>Active Network</h3>
                      <div className="performance-value">{userStats.activeReferrals}</div>
                      <div className="performance-change">+3 this week</div>
                    </div>
                  </div>
                  
                  <div className="performance-card">
                    <div className="performance-icon">
                      <AttachMoney />
                    </div>
                    <div className="performance-info">
                      <h3>Avg. Commission</h3>
                      <div className="performance-value">₹187</div>
                      <div className="performance-change">per referral</div>
                    </div>
                  </div>
                  
                  <div className="performance-card">
                    <div className="performance-icon">
                      <BarChart />
                    </div>
                    <div className="performance-info">
                      <h3>Success Rate</h3>
                      <div className="performance-value">{userStats.conversionRate}%</div>
                      <div className="performance-change">Above average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SalesDashboard;