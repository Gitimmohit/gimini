// pages/QuizPromotion.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RocketLaunch,
  EmojiEvents,
  CardGiftcard,
  Groups,
  Schedule,
  School,
  Star,
  Public,
  TrendingUp,
  Security
} from '@mui/icons-material';
import './QuizPromotion.css';

const QuizPromotion = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(0);

  const upcomingQuizzes = [
    {
      id: 1,
      title: "Cosmic Science Challenge",
      date: "March 15, 2024",
      time: "6:00 PM IST",
      participants: "2,500+ Registered",
      difficulty: "Intermediate",
      entry: "Free"
    },
    {
      id: 2,
      title: "Galaxy Tech Quiz",
      date: "March 22, 2024",
      time: "7:30 PM IST",
      participants: "1,800+ Registered",
      difficulty: "Advanced",
      entry: "Free"
    },
    {
      id: 3,
      title: "Space Exploration Trivia",
      date: "March 29, 2024",
      time: "5:00 PM IST",
      participants: "3,200+ Registered",
      difficulty: "Beginner",
      entry: "Free"
    }
  ];

  const guaranteedAwards = [
    {
      id: 1,
      name: "Cosmic Gaming Laptop",
      icon: "💻",
      value: "₹85,000",
      features: ["RTX 4060", "16GB RAM", "1TB SSD"],
      winners: "Top 3 Scores"
    },
    {
      id: 2,
      name: "Space Tablet Pro",
      icon: "📱",
      value: "₹45,000",
      features: ["12.9' Display", "Apple Pencil", "256GB"],
      winners: "Next 5 Winners"
    },
    {
      id: 3,
      name: "Galaxy Smartphone",
      icon: "📱",
      value: "₹35,000",
      features: ["128GB Storage", "48MP Camera", "5G"],
      winners: "Next 10 Winners"
    },
    {
      id: 4,
      name: "Astronomy Telescope",
      icon: "🔭",
      value: "₹25,000",
      features: ["Professional Grade", "Moon & Planet Viewing", "Tripod Included"],
      winners: "Next 15 Winners"
    },
    {
      id: 5,
      name: "Smart Watch Series",
      icon: "⌚",
      value: "₹15,000",
      features: ["Health Monitoring", "GPS", "Water Resistant"],
      winners: "Next 25 Winners"
    },
    {
      id: 6,
      name: "Gifts Pack Bundle",
      icon: "🎁",
      value: "₹8,000",
      features: ["Multiple Items", "Branded Merchandise", "Surprise Elements"],
      winners: "Next 50 Winners"
    }
  ];

  const features = [
    {
      icon: <RocketLaunch />,
      title: "Instant Participation",
      description: "Join with one click - no complicated process"
    },
    {
      icon: <Security />,
      title: "Guaranteed Awards",
      description: "Every quiz has confirmed winners and prizes"
    },
    {
      icon: <Groups />,
      title: "Live Competition",
      description: "Compete with students nationwide in real-time"
    },
    {
      icon: <TrendingUp />,
      title: "Skill Development",
      description: "Enhance your knowledge while winning amazing prizes"
    }
  ];

  const winnersTestimonials = [
    {
      name: "Priya Sharma",
      college: "IIT Delhi",
      award: "Cosmic Laptop",
      message: "I never thought I could win such an amazing prize just by participating in a quiz! The experience was incredible."
    },
    {
      name: "Rahul Verma",
      college: "NIT Surat",
      award: "Space Tablet",
      message: "Best platform for students! I won a tablet and gained so much knowledge. Highly recommended!"
    },
    {
      name: "Anjali Patel",
      college: "DU College",
      award: "Smartphone",
      message: "The quiz was so engaging and the prizes are real! Got my new phone delivered within a week."
    }
  ];

  return (
    <div className="quiz-promotion-page">
      {/* Cosmic Background */}
      <div className="promo-space-bg">
        <div className="promo-stars-container">
          {Array.from({ length: 150 }, (_, i) => (
            <motion.div
              key={i}
              className="promo-star"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: Math.random() * 8 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Floating Planets */}
        <motion.div 
          className="promo-planet promo-planet-1"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="promo-planet promo-planet-2"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Shooting Stars */}
        <motion.div 
          className="promo-shooting-star"
          animate={{
            x: [-100, 2000],
            y: [80, 400],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 10,
          }}
        />
      </div>

      <div className="promo-container">
        {/* Hero Section */}
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Star className="badge-icon" />
              <span>Guaranteed Awards Every Week!</span>
            </motion.div>

            <h1 className="hero-title">
              Win Amazing Prizes in
              <span className="gradient-text"> Cosmic Quizzes</span>
            </h1>

            <p className="hero-subtitle">
              Participate in exciting quizzes and stand a chance to win laptops, tablets, 
              smartphones, telescopes, and more! Every quiz has guaranteed winners.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">Students Participated</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">250+</div>
                <div className="stat-label">Prizes Distributed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Guaranteed Winners</div>
              </div>
            </div>

            <motion.button
              className="cta-button primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(106, 17, 203, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <RocketLaunch className="cta-icon" />
              Register for Next Quiz - FREE!
            </motion.button>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="floating-prizes">
              <motion.div
                className="prize-item laptop"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💻
              </motion.div>
              <motion.div
                className="prize-item tablet"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                📱
              </motion.div>
              <motion.div
                className="prize-item phone"
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              >
                📱
              </motion.div>
              <motion.div
                className="prize-item telescope"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              >
                🔭
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section className="features-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Join Cosmic Quizzes?</h2>
            <p>Experience the most exciting quiz platform with guaranteed rewards</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Awards Showcase */}
        <section className="awards-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Guaranteed Amazing Prizes</h2>
            <p>Every quiz has multiple winners - your chance to win is real!</p>
          </motion.div>

          <div className="awards-grid">
            {guaranteedAwards.map((award, index) => (
              <motion.div
                key={award.id}
                className="award-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="award-header">
                  <div className="award-icon">{award.icon}</div>
                  <div className="award-value">{award.value}</div>
                </div>
                <h3>{award.name}</h3>
                <div className="award-features">
                  {award.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">✓ {feature}</span>
                  ))}
                </div>
                <div className="winner-info">
                  <EmojiEvents className="trophy-icon" />
                  <span>{award.winners}</span>
                </div>
                <div className="guaranteed-badge">Guaranteed Prize</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Quizzes */}
        <section className="quizzes-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Upcoming Quiz Events</h2>
            <p>Mark your calendar and don't miss these exciting opportunities</p>
          </motion.div>

          <div className="quizzes-tabs">
            {upcomingQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                className={`quiz-tab ${selectedQuiz === index ? 'active' : ''}`}
                onClick={() => setSelectedQuiz(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="quiz-date">
                  <Schedule className="date-icon" />
                  <span>{quiz.date}</span>
                </div>
                <h3>{quiz.title}</h3>
                <div className="quiz-meta">
                  <span className="meta-item">
                    <Groups className="meta-icon" />
                    {quiz.participants}
                  </span>
                  <span className="meta-item">
                    <School className="meta-icon" />
                    {quiz.difficulty}
                  </span>
                  <span className="meta-item entry-free">
                    {quiz.entry}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            className="cta-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RocketLaunch className="cta-icon" />
            Register for {upcomingQuizzes[selectedQuiz].title}
          </motion.button>
        </section>

        {/* Winners Testimonials */}
        <section className="testimonials-section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Meet Our Winners</h2>
            <p>Real students, real prizes, real success stories</p>
          </motion.div>

          <div className="testimonials-grid">
            {winnersTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p>{testimonial.message}</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.college}</span>
                  </div>
                  <div className="award-won">
                    <CardGiftcard className="award-icon" />
                    <span>Won: {testimonial.award}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <motion.section
          className="final-cta-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="cta-content">
            <h2>Ready to Win Big?</h2>
            <p>
              Join thousands of students who are already winning amazing prizes. 
              Register now for FREE and get ready for the next cosmic quiz adventure!
            </p>
            
            <div className="cta-buttons">
              <motion.button
                className="cta-button primary large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RocketLaunch className="cta-icon" />
                Register Now - It's FREE!
              </motion.button>
              
              <motion.button
                className="cta-button outline large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Groups className="cta-icon" />
                View All Upcoming Quizzes
              </motion.button>
            </div>

            <div className="guarantee-badge">
              <Security className="guarantee-icon" />
              <span>100% Guaranteed Prizes • Instant Registration • No Hidden Fees</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default QuizPromotion;