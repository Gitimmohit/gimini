// components/common/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pic3 from "../../assets/giminilogo.png";
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
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.access_token);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    dispatch(resetUser()); // clears redux state
    localStorage.clear();
    sessionStorage.clear();
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
    // When accessToken is available (user logged in)
    ...(!accessToken
      ? [
          { path: "/", label: "Home", icon: "🏠" },
          { path: "/shows", label: "Shows", icon: "🎭" },
          { path: "/referral", label: "Refer & Earn", icon: "💰" },
          { path: "/contactus", label: "Contact", icon: "📞" },
          { path: "/about", label: "About", icon: "ℹ️" },
          { path: "/quizchallenge", label: "Quiz", icon: "🎯" },
        ]
      : []),

    // When NO accessToken (user NOT logged in)
    ...(!accessToken
      ? [{ path: "/registerstudent", label: "Register", icon: "👤" }]
      : []),
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${styles.compactNavbar} ${
          isScrolled ? styles.scrolled : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.navContainer}>
          {/* Logo/Brand */}
          <motion.div
            className={styles.navBrand}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className={styles.brandLink}>
              <div className={styles.logo}>
                <img
                  src={pic3}
                  alt="Digital Dome Projection"
                  className={styles.logoImage}
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                className={styles.navItem}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    isActiveLink(item.path) ? styles.active : ""
                  }`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {isActiveLink(item.path) && (
                    <motion.div
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* User Menu for Logged-in Users */}
            {accessToken && (
              <motion.div
                className={styles.navItem}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              >
                <div className={styles.userMenu}>
                  <button
                    className={`${styles.navLink} ${styles.userProfile}`}
                    onClick={goToDashboard}
                  >
                    <span className={styles.navIcon}>
                      <Person />
                    </span>
                    <span className={styles.navLabel}>Dashboard</span>
                  </button>

                  <button
                    className={`${styles.navLink} ${styles.logoutBtn}`}
                    onClick={handleLogout}
                  >
                    <span className={styles.navIcon}>
                      <Logout />
                    </span>
                    <span className={styles.navLabel}>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Login Button for Non-Logged-in Users */}
            {!accessToken && (
              <motion.div
                className={styles.navItem}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
              >
                <Link
                  to="/login"
                  className={`${styles.navLink} ${styles.loginBtn} ${
                    isActiveLink("/login") ? styles.active : ""
                  }`}
                >
                  <span className={styles.navIcon}>
                    <AccountCircle />
                  </span>
                  <span className={styles.navLabel}>Login</span>
                  {isActiveLink("/login") && (
                    <motion.div
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                    />
                  )}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <Close /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`${styles.mobileMenu} ${
            isMobileMenuOpen ? styles.open : ""
          }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.mobileNavLinks}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.mobileNavLink} ${
                  isActiveLink(item.path) ? styles.active : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.mobileNavIcon}>{item.icon}</span>
                <span className={styles.mobileNavLabel}>{item.label}</span>
                {isActiveLink(item.path) && (
                  <div className={styles.mobileActiveDot} />
                )}
              </Link>
            ))}

            {/* Mobile User Menu */}
            {accessToken ? (
              <>
                <button
                  className={styles.mobileNavLink}
                  onClick={goToDashboard}
                >
                  <span className={styles.mobileNavIcon}>
                    <Dashboard />
                  </span>
                  <span className={styles.mobileNavLabel}>Dashboard</span>
                </button>

                <button
                  className={`${styles.mobileNavLink} ${styles.logoutBtn}`}
                  onClick={handleLogout}
                >
                  <span className={styles.mobileNavIcon}>
                    <Logout />
                  </span>
                  <span className={styles.mobileNavLabel}>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`${styles.mobileNavLink} ${
                  isActiveLink("/login") ? styles.active : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.mobileNavIcon}>
                  <AccountCircle />
                </span>
                <span className={styles.mobileNavLabel}>Login</span>
                {isActiveLink("/login") && (
                  <div className={styles.mobileActiveDot} />
                )}
              </Link>
            )}
          </div>
        </motion.div>
      </motion.nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className={styles.mobileOverlay}
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
