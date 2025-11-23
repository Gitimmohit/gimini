// components/dashboard/StudentDashboard.js
import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Quiz,
  History,
  MenuBook,
  Payment,
  EmojiEvents,
  Schedule,
  TrendingUp,
  RocketLaunch,
  People,
  AccountBalanceWallet,
  ContentCopy,
  Star,
} from "@mui/icons-material";
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import { ServerAddress } from "../../server/ServerAddress";
import axios from "axios";
import { useSelector } from "react-redux";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const accessToken = useSelector((state) => state.user.access_token);
  const navigate = useNavigate();
  const [upcoming_quiz, setupcoming_quiz] = useState([]);
  // get Questions at add Quiz
  const GetUpcomingQuizData = () => {
    axios
      .get(ServerAddress + `cards/get_upcoming_quiz_data/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("response--", response);
        if (response.data.success) {
          setupcoming_quiz(response.data.upcoming_quizzes);
        }
      })
      .catch((err) => {
        console.log("err--", err);
      });
  };

  useLayoutEffect(() => {
    GetUpcomingQuizData();
  }, []);

  const [dashboard_data, setdashboard_data] = useState();
  console.log("dashboard_data--",dashboard_data)
  // get Questions at add Quiz
  const dashboardData = () => {
    axios
      .get(
        ServerAddress + `cards/getwallet-data/?&filter_type=${"STUDENT"}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("response1--", response);
        if (response.data.results.length > 0) {
          setdashboard_data(response.data.results[0]);
        }
      })
      .catch((err) => {
        console.log("err--", err);
      });
  };

  useLayoutEffect(() => {
    dashboardData();
  }, []);

  const userStats = {
    quizzesTaken: 5,
    awardsWon: 3,
    averageScore: 87,
    referralEarnings: 1250,
    walletBalance: 800,
    referralCode: "COSMIC123",
  };

  const upcomingQuizzes = [
    {
      id: 1,
      title: "Cosmic Science Challenge",
      date: "March 15, 2024",
      time: "6:00 PM IST",
      prize: "Laptop + Tablet",
      participants: "2,500+",
      registered: true,
      entryFee: "Free",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Galaxy Tech Quiz",
      date: "March 22, 2024",
      time: "7:30 PM IST",
      prize: "Smartphone + Telescope",
      participants: "1,800+",
      registered: false,
      entryFee: "₹100",
      difficulty: "Advanced",
    },
    {
      id: 3,
      title: "Space Exploration Master",
      date: "March 29, 2024",
      time: "5:00 PM IST",
      prize: "Smart Watch + Cash Prize",
      participants: "3,200+",
      registered: false,
      entryFee: "Free",
      difficulty: "Beginner",
    },
  ];

  const pastQuizzes = [
    {
      id: 1,
      title: "Space Exploration Quiz",
      date: "March 1, 2024",
      score: 85,
      rank: 15,
      prize: "Certificate of Excellence",
      participants: 1800,
    },
    {
      id: 2,
      title: "Astronomy Basics Challenge",
      date: "Feb 25, 2024",
      score: 92,
      rank: 8,
      prize: "Study Material Pack",
      participants: 1200,
    },
    {
      id: 3,
      title: "Cosmic Physics Test",
      date: "Feb 18, 2024",
      score: 78,
      rank: 42,
      prize: "Participation Certificate",
      participants: 950,
    },
  ];

  const studyMaterials = [
    {
      id: 1,
      title: "Space Science Fundamentals",
      type: "PDF Guide",
      size: "2.4 MB",
      downloads: 1500,
      rating: 4.8,
      category: "Beginner",
    },
    {
      id: 2,
      title: "Advanced Astronomy Guide",
      type: "Video Course",
      duration: "45 min",
      downloads: 890,
      rating: 4.9,
      category: "Advanced",
    },
    {
      id: 3,
      title: "Quantum Physics Made Easy",
      type: "Interactive PDF",
      size: "3.1 MB",
      downloads: 1200,
      rating: 4.7,
      category: "Intermediate",
    },
  ];

  const paymentHistory = [
    {
      id: 1,
      date: "2024-03-10",
      amount: "₹500",
      type: "Quiz Registration",
      status: "Completed",
      transactionId: "TXN001234",
    },
    {
      id: 2,
      date: "2024-03-05",
      amount: "₹200",
      type: "Study Material",
      status: "Completed",
      transactionId: "TXN001235",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
    {
      id: 3,
      date: "2024-03-01",
      amount: "₹100",
      type: "Quiz Registration",
      status: "Refunded",
      transactionId: "TXN001236",
    },
  ];

  const referralData = {
    totalEarnings: 1250,
    walletBalance: 800,
    referralCode: "COSMIC123",
    totalReferrals: 8,
    activeReferrals: 5,
    pendingEarnings: 200,
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatQuizDateTime = (dateString) => {
    if (!dateString) return "Date not set";
    const dateObj = new Date(dateString);
    // Agar invalid date hai
    if (isNaN(dateObj)) return "Invalid Date";
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime} IST`;
  };
  const formatTotalTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    let result = "";
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
    if (seconds > 0 || result === "") result += `${seconds}s`;
    return result.trim() || "0s";
  };

  return (
    <div className="student-dashboard">
      {/* Header with Gradient Background */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <motion.div
            className="welcome-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 style={{ color: "white" }}>Welcome back, Space Explorer! 🚀</h1>
            <p>Ready for your next cosmic challenge?</p>
            <button
              className="action-btn primary"
              onClick={() => navigate("/start/quiz")}
            >
              <span>Play Quiz</span>
            </button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Quiz className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{userStats.quizzesTaken}</h3>
                <span>Quizzes Taken</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <EmojiEvents className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{userStats.awardsWon}</h3>
                <span>Awards Won</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <TrendingUp className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{userStats.averageScore}%</h3>
                <span>Avg Score</span>
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
            { id: "quizzes", label: "Live Quizzes", icon: <Quiz /> },
            { id: "past-quizzes", label: "Past Quizzes", icon: <History /> },
            { id: "study", label: "Study Material", icon: <MenuBook /> },
            { id: "referral", label: "Refer & Earn", icon: <People /> },
            { id: "payments", label: "Payments", icon: <Payment /> },
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Upcoming Quizzes */}
            <div className="content-card">
              <div className="card-header">
                <h2>🎯 Upcoming Quiz Challenges</h2>
                <span className="see-all">See All</span>
              </div>
              <div className="quizzes-list">
                {upcoming_quiz.map((quiz) => (
                  <motion.div
                    key={quiz.id}
                    className="quiz-item"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="quiz-badge">
                      {formatTotalTime(quiz.total_time)}
                    </div>
                    <div className="quiz-content">
                      <h3>{quiz.quiz_name}</h3>
                      <div className="quiz-meta">
                        <span className="date">
                          <Schedule /> {formatQuizDateTime(quiz.quiz_date)}
                        </span>
                        <span className="participants">
                          👥 {quiz.participants}
                        </span>
                      </div>
                      <div className="quiz-prize">
                        <EmojiEvents /> {quiz.prize_money}
                      </div>
                    </div>
                    <div className="quiz-actions">
                      <span className="entry-fee">₹ {quiz.entry_fee} </span>
                      <button
                        className={`action-btn ${
                          quiz.registered ? "registered" : "primary"
                        }`}
                      >
                        {quiz.registered ? "Registered ✓" : "Register Now"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
              <div className="stat-box primary">
                <div className="stat-content">
                  <h3>Study Materials</h3>
                  <div className="stat-value">12</div>
                  <p>Available resources</p>
                </div>
                <MenuBook className="stat-box-icon" />
              </div>

              <div
                className="stat-box success"
                onClick={() => navigate("/amount")}
              >
                <div className="stat-content">
                  <h3>Wallet Balance</h3>
                  <div className="stat-value">
                    ₹{dashboard_data?.current_wallet_amount}
                  </div>
                  <p>Available to withdraw</p>
                </div>
                <AccountBalanceWallet className="stat-box-icon" />
              </div>

              <div className="stat-box warning">
                <div className="stat-content">
                  <h3>Referral Earnings</h3>
                  <div className="stat-value">
                    ₹{dashboard_data?.earn_amount}
                  </div>
                  <p>Total earned</p>
                </div>
                <People className="stat-box-icon" />
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
                <h2>🎮 Live Quiz Challenges</h2>
                <p>Join these exciting quizzes and win amazing prizes!</p>
              </div>
              <div className="featured-quizzes">
                {upcomingQuizzes.map((quiz) => (
                  <div key={quiz.id} className="featured-quiz">
                    <div className="quiz-hero">
                      <div className="quiz-tag">{quiz.difficulty}</div>
                      <h3>{quiz.title}</h3>
                      <p className="quiz-description">
                        Test your knowledge and win incredible prizes in this
                        cosmic challenge!
                      </p>

                      <div className="quiz-details">
                        <div className="detail">
                          <Schedule />
                          <span>
                            {quiz.date} • {quiz.time}
                          </span>
                        </div>
                        <div className="detail">
                          <People />
                          <span>{quiz.participants} participants</span>
                        </div>
                        <div className="detail prize">
                          <EmojiEvents />
                          <span>{quiz.prize}</span>
                        </div>
                      </div>

                      <div className="quiz-footer">
                        <div className="entry-info">
                          <span className="fee">{quiz.entryFee}</span>
                          <span className="duration">
                            45 min • 30 questions
                          </span>
                        </div>
                        <button
                          className={`participate-btn ${
                            quiz.registered ? "registered" : ""
                          }`}
                        >
                          {quiz.registered
                            ? "Already Registered"
                            : "Participate Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "past-quizzes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="past-quizzes-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📊 Your Quiz History</h2>
                <p>Track your performance and achievements</p>
              </div>
              <div className="past-quizzes-grid">
                {pastQuizzes.map((quiz) => (
                  <div key={quiz.id} className="past-quiz-card">
                    <div className="quiz-performance">
                      <div className="score-circle">
                        <div className="score-value">{quiz.score}%</div>
                        <div className="score-label">Score</div>
                      </div>
                      <div className="quiz-info">
                        <h3>{quiz.title}</h3>
                        <p className="quiz-date">Completed on {quiz.date}</p>
                        <div className="performance-stats">
                          <span className="rank">🏆 Rank: #{quiz.rank}</span>
                          <span className="participants">
                            👥 {quiz.participants} players
                          </span>
                        </div>
                        <div className="prize-earned">
                          <EmojiEvents /> {quiz.prize}
                        </div>
                      </div>
                    </div>
                    <button className="view-certificate-btn">
                      View Certificate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "study" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="study-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📚 Learning Resources</h2>
                <p>Enhance your knowledge with our study materials</p>
              </div>
              <div className="materials-grid">
                {studyMaterials.map((material) => (
                  <div key={material.id} className="material-card">
                    <div className="material-header">
                      <div className="material-category">
                        {material.category}
                      </div>
                      <div className="material-rating">
                        <Star /> {material.rating}
                      </div>
                    </div>
                    <div className="material-icon">
                      <MenuBook />
                    </div>
                    <h3>{material.title}</h3>
                    <p className="material-type">{material.type}</p>
                    <div className="material-details">
                      <span>{material.size || material.duration}</span>
                      <span>•</span>
                      <span>{material.downloads} downloads</span>
                    </div>
                    <button className="download-btn">Download Resource</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "referral" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="referral-page"
          >
            <div className="referral-hero">
              <div className="referral-content">
                <h2>Invite Friends & Earn Rewards 🎁</h2>
                <p>
                  Share your referral code and earn ₹100 for every friend who
                  joins and participates in a quiz!
                </p>

                <div className="referral-stats">
                  <div className="referral-stat">
                    <div className="stat-value">
                      ₹{referralData.totalEarnings}
                    </div>
                    <div className="stat-label">Total Earned</div>
                  </div>
                  <div className="referral-stat">
                    <div className="stat-value">
                      {referralData.totalReferrals}
                    </div>
                    <div className="stat-label">Friends Referred</div>
                  </div>
                  <div className="referral-stat">
                    <div className="stat-value">
                      ₹{referralData.walletBalance}
                    </div>
                    <div className="stat-label">Available Now</div>
                  </div>
                </div>

                <div className="referral-code-section">
                  <h3>Your Referral Code</h3>
                  <div className="referral-code-box">
                    <code>{referralData.referralCode}</code>
                    <button
                      className={`copy-btn ${copied ? "copied" : ""}`}
                      onClick={copyReferralCode}
                    >
                      <ContentCopy />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="referral-note">
                    Share this code with friends. You both get ₹100 when they
                    join and participate in their first quiz!
                  </p>
                </div>

                <div className="referral-share-buttons">
                  <button className="share-btn whatsapp">
                    Share on WhatsApp
                  </button>
                  <button className="share-btn telegram">
                    Share on Telegram
                  </button>
                  <button className="share-btn link">Copy Share Link</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "payments" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="payments-page"
          >
            <div className="content-card">
              <div className="card-header" style={{ marginBottom: "6px" }}>
                <h2>💳 Payment History</h2>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "10px" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    className="wallet-balance"
                    onClick={() => navigate("/amount")}
                  >
                    <AccountBalanceWallet />
                    <span>Add Balance</span>
                  </div>
                </div>
              </div>
              <div className="payments-table">
                <div className="table-header">
                  <span>Date</span>
                  <span>Description</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="table-row">
                    <span className="date">{payment.date}</span>
                    <span className="description">
                      <strong>{payment.type}</strong>
                      <small>{payment.transactionId}</small>
                    </span>
                    <span
                      className={`amount ${
                        payment.status === "Refunded" ? "refund" : ""
                      }`}
                    >
                      {payment.amount}
                    </span>
                    <span className={`status ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
