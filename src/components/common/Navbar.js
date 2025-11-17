// components/common/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, 
  Close,
  Star,
  AccountCircle,
  ConfirmationNumber
} from '@mui/icons-material';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/shows', label: 'Upcoming Shows', icon: '🎭' },
    { path: '/referral', label: 'Refer & Earn', icon: '💰' },
    { path: '/contactus', label: 'Contact Us', icon: '📞' },
    { path: '/about', label: 'About Us', icon: 'ℹ️' },
    { path: '/register', label: 'Register', icon: '👤' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          {/* Logo/Brand */}
          <motion.div 
            className="nav-brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="brand-link">
              <div className="logo">
                <Star className="logo-icon" />
                <span className="brand-text">CosmicVision</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                className="nav-item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {isActiveLink(item.path) && (
                    <motion.div 
                      className="active-indicator"
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <Close /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                {item.label}
                {isActiveLink(item.path) && <div className="mobile-active-dot" />}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="mobile-overlay"
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