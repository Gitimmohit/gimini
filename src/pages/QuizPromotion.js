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
  Security,
  Celebration,
  LocalOffer,
  Timer
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
      entry: "Free",
      prizePool: "₹2,00,000",
      duration: "45 mins",
      category: "Science & Technology"
    },
    {
      id: 2,
      title: "Galaxy Tech Quiz",
      date: "March 22, 2024",
      time: "7:30 PM IST",
      participants: "1,800+ Registered",
      difficulty: "Advanced",
      entry: "Free",
      prizePool: "₹1,50,000",
      duration: "60 mins",
      category: "Programming & AI"
    },
    {
      id: 3,
      title: "Space Exploration Trivia",
      date: "March 29, 2024",
      time: "5:00 PM IST",
      participants: "3,200+ Registered",
      difficulty: "Beginner",
      entry: "Free",
      prizePool: "₹2,50,000",
      duration: "30 mins",
      category: "Astronomy & Space"
    }
  ];

  const guaranteedAwards = [
    {
      id: 1,
      name: "Cosmic Gaming Laptop",
      icon: "💻",
      value: "₹85,000",
      features: ["RTX 4060", "16GB RAM", "1TB SSD"],
      winners: "Top 3 Scores",
      color: "#FF6B6B"
    },
    {
      id: 2,
      name: "Space Tablet Pro",
      icon: "📱",
      value: "₹45,000",
      features: ["12.9' Display", "Apple Pencil", "256GB"],
      winners: "Next 5 Winners",
      color: "#4DABF7"
    },
    {
      id: 3,
      name: "Galaxy Smartphone",
      icon: "📱",
      value: "₹35,000",
      features: ["128GB Storage", "48MP Camera", "5G"],
      winners: "Next 10 Winners",
      color: "#FFA94D"
    },
    {
      id: 4,
      name: "Astronomy Telescope",
      icon: "🔭",
      value: "₹25,000",
      features: ["Professional Grade", "Moon & Planet Viewing", "Tripod Included"],
      winners: "Next 15 Winners",
      color: "#9775FA"
    },
    {
      id: 5,
      name: "Smart Watch Series",
      icon: "⌚",
      value: "₹15,000",
      features: ["Health Monitoring", "GPS", "Water Resistant"],
      winners: "Next 25 Winners",
      color: "#51CF66"
    },
    {
      id: 6,
      name: "Gifts Pack Bundle",
      icon: "🎁",
      value: "₹8,000",
      features: ["Multiple Items", "Branded Merchandise", "Surprise Elements"],
      winners: "Next 50 Winners",
      color: "#FFD43B"
    }
  ];

  const features = [
    {
      icon: <RocketLaunch className="qp-feature-icon" />,
      title: "Instant Participation",
      description: "Join with one click - no complicated process",
      color: "#FF6B6B"
    },
    {
      icon: <Security className="qp-feature-icon" />,
      title: "Guaranteed Awards",
      description: "Every quiz has confirmed winners and prizes",
      color: "#4DABF7"
    },
    {
      icon: <Groups className="qp-feature-icon" />,
      title: "Live Competition",
      description: "Compete with students nationwide in real-time",
      color: "#51CF66"
    },
    {
      icon: <TrendingUp className="qp-feature-icon" />,
      title: "Skill Development",
      description: "Enhance your knowledge while winning amazing prizes",
      color: "#FFA94D"
    },
    {
      icon: <Celebration className="qp-feature-icon" />,
      title: "Weekly Events",
      description: "New quizzes every week with fresh prize pools",
      color: "#9775FA"
    },
    {
      icon: <LocalOffer className="qp-feature-icon" />,
      title: "Free Entry",
      description: "All quizzes are completely free to participate",
      color: "#FFD43B"
    }
  ];

  const winnersTestimonials = [
    {
      name: "Priya Sharma",
      college: "IIT Delhi",
      award: "Cosmic Laptop",
      message: "I never thought I could win such an amazing prize just by participating in a quiz! The experience was incredible.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Rahul Verma",
      college: "NIT Surat",
      award: "Space Tablet",
      message: "Best platform for students! I won a tablet and gained so much knowledge. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Anjali Patel",
      college: "DU College",
      award: "Smartphone",
      message: "The quiz was so engaging and the prizes are real! Got my new phone delivered within a week.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Participated", icon: "👥" },
    { number: "250+", label: "Prizes Distributed", icon: "🏆" },
    { number: "100%", label: "Guaranteed Winners", icon: "✅" },
    { number: "₹15L+", label: "Total Prize Value", icon: "💰" }
  ];

  return (
    <div className="qp-quiz-promotion-page">
      {/* Cosmic Background */}
      <div className="qp-space-bg">
        <div className="qp-stars-container">
          {Array.from({ length: 150 }, (_, i) => (
            <motion.div
              key={i}
              className="qp-star"
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
          className="qp-planet qp-planet-1"
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
          className="qp-planet qp-planet-2"
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
          className="qp-shooting-star"
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

      <div className="qp-container">
        {/* Hero Section */}
        <motion.section
          className="qp-hero-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="qp-hero-content">
            <motion.div
              className="qp-hero-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Star className="qp-badge-icon" />
              <span>Guaranteed Awards Every Week!</span>
            </motion.div>

            <h1 className="qp-hero-title">
              Win Amazing Prizes in
              <span className="qp-gradient-text"> Cosmic Quizzes</span>
            </h1>

            <p className="qp-hero-subtitle">
              Participate in exciting weekly quizzes and stand a chance to win laptops, tablets, 
              smartphones, telescopes, and more! Every quiz has guaranteed winners with real prizes.
            </p>

            <div className="qp-hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="qp-stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="qp-stat-icon">{stat.icon}</div>
                  <div className="qp-stat-number">{stat.number}</div>
                  <div className="qp-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="qp-hero-actions">
              <motion.button
                className="qp-cta-button qp-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(106, 17, 203, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <RocketLaunch className="qp-cta-icon" />
                Register for Next Quiz - FREE!
              </motion.button>
              
              <motion.button
                className="qp-cta-button qp-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Timer className="qp-cta-icon" />
                View Schedule
              </motion.button>
            </div>
          </div>

          <motion.div
            className="qp-hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="qp-floating-prizes">
              <motion.div
                className="qp-prize-item qp-laptop"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💻
                <div className="qp-prize-glow"></div>
              </motion.div>
              <motion.div
                className="qp-prize-item qp-tablet"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                📱
                <div className="qp-prize-glow"></div>
              </motion.div>
              <motion.div
                className="qp-prize-item qp-phone"
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              >
                📱
                <div className="qp-prize-glow"></div>
              </motion.div>
              <motion.div
                className="qp-prize-item qp-telescope"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              >
                🔭
                <div className="qp-prize-glow"></div>
              </motion.div>
            </div>
            
            <div className="qp-countdown-banner">
              <div className="qp-countdown-header">
                <Timer className="qp-countdown-icon" />
                <span>Next Quiz Starts In</span>
              </div>
              <div className="qp-countdown-timer">
                <div className="qp-time-unit">
                  <span className="qp-time-value">02</span>
                  <span className="qp-time-label">Days</span>
                </div>
                <div className="qp-time-unit">
                  <span className="qp-time-value">14</span>
                  <span className="qp-time-label">Hours</span>
                </div>
                <div className="qp-time-unit">
                  <span className="qp-time-value">38</span>
                  <span className="qp-time-label">Minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section className="qp-features-section qp-section">
          <motion.div
            className="qp-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="qp-section-badge">
              <TrendingUp className="qp-badge-icon" />
              Why Choose Us
            </div>
            <h2>The Ultimate Quiz Experience</h2>
            <p>Designed for students who want to learn, compete, and win amazing prizes</p>
          </motion.div>

          <div className="qp-features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="qp-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ borderColor: feature.color }}
              >
                <div 
                  className="qp-feature-icon-wrapper"
                  style={{ color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Awards Showcase */}
        <section className="qp-awards-section qp-section">
          <motion.div
            className="qp-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="qp-section-badge">
              <EmojiEvents className="qp-badge-icon" />
              Guaranteed Prizes
            </div>
            <h2>Win These Amazing Awards</h2>
            <p>Every quiz has multiple winners - your chance to win is real!</p>
          </motion.div>

          <div className="qp-awards-grid">
            {guaranteedAwards.map((award, index) => (
              <motion.div
                key={award.id}
                className="qp-award-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ borderColor: award.color }}
              >
                <div className="qp-award-header">
                  <div className="qp-award-icon">{award.icon}</div>
                  <div className="qp-award-value" style={{ color: award.color }}>
                    {award.value}
                  </div>
                </div>
                <h3>{award.name}</h3>
                <div className="qp-award-features">
                  {award.features.map((feature, idx) => (
                    <span key={idx} className="qp-feature-tag">✓ {feature}</span>
                  ))}
                </div>
                <div className="qp-winner-info">
                  <EmojiEvents className="qp-trophy-icon" />
                  <span>{award.winners}</span>
                </div>
                <div 
                  className="qp-guaranteed-badge"
                  style={{ backgroundColor: award.color }}
                >
                  Guaranteed Prize
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Upcoming Quizzes */}
        <section className="qp-quizzes-section qp-section">
          <motion.div
            className="qp-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="qp-section-badge">
              <Schedule className="qp-badge-icon" />
              Upcoming Events
            </div>
            <h2>Join Our Next Quiz Adventure</h2>
            <p>Mark your calendar and don't miss these exciting opportunities to win big</p>
          </motion.div>

          <div className="qp-quizzes-tabs">
            {upcomingQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                className={`qp-quiz-tab ${selectedQuiz === index ? 'qp-active' : ''}`}
                onClick={() => setSelectedQuiz(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="qp-quiz-date">
                  <Schedule className="qp-date-icon" />
                  <span>{quiz.date}</span>
                </div>
                <h3>{quiz.title}</h3>
                <div className="qp-quiz-meta">
                  <span className="qp-meta-item">
                    <Groups className="qp-meta-icon" />
                    {quiz.participants}
                  </span>
                  <span className="qp-meta-item">
                    <School className="qp-meta-icon" />
                    {quiz.difficulty}
                  </span>
                  <span className="qp-meta-item">
                    <Timer className="qp-meta-icon" />
                    {quiz.duration}
                  </span>
                </div>
                <div className="qp-prize-pool">
                  <LocalOffer className="qp-prize-icon" />
                  Prize Pool: {quiz.prizePool}
                </div>
                <div className="qp-category-badge">{quiz.category}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="qp-quiz-actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="qp-cta-button qp-primary qp-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RocketLaunch className="qp-cta-icon" />
              Register for {upcomingQuizzes[selectedQuiz].title}
            </motion.button>
            
            <div className="qp-quiz-highlights">
              <div className="qp-highlight-item">
                <Security className="qp-highlight-icon" />
                <span>100% Free Entry</span>
              </div>
              <div className="qp-highlight-item">
                <Celebration className="qp-highlight-icon" />
                <span>Instant Registration</span>
              </div>
              <div className="qp-highlight-item">
                <Public className="qp-highlight-icon" />
                <span>All India Level</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Winners Testimonials */}
        <section className="qp-testimonials-section qp-section">
          <motion.div
            className="qp-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="qp-section-badge">
              <CardGiftcard className="qp-badge-icon" />
              Success Stories
            </div>
            <h2>Meet Our Star Winners</h2>
            <p>Real students, real prizes, real success stories from across India</p>
          </motion.div>

          <div className="qp-testimonials-grid">
            {winnersTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="qp-testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="qp-testimonial-content">
                  <div className="qp-quote-icon">"</div>
                  <p>{testimonial.message}</p>
                </div>
                <div className="qp-testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="qp-author-image"
                  />
                  <div className="qp-author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.college}</span>
                  </div>
                  <div className="qp-award-won">
                    <CardGiftcard className="qp-award-icon" />
                    <span>Won: {testimonial.award}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <motion.section
          className="qp-final-cta-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="qp-cta-background">
            <div className="qp-cta-stars"></div>
          </div>
          
          <div className="qp-cta-content">
            <Celebration className="qp-cta-main-icon" />
            <h2>Ready to Win Big?</h2>
            <p>
              Join thousands of students who are already winning amazing prizes. 
              Register now for FREE and get ready for the next cosmic quiz adventure!
            </p>
            
            <div className="qp-cta-buttons">
              <motion.button
                className="qp-cta-button qp-primary qp-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RocketLaunch className="qp-cta-icon" />
                Register Now - It's FREE!
              </motion.button>
              
              <motion.button
                className="qp-cta-button qp-outline qp-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Groups className="qp-cta-icon" />
                View All Upcoming Quizzes
              </motion.button>
            </div>

            <div className="qp-guarantee-badge">
              <Security className="qp-guarantee-icon" />
              <span>100% Guaranteed Prizes • Instant Registration • No Hidden Fees</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default QuizPromotion;