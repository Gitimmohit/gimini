// pages/ReferEarn.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Share,
  Groups,
  AccountBalanceWallet,
  TrendingUp,
  Security,
  EmojiEvents,
  ContentCopy,
  CheckCircle,
  LocalOffer,
  Star,
  RocketLaunch,
  Celebration
} from "@mui/icons-material";
import "./Referral.css";

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("how-it-works");

  // Sample referral data
  const referralCode = "COSMIC250";
  const referralLink = "https://Gimini Planetarium.com/register?ref=COSMIC250";
  
  const earnings = {
    totalEarned: 1250,
    pendingEarnings: 350,
    totalReferrals: 8,
    successfulReferrals: 5
  };

  const referralSteps = [
    {
      step: 1,
      icon: "👤",
      title: "Share Your Link",
      description: "Share your unique referral link with friends, family, or on social media"
    },
    {
      step: 2,
      title: "They Register",
      icon: "📝",
      description: "Your friends register using your referral link and complete their profile"
    },
    {
      step: 3,
      title: "You Earn Rewards",
      icon: "💰",
      description: "Get ₹20 for each successful registration and booking"
    }
  ];

  const rewards = [
    {
      level: "Basic",
      referrals: "1-5",
      reward: "₹20 per referral",
      bonus: "No bonus",
      icon: "🥉"
    },
    {
      level: "Silver",
      referrals: "6-15",
      reward: "₹20 per referral",
      bonus: "₹100 bonus after 10 referrals",
      icon: "🥈"
    },
    {
      level: "Gold",
      referrals: "16-30",
      reward: "₹20 per referral",
      bonus: "₹300 bonus + Priority support",
      icon: "🥇"
    },
    {
      level: "Platinum",
      referrals: "31+",
      reward: "₹25 per referral",
      bonus: "₹500 bonus + Exclusive perks",
      icon: "💎"
    }
  ];

  const recentActivity = [
    { name: "Rahul Sharma", date: "2024-01-15", status: "Completed", amount: 20 },
    { name: "Priya Patel", date: "2024-01-14", status: "Pending", amount: 20 },
    { name: "Amit Kumar", date: "2024-01-12", status: "Completed", amount: 20 },
    { name: "Neha Singh", date: "2024-01-10", status: "Completed", amount: 20 }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Cosmic Vision Planetarium',
        text: 'Experience amazing space shows and earn rewards!',
        url: referralLink,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="refer-earn-page">
      {/* Hero Section */}
      <section className="refer-hero">
        <div className="hero-background">
          <div className="stars-overlay"></div>
        </div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              <Celebration className="badge-icon" />
              Earn Unlimited Rewards
            </div>
            <h1 className="hero-title">
              Refer Friends & <span className="gradient-text">Earn ₹20 Each</span>
            </h1>
            <p className="hero-subtitle">
              Share the cosmic experience with your friends and earn ₹20 for every successful referral. 
              The more you share, the more you earn!
            </p>
            
            <div className="hero-stats">
              <div className="stat-card">
                <AccountBalanceWallet className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-number">₹{earnings.totalEarned}</div>
                  <div className="stat-label">Total Earned</div>
                </div>
              </div>
              <div className="stat-card">
                <TrendingUp className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-number">{earnings.totalReferrals}</div>
                  <div className="stat-label">Total Referrals</div>
                </div>
              </div>
              <div className="stat-card">
                <Groups className="stat-icon" />
                <div className="stat-content">
                  <div className="stat-number">{earnings.successfulReferrals}</div>
                  <div className="stat-label">Successful</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Referral Section */}
      <section className="quick-referral">
        <div className="container">
          <motion.div
            className="referral-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="referral-header">
              <h2>Your Referral Code</h2>
              <div className="code-badge">Active</div>
            </div>
            
            <div className="referral-code-display">
              <div className="code-value">{referralCode}</div>
              <button 
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={copyToClipboard}
              >
                {copied ? <CheckCircle /> : <ContentCopy />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <div className="referral-link-section">
              <p className="link-label">Your referral link:</p>
              <div className="link-display">
                <input 
                  type="text" 
                  value={referralLink} 
                  readOnly 
                  className="link-input"
                />
                <button className="share-btn" onClick={shareReferral}>
                  <Share className="share-icon" />
                  Share
                </button>
              </div>
            </div>

            <div className="referral-actions">
              <button className="action-btn primary">
                <Share />
                Share via WhatsApp
              </button>
              <button className="action-btn secondary">
                <Groups />
                Share on Social Media
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>How It Works</h2>
            <p>Earn rewards in three simple steps</p>
          </motion.div>

          <div className="steps-grid">
            {referralSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="step-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Tiers Section */}
      <section className="rewards-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Reward Tiers</h2>
            <p>Earn more as you refer more friends</p>
          </motion.div>

          <div className="rewards-grid">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.level}
                className={`reward-card ${reward.level.toLowerCase()}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="reward-icon">{reward.icon}</div>
                <div className="reward-level">{reward.level}</div>
                <div className="reward-referrals">{reward.referrals} referrals</div>
                <div className="reward-amount">{reward.reward}</div>
                <div className="reward-bonus">{reward.bonus}</div>
                <div className="reward-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(index + 1) * 25}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="benefits-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Why Refer with Cosmic Vision?</h2>
          </motion.div>

          <div className="benefits-grid">
            <motion.div
              className="benefit-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Security className="benefit-icon" />
              <h3>Instant Payouts</h3>
              <p>Get your earnings transferred directly to your wallet within 24 hours of successful referral</p>
            </motion.div>

            <motion.div
              className="benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <EmojiEvents className="benefit-icon" />
              <h3>Bonus Rewards</h3>
              <p>Earn additional bonuses when you reach referral milestones and unlock exclusive perks</p>
            </motion.div>

            <motion.div
              className="benefit-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="benefit-icon" />
              <h3>No Limits</h3>
              <p>Refer as many friends as you want. There's no upper limit to how much you can earn</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Frequently Asked Questions</h2>
          </motion.div>

          <div className="faq-grid">
            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>How much can I earn per referral?</h3>
              <p>You earn ₹20 for every successful referral who registers and books their first show.</p>
            </motion.div>

            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3>When will I receive my earnings?</h3>
              <p>Earnings are processed within 24 hours after your referred friend completes their first booking.</p>
            </motion.div>

            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>Is there any limit to referrals?</h3>
              <p>No! You can refer unlimited friends and earn unlimited rewards.</p>
            </motion.div>

            <motion.div
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3>How can I track my referrals?</h3>
              <p>You can track all your referrals and earnings in your dashboard under the "Referrals" section.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="refer-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <RocketLaunch className="cta-icon" />
            <h2>Start Earning Today!</h2>
            <p>Share your referral link and start earning ₹20 for every friend who joins Cosmic Vision</p>
            <div className="cta-buttons">
              <button className="btn primary-btn large" onClick={shareReferral}>
                <Share />
                Share Referral Link
              </button>
              <Link to="/dashboard" className="btn secondary-btn large">
                <TrendingUp />
                View Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Referral;