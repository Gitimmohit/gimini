// App.js - Updated with Corrected Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./assets/scss/theme.scss";
import "react-toastify/dist/ReactToastify.css";

// Component Imports
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Page Imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Referral from "./pages/Referral";
import UpcomingShows from "./pages/UpcomingShows";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import QuizPromotion from "./pages/QuizPromotion";

// Dashboard Imports - Corrected Paths
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import SalesDashboard from "./pages/dashboard/SalesDashboard";
import PromoterDashboard from "./pages/dashboard/PromoterDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import StudentRegistration from "./pages/registration/StudentRegistration";
import SalesRegistration from "./pages/registration/SalesRegistration";
import PromoterRegistration from "./pages/registration/PromoterRegistration";
import StudentApproval from "./pages/registration/StudentApprovals";
import ScrollToTop from "./components/ScrollToTop";

import Question from "./pages/question/Question";
import AddQuestion from "./pages/question/AddQuestion";
import Quiz from "./pages/quiz/Quiz";
import AddQuiz from "./pages/quiz/AddQuiz";
import User from "./pages/user/User";
import AddUser from "./pages/user/AddUser";
import RequestApproval from "./pages/registration/RequestApproval";


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<UpcomingShows />} />
            <Route path="/login" element={<Login />} />
            <Route path="/referral" element={<Referral />} />
            <Route
              path="/registerstudent"
              element={<StudentRegistration />}
            />{" "}
            <Route path="/registersales" element={<SalesRegistration />} />{" "}
            <Route
              path="/registerpromoter"
              element={<PromoterRegistration />}
            />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/quizchallenge" element={<QuizPromotion />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            {/* Dashboard Routes */}
            <Route path="/student/*" element={<StudentDashboard />} />
            <Route path="/sales/*" element={<SalesDashboard />} />
            <Route path="/promoter/*" element={<PromoterDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />

            <Route path="/quiz/question" element={<Question />} />
            <Route path="/quiz/add/question" element={<AddQuestion />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/add" element={<AddQuiz />} />
            <Route path="/user/list" element={<User />} />
            <Route path="/add/user" element={<AddUser />} />
            <Route path="/studentapproval" element={<StudentApproval />} />
            <Route path="/requestapproval" element={<RequestApproval />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
