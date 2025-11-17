// pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  School,
  Groups,
  ConfirmationNumber,
  VolumeUp,
  AutoAwesome,
  Public,
  Schedule,
  Security,
  Accessibility,
  EmojiEvents,
  TrendingUp,
  RocketLaunch,
  Explore,
  Science,
  Language,
  Nightlight,
} from "@mui/icons-material";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section with Space Background - Keep as is */}
      <section className="hero-section">
        <div className="stars-background"></div>
        <div className="floating-planets">
          <div className="planet earth"></div>
          <div className="planet mars"></div>
          <div className="planet saturn"></div>
          <div className="planet jupiter"></div>
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Welcome to{" "}
            <span className="gradient-text">Cosmic Vision Planetarium</span>
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Journey through the cosmos. Experience the universe like never
            before in our state-of-the-art digital dome theater.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <Link to="/shows" className="btn primary-btn glow-effect">
              <RocketLaunch sx={{ mr: 1 }} />
              Explore Shows
            </Link>
            <Link to="/register" className="btn secondary-btn">
              <Groups sx={{ mr: 1 }} />
              Get Started
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="trust-indicators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="trust-item">
              <Security sx={{ color: "#64ffda", fontSize: 18 }} />
              <span>Safe & Secure Booking</span>
            </div>
            <div className="trust-item">
              <EmojiEvents sx={{ color: "#64ffda", fontSize: 18 }} />
              <span>Award Winning Experience</span>
            </div>
            <div className="trust-item">
              <Accessibility sx={{ color: "#64ffda", fontSize: 18 }} />
              <span>Wheelchair Accessible</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="mouse"></div>
          <span>Scroll to Explore</span>
        </motion.div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-badge">Why Choose Us</span>
            <h2 className="section-title">
              An Unforgettable Cosmic Experience
            </h2>
            <p className="section-description">
              We combine cutting-edge technology with expert storytelling to
              create immersive astronomical experiences that educate and
              inspire.
            </p>
          </motion.div>

          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="feature-image">
                <img
                  src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                  alt="Digital Dome Projection"
                />
                <div className="feature-overlay"></div>
                <div className="feature-badge">Most Popular</div>
              </div>
              <div className="feature-content">
                <div className="feature-icon">
                  <Public sx={{ fontSize: 32, color: "#64ffda" }} />
                </div>
                <h3>8K Digital Dome Experience</h3>
                <p>
                  Immerse yourself in stunning 8K resolution projections across
                  our 360° dome theater with 15.1 surround sound system that
                  transports you to the farthest reaches of space.
                </p>
                <div className="feature-highlights">
                  <span>🎯 8K Ultra HD</span>
                  <span>🌐 360° Projection</span>
                  <span>🔊 15.1 Sound</span>
                  <span>💺 200 Capacity</span>
                </div>
                <div className="feature-stats">
                  <div className="stat">
                    <TrendingUp sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>98% Visitor Satisfaction</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="feature-image">
                <img
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=2094&q=80"
                  alt="Expert Astronomers"
                />
                <div className="feature-overlay"></div>
              </div>
              <div className="feature-content">
                <div className="feature-icon">
                  <School sx={{ fontSize: 32, color: "#64ffda" }} />
                </div>
                <h3>Expert Guided Tours</h3>
                <p>
                  Learn from our team of PhD astronomers and astrophysicists
                  with live commentary, interactive Q&A sessions, and hands-on
                  telescope workshops.
                </p>
                <div className="feature-highlights">
                  <span>👨‍🎓 PhD Experts</span>
                  <span>💬 Live Q&A</span>
                  <span>🔭 Workshops</span>
                  <span>🏆 Certified</span>
                </div>
                <div className="feature-stats">
                  <div className="stat">
                    <EmojiEvents sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="feature-image">
                <img
                  src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                  alt="Educational Programs"
                />
                <div className="feature-overlay"></div>
                <div className="feature-badge">Educational</div>
              </div>
              <div className="feature-content">
                <div className="feature-icon">
                  <AutoAwesome sx={{ fontSize: 32, color: "#64ffda" }} />
                </div>
                <h3>Educational Programs</h3>
                <p>
                  Specially designed curriculum-based shows for all grades with
                  interactive activities, hands-on experiments, and certificates
                  of participation.
                </p>
                <div className="feature-highlights">
                  <span>📚 CBSE/ICSE</span>
                  <span>🎮 Interactive</span>
                  <span>🏅 Certificates</span>
                  <span>👨‍👩‍👧‍👦 Family Packages</span>
                </div>
                <div className="feature-stats">
                  <div className="stat">
                    <School sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>75+ School Partners</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Features Mini Grid */}
          <motion.div
            className="mini-features-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mini-feature">
              <Language sx={{ fontSize: 40, color: "#64ffda" }} />
              <h4>Multi-language</h4>
              <p>Shows available in English, Hindi, and regional languages</p>
            </div>
            <div className="mini-feature">
              <Science sx={{ fontSize: 40, color: "#64ffda" }} />
              <h4>Research Grade</h4>
              <p>Access to research-grade telescopes and equipment</p>
            </div>
            <div className="mini-feature">
              <Explore sx={{ fontSize: 40, color: "#64ffda" }} />
              <h4>Virtual Tours</h4>
              <p>Explore planets and galaxies through VR experiences</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Showcase - Enhanced */}
      <section className="showcase-section">
        <div className="container">
          <div className="showcase-content">
            <motion.div
              className="showcase-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="show-badge">Featured Show</span>
              <h2>"Journey to the Edge of the Universe"</h2>
              <p className="show-description">
                Embark on an epic voyage from our solar system to the farthest
                reaches of the observable universe. This award-winning show
                combines breathtaking visuals with scientific accuracy to create
                an unforgettable educational experience.
              </p>

              <div className="show-meta">
                <div className="meta-item">
                  <strong>Duration:</strong> 60 minutes
                </div>

                <div className="meta-item">
                  <strong>Language:</strong> English & Hindi
                </div>
                <div className="meta-item">
                  <strong>Show Times:</strong> 11AM, 2PM, 5PM, 7PM
                </div>
              </div>

              <div className="show-details">
                <div className="detail-item">
                  <ConfirmationNumber sx={{ color: "#64ffda" }} />
                  <div>
                    <strong>60-minute immersive experience</strong>
                    <span>Full-dome digital projection</span>
                  </div>
                </div>
                <div className="detail-item">
                  <VolumeUp sx={{ color: "#64ffda" }} />
                  <div>
                    <strong>7.1 Surround Sound System</strong>
                    <span>Immersive audio experience</span>
                  </div>
                </div>
                <div className="detail-item">
                  <span>⭐</span>
                  <div>
                    <strong>Comfortable reclining seats</strong>
                    <span>Stadium-style seating</span>
                  </div>
                </div>
                <div className="detail-item">
                  <Groups sx={{ color: "#64ffda" }} />
                  <div>
                    <strong>Interactive Q&A session</strong>
                    <span>With expert astronomers</span>
                  </div>
                </div>
              </div>

              <div className="show-actions">
                <Link to="/shows" className="btn primary-btn large">
                  <ConfirmationNumber sx={{ mr: 1 }} />
                  Book Your Seat Now
                </Link>
                <div className="price-tag">
                  <div className="price-original">
                    <span className="original-price">₹499</span>
                    <span className="discount-badge">49% OFF</span>
                  </div>
                  <div className="price-discounted">
                    <span className="price">₹249</span>
                    <span className="price-note">per person</span>
                  </div>
                  <div className="offer-timer">
                    <div className="timer-text">
                      <span>⏰</span>
                      Limited time offer for first-time visitors
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="showcase-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=2020&q=80"
                alt="Journey to the Edge of the Universe Show"
                className="show-image"
              />
              <div className="show-overlay">
                <div className="play-button">
                  <span>▶</span>
                </div>
                <div className="show-tag">Award Winning Show</div>
              </div>
              <div className="show-rating">
                <div className="stars">★★★★★</div>
                <div className="rating-text">4.9/5 (2,347 reviews)</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Shows Preview */}
      <section className="upcoming-shows-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="section-badge">Coming Soon</span>
            <h2 className="section-title">Upcoming Spectacular Shows</h2>
          </motion.div>

          <div className="upcoming-shows-grid">
            {[
              {
                title: "Black Holes: The Dark Mystery",
                date: "Jan 25, 2024",
                time: "6:00 PM",
                duration: "45 mins",
                image:
                  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                tags: ["New", "Scientific"],
                rating: 4.8,
                reviews: 127,
                price: 349,
                originalPrice: 499,
                discount: 30,
                seats: 15,
                ageGroup: "12+",
                language: "English",
                description:
                  "Explore the enigmatic world of black holes, gravitational waves, and spacetime curvature in this mind-bending journey through Einstein's universe.",
                features: [
                  "3D Simulation",
                  "Expert Q&A",
                  "Interactive Session",
                ],
              },
              {
                title: "Mars: The Red Planet",
                date: "Feb 2, 2024",
                duration: "50 mins",
                image:
                  "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                tags: ["Educational", "Kids"],
              },
              {
                title: "Cosmic Collisions",
                date: "Feb 10, 2024",
                duration: "55 mins",
                image:
                  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                tags: ["Action", "3D"],
              },
            ].map((show, index) => (
              <motion.div
                key={index}
                className="upcoming-show-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="show-image-container">
                  <img src={show.image} alt={show.title} />
                  <div className="show-tags">
                    {show.tags.map((tag) => (
                      <span key={tag} className="show-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="show-info">
                  <h4>{show.title}</h4>
                  <div className="show-meta">
                    <Schedule sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>
                      {show.date} • {show.duration}
                    </span>
                  </div>
                  <button className="notify-btn">Notify Me</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">👥</div>
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Happy Visitors</div>
              <div className="stat-trend">↑ 15% this year</div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">🎭</div>
              <div className="stat-number">150+</div>
              <div className="stat-label">Shows Conducted</div>
              <div className="stat-trend">5 shows weekly</div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">🏫</div>
              <div className="stat-number">75+</div>
              <div className="stat-label">School Partners</div>
              <div className="stat-trend">Trusted by educators</div>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">⭐</div>
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Visitor Rating</div>
              <div className="stat-trend">2,347 reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="cta-badge">Limited Time Offer</div>
            <h2>Begin Your Cosmic Adventure Today</h2>
            <p>
              Join thousands of space enthusiasts who've experienced the wonders
              of the universe with us. Book your seat for an unforgettable
              journey through space and time.
            </p>

            <div className="cta-features">
              <div className="cta-feature">
                <Security sx={{ color: "#64ffda" }} />
                <span>Easy & Secure Booking</span>
              </div>
              <div className="cta-feature">
                <Schedule sx={{ color: "#64ffda" }} />
                <span>Flexible Scheduling</span>
              </div>
              <div className="cta-feature">
                <Groups sx={{ color: "#64ffda" }} />
                <span>Group Discounts Available</span>
              </div>
            </div>

            <div className="cta-buttons">
              <Link to="/shows" className="btn primary-btn large">
                <ConfirmationNumber sx={{ mr: 1 }} />
                View Show Schedule
              </Link>
              <Link to="/register" className="btn secondary-btn large">
                <Groups sx={{ mr: 1 }} />
                Register Now
              </Link>
            </div>

            <div className="cta-footer">
              <span>🎉 Special: Get 15% off on your first booking!</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
