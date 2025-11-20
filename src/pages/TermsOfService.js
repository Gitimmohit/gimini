// pages/TermsOfService.js
import React from "react";
import { motion } from "framer-motion";
import { Gavel, Description, Business, School } from "@mui/icons-material";
import "./LegalPages.css";

const TermsOfService = () => {
  return (
    <div className="tr-legal-page">
      {/* Header Section */}
      <section className="tr-legal-hero">
        <div className="tr-container">
          <motion.div
            className="tr-legal-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="tr-legal-icon">
              <Gavel sx={{ fontSize: 60, color: "#64ffda" }} />
            </div>
            <h1>Terms of Service</h1>
            <p className="tr-last-updated">Last updated: December 1, 2024</p>
            <p className="tr-hero-description">
              Please read these Terms of Service carefully before using our website
              and mobile planetarium services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="tr-legal-content">
        <div className="tr-container">
          <div className="tr-content-wrapper">
            {/* Table of Contents */}
            <motion.div
              className="tr-table-of-contents"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>Table of Contents</h3>
              <nav>
                <ul>
                  <li><a href="#agreement">Agreement to Terms</a></li>
                  <li><a href="#services">Our Services</a></li>
                  <li><a href="#bookings">Bookings & Payments</a></li>
                  <li><a href="#cancellations">Cancellations & Refunds</a></li>
                  <li><a href="#user-responsibilities">User Responsibilities</a></li>
                  <li><a href="#intellectual-property">Intellectual Property</a></li>
                  <li><a href="#liability">Limitation of Liability</a></li>
                  <li><a href="#indemnification">Indemnification</a></li>
                  <li><a href="#termination">Termination</a></li>
                  <li><a href="#governing-law">Governing Law</a></li>
                  <li><a href="#changes">Changes to Terms</a></li>
                  <li><a href="#contact">Contact Information</a></li>
                </ul>
              </nav>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="tr-legal-main-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Agreement to Terms */}
              <section id="agreement" className="tr-policy-section">
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing or using Cosmic Vision Planetarium's website, mobile planetarium
                  services, and related offerings (collectively, the "Services"), you agree to be
                  bound by these Terms of Service and our Privacy Policy.
                </p>
                <div className="tr-notice-box tr-important">
                  <h4>Important Notice</h4>
                  <p>
                    If you are using our Services on behalf of a school, educational institution,
                    or organization, you represent that you have the authority to bind that entity
                    to these Terms.
                  </p>
                </div>
              </section>

              {/* Our Services */}
              <section id="services" className="tr-policy-section">
                <div className="tr-section-header">
                  <Business sx={{ color: "#64ffda", mr: 2 }} />
                  <h2>2. Our Services</h2>
                </div>

                <h4>2.1 Mobile Planetarium Services</h4>
                <p>We provide educational planetarium experiences including:</p>
                <ul>
                  <li>Mobile inflatable dome setup and operation</li>
                  <li>Educational shows and presentations</li>
                  <li>Curriculum-aligned space science programs</li>
                  <li>Interactive learning experiences</li>
                  <li>Teacher resources and support materials</li>
                </ul>

                <h4>2.2 Service Requirements</h4>
                <div className="tr-requirements-grid">
                  <div className="tr-requirement-item">
                    <h5>Space Requirements</h5>
                    <p>20 × 20 ft area with 10 ft ceiling height minimum</p>
                  </div>
                  <div className="tr-requirement-item">
                    <h5>Power Requirements</h5>
                    <p>Standard electrical outlet access</p>
                  </div>
                  <div className="tr-requirement-item">
                    <h5>Setup Time</h5>
                    <p>Approximately 45-60 minutes</p>
                  </div>
                  <div className="tr-requirement-item">
                    <h5>Capacity</h5>
                    <p>60-70 students per show</p>
                  </div>
                </div>

                <h4>2.3 Modifications to Services</h4>
                <p>
                  We reserve the right to modify, suspend, or discontinue any part of our Services
                  at any time. We will provide reasonable notice for any significant changes that
                  may affect scheduled bookings.
                </p>
              </section>

              {/* Bookings & Payments */}
              <section id="bookings" className="tr-policy-section">
                <h2>3. Bookings & Payments</h2>

                <h4>3.1 Booking Process</h4>
                <ul>
                  <li>Bookings must be made through our official website or authorized staff</li>
                  <li>50% deposit required to confirm booking</li>
                  <li>Full payment due 7 days before the event</li>
                  <li>Bookings are confirmed only when deposit is received</li>
                </ul>

                <h4>3.2 Pricing and Taxes</h4>
                <p>
                  All prices are quoted in local currency and exclude applicable taxes. We may
                  update prices with 30 days notice for future bookings.
                </p>

                <h4>3.3 Payment Methods</h4>
                <div className="tr-payment-methods">
                  <span>Credit/Debit Cards</span>
                  <span>Bank Transfers</span>
                  <span>School Purchase Orders</span>
                  <span>Educational Grants</span>
                </div>
              </section>

              {/* Cancellations */}
              <section id="cancellations" className="tr-policy-section">
                <h2>4. Cancellations & Refunds</h2>

                <div className="tr-cancellation-policy">
                  <div className="tr-policy-tier">
                    <h5>30+ Days Notice</h5>
                    <p>Full deposit refund</p>
                  </div>
                  <div className="tr-policy-tier">
                    <h5>15-29 Days Notice</h5>
                    <p>50% deposit refund</p>
                  </div>
                  <div className="tr-policy-tier">
                    <h5>8-14 Days Notice</h5>
                    <p>25% deposit refund</p>
                  </div>
                  <div className="tr-policy-tier">
                    <h5>0-7 Days Notice</h5>
                    <p>No refund</p>
                  </div>
                </div>
              </section>

              {/* User Responsibilities */}
              <section id="user-responsibilities" className="tr-policy-section">
                <div className="tr-section-header">
                  <School sx={{ color: "#64ffda", mr: 2 }} />
                  <h2>5. User Responsibilities</h2>
                </div>

                <h4>5.1 School/Organization Responsibilities</h4>
                <ul>
                  <li>Provide adequate space</li>
                  <li>Ensure safe access</li>
                  <li>Provide supervision</li>
                  <li>Communicate special requirements</li>
                </ul>

                <h4>5.2 Prohibited Activities</h4>
                <div className="tr-prohibited-list">
                  <div className="tr-prohibited-item"><span>❌</span><span>Damaging equipment</span></div>
                  <div className="tr-prohibited-item"><span>❌</span><span>No food/drinks</span></div>
                  <div className="tr-prohibited-item"><span>❌</span><span>No unauthorized recording</span></div>
                </div>
              </section>

              {/* Remaining sections simplified */}
              <section id="intellectual-property" className="tr-policy-section">
                <h2>6. Intellectual Property</h2>
                <p>All content is protected by copyright and intellectual property laws.</p>
              </section>

              <section id="liability" className="tr-policy-section">
                <h2>7. Limitation of Liability</h2>
                <div className="tr-notice-box tr-warning">
                  <h4>Important Limitation</h4>
                  <p>We are not liable for indirect or consequential damages.</p>
                </div>
              </section>

              <section id="indemnification" className="tr-policy-section">
                <h2>8. Indemnification</h2>
                <p>You agree to indemnify and hold us harmless against claims related to misuse.</p>
              </section>

              <section id="termination" className="tr-policy-section">
                <h2>9. Termination</h2>
                <p>We may terminate your access at any time for violation of terms.</p>
              </section>

              <section id="governing-law" className="tr-policy-section">
                <h2>10. Governing Law</h2>
                <p>These Terms are governed by the laws of California.</p>
              </section>

              <section id="changes" className="tr-policy-section">
                <h2>11. Changes to Terms</h2>
                <p>We may update Terms anytime. Continued use means acceptance.</p>
              </section>

              <section id="contact" className="tr-policy-section">
                <h2>12. Contact Information</h2>
                <div className="tr-contact-info">
                  <div><strong>Email:</strong> legal@cosmicvisionplanetarium.com</div>
                  <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                  <div><strong>Address:</strong> 123 Space Exploration Way</div>
                </div>
              </section>

            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
