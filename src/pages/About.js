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
      description:
        "Cosmic Vision Planetarium established with a mission to make astronomy accessible to everyone.",
    },
    {
      year: "2013",
      title: "Digital Upgrade",
      description:
        "Upgraded to state-of-the-art digital dome projection system, one of the first in the country.",
    },
    {
      year: "2016",
      title: "Educational Outreach",
      description:
        "Launched comprehensive educational programs for schools and colleges across the region.",
    },
    {
      year: "2019",
      title: "8K Revolution",
      description:
        "Became the first planetarium in the country to implement 8K resolution projection.",
    },
    {
      year: "2022",
      title: "Award Recognition",
      description:
        "Received National Excellence Award for Science Communication and Education.",
    },
    {
      year: "2024",
      title: "Future Vision",
      description:
        "Expanding to virtual reality experiences and interplanetary simulation programs.",
    },
  ];

  const values = [
    {
      icon: <Science className="value-icon" />,
      title: "Scientific Accuracy",
      description:
        "All our shows and content are rigorously reviewed by astrophysicists to ensure scientific accuracy.",
    },
    {
      icon: <School className="value-icon" />,
      title: "Education First",
      description:
        "We believe in making complex astronomical concepts accessible and engaging for all age groups.",
    },
    {
      icon: <AutoAwesome className="value-icon" />,
      title: "Innovation",
      description:
        "Constantly pushing boundaries with cutting-edge technology and immersive experiences.",
    },
    {
      icon: <Diversity3 className="value-icon" />,
      title: "Community",
      description:
        "Building a community of space enthusiasts through workshops, star parties, and public events.",
    },
  ];

  const facilities = [
    {
      icon: "🌌",
      title: "8K Digital Dome",
      description:
        "One of the largest digital domes in the country with 8K resolution projection",
    },
    {
      icon: "🔊",
      title: "15.1 Surround Sound",
      description:
        "Immersive audio experience that transports you to the depths of space",
    },
    {
      icon: "💺",
      title: "Reclining Seats",
      description:
        "Comfortable stadium-style seating for optimal viewing experience",
    },
    {
      icon: "🔭",
      title: "Observatory",
      description: "Research-grade telescopes for live celestial observations",
    },
    {
      icon: "🎮",
      title: "Interactive Zones",
      description: "Hands-on exhibits and interactive learning stations",
    },
    {
      icon: "☕",
      title: "Space Café",
      description: "Themed café serving cosmic-inspired snacks and beverages",
    },
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="stars-overlay"></div>
          <div className="floating-planets">
            <div className="planet earth"></div>
            <div className="planet mars"></div>
            <div className="planet jupiter"></div>
            <div className="planet saturn"></div>
          </div>
        </div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              <RocketLaunch className="badge-icon" />
              Exploring the Universe Since 2010
            </div>
            <h1 className="hero-title">
              About <span className="gradient-text">Cosmic Vision</span>
            </h1>
            <p className="hero-subtitle">
              Where the wonders of the universe come alive. We're passionate
              about sharing the beauty and science of astronomy through
              unforgettable immersive experiences.
            </p>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <motion.div
              className="mission-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Our Mission & Vision</h2>
              <div className="mission-cards">
                <div className="mission-card">
                  <Lightbulb className="mission-icon" />
                  <h3>Our Mission</h3>
                  <p>
                    To inspire wonder and curiosity about the universe by making
                    astronomy accessible, engaging, and educational for people
                    of all ages through state-of-the-art technology and expert
                    guidance.
                  </p>
                </div>
                <div className="mission-card">
                  <Explore className="mission-icon" />
                  <h3>Our Vision</h3>
                  <p>
                    To become the leading center for astronomical education and
                    public outreach, fostering a society that appreciates
                    science and looks to the stars with curiosity and
                    inspiration.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mission-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="visual-container">
                <div className="orbit-ring ring-1"></div>
                <div className="orbit-ring ring-2"></div>
                <div className="orbit-ring ring-3"></div>
                <div className="central-star">
                  <Star className="star-icon" />
                </div>
                <div className="orbiting-planet planet-1">🌍</div>
                <div className="orbiting-planet planet-2">🪐</div>
                <div className="orbiting-planet planet-3">🔴</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="timeline-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Cosmic Journey</h2>
            <p>
              From humble beginnings to becoming a premier astronomical
              destination
            </p>
          </motion.div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`timeline-item ${
                  index % 2 === 0 ? "left" : "right"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="values-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Core Values</h2>
            <p>The principles that guide our cosmic mission</p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="value-icon-container">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="team-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Meet Our Cosmic Team</h2>
            <p>
              Passionate astronomers, educators, and technologists dedicated to
              your cosmic journey
            </p>
          </motion.div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="team-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="image-overlay"></div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <div className="member-role">{member.role}</div>
                  <div className="member-details">
                    <div className="detail-item">
                      <span className="detail-label">Qualification:</span>
                      <span className="detail-value">
                        {member.qualification}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{member.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Specialty:</span>
                      <span className="detail-value">{member.specialty}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>World-Class Facilities</h2>
            <p>
              Experience astronomy like never before in our state-of-the-art
              planetarium
            </p>
          </motion.div>

          <div className="facilities-grid">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                className="facility-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="facility-icon">{facility.icon}</div>
                <h3>{facility.title}</h3>
                <p>{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Public className="cta-icon" />
            <h2>Ready for Your Cosmic Adventure?</h2>
            <p>
              Join thousands of space enthusiasts who've experienced the wonders
              of the universe with us
            </p>
            <div className="cta-buttons">
              <Link to="/shows" className="btn primary-btn large">
                <RocketLaunch />
                Explore Shows
              </Link>
              <Link to="/contactus" className="btn secondary-btn large">
                <Groups />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
