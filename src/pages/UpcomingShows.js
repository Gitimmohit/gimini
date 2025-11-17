// pages/UpcomingShows.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ConfirmationNumber,
  Schedule,
  Groups,
  VolumeUp,
  Star,
  FilterList,
  Search,
  EventAvailable,
  AccessTime,
  Language, 
  EmojiEvents
} from "@mui/icons-material";
import "./UpcomingShows.css";

const UpcomingShows = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const upcomingShows = [
    {
      id: 1,
      title: "Black Holes: The Dark Mystery",
      date: "2024-01-25",
      time: "6:00 PM",
      duration: "45 mins",
      image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      description: "Explore the enigmatic world of black holes, gravitational waves, and spacetime curvature in this mind-bending journey through Einstein's universe.",
      features: ["3D Simulation", "Expert Q&A", "Interactive Session", "Surround Sound"],
      status: "upcoming"
    },
    {
      id: 2,
      title: "Mars: The Red Planet Expedition",
      date: "2024-02-02",
      time: "4:00 PM",
      duration: "50 mins",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      description: "Journey to Mars and discover the secrets of the Red Planet, from ancient riverbeds to future colonization possibilities.",
      features: ["Live Telescope", "Kids Activity", "Take-home Kit", "Educational"],
      status: "upcoming"
    },
    {
      id: 3,
      title: "Cosmic Collisions: Universe in Motion",
      date: "2024-02-10",
      time: "7:30 PM",
      duration: "55 mins",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      description: "Witness the most spectacular cosmic collisions - from asteroid impacts to galaxy mergers in stunning 3D visualization.",
      features: ["3D Experience", "Surround Sound", "VR Elements", "Action-Packed"],
      status: "upcoming"
    },
    {
      id: 4,
      title: "Solar System: Our Cosmic Neighborhood",
      date: "2024-01-30",
      time: "3:00 PM",
      duration: "40 mins",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      description: "Take a guided tour through our solar system, exploring planets, moons, and the amazing phenomena that make our cosmic neighborhood unique.",
      features: ["Planet Tour", "Interactive Quiz", "Family Friendly", "Educational"],
      status: "upcoming"
    },
    {
      id: 5,
      title: "Stars: Life and Death of Celestial Giants",
      date: "2024-02-15",
      time: "8:00 PM",
      duration: "60 mins",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      description: "Explore the fascinating life cycle of stars, from stellar nurseries to supernova explosions and the formation of neutron stars and black holes.",
      features: ["Scientific Depth", "Expert Commentary", "Advanced Visuals", "Q&A Session"],
      status: "upcoming"
    },
    {
      id: 6,
      title: "Aurora: Dance of the Northern Lights",
      date: "2024-02-08",
      time: "9:00 PM",
      duration: "35 mins",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
      description: "Immerse yourself in the breathtaking beauty of auroras with this musical journey through the polar skies. A sensory experience like no other.",
      features: ["Musical Score", "Visual Spectacle", "Relaxing", "All Ages"],
      status: "upcoming"
    }
  ];

  const categories = [
    { value: "all", label: "All Shows", count: upcomingShows.length },
    { value: "scientific", label: "Scientific", count: upcomingShows.filter(show => show.category === "scientific").length },
    { value: "educational", label: "Educational", count: upcomingShows.filter(show => show.category === "educational").length },
    { value: "action", label: "Action", count: upcomingShows.filter(show => show.category === "action").length },
    { value: "visual", label: "Visual", count: upcomingShows.filter(show => show.category === "visual").length }
  ];

  const filteredShows = upcomingShows.filter(show => {
    const matchesFilter = filter === "all" || show.category === filter;
    const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         show.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         show.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="upcoming-shows-page">
      {/* Hero Section */}
      <section className="shows-hero">
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
            <h1 className="hero-title">Upcoming Cosmic Shows</h1>
            <p className="hero-subtitle">
              Embark on extraordinary journeys through space and time. Book your seat for 
              unforgettable astronomical experiences in our state-of-the-art digital dome.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">{upcomingShows.length}</div>
                <div className="stat-label">Upcoming Shows</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Visitor Satisfaction</div>
              </div>
              <div className="stat">
                <div className="stat-number">4.8/5</div>
                <div className="stat-label">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-content">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search shows by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-tabs">
              <div className="filter-header">
                <FilterList className="filter-icon" />
                <span>Filter by Category</span>
              </div>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`filter-btn ${filter === category.value ? 'active' : ''}`}
                    onClick={() => setFilter(category.value)}
                  >
                    {category.label}
                    <span className="filter-count">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shows Grid Section */}
      <section className="shows-grid-section">
        <div className="container">
          <motion.div
            className="results-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              {filteredShows.length} {filter === 'all' ? 'Upcoming' : filter} Shows Found
            </h2>
            <p className="section-subtitle">
              Book in advance to secure your preferred date and time
            </p>
          </motion.div>

          <div className="shows-grid">
            {filteredShows.map((show, index) => (
              <motion.div
                key={show.id}
                className="show-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Show Image with Overlay */}
                <div className="show-image-container">
                  <img src={show.image} alt={show.title} />
                  <div className="show-overlay">
                    <div className="show-tags">
                      {show.tags.map(tag => (
                        <span key={tag} className="show-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="discount-badge">
                      {show.discount}% OFF
                    </div>
                    <div className="seats-indicator">
                      <span className="seats-count">🎫 {show.seats} seats left</span>
                    </div>
                  </div>
                </div>

                {/* Show Content */}
                <div className="show-content">
                  <div className="show-header">
                    <h3 className="show-title">{show.title}</h3>
                    <div className="show-rating">
                      <Star className="star-icon" />
                      <span className="rating">{show.rating}</span>
                      <span className="reviews">({show.reviews})</span>
                    </div>
                  </div>

                  <p className="show-description">{show.description}</p>

                  {/* Show Features */}
                  <div className="show-features">
                    {show.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">✓ {feature}</span>
                    ))}
                  </div>

                  {/* Show Meta Information */}
                  <div className="show-meta">
                    <div className="meta-item">
                      <EventAvailable className="meta-icon" />
                      <div>
                        <div className="meta-value">{formatDate(show.date)}</div>
                        <div className="meta-label">Date</div>
                      </div>
                    </div>
                    <div className="meta-item">
                      <AccessTime className="meta-icon" />
                      <div>
                        <div className="meta-value">{show.time} • {show.duration}</div>
                        <div className="meta-label">Timing</div>
                      </div>
                    </div>
                    <div className="meta-item">
                      <Groups className="meta-icon" />
                      <div>
                        <div className="meta-value">{show.ageGroup}</div>
                        <div className="meta-label">Age Group</div>
                      </div>
                    </div>
                    <div className="meta-item">
                      <Language className="meta-icon" />
                      <div>
                        <div className="meta-value">{show.language}</div>
                        <div className="meta-label">Language</div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="show-actions">
                    <div className="pricing">
                      <div className="price-original">₹{show.originalPrice}</div>
                      <div className="price-current">₹{show.price}</div>
                      <div className="price-note">per person</div>
                    </div>
                    <div className="action-buttons">
                      <Link 
                        to={`/booking/${show.id}`} 
                        className="btn primary-btn"
                      >
                        <ConfirmationNumber className="btn-icon" />
                        Book Now
                      </Link>
                      <button className="btn secondary-btn">
                        <Schedule className="btn-icon" />
                        Remind Me
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredShows.length === 0 && (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <EmojiEvents className="empty-icon" />
              <h3>No shows found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="btn primary-btn"
                onClick={() => {
                  setFilter('all');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="shows-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Can't Find What You're Looking For?</h2>
            <p>Contact us for private shows, school programs, or custom astronomical experiences</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary-btn large">
                Contact Us
              </Link>
              <Link to="/register" className="btn secondary-btn large">
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UpcomingShows;