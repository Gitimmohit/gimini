// pages/AboutUs.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Groups,
  EmojiEvents,
  Public,
  School,
  TrendingUp,
  Science,
  AutoAwesome,
  RocketLaunch,
  Diversity3,
  Explore,
  Lightbulb,
  LocationOn,
  Schedule,
  VerifiedUser,
} from "@mui/icons-material";
import "./About.css";

const About = () => {
  const stats = [
    { number: "50,000+", label: "Happy Visitors", icon: "👥" },
    { number: "150+", label: "Shows Conducted", icon: "🎭" },
    { number: "75+", label: "School Partners", icon: "🏫" },
    { number: "4.9/5", label: "Visitor Rating", icon: "⭐" },
  ];

  const teamMembers = [
    {
      name: "Dr. Arjun Sharma",
      role: "Chief Astronomer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      qualification: "PhD in Astrophysics",
      experience: "15+ years",
      specialty: "Black Holes & Cosmology",
    },
    {
      name: "Rahul Verma",
      role: "Digital Dome Specialist",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      qualification: "MTech in Visual Effects",
      experience: "8+ years",
      specialty: "8K Projection Systems",
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Research Scientist",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      qualification: "PhD in Planetary Science",
      experience: "10+ years",
      specialty: "Solar System Exploration",
    },
  ];

  const milestones = [
    {
      year: "2010",
      title: "Foundation",
      description: "Cosmic Vision Planetarium established with a mission to make astronomy accessible to everyone.",
      icon: "🚀"
    },
    {
      year: "2013",
      title: "Digital Upgrade",
      description: "Upgraded to state-of-the-art digital dome projection system, one of the first in the country.",
      icon: "💫"
    },
    {
      year: "2016",
      title: "Educational Outreach",
      description: "Launched comprehensive educational programs for schools and colleges across the region.",
      icon: "🎓"
    },
    {
      year: "2019",
      title: "8K Revolution",
      description: "Became the first planetarium in the country to implement 8K resolution projection.",
      icon: "🌟"
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Received National Excellence Award for Science Communication and Education.",
      icon: "🏆"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Expanding to virtual reality experiences and interplanetary simulation programs.",
      icon: "🔮"
    },
  ];

  const values = [
    {
      icon: <Science className="abt-value-icon" />,
      title: "Scientific Accuracy",
      description: "All our shows and content are rigorously reviewed by astrophysicists to ensure scientific accuracy.",
      color: "#64FFDA"
    },
    {
      icon: <School className="abt-value-icon" />,
      title: "Education First",
      description: "We believe in making complex astronomical concepts accessible and engaging for all age groups.",
      color: "#4DABF7"
    },
    {
      icon: <AutoAwesome className="abt-value-icon" />,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge technology and immersive experiences.",
      color: "#FFA94D"
    },
    {
      icon: <Diversity3 className="abt-value-icon" />,
      title: "Community",
      description: "Building a community of space enthusiasts through workshops, star parties, and public events.",
      color: "#9775FA"
    },
  ];

  const facilities = [
    {
      icon: "🌌",
      title: "8K Digital Dome",
      description: "One of the largest digital domes in the country with 8K resolution projection",
      features: ["8K Resolution", "180° Dome", "4K Laser Projection"]
    },
    {
      icon: "🔊",
      title: "15.1 Surround Sound",
      description: "Immersive audio experience that transports you to the depths of space",
      features: ["15.1 Channels", "Spatial Audio", "Dolby Atmos"]
    },
    {
      icon: "💺",
      title: "Reclining Seats",
      description: "Comfortable stadium-style seating for optimal viewing experience",
      features: ["Ergonomic Design", "360° View", "Premium Comfort"]
    },
    {
      icon: "🔭",
      title: "Observatory",
      description: "Research-grade telescopes for live celestial observations",
      features: ["Research Grade", "Live Viewing", "Expert Guided"]
    },
    {
      icon: "🎮",
      title: "Interactive Zones",
      description: "Hands-on exhibits and interactive learning stations",
      features: ["Touch Screens", "VR Experiences", "Educational Games"]
    },
    {
      icon: "☕",
      title: "Space Café",
      description: "Themed café serving cosmic-inspired snacks and beverages",
      features: ["Space Theme", "Premium Coffee", "Cosmic Snacks"]
    },
  ];

  const achievements = [
    { number: "12", label: "National Awards", icon: <EmojiEvents className="abt-achievement-icon" /> },
    { number: "50K+", label: "Students Educated", icon: <School className="abt-achievement-icon" /> },
    { number: "98%", label: "Visitor Satisfaction", icon: <VerifiedUser className="abt-achievement-icon" /> },
    { number: "24/7", label: "Support Available", icon: <Schedule className="abt-achievement-icon" /> },
  ];

  return (
    <div className="abt-about-us-page">
      {/* Hero Section */}
      <section className="abt-hero">
        <div className="abt-hero-background">
          <div className="abt-stars-overlay"></div>
          <div className="abt-floating-planets">
            <div className="abt-planet abt-earth"></div>
            <div className="abt-planet abt-mars"></div>
            <div className="abt-planet abt-jupiter"></div>
            <div className="abt-planet abt-saturn"></div>
          </div>
        </div>
        <div className="abt-container">
          <motion.div
            className="abt-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="abt-hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <RocketLaunch className="abt-badge-icon" />
              Exploring the Universe Since 2010
            </motion.div>
            
            <h1 className="abt-hero-title">
              Journey Through the <span className="abt-gradient-text">Cosmos</span> With Us
            </h1>
            
            <p className="abt-hero-subtitle">
              Where the wonders of the universe come alive through cutting-edge technology 
              and passionate storytelling. We're dedicated to making astronomy accessible, 
              engaging, and unforgettable for everyone.
            </p>

            <div className="abt-hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="abt-stat-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="abt-stat-icon">{stat.icon}</div>
                  <div className="abt-stat-number">{stat.number}</div>
                  <div className="abt-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="abt-mission-section">
        <div className="abt-container">
          <div className="abt-mission-content">
            <motion.div
              className="abt-mission-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="abt-section-badge">
                <Lightbulb className="abt-badge-icon" />
                Our Purpose
              </div>
              <h2 className="abt-section-title">Inspiring Cosmic Curiosity</h2>
              
              <div className="abt-mission-cards">
                <motion.div
                  className="abt-mission-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="abt-mission-header">
                    <Lightbulb className="abt-mission-icon" />
                    <h3>Our Mission</h3>
                  </div>
                  <p>
                    To ignite wonder and curiosity about the universe by making astronomy 
                    accessible through state-of-the-art technology, expert guidance, and 
                    immersive experiences that inspire lifelong learning.
                  </p>
                </motion.div>
                
                <motion.div
                  className="abt-mission-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="abt-mission-header">
                    <Explore className="abt-mission-icon" />
                    <h3>Our Vision</h3>
                  </div>
                  <p>
                    To become the leading center for astronomical education, fostering a 
                    society that looks to the stars with curiosity, understands science, 
                    and embraces the wonders of our cosmic neighborhood.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="abt-mission-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="abt-visual-container">
                <div className="abt-orbit-ring abt-ring-1"></div>
                <div className="abt-orbit-ring abt-ring-2"></div>
                <div className="abt-orbit-ring abt-ring-3"></div>
                <div className="abt-central-star">
                  <Star className="abt-star-icon" />
                </div>
                <div className="abt-orbiting-planet abt-planet-1">🌍</div>
                <div className="abt-orbiting-planet abt-planet-2">🪐</div>
                <div className="abt-orbiting-planet abt-planet-3">🔴</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="abt-achievements-section">
        <div className="abt-container">
          <motion.div
            className="abt-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Cosmic Impact</h2>
            <p>Making a difference in science education and public outreach</p>
          </motion.div>

          <div className="abt-achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                className="abt-achievement-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="abt-achievement-icon-wrapper">
                  {achievement.icon}
                </div>
                <div className="abt-achievement-number">{achievement.number}</div>
                <div className="abt-achievement-label">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="abt-timeline-section">
        <div className="abt-container">
          <motion.div
            className="abt-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="abt-section-badge">
              <TrendingUp className="abt-badge-icon" />
              Our Journey
            </div>
            <h2>Milestones in Cosmic Exploration</h2>
            <p>From humble beginnings to becoming a premier astronomical destination</p>
          </motion.div>

          <div className="abt-timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="abt-timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="abt-timeline-content">
                  <div className="abt-timeline-year">{milestone.year}</div>
                  <div className="abt-timeline-icon">{milestone.icon}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
                <div className="abt-timeline-connector"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="abt-values-section">
        <div className="abt-container">
          <motion.div
            className="abt-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Guiding Principles</h2>
            <p>The core values that drive our mission to explore and educate</p>
          </motion.div>

          <div className="abt-values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="abt-value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                style={{ borderColor: value.color }}
              >
                <div 
                  className="abt-value-icon-container"
                  style={{ color: value.color }}
                >
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="abt-team-section">
        <div className="abt-container">
          <motion.div
            className="abt-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="abt-section-badge">
              <Groups className="abt-badge-icon" />
              Meet the Experts
            </div>
            <h2>Our Cosmic Guides</h2>
            <p>Passionate astronomers, educators, and technologists dedicated to your journey through the stars</p>
          </motion.div>

          <div className="abt-team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="abt-team-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="abt-member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="abt-image-overlay">
                    <div className="abt-member-specialty">{member.specialty}</div>
                  </div>
                </div>
                <div className="abt-member-info">
                  <h3>{member.name}</h3>
                  <div className="abt-member-role">{member.role}</div>
                  <div className="abt-member-details">
                    <div className="abt-detail-item">
                      <VerifiedUser className="abt-detail-icon" />
                      <span>{member.qualification}</span>
                    </div>
                    <div className="abt-detail-item">
                      <Schedule className="abt-detail-icon" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="abt-facilities-section">
        <div className="abt-container">
          <motion.div
            className="abt-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>State-of-the-Art Facilities</h2>
            <p>Experience astronomy like never before in our cutting-edge planetarium</p>
          </motion.div>

          <div className="abt-facilities-grid">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                className="abt-facility-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="abt-facility-icon">{facility.icon}</div>
                <h3>{facility.title}</h3>
                <p>{facility.description}</p>
                <div className="abt-facility-features">
                  {facility.features.map((feature, idx) => (
                    <span key={idx} className="abt-feature-tag">{feature}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="abt-cta-section">
        <div className="abt-container">
          <motion.div
            className="abt-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="abt-cta-background">
              <div className="abt-cta-stars"></div>
            </div>
            <RocketLaunch className="abt-cta-icon" />
            <h2>Begin Your Cosmic Journey</h2>
            <p>
              Join thousands of space enthusiasts who've experienced the wonders of the universe with us. 
              Your adventure among the stars awaits!
            </p>
            <div className="abt-cta-buttons">
              <Link to="/shows" className="abt-btn abt-primary-btn abt-large">
                <RocketLaunch />
                Explore Shows
              </Link>
              <Link to="/contactus" className="abt-btn abt-secondary-btn abt-large">
                <LocationOn />
                Visit Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;