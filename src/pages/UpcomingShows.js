// pages/UpcomingShows.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import pic4 from "../assets/pic4.jpg";
import {
  ConfirmationNumber,
  CalendarToday,
  Schedule,
  Groups,
  Star,
  LocationOn,
  Language,
  EmojiEvents,
  TrendingUp,
  NewReleases,
} from "@mui/icons-material";
import "./UpcomingShows.css";

const UpcomingShows = () => {
  const upcomingShows = [
    {
      id: 1,
      title: "Black Holes: The Dark Mystery",
      date: "2024-01-25",
      time: "6:00 PM",
      duration: "45 mins",
      image:
        "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "scientific",
      tags: ["New", "Scientific", "3D"],
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
        "Surround Sound",
      ],
      status: "featured",
      venue: "Main Dome",
    },
    {
      id: 2,
      title: "Mars: The Red Planet Expedition",
      date: "2024-02-02",
      time: "4:00 PM",
      duration: "50 mins",
      image:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "educational",
      tags: ["Educational", "Kids Friendly", "Family"],
      rating: 4.6,
      reviews: 89,
      price: 299,
      originalPrice: 399,
      discount: 25,
      seats: 25,
      ageGroup: "8+",
      language: "English & Hindi",
      description:
        "Journey to Mars and discover the secrets of the Red Planet, from ancient riverbeds to future colonization possibilities.",
      features: [
        "Live Telescope",
        "Kids Activity",
        "Take-home Kit",
        "Educational",
      ],
      status: "popular",
      venue: "Main Dome",
    },
    {
      id: 3,
      title: "Cosmic Collisions: Universe in Motion",
      date: "2024-02-10",
      time: "7:30 PM",
      duration: "55 mins",
      image:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "action",
      tags: ["Action", "3D Experience", "Thrilling"],
      rating: 4.9,
      reviews: 203,
      price: 399,
      originalPrice: 599,
      discount: 33,
      seats: 8,
      ageGroup: "10+",
      language: "English",
      description:
        "Witness the most spectacular cosmic collisions - from asteroid impacts to galaxy mergers in stunning 3D visualization.",
      features: [
        "3D Experience",
        "Surround Sound",
        "VR Elements",
        "Action-Packed",
      ],
      status: "trending",
      venue: "VR Theater",
    },
    {
      id: 4,
      title: "Solar System: Our Cosmic Neighborhood",
      date: "2024-01-30",
      time: "3:00 PM",
      duration: "40 mins",
      image:
        "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "educational",
      tags: ["Educational", "Family", "Beginner"],
      rating: 4.7,
      reviews: 156,
      price: 279,
      originalPrice: 349,
      discount: 20,
      seats: 32,
      ageGroup: "6+",
      language: "Hindi & English",
      description:
        "Take a guided tour through our solar system, exploring planets, moons, and the amazing phenomena that make our cosmic neighborhood unique.",
      features: [
        "Planet Tour",
        "Interactive Quiz",
        "Family Friendly",
        "Educational",
      ],
      status: "family",
      venue: "Main Dome",
    },
    {
      id: 5,
      title: "Stars: Life and Death of Celestial Giants",
      date: "2024-02-15",
      time: "8:00 PM",
      duration: "60 mins",
      image:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "scientific",
      tags: ["Scientific", "Advanced", "Astronomy"],
      rating: 4.8,
      reviews: 94,
      price: 449,
      originalPrice: 649,
      discount: 31,
      seats: 12,
      ageGroup: "14+",
      language: "English",
      description:
        "Explore the fascinating life cycle of stars, from stellar nurseries to supernova explosions and the formation of neutron stars and black holes.",
      features: [
        "Scientific Depth",
        "Expert Commentary",
        "Advanced Visuals",
        "Q&A Session",
      ],
      status: "premium",
      venue: "Observatory",
    },
    {
      id: 6,
      title: "Aurora: Dance of the Northern Lights",
      date: "2024-02-08",
      time: "9:00 PM",
      duration: "35 mins",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "visual",
      tags: ["Visual", "Relaxing", "Musical"],
      rating: 4.9,
      reviews: 178,
      price: 329,
      originalPrice: 429,
      discount: 23,
      seats: 40,
      ageGroup: "All Ages",
      language: "Musical (No Dialogue)",
      description:
        "Immerse yourself in the breathtaking beauty of auroras with this musical journey through the polar skies. A sensory experience like no other.",
      features: ["Musical Score", "Visual Spectacle", "Relaxing", "All Ages"],
      status: "immersive",
      venue: "Main Dome",
    },
  ];

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "featured":
        return <NewReleases className="up-status-icon" />;
      case "trending":
        return <TrendingUp className="up-status-icon" />;
      case "popular":
        return <Star className="up-status-icon" />;
      default:
        return <Star className="up-status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "featured":
        return "#FF6B6B";
      case "trending":
        return "#64FFDA";
      case "popular":
        return "#FFD700";
      case "family":
        return "#4DABF7";
      case "premium":
        return "#FFA94D";
      case "immersive":
        return "#9775FA";
      default:
        return "#64FFDA";
    }
  };

  return (
    <div className="up-upcoming-shows-page">
      {/* Hero Section */}
      <section className="up-shows-hero">
        <img src={pic4} alt="Digital Dome Projection" className="up-hero-img" />
        <div className="up-hero-overlay"></div>
        <div className="up-container">
          <motion.div
            className="up-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="up-hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <NewReleases className="up-badge-icon" />
              Explore the Universe
            </motion.div>
            <h1 className="up-hero-title">
              Journey Through the <span className="up-gradient-text">Cosmos</span>
            </h1>
            <p className="up-hero-subtitle">
              Experience breathtaking astronomical adventures in our state-of-the-art 
              digital planetarium. From black holes to distant galaxies, embark on 
              unforgettable cosmic journeys.
            </p>
            <div className="up-hero-features">
              <div className="up-feature">
                <div className="up-feature-icon">🌌</div>
                <span>8K Digital Dome</span>
              </div>
              <div className="up-feature">
                <div className="up-feature-icon">🔊</div>
                <span>15.1 Surround Sound</span>
              </div>
              <div className="up-feature">
                <div className="up-feature-icon">👨‍🏫</div>
                <span>Expert Guides</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Shows Section */}
      <section className="up-featured-section">
        <div className="up-container">
          <motion.div
            className="up-section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Featured Cosmic Experiences</h2>
            <p>Handpicked shows that will transport you across the universe</p>
          </motion.div>

          <div className="up-featured-grid">
            {upcomingShows.map((show, index) => (
              <motion.div
                key={show.id}
                className="up-show-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Status Badge */}
                <div 
                  className="up-status-badge"
                  style={{ backgroundColor: getStatusColor(show.status) }}
                >
                  {getStatusIcon(show.status)}
                  <span>{show.status.charAt(0).toUpperCase() + show.status.slice(1)}</span>
                </div>

                {/* Show Image */}
                <div className="up-show-image-container">
                  <img src={show.image} alt={show.title} />
                  <div className="up-image-overlay">
                    <div className="up-venue-tag">
                      <LocationOn className="up-venue-icon" />
                      {show.venue}
                    </div>
                  </div>
                </div>

                {/* Show Content */}
                <div className="up-show-content">
                  <div className="up-show-header">
                    <h3 className="up-show-title">{show.title}</h3>
                    <div className="up-show-rating">
                      <Star className="up-star-icon" />
                      <span className="up-rating">{show.rating}</span>
                      <span className="up-reviews">({show.reviews})</span>
                    </div>
                  </div>

                  <p className="up-show-description">{show.description}</p>

                  {/* Quick Info */}
                  <div className="up-quick-info">
                    <div className="up-info-item">
                      <CalendarToday className="up-info-icon" />
                      <span>{formatDate(show.date)}</span>
                    </div>
                    <div className="up-info-item">
                      <Schedule className="up-info-icon" />
                      <span>{show.time} • {show.duration}</span>
                    </div>
                    <div className="up-info-item">
                      <Groups className="up-info-icon" />
                      <span>{show.ageGroup}</span>
                    </div>
                    <div className="up-info-item">
                      <Language className="up-info-icon" />
                      <span>{show.language}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="up-features-grid">
                    {show.features.map((feature, idx) => (
                      <div key={idx} className="up-feature-item">
                        <div className="up-feature-dot"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Action */}
                  <div className="up-show-footer">
                    <div className="up-pricing-section">
                      <div className="up-price-container">
                        <div className="up-price-original">₹{show.originalPrice}</div>
                        <div className="up-price-current">₹{show.price}</div>
                        <div className="up-discount-tag">Save {show.discount}%</div>
                      </div>
                      <div className="up-seats-available">
                        🎫 Only {show.seats} seats left
                      </div>
                    </div>
                    
                    <div className="up-action-section">
                      <Link
                        to={`/booking/${show.id}`}
                        className="up-book-btn"
                      >
                        <ConfirmationNumber className="up-btn-icon" />
                        Book Your Journey
                      </Link>
                      <div className="up-urgency-tag">
                        ⚡ Selling Fast
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="up-stats-section">
        <div className="up-container">
          <div className="up-stats-grid">
            <motion.div
              className="up-stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="up-stat-number">10K+</div>
              <div className="up-stat-label">Cosmic Explorers</div>
              <div className="up-stat-desc">Joined our space adventures</div>
            </motion.div>
            
            <motion.div
              className="up-stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="up-stat-number">98%</div>
              <div className="up-stat-label">Satisfaction Rate</div>
              <div className="up-stat-desc">Visitor experience rating</div>
            </motion.div>
            
            <motion.div
              className="up-stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="up-stat-number">4.8/5</div>
              <div className="up-stat-label">Average Rating</div>
              <div className="up-stat-desc">Across all shows</div>
            </motion.div>
            
            <motion.div
              className="up-stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="up-stat-number">50+</div>
              <div className="up-stat-label">Cosmic Shows</div>
              <div className="up-stat-desc">Unique experiences available</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="up-cta-section">
        <div className="up-container">
          <motion.div
            className="up-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="up-cta-text">
              <h2>Ready for Your Cosmic Adventure?</h2>
              <p>
                Don't miss out on these extraordinary journeys through space and time. 
                Book your tickets now and secure your spot among the stars.
              </p>
            </div>
            <div className="up-cta-actions">
              <Link to="/shows/all" className="up-cta-btn up-primary">
                View All Shows
              </Link>
              <Link to="/membership" className="up-cta-btn up-secondary">
                Become a Member
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingShows;