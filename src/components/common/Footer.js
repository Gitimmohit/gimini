// components/common/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Email,
  Phone,
  LocationOn,
  Schedule,
  School,
  BusinessCenter,
  Campaign,
  Star,
} from "@mui/icons-material";
import "./Footer.css";

const Footer = () => {
  const accessToken = useSelector((state) => state.user.access_token);

  return (
    <>
      {!accessToken ? (
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-main">
              {/* Brand Section */}
              <div className="footer-brand">
                <div className="brand-logo">
                  <Star className="logo-icon" />
                  <span className="brand-name">Gemini Planetarium</span>
                </div>
                <p className="brand-description">
                  Where the universe comes alive. Experience breathtaking
                  astronomical shows in our state-of-the-art digital dome
                  theater. Explore, learn, and be inspired by the wonders of
                  space.
                </p>

                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <Facebook />
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <Twitter />
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <Instagram />
                  </a>
                  <a href="#" className="social-link" aria-label="YouTube">
                    <YouTube />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-links">
                <h4 className="links-title">Explore</h4>
                <ul className="links-list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/shows">Upcoming Shows</Link>
                  </li>
                  <li>
                    <Link to="/shows">Current Events</Link>
                  </li>
                  <li>
                    <Link to="/shows">Special Exhibits</Link>
                  </li>
                  <li>
                    <Link to="/referral">Refer & Earn</Link>
                  </li>
                </ul>
              </div>

              {/* User Types */}
              <div className="footer-links">
                <h4 className="links-title">Join Our Community</h4>
                <ul className="links-list">
                  <li>
                    <Link to="/registerstudent">
                      <School sx={{ fontSize: 16, marginRight: 1 }} />
                      Student
                    </Link>
                  </li>
                  <li>
                    <Link to="/registersales">
                      <BusinessCenter sx={{ fontSize: 16, marginRight: 1 }} />
                      Sales Person
                    </Link>
                  </li>
                  <li>
                    <Link to="/registerpromoter">
                      <Campaign sx={{ fontSize: 16, marginRight: 1 }} />
                      Promoter
                    </Link>
                  </li>
                  <li>
                    <Link to="/referral">Referral Program</Link>
                  </li>
                </ul>
              </div>

              {/* Contact Section */}
              <div className="footer-contact">
                <h4 className="links-title">Visit Us</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <LocationOn className="contact-icon" />
                    <div>
                      <div className="contact-text">
                        Cosmic Vision Planetarium
                      </div>
                      <div className="contact-subtext">
                        Space Science Road, Galaxy City
                      </div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <div>
                      <div className="contact-text">+91 98765 43210</div>
                      <div className="contact-subtext">Mon-Sun, 9AM-6PM</div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Email className="contact-icon" />
                    <div>
                      <div className="contact-text">
                        info@geminiplanetarium.com
                      </div>
                      <div className="contact-subtext">
                        Quick response guaranteed
                      </div>
                    </div>
                  </div>

                  <div className="contact-item">
                    <Schedule className="contact-icon" />
                    <div>
                      <div className="contact-text">Open Daily</div>
                      <div className="contact-subtext">9:00 AM - 9:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="newsletter-section">
              <div className="newsletter-content">
                <div className="newsletter-text">
                  <h4>Stay Updated with Cosmic Events</h4>
                  <p>
                    Subscribe to our newsletter for show updates, special
                    offers, and astronomical news.
                  </p>
                </div>

                <div className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                © {new Date().getFullYear()} Cosmic Vision Planetarium. All
                rights reserved.
              </div>

              <div className="footer-bottom-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      ) : (
        // SIMPLE FOOTER WHEN NOT LOGGED IN
        <footer
          className="w-full p-4 text-center text-sm text-gray-600 border-t bg-white"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <div>
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
          <div>@ Gemini Planetarium</div>
        </footer>
      )}
    </>
  );
};

export default Footer;
