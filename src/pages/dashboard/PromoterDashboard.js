// components/dashboard/PromoterDashboard.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Campaign,
  TrendingUp,
  People,
  AccountBalanceWallet,
  Share,
  Analytics,
  RocketLaunch,
  ContentCopy,
  Schedule,
  EmojiEvents,
  Add,
  Visibility,
  BarChart,
} from "@mui/icons-material";
import "./PromoterDashboard.css";

const PromoterDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const promoterStats = {
    totalCampaigns: 12,
    activeCampaigns: 5,
    totalReferrals: 320,
    totalEarnings: 18500,
    conversionRate: 42,
    thisMonthEarnings: 4500,
    walletBalance: 3200,
  };

  const campaigns = [
    {
      id: 1,
      title: "Tech Fest Promotion",
      status: "Active",
      participants: 150,
      conversions: 68,
      earnings: "₹3,400",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      commission: "₹50 per referral",
    },
    {
      id: 2,
      title: "College Workshop Series",
      status: "Active",
      participants: 89,
      conversions: 42,
      earnings: "₹2,100",
      startDate: "2024-03-10",
      endDate: "2024-04-10",
      commission: "₹50 per referral",
    },
    {
      id: 3,
      title: "Summer Coding Bootcamp",
      status: "Upcoming",
      participants: 0,
      conversions: 0,
      earnings: "₹0",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      commission: "₹75 per referral",
    },
    {
      id: 4,
      title: "Science Olympiad 2024",
      status: "Completed",
      participants: 210,
      conversions: 95,
      earnings: "₹4,750",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      commission: "₹50 per referral",
    },
  ];

  const performanceData = [
    { month: "Jan", referrals: 45, earnings: 2250 },
    { month: "Feb", referrals: 68, earnings: 3400 },
    { month: "Mar", referrals: 95, earnings: 4750 },
    { month: "Apr", referrals: 112, earnings: 5600 },
  ];

  const referralData = {
    totalEarnings: 18500,
    walletBalance: 3200,
    referralCode: "PROMO123",
    totalReferrals: 320,
    activeReferrals: 45,
    pendingEarnings: 800,
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Summit 2024",
      date: "April 15, 2024",
      location: "Bangalore",
      expected: "1000+ attendees",
      commission: "₹100 per referral",
    },
    {
      id: 2,
      title: "Startup Conclave",
      date: "April 22, 2024",
      location: "Mumbai",
      expected: "500+ startups",
      commission: "₹150 per referral",
    },
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="promoter-dashboard">
      {/* Header with Gradient Background */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <motion.div
            className="welcome-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 style={{ color: "white" }}>Welcome, Promoter! 🎯</h1>
            <p>Amplify your reach and maximize your earnings</p>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Campaign className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{promoterStats.totalCampaigns}</h3>
                <span>Total Campaigns</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <People className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>{promoterStats.totalReferrals}</h3>
                <span>Total Referrals</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <TrendingUp className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>₹{promoterStats.totalEarnings.toLocaleString()}</h3>
                <span>Total Earnings</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <AccountBalanceWallet className="stat-icon" />
              </div>
              <div className="stat-info">
                <h3>₹{promoterStats.walletBalance.toLocaleString()}</h3>
                <span>Wallet Balance</span>
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
            { id: "campaigns", label: "My Campaigns", icon: <Campaign /> },
            { id: "performance", label: "Performance", icon: <Analytics /> },
            { id: "referrals", label: "Refer & Earn", icon: <Share /> },
            { id: "events", label: "Events", icon: <Schedule /> },
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
            {/* Quick Stats */}
            <div className="stats-grid">
              <div className="stat-box primary">
                <div className="stat-content">
                  <h3>Active Campaigns</h3>
                  <div className="stat-value">
                    {promoterStats.activeCampaigns}
                  </div>
                  <p>Currently running</p>
                </div>
                <Campaign className="stat-box-icon" />
              </div>

              <div className="stat-box success">
                <div className="stat-content">
                  <h3>Conversion Rate</h3>
                  <div className="stat-value">
                    {promoterStats.conversionRate}%
                  </div>
                  <p>Success rate</p>
                </div>
                <TrendingUp className="stat-box-icon" />
              </div>

              <div className="stat-box warning">
                <div className="stat-content">
                  <h3>This Month</h3>
                  <div className="stat-value">
                    ₹{promoterStats.thisMonthEarnings.toLocaleString()}
                  </div>
                  <p>Current earnings</p>
                </div>
                <AccountBalanceWallet className="stat-box-icon" />
              </div>
            </div>

            {/* Performance Chart */}
            <div className="content-card">
              <div className="card-header">
                <h2>📈 Performance Trend</h2>
                <span className="see-all">View Details</span>
              </div>
              <div className="performance-chart">
                {performanceData.map((data, index) => (
                  <div key={index} className="chart-bar-container">
                    <div className="bar-info">
                      <div className="month">{data.month}</div>
                      <div className="earnings">₹{data.earnings}</div>
                    </div>
                    <div className="bar-wrapper">
                      <div
                        className="performance-bar"
                        style={{ height: `${(data.referrals / 150) * 100}%` }}
                      >
                        <span className="referrals-count">
                          {data.referrals}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="content-card">
              <div className="card-header">
                <h2>🎯 Recent Campaigns</h2>
                <span className="see-all">View All</span>
              </div>
              <div className="campaigns-preview">
                {campaigns.slice(0, 2).map((campaign) => (
                  <div key={campaign.id} className="campaign-preview-item">
                    <div className="campaign-info">
                      <h4>{campaign.title}</h4>
                      <span
                        className={`status ${campaign.status.toLowerCase()}`}
                      >
                        {campaign.status}
                      </span>
                    </div>
                    <div className="campaign-stats">
                      <span>👥 {campaign.participants}</span>
                      <span>💰 {campaign.earnings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="content-card">
              <div className="card-header">
                <h2>⚡ Quick Actions</h2>
              </div>
              <div className="quick-actions">
                <button className="action-btn primary">
                  <Add />
                  <span>Start New Campaign</span>
                </button>
                <button className="action-btn secondary">
                  <Share />
                  <span>Share Referral</span>
                </button>
                <button className="action-btn success">
                  <Analytics />
                  <span>View Reports</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "campaigns" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="campaigns-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📢 Your Campaigns</h2>
                <button className="new-campaign-btn">
                  <Add /> Start New Campaign
                </button>
              </div>

              <div className="campaigns-grid">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="campaign-card">
                    <div className="campaign-header">
                      <h3>{campaign.title}</h3>
                      <span
                        className={`campaign-status ${campaign.status.toLowerCase()}`}
                      >
                        {campaign.status}
                      </span>
                    </div>

                    <div className="campaign-details">
                      <div className="detail">
                        <Schedule />
                        <span>
                          {campaign.startDate} to {campaign.endDate}
                        </span>
                      </div>
                      <div className="detail">
                        <span>💰 {campaign.commission}</span>
                      </div>
                    </div>

                    <div className="campaign-performance">
                      <div className="performance-stat">
                        <div className="stat-value">
                          {campaign.participants}
                        </div>
                        <div className="stat-label">Participants</div>
                      </div>
                      <div className="performance-stat">
                        <div className="stat-value">{campaign.conversions}</div>
                        <div className="stat-label">Conversions</div>
                      </div>
                      <div className="performance-stat">
                        <div className="stat-value">{campaign.earnings}</div>
                        <div className="stat-label">Earnings</div>
                      </div>
                    </div>

                    <div className="campaign-actions">
                      <button className="action-btn view">
                        <Visibility /> View Details
                      </button>
                      <button className="action-btn analytics">
                        <BarChart /> Analytics
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "performance" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="performance-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📊 Performance Analytics</h2>
                <p>Detailed insights into your promotion performance</p>
              </div>

              <div className="performance-stats">
                <div className="performance-grid">
                  <div className="performance-card">
                    <div className="performance-icon">
                      <TrendingUp />
                    </div>
                    <div className="performance-info">
                      <h3>Total Earnings</h3>
                      <div className="performance-value">
                        ₹{promoterStats.totalEarnings.toLocaleString()}
                      </div>
                      <div className="performance-change">+15% this month</div>
                    </div>
                  </div>

                  <div className="performance-card">
                    <div className="performance-icon">
                      <People />
                    </div>
                    <div className="performance-info">
                      <h3>Total Referrals</h3>
                      <div className="performance-value">
                        {promoterStats.totalReferrals}
                      </div>
                      <div className="performance-change">+42 this month</div>
                    </div>
                  </div>

                  <div className="performance-card">
                    <div className="performance-icon">
                      <Campaign />
                    </div>
                    <div className="performance-info">
                      <h3>Active Campaigns</h3>
                      <div className="performance-value">
                        {promoterStats.activeCampaigns}
                      </div>
                      <div className="performance-change">
                        3 high performing
                      </div>
                    </div>
                  </div>

                  <div className="performance-card">
                    <div className="performance-icon">
                      <Analytics />
                    </div>
                    <div className="performance-info">
                      <h3>Conversion Rate</h3>
                      <div className="performance-value">
                        {promoterStats.conversionRate}%
                      </div>
                      <div className="performance-change">Above average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "referrals" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="referrals-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>🎁 Refer & Earn</h2>
                <p>Share your referral code and earn commissions</p>
              </div>

              <div className="referral-hero">
                <div className="referral-content">
                  <h3>Your Promoter Code</h3>
                  <p>
                    Share this code to earn ₹50-₹150 for every successful
                    referral!
                  </p>

                  <div className="referral-stats">
                    <div className="referral-stat">
                      <div className="stat-value">
                        ₹{referralData.totalEarnings.toLocaleString()}
                      </div>
                      <div className="stat-label">Total Earned</div>
                    </div>
                    <div className="referral-stat">
                      <div className="stat-value">
                        {referralData.totalReferrals}
                      </div>
                      <div className="stat-label">Successful Referrals</div>
                    </div>
                    <div className="referral-stat">
                      <div className="stat-value">
                        ₹{referralData.walletBalance.toLocaleString()}
                      </div>
                      <div className="stat-label">Available Now</div>
                    </div>
                  </div>

                  <div className="referral-code-section">
                    <div className="referral-code-box">
                      <code>{referralData.referralCode}</code>
                      <button
                        className={`copy-btn ${copied ? "copied" : ""}`}
                        onClick={copyReferralCode}
                      >
                        <ContentCopy />
                        {copied ? "Copied!" : "Copy Code"}
                      </button>
                    </div>
                    <p className="referral-note">
                      Your friends get ₹100 off on their first quiz when they
                      use your code!
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
            </div>
          </motion.div>
        )}

        {activeTab === "events" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="events-page"
          >
            <div className="content-card">
              <div className="card-header">
                <h2>📅 Upcoming Events</h2>
                <p>Promote these events and earn higher commissions</p>
              </div>

              <div className="events-grid">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <div className="event-badge">High Commission</div>
                    </div>

                    <div className="event-details">
                      <div className="detail">
                        <Schedule />
                        <span>{event.date}</span>
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
                        <EmojiEvents className="commission-icon" />
                        <span>{event.commission}</span>
                      </div>
                    </div>

                    <button className="promote-event-btn">
                      Promote This Event
                    </button>
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

export default PromoterDashboard;
