// components/common/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pic3 from "../../assets/pic3.jpg";
import {
  Menu,
  Close,
  Star,
  AccountCircle,
  ConfirmationNumber,
  Logout,
  Dashboard,
  Person,
} from "@mui/icons-material";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check if user is logged in
    checkLoginStatus();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkLoginStatus = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
      setUserType(user.userType || "student");
    } else {
      setIsLoggedIn(false);
      setUserType("");
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserType("");
    setIsMobileMenuOpen(false);

    // Redirect to home page
    navigate("/");

    // Reload to reset application state
    window.location.reload();
  };

  const goToDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userType) {
      navigate(`/${user.userType}`);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/shows", label: "Shows", icon: "🎭" },
    { path: "/referral", label: "Refer & Earn", icon: "💰" },
    { path: "/contactus", label: "Contact", icon: "📞" },
    { path: "/about", label: "About", icon: "ℹ️" },
    { path: "/quizchallenge", label: "Quiz", icon: "🎯" },
    ...(isLoggedIn
      ? []
      : [{ path: "/register", label: "Register", icon: "👤" }]),
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <motion.nav
        className={`navbar compact-navbar ${isScrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container compact-nav-container">
          {/* Logo/Brand */}
          <motion.div
            className="nav-brand compact-brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="brand-link">
              <div className="logo compact-logo">
                <img
                  src={pic3}
                  alt="Digital Dome Projection"
                  // className="hero-img"
                  style={{ width: "80px", height: "auto" }}
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="nav-links compact-nav-links">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                className="nav-item compact-nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`nav-link compact-nav-link ${
                    isActiveLink(item.path) ? "active" : ""
                  }`}
                >
                  <span className="nav-icon compact-nav-icon">{item.icon}</span>
                  <span className="nav-label compact-nav-label">
                    {item.label}
                  </span>
                  {isActiveLink(item.path) && (
                    <motion.div
                      className="active-indicator compact-active-indicator"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* User Menu for Logged-in Users */}
            {isLoggedIn && (
              <motion.div
                className="nav-item compact-nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              >
                <div className="user-menu">
                  <button
                    className="nav-link compact-nav-link user-profile"
                    onClick={goToDashboard}
                  >
                    <span className="nav-icon compact-nav-icon">
                      <Person />
                    </span>
                    <span className="nav-label compact-nav-label">
                      Dashboard
                    </span>
                  </button>

                  <button
                    className="nav-link compact-nav-link logout-btn"
                    onClick={handleLogout}
                  >
                    <span className="nav-icon compact-nav-icon">
                      <Logout />
                    </span>
                    <span className="nav-label compact-nav-label">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Login Button for Non-Logged-in Users */}
            {!isLoggedIn && (
              <motion.div
                className="nav-item compact-nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              >
                <Link
                  to="/login"
                  className={`nav-link compact-nav-link login-btn ${
                    isActiveLink("/login") ? "active" : ""
                  }`}
                >
                  <span className="nav-icon compact-nav-icon">
                    <AccountCircle />
                  </span>
                  <span className="nav-label compact-nav-label">Login</span>
                  {isActiveLink("/login") && (
                    <motion.div
                      className="active-indicator compact-active-indicator"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-btn compact-mobile-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <Close /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`mobile-menu compact-mobile-menu ${
            isMobileMenuOpen ? "open" : ""
          }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-nav-links compact-mobile-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link compact-mobile-link ${
                  isActiveLink(item.path) ? "active" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon compact-mobile-icon">
                  {item.icon}
                </span>
                <span className="compact-mobile-label">{item.label}</span>
                {isActiveLink(item.path) && (
                  <div className="mobile-active-dot compact-mobile-dot" />
                )}
              </Link>
            ))}

            {/* Mobile User Menu */}
            {isLoggedIn ? (
              <>
                <button
                  className="mobile-nav-link compact-mobile-link"
                  onClick={goToDashboard}
                >
                  <span className="mobile-nav-icon compact-mobile-icon">
                    <Dashboard />
                  </span>
                  <span className="compact-mobile-label">Dashboard</span>
                </button>

                <button
                  className="mobile-nav-link compact-mobile-link logout-btn"
                  onClick={handleLogout}
                >
                  <span className="mobile-nav-icon compact-mobile-icon">
                    <Logout />
                  </span>
                  <span className="compact-mobile-label">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`mobile-nav-link compact-mobile-link ${
                  isActiveLink("/login") ? "active" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon compact-mobile-icon">
                  <AccountCircle />
                </span>
                <span className="compact-mobile-label">Login</span>
                {isActiveLink("/login") && (
                  <div className="mobile-active-dot compact-mobile-dot" />
                )}
              </Link>
            )}
          </div>
        </motion.div>
      </motion.nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-overlay compact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
