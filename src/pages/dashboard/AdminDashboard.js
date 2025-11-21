// components/dashboard/AdminDashboard.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  People,
  TrendingUp,
  Quiz,
  MenuBook,
  Analytics,
  Settings,
  Add,
  Visibility,
  Edit,
  Delete,
  RocketLaunch,
  AccountBalanceWallet,
  School,
  BusinessCenter,
  Campaign,
  BarChart,
  Notifications,
  Security,
  Schedule,
} from "@mui/icons-material";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const platformStats = {
    totalStudents: 1250,
    totalSales: 45,
    totalPromoters: 28,
    activeQuizzes: 8,
    totalRevenue: 1250000,
    monthlyGrowth: 15.2,
    activeUsers: 892,
  };

  const recentActivities = [
    {
      id: 1,
      action: "New quiz created",
      user: "Admin",
      time: "2 hours ago",
      type: "quiz",
    },
    {
      id: 2,
      action: "Student registered",
      user: "Aarav Sharma",
      time: "5 hours ago",
      type: "user",
    },
    {
      id: 3,
      action: "Sale completed",
      user: "Sales Team",
      time: "1 day ago",
      type: "sale",
    },
    {
      id: 4,
      action: "Study material uploaded",
      user: "Admin",
      time: "1 day ago",
      type: "content",
    },
    {
      id: 5,
      action: "Withdrawal approved",
      user: "Finance Team",
      time: "2 days ago",
      type: "finance",
    },
  ];

  const salesData = [
    {
      id: 1,
      person: "Raj Kumar",
      sales: 15,
      revenue: "₹75,000",
      active: true,
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      person: "Priya Singh",
      sales: 12,
      revenue: "₹60,000",
      active: true,
      joinDate: "2024-02-01",
    },
    {
      id: 3,
      person: "Amit Patel",
      sales: 8,
      revenue: "₹40,000",
      active: false,
      joinDate: "2024-01-20",
    },
    {
      id: 4,
      person: "Neha Sharma",
      sales: 20,
      revenue: "₹1,00,000",
      active: true,
      joinDate: "2023-12-10",
    },
  ];

  const userData = {
    students: [
      {
        id: 1,
        name: "Aarav Sharma",
        email: "aarav@student.com",
        joined: "2024-03-10",
        status: "Active",
        quizzes: 5,
      },
      {
        id: 2,
        name: "Priya Patel",
        email: "priya@student.com",
        joined: "2024-03-08",
        status: "Active",
        quizzes: 3,
      },
      {
        id: 3,
        name: "Rohan Kumar",
        email: "rohan@student.com",
        joined: "2024-03-05",
        status: "Inactive",
        quizzes: 0,
      },
    ],
    sales: [
      {
        id: 1,
        name: "Raj Kumar",
        email: "raj@sales.com",
        joined: "2024-01-15",
        status: "Active",
        referrals: 15,
      },
      {
        id: 2,
        name: "Priya Singh",
        email: "priya@sales.com",
        joined: "2024-02-01",
        status: "Active",
        referrals: 12,
      },
    ],
    promoters: [
      {
        id: 1,
        name: "Amit Patel",
        email: "amit@promoter.com",
        joined: "2024-01-20",
        status: "Inactive",
        campaigns: 8,
      },
      {
        id: 2,
        name: "Neha Sharma",
        email: "neha@promoter.com",
        joined: "2023-12-10",
        status: "Active",
        campaigns: 20,
      },
    ],
  };

  const quizData = [
    {
      id: 1,
      title: "Cosmic Science Challenge",
      participants: 2500,
      status: "Active",
      date: "2024-03-15",
      prize: "Laptop + Tablet",
    },
    {
      id: 2,
      title: "Galaxy Tech Quiz",
      participants: 1800,
      status: "Upcoming",
      date: "2024-03-22",
      prize: "Smartphone + Telescope",
    },
    {
      id: 3,
      title: "Space Exploration Master",
      participants: 3200,
      status: "Completed",
      date: "2024-03-01",
      prize: "Certificate",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 850000, growth: 12 },
    { month: "Feb", revenue: 920000, growth: 8 },
    { month: "Mar", revenue: 1250000, growth: 36 },
    { month: "Apr", revenue: 980000, growth: -22 },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header with Gradient Background */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <motion.div
            className="welcome-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 style={{color:"white"}}>Admin Control Center 🚀</h1>
            <p>Manage your cosmic education platform with precision</p>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <School className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{platformStats.totalStudents.toLocaleString()}</h3>
                <span>Total Students</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <BusinessCenter className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{platformStats.totalSales}</h3>
                <span>Sales Team</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <AccountBalanceWallet className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>₹{(platformStats.totalRevenue / 100000).toFixed(1)}L</h3>
                <span>Total Revenue</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <TrendingUp className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>+{platformStats.monthlyGrowth}%</h3>
                <span>Monthly Growth</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-nav">
        <div className="nav-container">
          {[
            { id: "overview", label: "Overview", icon: <RocketLaunch /> },
            { id: "users", label: "User Management", icon: <People /> },
            { id: "sales", label: "Sales Analytics", icon: <TrendingUp /> },
            { id: "quizzes", label: "Quiz Manager", icon: <Quiz /> },
            { id: "content", label: "Content Library", icon: <MenuBook /> },
            { id: "reports", label: "Reports", icon: <Analytics /> },
            { id: "settings", label: "Settings", icon: <Settings /> },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? "active" : ""}`}
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
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overview-grid"
          >
            {/* Quick Actions */}
            <div className="content-card">
              <div className="card-header">
                <h2>⚡ Quick Actions</h2>
                <span className="see-all">View All</span>
              </div>
              <div className="actions-grid">
                <button className="action-btn primary" onClick={() => navigate("/quiz")}>
                  <Add />
                  <span>Create New Quiz</span>
                </button>
                <button className="action-btn secondary" onClick={() => navigate("/quiz/question")}>
                  <People />
                  <span>Manage Question</span>
                </button>
                <button className="action-btn secondary" onClick={() => navigate("/user/list")}>
                  <People />
                  <span>Manage Users</span>
                </button>
                <button className="action-btn success">
                  <MenuBook />
                  <span>Add Content</span>
                </button>
                <button className="action-btn warning">
                  <Analytics />
                  <span>Generate Report</span>
                </button>
                <button className="action-btn info">
                  <Settings />
                  <span>Platform Settings</span>
                </button>
                <button className="action-btn danger">
                  <Security />
                  <span>Security</span>
                </button>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="content-card">
              <div className="card-header">
                <h2>📈 Revenue Analytics</h2>
                <span className="see-all">Full Report</span>
              </div>
              <div className="revenue-chart">
                {revenueData.map((data, index) => (
                  <div key={index} className="revenue-bar-container">
                    <div className="bar-info">
                      <div className="month">{data.month}</div>
                      <div className="revenue">
                        ₹{(data.revenue / 100000).toFixed(1)}L
                      </div>
                    </div>
                    <div className="bar-wrapper">
                      <div
                        className="revenue-bar"
                        style={{ height: `${(data.revenue / 1500000) * 100}%` }}
                      >
                        <span className="revenue-value">
                          ₹{(data.revenue / 100000).toFixed(1)}L
                        </span>
                      </div>
                    </div>
                    <div
                      className={`growth ${
                        data.growth >= 0 ? "positive" : "negative"
                      }`}
                    >
                      {data.growth >= 0 ? "↑" : "↓"} {Math.abs(data.growth)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="content-card">
              <div className="card-header">
                <h2>🔄 Recent Activity</h2>
                <span className="see-all">View All</span>
              </div>
              <div className="activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === "quiz" && <Quiz />}
                      {activity.type === "user" && <People />}
                      {activity.type === "sale" && <TrendingUp />}
                      {activity.type === "content" && <MenuBook />}
                      {activity.type === "finance" && <AccountBalanceWallet />}
                    </div>
                    <div className="activity-content">
                      <div className="activity-text">
                        <strong>{activity.action}</strong>
                        <span>by {activity.user}</span>
                      </div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Stats */}
            <div className="stats-grid">
              <div className="stat-box primary">
                <div className="stat-content">
                  <h3>Active Users</h3>
                  <div className="stat-value">{platformStats.activeUsers}</div>
                  <p>Currently online</p>
                </div>
                <People className="stat-box-icon" />
              </div>

              <div className="stat-box success">
                <div className="stat-content">
                  <h3>Active Quizzes</h3>
                  <div className="stat-value">
                    {platformStats.activeQuizzes}
                  </div>
                  <p>Running currently</p>
                </div>
                <Quiz className="stat-box-icon" />
              </div>

              <div className="stat-box warning">
                <div className="stat-content">
                  <h3>Promoters</h3>
                  <div className="stat-value">
                    {platformStats.totalPromoters}
                  </div>
                  <p>Active campaigns</p>
                </div>
                <Campaign className="stat-box-icon" />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="users-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>👥 User Management</h2>
                <div className="user-filters">
                  <select className="filter-select">
                    <option>All Users</option>
                    <option>Students</option>
                    <option>Sales Team</option>
                    <option>Promoters</option>
                  </select>
                  <button className="add-user-btn">
                    <Add /> Add User
                  </button>
                </div>
              </div>

              <div className="users-tabs">
                <div className="tab-buttons">
                  <button className="tab-btn active">
                    Students ({userData.students.length})
                  </button>
                  <button className="tab-btn">
                    Sales ({userData.sales.length})
                  </button>
                  <button className="tab-btn">
                    Promoters ({userData.promoters.length})
                  </button>
                </div>

                <div className="users-table">
                  <div className="table-header">
                    <span>User</span>
                    <span>Email</span>
                    <span>Join Date</span>
                    <span>Status</span>
                    <span>Activity</span>
                    <span>Actions</span>
                  </div>
                  {userData.students.map((user) => (
                    <div key={user.id} className="table-row">
                      <div className="user-info">
                        <div className="user-name">{user.name}</div>
                        <div className="user-type">Student</div>
                      </div>
                      <span className="user-email">{user.email}</span>
                      <span className="join-date">{user.joined}</span>
                      <span className={`status ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                      <span className="activity">{user.quizzes} quizzes</span>
                      <div className="actions">
                        <button className="action-btn view">
                          <Visibility />
                        </button>
                        <button className="action-btn edit">
                          <Edit />
                        </button>
                        <button className="action-btn delete">
                          <Delete />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "sales" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="sales-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>💰 Sales Team Performance</h2>
                <p>Track and manage your sales team's performance</p>
              </div>
              <div className="sales-table">
                <div className="table-header">
                  <span>Sales Person</span>
                  <span>Join Date</span>
                  <span>Total Sales</span>
                  <span>Revenue</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                {salesData.map((sale) => (
                  <div key={sale.id} className="table-row">
                    <div className="sales-person">
                      <div className="person-name">{sale.person}</div>
                      <div className="person-id">ID: {sale.id}</div>
                    </div>
                    <span className="join-date">{sale.joinDate}</span>
                    <span className="sales-count">{sale.sales} referrals</span>
                    <span className="revenue">{sale.revenue}</span>
                    <span
                      className={`status ${
                        sale.active ? "active" : "inactive"
                      }`}
                    >
                      {sale.active ? "Active" : "Inactive"}
                    </span>
                    <div className="actions">
                      <button className="action-btn view">
                        <Visibility />
                      </button>
                      <button className="action-btn edit">
                        <Edit />
                      </button>
                      <button className="action-btn chart">
                        <BarChart />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "quizzes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="quizzes-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>🎯 Quiz Management</h2>
                <button className="add-quiz-btn">
                  <Add /> Create New Quiz
                </button>
              </div>

              <div className="quizzes-grid">
                {quizData.map((quiz) => (
                  <div key={quiz.id} className="quiz-card">
                    <div className="quiz-header">
                      <h3>{quiz.title}</h3>
                      <span
                        className={`quiz-status ${quiz.status.toLowerCase()}`}
                      >
                        {quiz.status}
                      </span>
                    </div>
                    <div className="quiz-details">
                      <div className="detail">
                        <People />
                        <span>
                          {quiz.participants.toLocaleString()} participants
                        </span>
                      </div>
                      <div className="detail">
                        <Schedule />
                        <span>{quiz.date}</span>
                      </div>
                      <div className="detail prize">
                        <TrendingUp />
                        <span>{quiz.prize}</span>
                      </div>
                    </div>
                    <div className="quiz-actions">
                      <button className="action-btn view">
                        <Visibility /> View
                      </button>
                      <button className="action-btn edit">
                        <Edit /> Edit
                      </button>
                      <button className="action-btn analytics">
                        <Analytics /> Stats
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "content" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="content-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📚 Content Library</h2>
                <button className="add-content-btn">
                  <Add /> Upload Content
                </button>
              </div>

              <div className="content-actions">
                <div className="action-cards">
                  <div className="action-card">
                    <MenuBook className="action-icon" />
                    <h3>Study Materials</h3>
                    <p>Manage educational content and resources</p>
                    <button className="action-btn">Manage</button>
                  </div>
                  <div className="action-card">
                    <Quiz className="action-icon" />
                    <h3>Question Bank</h3>
                    <p>Create and organize quiz questions</p>
                    <button className="action-btn">Manage</button>
                  </div>
                  <div className="action-card">
                    <Analytics className="action-icon" />
                    <h3>Analytics</h3>
                    <p>Content performance and engagement</p>
                    <button className="action-btn">View Reports</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "reports" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="reports-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📊 Platform Reports</h2>
                <p>Comprehensive analytics and insights</p>
              </div>

              <div className="reports-grid">
                <div className="report-card">
                  <div className="report-icon">
                    <People />
                  </div>
                  <div className="report-content">
                    <h3>User Growth</h3>
                    <div className="report-value">
                      +{platformStats.monthlyGrowth}%
                    </div>
                    <p>Monthly user acquisition</p>
                  </div>
                </div>

                <div className="report-card">
                  <div className="report-icon">
                    <TrendingUp />
                  </div>
                  <div className="report-content">
                    <h3>Revenue</h3>
                    <div className="report-value">
                      ₹{(platformStats.totalRevenue / 100000).toFixed(1)}L
                    </div>
                    <p>Total platform revenue</p>
                  </div>
                </div>

                <div className="report-card">
                  <div className="report-icon">
                    <Quiz />
                  </div>
                  <div className="report-content">
                    <h3>Quiz Participation</h3>
                    <div className="report-value">7,500+</div>
                    <p>Total quiz attempts</p>
                  </div>
                </div>

                <div className="report-card">
                  <div className="report-icon">
                    <BarChart />
                  </div>
                  <div className="report-content">
                    <h3>Engagement</h3>
                    <div className="report-value">68%</div>
                    <p>Average user engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="settings-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>⚙️ Platform Settings</h2>
                <p>Configure and customize your platform</p>
              </div>

              <div className="settings-grid">
                <div className="setting-card">
                  <Security className="setting-icon" />
                  <h3>Security</h3>
                  <p>Manage platform security settings</p>
                  <button className="setting-btn">Configure</button>
                </div>

                <div className="setting-card">
                  <Notifications className="setting-icon" />
                  <h3>Notifications</h3>
                  <p>Configure email and push notifications</p>
                  <button className="setting-btn">Configure</button>
                </div>

                <div className="setting-card">
                  <People className="setting-icon" />
                  <h3>User Permissions</h3>
                  <p>Manage user roles and access levels</p>
                  <button className="setting-btn">Configure</button>
                </div>

                <div className="setting-card">
                  <Analytics className="setting-icon" />
                  <h3>Analytics</h3>
                  <p>Platform analytics and tracking</p>
                  <button className="setting-btn">Configure</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
