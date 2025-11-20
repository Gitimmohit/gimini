// pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import pic2 from "../assets/pic2.jpg";

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
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homePage}>
      {/* Hero Section with Space Background */}
      <section className={styles.heroSection}>
        <img src={pic2} alt="Digital Dome Projection" className={styles.heroImg} />

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Digital Portable Planetarium:{" "}
            <span className={styles.gradientText}>
              Bringing Space Science to Schools
            </span>
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Journey through the cosmos. Experience the universe like never
            before in our state-of-the-art digital dome theater.
          </motion.p>
          <motion.div
            className={styles.heroButtons}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <Link to="/shows" className={`${styles.btn} ${styles.primaryBtn} ${styles.glowEffect}`}>
              <RocketLaunch sx={{ mr: 1 }} />
              Explore Shows
            </Link>
            <Link to="/register" className={`${styles.btn} ${styles.secondaryBtn}`}>
              <Groups sx={{ mr: 1 }} />
              Book Now
            </Link>
          </motion.div>

   
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={styles.mouse}></div>
          <span>Scroll to Explore</span>
        </motion.div>
      </section>

      {/* Features Section - Enhanced */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionBadge}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>
              An Unforgettable Cosmic Experience
            </h2>
            <p className={styles.sectionDescription}>
              We combine cutting-edge technology with expert storytelling to
              create immersive astronomical experiences that educate and
              inspire.
            </p>
          </motion.div>

          <div className={styles.featuresGrid}>
            <motion.div
              className={styles.featureCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className={styles.featureImage}>
                <img
                  src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
                  alt="Digital Dome Projection"
                />
                <div className={styles.featureOverlay}></div>
                <div className={styles.featureBadge}>Most Popular</div>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <Public sx={{ fontSize: 32, color: "#64ffda" }} />
                </div>
                <h3>8K Digital Dome Experience</h3>
                <p>
                  Immerse yourself in stunning 8K resolution projections across
                  our 360° dome theater with 15.1 surround sound system that
                  transports you to the farthest reaches of space.
                </p>
                <div className={styles.featureHighlights}>
                  <span>🎯 8K Ultra HD</span>
                  <span>🌐 360° Projection</span>
                  <span>🔊 15.1 Sound</span>
                  <span>💺 200 Capacity</span>
                </div>
                <div className={styles.featureStats}>
                  <div className={styles.stat}>
                    <TrendingUp sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>98% Visitor Satisfaction</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.featureCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className={styles.featureImage}>
                <img
                  src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=2094&q=80"
                  alt="Expert Astronomers"
                />
                <div className={styles.featureOverlay}></div>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <School sx={{ fontSize: 32, color: "#64ffda" }} />
                </div>
                <h3>Expert Guided Tours</h3>
                <p>
                  Learn from our team of PhD astronomers and astrophysicists
                  with live commentary, interactive Q&A sessions, and hands-on
                  telescope workshops.
                </p>
                <div className={styles.featureHighlights}>
                  <span>👨‍🎓 PhD Experts</span>
                  <span>💬 Live Q&A</span>
                  <span>🔭 Workshops</span>
                  <span>🏆 Certified</span>
                </div>
                <div className={styles.featureStats}>
                  <div className={styles.stat}>
                    <EmojiEvents sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.featureCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className={styles.featureImage}>
                <img
                  src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                  alt="Educational Programs"
                />
                <div className={styles.featureOverlay}></div>
                <div className={styles.featureBadge}>Educational</div>
              </div>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <AutoAwesome sx={{ fontSize: 32, color: "#64ffda" }} />
                </div>
                <h3>Educational Programs</h3>
                <p>
                  Specially designed curriculum-based shows for all grades with
                  interactive activities, hands-on experiments, and certificates
                  of participation.
                </p>
                <div className={styles.featureHighlights}>
                  <span>📚 CBSE/ICSE</span>
                  <span>🎮 Interactive</span>
                  <span>🏅 Certificates</span>
                  <span>👨‍👩‍👧‍👦 Family Packages</span>
                </div>
                <div className={styles.featureStats}>
                  <div className={styles.stat}>
                    <School sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>75+ School Partners</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Features Mini Grid */}
          <motion.div
            className={styles.miniFeaturesGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={styles.miniFeature}>
              <Language sx={{ fontSize: 40, color: "#64ffda" }} />
              <h4>Multi-language</h4>
              <p>Shows available in English, Hindi, and regional languages</p>
            </div>
            <div className={styles.miniFeature}>
              <Science sx={{ fontSize: 40, color: "#64ffda" }} />
              <h4>Research Grade</h4>
              <p>Access to research-grade telescopes and equipment</p>
            </div>
            <div className={styles.miniFeature}>
              <Explore sx={{ fontSize: 40, color: "#64ffda" }} />
              <h4>Virtual Tours</h4>
              <p>Explore planets and galaxies through VR experiences</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Showcase - Enhanced */}
      <section className={styles.showcaseSection}>
        <div className={styles.container}>
          <div className={styles.showcaseContent}>
            <motion.div
              className={styles.showcaseText}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className={styles.showBadge}>Featured Show</span>
              <h2>"Journey to the Edge of the Universe"</h2>
              <p className={styles.showDescription}>
                Embark on an epic voyage from our solar system to the farthest
                reaches of the observable universe. This award-winning show
                combines breathtaking visuals with scientific accuracy to create
                an unforgettable educational experience.
              </p>

              <div className={styles.showMeta}>
                <div className={styles.metaItem}>
                  <strong>Duration:</strong> 60 minutes
                </div>

                <div className={styles.metaItem}>
                  <strong>Language:</strong> English & Hindi
                </div>
                <div className={styles.metaItem}>
                  <strong>Show Times:</strong> 11AM, 2PM, 5PM, 7PM
                </div>
              </div>

              <div className={styles.showDetails}>
                <div className={styles.detailItem}>
                  <ConfirmationNumber sx={{ color: "#64ffda" }} />
                  <div>
                    <strong>60-minute immersive experience</strong>
                    <span>Full-dome digital projection</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <VolumeUp sx={{ color: "#64ffda" }} />
                  <div>
                    <strong>7.1 Surround Sound System</strong>
                    <span>Immersive audio experience</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span>⭐</span>
                  <div>
                    <strong>Comfortable reclining seats</strong>
                    <span>Stadium-style seating</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <Groups sx={{ color: "#64ffda" }} />
                  <div>
                    <strong>Interactive Q&A session</strong>
                    <span>With expert astronomers</span>
                  </div>
                </div>
              </div>

              <div className={styles.showActions}>
                <Link to="/shows" className={`${styles.btn} ${styles.primaryBtn} ${styles.large}`}>
                  <ConfirmationNumber sx={{ mr: 1 }} />
                  Book Your Seat Now
                </Link>
                <div className={styles.priceTag}>
                  <div className={styles.priceOriginal}>
                    <span className={styles.originalPrice}>₹499</span>
                    <span className={styles.discountBadge}>49% OFF</span>
                  </div>
                  <div className={styles.priceDiscounted}>
                    <span className={styles.price}>₹249</span>
                    <span className={styles.priceNote}>per person</span>
                  </div>
                  <div className={styles.offerTimer}>
                    <div className={styles.timerText}>
                      <span>⏰</span>
                      Limited time offer for first-time visitors
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={styles.showcaseVisual}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=2020&q=80"
                alt="Journey to the Edge of the Universe Show"
                className={styles.showImage}
              />
              <div className={styles.showOverlay}>
                <div className={styles.playButton}>
                  <span>▶</span>
                </div>
                <div className={styles.showTag}>Award Winning Show</div>
              </div>
              <div className={styles.showRating}>
                <div className={styles.stars}>★★★★★</div>
                <div className={styles.ratingText}>4.9/5 (2,347 reviews)</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Shows Preview */}
      <section className={styles.upcomingShowsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionBadge}>Coming Soon</span>
            <h2 className={styles.sectionTitle}>Upcoming Spectacular Shows</h2>
          </motion.div>

          <div className={styles.upcomingShowsGrid}>
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
                className={styles.upcomingShowCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.showImageContainer}>
                  <img src={show.image} alt={show.title} />
                  <div className={styles.showTags}>
                    {show.tags.map((tag) => (
                      <span key={tag} className={styles.showTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.showInfo}>
                  <h4>{show.title}</h4>
                  <div className={styles.showMeta}>
                    <Schedule sx={{ fontSize: 16, color: "#64ffda" }} />
                    <span>
                      {show.date} • {show.duration}
                    </span>
                  </div>
                  <button className={styles.notifyBtn}>Notify Me</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.statsGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={styles.statCard}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statNumber}>50,000+</div>
              <div className={styles.statLabel}>Happy Visitors</div>
              <div className={styles.statTrend}>↑ 15% this year</div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>🎭</div>
              <div className={styles.statNumber}>150+</div>
              <div className={styles.statLabel}>Shows Conducted</div>
              <div className={styles.statTrend}>5 shows weekly</div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>🏫</div>
              <div className={styles.statNumber}>75+</div>
              <div className={styles.statLabel}>School Partners</div>
              <div className={styles.statTrend}>Trusted by educators</div>
            </motion.div>

            <motion.div
              className={styles.statCard}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statNumber}>4.9/5</div>
              <div className={styles.statLabel}>Visitor Rating</div>
              <div className={styles.statTrend}>2,347 reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.ctaBadge}>Limited Time Offer</div>
            <h2>Begin Your Cosmic Adventure Today</h2>
            <p>
              Join thousands of space enthusiasts who've experienced the wonders
              of the universe with us. Book your seat for an unforgettable
              journey through space and time.
            </p>

            <div className={styles.ctaFeatures}>
              <div className={styles.ctaFeature}>
                <Security sx={{ color: "#64ffda" }} />
                <span>Easy & Secure Booking</span>
              </div>
              <div className={styles.ctaFeature}>
                <Schedule sx={{ color: "#64ffda" }} />
                <span>Flexible Scheduling</span>
              </div>
              <div className={styles.ctaFeature}>
                <Groups sx={{ color: "#64ffda" }} />
                <span>Group Discounts Available</span>
              </div>
            </div>

            <div className={styles.ctaButtons}>
              <Link to="/shows" className={`${styles.btn} ${styles.primaryBtn} ${styles.large}`}>
                <ConfirmationNumber sx={{ mr: 1 }} />
                View Show Schedule
              </Link>
              <Link to="/register" className={`${styles.btn} ${styles.secondaryBtn} ${styles.large}`}>
                <Groups sx={{ mr: 1 }} />
                Register Now
              </Link>
            </div>

            <div className={styles.ctaFooter}>
              <span>🎉 Special: Get 15% off on your first booking!</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;