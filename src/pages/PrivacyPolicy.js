// pages/PrivacyPolicy.js
import React from "react";
import { motion } from "framer-motion";
import { Security, PrivacyTip, Shield, Visibility } from "@mui/icons-material";
import "./LegalPages.css";

const PrivacyPolicy = () => {
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
              <PrivacyTip sx={{ fontSize: 60, color: "#64ffda" }} />
            </div>
            <h1>Privacy Policy</h1>
            <p className="tr-last-updated">Last updated: December 1, 2024</p>
            <p className="tr-hero-description">
              At Cosmic Vision Planetarium, we are committed to protecting your privacy 
              and ensuring the security of your personal information.
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
                  <li><a href="#information-collection">Information We Collect</a></li>
                  <li><a href="#how-we-use">How We Use Information</a></li>
                  <li><a href="#data-sharing">Data Sharing</a></li>
                  <li><a href="#data-security">Data Security</a></li>
                  <li><a href="#your-rights">Your Rights</a></li>
                  <li><a href="#cookies">Cookies</a></li>
                  <li><a href="#children-privacy">Children's Privacy</a></li>
                  <li><a href="#changes">Policy Changes</a></li>
                  <li><a href="#contact">Contact Us</a></li>
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
              {/* Introduction */}
              <section className="tr-policy-section">
                <h2>Introduction</h2>
                <p>
                  Cosmic Vision Planetarium ("we," "our," or "us") operates the cosmicvisionplanetarium.com 
                  website and mobile planetarium services. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              {/* Information Collection */}
              <section id="information-collection" className="tr-policy-section">
                <div className="tr-section-header">
                  <Security sx={{ color: "#64ffda", mr: 2 }} />
                  <h2>Information We Collect</h2>
                </div>
                
                <div className="tr-info-categories">
                  <div className="tr-info-category">
                    <h4>Personal Information</h4>
                    <ul>
                      <li>Name and contact details (email, phone number)</li>
                      <li>School/organization information</li>
                      <li>Billing and payment information</li>
                      <li>Student grade levels and group sizes</li>
                    </ul>
                  </div>

                  <div className="tr-info-category">
                    <h4>Automatically Collected Information</h4>
                    <ul>
                      <li>IP address and browser type</li>
                      <li>Device information</li>
                      <li>Usage data and website interactions</li>
                      <li>Cookies and tracking technologies</li>
                    </ul>
                  </div>

                  <div className="tr-info-category">
                    <h4>Educational Information</h4>
                    <ul>
                      <li>Curriculum requirements</li>
                      <li>Learning objectives</li>
                      <li>Student feedback and surveys</li>
                      <li>Educational performance data (anonymized)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section id="how-we-use" className="tr-policy-section">
                <h2>How We Use Your Information</h2>
                <div className="tr-usage-grid">
                  <div className="tr-usage-item">
                    <div className="tr-usage-icon">🎯</div>
                    <div className="tr-usage-content">
                      <h4>Service Delivery</h4>
                      <p>To provide and manage planetarium shows, process bookings, and communicate with you about our services.</p>
                    </div>
                  </div>

                  <div className="tr-usage-item">
                    <div className="tr-usage-icon">📚</div>
                    <div className="tr-usage-content">
                      <h4>Educational Purposes</h4>
                      <p>To customize educational content and improve learning experiences for students.</p>
                    </div>
                  </div>

                  <div className="tr-usage-item">
                    <div className="tr-usage-icon">🔒</div>
                    <div className="tr-usage-content">
                      <h4>Security & Safety</h4>
                      <p>To ensure the security of our services and protect against fraudulent activities.</p>
                    </div>
                  </div>

                  <div className="tr-usage-item">
                    <div className="tr-usage-icon">📊</div>
                    <div className="tr-usage-content">
                      <h4>Analytics & Improvement</h4>
                      <p>To analyze usage patterns and improve our website and services.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="tr-policy-section">
                <h2>Data Sharing and Disclosure</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
                
                <div className="tr-sharing-list">
                  <div className="tr-sharing-item">
                    <h4>Service Providers</h4>
                    <p>Trusted partners who assist in operating our website and services (payment processors, hosting providers).</p>
                  </div>

                  <div className="tr-sharing-item">
                    <h4>Educational Institutions</h4>
                    <p>Schools and educational organizations for program coordination and reporting.</p>
                  </div>

                  <div className="tr-sharing-item">
                    <h4>Legal Requirements</h4>
                    <p>When required by law, regulation, or legal process.</p>
                  </div>

                  <div className="tr-sharing-item">
                    <h4>Business Transfers</h4>
                    <p>In connection with a merger, acquisition, or sale of all or a portion of our assets.</p>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section id="data-security" className="tr-policy-section">
                <div className="tr-section-header">
                  <Shield sx={{ color: "#64ffda", mr: 2 }} />
                  <h2>Data Security</h2>
                </div>
                
                <p>
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <div className="tr-security-measures">
                  <h4>Our Security Measures Include:</h4>
                  <ul>
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and firewalls</li>
                    <li>Regular security assessments</li>
                    <li>Limited access to personal information</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="tr-policy-section">
                <h2>Your Rights</h2>
                <p>You have the following rights regarding your personal information:</p>
                
                <div className="tr-rights-grid">
                  <div className="tr-right-item">
                    <h4>Access & Portability</h4>
                    <p>Request access to and copies of your personal data.</p>
                  </div>

                  <div className="tr-right-item">
                    <h4>Correction</h4>
                    <p>Request correction of inaccurate or incomplete information.</p>
                  </div>

                  <div className="tr-right-item">
                    <h4>Deletion</h4>
                    <p>Request deletion of your personal information under certain circumstances.</p>
                  </div>

                  <div className="tr-right-item">
                    <h4>Objection</h4>
                    <p>Object to processing of your personal information.</p>
                  </div>

                  <div className="tr-right-item">
                    <h4>Restriction</h4>
                    <p>Request restriction of processing your personal information.</p>
                  </div>

                  <div className="tr-right-item">
                    <h4>Withdraw Consent</h4>
                    <p>Withdraw consent at any time where we rely on consent to process your information.</p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="tr-policy-section">
                <h2>Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and 
                  hold certain information. Cookies are files with a small amount of data which may include 
                  an anonymous unique identifier.
                </p>

                <div className="tr-cookies-types">
                  <h4>Types of Cookies We Use:</h4>
                  <div className="tr-cookie-list">
                    <div className="tr-cookie-type">
                      <h5>Essential Cookies</h5>
                      <p>Required for basic website functionality and security.</p>
                    </div>
                    <div className="tr-cookie-type">
                      <h5>Analytics Cookies</h5>
                      <p>Help us understand how visitors interact with our website.</p>
                    </div>
                    <div className="tr-cookie-type">
                      <h5>Preference Cookies</h5>
                      <p>Remember your settings and preferences.</p>
                    </div>
                  </div>
                </div>

                <p className="tr-cookie-control">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                  However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="children-privacy" className="tr-policy-section">
                <div className="tr-section-header">
                  <Visibility sx={{ color: "#64ffda", mr: 2 }} />
                  <h2>Children's Privacy</h2>
                </div>
                
                <p>
                  Our services are primarily directed to educational institutions rather than directly to children. 
                  However, we take children's privacy seriously:
                </p>

                <div className="tr-children-privacy-content">
                  <ul>
                    <li>We do not knowingly collect personal information from children under 13</li>
                    <li>Schools and parents must provide consent for student data collection</li>
                    <li>We collect minimal student information necessary for educational purposes</li>
                    <li>Student data is protected with enhanced security measures</li>
                    <li>Parents can request to review or delete their child's information</li>
                  </ul>
                </div>
              </section>

              {/* Policy Changes */}
              <section id="changes" className="tr-policy-section">
                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to 
                  this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              {/* Contact Information */}
              <section id="contact" className="tr-policy-section">
                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                
                <div className="tr-contact-info">
                  <div className="tr-contact-method">
                    <strong>Email:</strong> privacy@cosmicvisionplanetarium.com
                  </div>
                  <div className="tr-contact-method">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </div>
                  <div className="tr-contact-method">
                    <strong>Address:</strong> 123 Space Exploration Way, Cosmos City, SC 12345
                  </div>
                </div>

                <div className="tr-response-time">
                  <p>
                    We strive to respond to all privacy-related inquiries within 48 hours. For data 
                    access or deletion requests, we will process your request within 30 days as required by law.
                  </p>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
