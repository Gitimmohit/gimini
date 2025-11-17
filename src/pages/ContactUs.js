// pages/ContactUs.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LocationOn,
  Phone,
  Email,
  Schedule,
  Send,
  Star,
  Public,
  SupportAgent,
  CheckCircle
} from "@mui/icons-material";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general"
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <LocationOn className="contact-icon" />,
      title: "Visit Our Planetarium",
      details: ["Cosmic Vision Planetarium", "Space Science Road", "Galaxy City, GC 100001"],
      description: "Located in the heart of the city with ample parking space"
    },
    {
      icon: <Phone className="contact-icon" />,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "Available 9:00 AM - 9:00 PM, 7 days a week"
    },
    {
      icon: <Email className="contact-icon" />,
      title: "Email Us",
      details: ["info@cosmicvision.com", "bookings@cosmicvision.com"],
      description: "We typically respond within 2-4 hours"
    },
   
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "booking", label: "Show Booking" },
    { value: "school", label: "School Programs" },
    { value: "private", label: "Private Events" },
    { value: "technical", label: "Technical Support" },
    { value: "partnership", label: "Partnership" }
  ];

  const faqs = [
    {
      question: "How far in advance should I book tickets?",
      answer: "We recommend booking at least 3-5 days in advance for regular shows and 1-2 weeks for special events and weekends."
    },
    {
      question: "Do you offer discounts for school groups?",
      answer: "Yes! We offer special educational rates for school groups of 20 or more students. Contact us for customized educational packages."
    },
    {
      question: "Is the planetarium wheelchair accessible?",
      answer: "Absolutely! Our facility is fully wheelchair accessible with ramps, elevators, and designated seating areas."
    },
    {
      question: "Can I host a private event at the planetarium?",
      answer: "Yes, we offer private event hosting for birthdays, corporate events, and special occasions. Contact us for availability and pricing."
    }
  ];

  return (
    <div className="contact-us-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-background">
          <div className="stars-overlay"></div>
          <div className="floating-planets">
            <div className="planet earth"></div>
            <div className="planet mars"></div>
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
              <SupportAgent className="badge-icon" />
              We're Here to Help
            </div>
            <h1 className="hero-title">
              Contact <span className="gradient-text">Cosmic Vision</span>
            </h1>
            <p className="hero-subtitle">
              Have questions about our shows, bookings, or special events? Our cosmic support team is ready to assist you on your astronomical journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="contact-cards-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Get in Touch</h2>
            <p>Multiple ways to reach our cosmic support team</p>
          </motion.div>

          <div className="contact-cards-grid">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={index}
                className="contact-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="contact-card-icon">
                  {contact.icon}
                </div>
                <h3>{contact.title}</h3>
                <div className="contact-details">
                  {contact.details.map((detail, idx) => (
                    <p key={idx} className="detail-item">{detail}</p>
                  ))}
                </div>
                <p className="contact-description">{contact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-container">
            <motion.div
              className="form-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>

              {isSubmitted ? (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="success-icon" />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for contacting us. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiryType">Type of Inquiry</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tell us about your inquiry, questions, or how we can help you..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="btn-icon" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            <motion.div
              className="form-sidebar"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="sidebar-card">
                <Star className="sidebar-icon" />
                <h3>Why Choose Cosmic Vision?</h3>
                <ul className="features-list">
                  <li>🎯 98% Customer Satisfaction Rate</li>
                  <li>🚀 State-of-the-art Digital Dome</li>
                  <li>👨‍🏫 Expert Astronomer Guides</li>
                  <li>🏆 Award-winning Shows</li>
                  <li>💫 Immersive 8K Projection</li>
                  <li>🔊 15.1 Surround Sound System</li>
                </ul>
              </div>

              <div className="sidebar-card emergency">
                <Public className="sidebar-icon" />
                <h3>Emergency Contact</h3>
                <p>For urgent matters during show hours:</p>
                <div className="emergency-contact">
                  <Phone className="emergency-icon" />
                  <span>+91 98765 43212</span>
                </div>
                <p className="emergency-note">Available during operating hours for immediate assistance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </motion.div>

          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="location-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Find Our Planetarium</h2>
            <p>Visit us for an unforgettable cosmic experience</p>
          </motion.div>

          <div className="location-content">
            <motion.div
              className="location-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Cosmic Vision Planetarium</h3>
              <div className="address-details">
                <LocationOn className="address-icon" />
                <div>
                  <p className="address-line">Space Science Road, Galaxy City</p>
                  <p className="address-line">Near Central Observatory</p>
                  <p className="address-line">GC 100001</p>
                </div>
              </div>
              
              <div className="transport-info">
                <h4>How to Reach</h4>
                <div className="transport-options">
                  <div className="transport-option">
                    <span>🚇 Metro</span>
                    <p>Nearest station: Galaxy Central (5 min walk)</p>
                  </div>
                  <div className="transport-option">
                    <span>🚌 Bus</span>
                    <p>Routes: 101, 205, 308 (Stop: Planetarium Road)</p>
                  </div>
                  <div className="transport-option">
                    <span>🚗 Car</span>
                    <p>Ample parking available (₹50 for 4 hours)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="map-placeholder"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="map-container">
                <div className="map-overlay">
                  <Public className="map-icon" />
                  <h4>Interactive Map</h4>
                  <p>Click to view directions</p>
                  <button className="map-btn">View on Google Maps</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;