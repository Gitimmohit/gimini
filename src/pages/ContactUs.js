// pages/ContactUs.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import pic1 from "../assets/pic1.png";

import {
  LocationOn,
  Phone,
  Email,
  Schedule,
  Send,
  Star,
  Public,
  SupportAgent,
  CheckCircle,
} from "@mui/icons-material";
import "./ContactUs.css";
import { toast } from "react-toastify";
import { ServerAddress } from "../server/ServerAddress";
import axios from "axios";

// 🔥 Common fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${ServerAddress}cards/contact_us/`,
        formData
      );

      if (response.data?.success) {
        toast.success(response.data.message || "Form submitted successfully!");
        setIsSubmitted(true);
      }

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }

    setIsLoading(false);
  };

  const contactInfo = [
    {
      icon: <LocationOn className="con-contact-icon" />,
      title: "Visit Our Planetarium",
      details: [
        "Cosmic Vision Planetarium",
        "Space Science Road",
        "Galaxy City, GC 100001",
      ],
      description: "Located in the heart of the city with ample parking space",
    },
    {
      icon: <Phone className="con-contact-icon" />,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "Available 9:00 AM - 9:00 PM, 7 days a week",
    },
    {
      icon: <Email className="con-contact-icon" />,
      title: "Email Us",
      details: ["info@geminiplanetarium.com", "bookings@geminiplanetarium.com"],
      description: "We typically respond within 2-4 hours",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "booking", label: "Show Booking" },
    { value: "school", label: "School Programs" },
    { value: "private", label: "Private Events" },
    { value: "technical", label: "Technical Support" },
    { value: "partnership", label: "Partnership" },
  ];

  const faqs = [
    {
      question: "How far in advance should I book tickets?",
      answer:
        "We recommend booking 3-5 days in advance for regular shows and 1-2 weeks for weekends.",
    },
    {
      question: "Do you offer discounts for school groups?",
      answer:
        "Yes, discounted educational packages are available for groups of 20+ students.",
    },
    {
      question: "Is the planetarium wheelchair accessible?",
      answer:
        "Absolutely! Our facility includes ramps, elevators, and accessible seating.",
    },
    {
      question: "Can I host a private event at the planetarium?",
      answer:
        "Yes! We host birthdays, corporate events, and special occasions.",
    },
  ];

  return (
    <div className="con-contact-us-page">
      {/* HERO SECTION */}
      <section className="con-contact-hero">
        <img
          src={pic1}
          alt="Digital Dome Projection"
          className="con-hero-img"
        />

        <div className="con-hero-wrapper">
          <motion.div
            className="con-hero-content"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8 }}
          >
            <h1 className="con-hero-title">
              Contact <span className="con-gradient-text">Cosmic Vision</span>
            </h1>
            <p className="con-hero-subtitle">
              Have questions? Our cosmic support team is here to help.
            </p>

            <div className="con-hero-badge">
              <SupportAgent className="con-badge-icon" />
              We're Here to Help
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="con-contact-cards-section">
        <div className="con-container">
          <motion.div
            className="con-section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Get in Touch</h2>
            <p>Multiple ways to connect with us</p>
          </motion.div>

          <div className="con-contact-cards-grid">
            {contactInfo.map((contact, i) => (
              <motion.div
                key={i}
                className="con-contact-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="con-contact-card-icon">{contact.icon}</div>
                <h3>{contact.title}</h3>

                <div className="con-contact-details">
                  {contact.details.map((d, idx) => (
                    <p key={idx}>{d}</p>
                  ))}
                </div>

                <p className="con-contact-description">{contact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="con-contact-form-section">
        <div className="con-container">
          <div className="con-form-container">
            {/* LEFT FORM */}
            <motion.div
              className="con-form-content"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Send Us a Message</h2>
              <p>Fill out the form and we’ll respond shortly</p>

              {isSubmitted ? (
                <motion.div
                  className="con-success-message"
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.7 }}
                >
                  <CheckCircle className="con-success-icon" />
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for contacting us.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="con-contact-form">
                  <div className="con-form-row">
                    <div className="con-form-group">
                      <label>Full Name *</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="con-form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="con-form-group">
                    <label>Type of Inquiry</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      {inquiryTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="con-form-group">
                    <label>Subject *</label>
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Enter subject"
                    />
                  </div>

                  <div className="con-form-group">
                    <label>Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      required
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className={`con-submit-btn ${
                      isLoading ? "con-submitting" : ""
                    }`}
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isLoading ? (
                      <>
                        <div className="con-spinner"></div> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="con-btn-icon" /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* RIGHT SIDEBAR */}
            <motion.div
              className="con-form-sidebar"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.9, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="con-sidebar-card">
                <h3>
                  <Star className="con-sidebar-icon" /> Why Choose Cosmic
                  Vision?
                </h3>
                <ul className="con-features-list">
                  <li>🎯 98% Customer Satisfaction</li>
                  <li>🚀 State-of-the-art Digital Dome</li>
                  <li>👨‍🏫 Expert Astronomers</li>
                  <li>🏆 Award-winning Shows</li>
                  <li>💫 8K Immersive Projection</li>
                  <li>🔊 15.1 Surround Sound</li>
                </ul>
              </div>

              <div className="con-sidebar-card con-emergency">
                <Public className="con-sidebar-icon" />
                <h3>Emergency Contact</h3>
                <p>For urgent matters during show hours:</p>

                <div className="con-emergency-contact">
                  <Phone className="con-emergency-icon" />
                  <span>+91 98765 43212</span>
                </div>

                <p className="con-emergency-note">
                  Available during operating hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="con-contact-faq">
        <div className="con-container">
          <motion.div
            className="con-section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </motion.div>

          <div className="con-faq-grid">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="con-faq-item"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="con-location-section">
        <div className="con-container">
          <motion.div
            className="con-section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Find Our Planetarium</h2>
            <p>Visit us for an unforgettable cosmic experience</p>
          </motion.div>

          <div className="con-location-content">
            {/* LEFT SIDE */}
            <motion.div
              className="con-location-info"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>Cosmic Vision Planetarium</h3>

              <div className="con-address-details">
                <LocationOn className="con-address-icon" />
                <div>
                  <p className="con-address-line">
                    Space Science Road, Galaxy City
                  </p>
                  <p className="con-address-line">Near Central Observatory</p>
                  <p className="con-address-line">GC 100001</p>
                </div>
              </div>

              <div className="con-transport-info">
                <h4>How to Reach</h4>

                <div className="con-transport-options">
                  <div className="con-transport-option">
                    <span>🚇 Metro</span>
                    <p>Nearest: Galaxy Central (5 min walk)</p>
                  </div>

                  <div className="con-transport-option">
                    <span>🚌 Bus</span>
                    <p>Routes: 101, 205, 308</p>
                  </div>

                  <div className="con-transport-option">
                    <span>🚗 Car</span>
                    <p>Ample parking (₹50 for 4 hours)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT MAP */}
            <motion.div
              className="con-map-placeholder"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{ duration: 0.9, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="con-map-container">
                <div className="con-map-overlay">
                  <Public className="con-map-icon" />
                  <h4>Interactive Map</h4>
                  <p>Click to view directions</p>
                  <button className="con-map-btn">View on Google Maps</button>
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
