import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layout/PublicLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import UpcomingShows from "../pages/UpcomingShows";
import Referral from "../pages/Referral";
import ForgotPassword from "../pages/ForgotPassword";
import QuizPromotion from "../pages/QuizPromotion";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";

// Registration Pages
import StudentRegistration from "../pages/registration/StudentRegistration";
import SalesRegistration from "../pages/registration/SalesRegistration";
import PromoterRegistration from "../pages/registration/PromoterRegistration";

// Dashboard Routes
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import SalesDashboard from "../pages/dashboard/SalesDashboard";
import PromoterDashboard from "../pages/dashboard/PromoterDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

// Others
import Question from "../pages/question/Question";
import AddQuestion from "../pages/question/AddQuestion";
import Quiz from "../pages/quiz/Quiz";
import AddQuiz from "../pages/quiz/AddQuiz";
import PlayQuiz from "../pages/quiz/PlayQuiz";
import StartQuiz from "../pages/quiz/StartQuiz";
import User from "../pages/user/User";
import AddUser from "../pages/user/AddUser";
import QuizReport from "../pages/report/QuizReport";
import StudentApproval from "../pages/registration/StudentApprovals";
import RequestApproval from "../pages/registration/RequestApproval";
import Transaction from "../pages/transaction/Transaction";
import AddTransaction from "../pages/transaction/AddTransaction";
import Amount from "../pages/amount/Amount";
import AddAmount from "../pages/amount/AddAmount";
import AddWithdrawalAmount from "../pages/amount/AddWithdrawalAmount";
import PageLayout from "../layout/PageLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />

      <Route
        path="/contactus"
        element={
          <PublicLayout>
            <ContactUs />
          </PublicLayout>
        }
      />

      <Route
        path="/shows"
        element={
          <PublicLayout>
            <UpcomingShows />
          </PublicLayout>
        }
      />

      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      <Route
        path="/referral"
        element={
          <PublicLayout>
            <Referral />
          </PublicLayout>
        }
      />

      <Route
        path="/forgotpassword"
        element={
          <PublicLayout>
            <ForgotPassword />
          </PublicLayout>
        }
      />

      <Route
        path="/quizchallenge"
        element={
          <PublicLayout>
            <QuizPromotion />
          </PublicLayout>
        }
      />

      <Route
        path="/privacy"
        element={
          <PublicLayout>
            <PrivacyPolicy />
          </PublicLayout>
        }
      />

      <Route
        path="/terms"
        element={
          <PublicLayout>
            <TermsOfService />
          </PublicLayout>
        }
      />

      {/* Registration Routes */}
      <Route
        path="/registerstudent"
        element={
          <PublicLayout>
            <StudentRegistration />
          </PublicLayout>
        }
      />
      <Route
        path="/registersales"
        element={
          <PublicLayout>
            <SalesRegistration />
          </PublicLayout>
        }
      />
      <Route
        path="/registerpromoter"
        element={
          <PublicLayout>
            <PromoterRegistration />
          </PublicLayout>
        }
      />

      {/* Dashboard Routes */}
      <Route
        path="/student/*"
        element={
          <DashboardLayout>
            <StudentDashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/sales/*"
        element={
          <DashboardLayout>
            <SalesDashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/promoter/*"
        element={
          <DashboardLayout>
            <PromoterDashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/admin/*"
        element={
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        }
      />

      {/* Extra Pages */}
      <Route element={<PageLayout />}>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/add" element={<AddQuiz />} />
        <Route path="/quiz/play" element={<PlayQuiz />} />
        <Route path="/start/quiz" element={<StartQuiz />} />
        <Route path="/quiz/question" element={<Question />} />
        <Route path="/quiz/add/question" element={<AddQuestion />} />
        <Route path="/quiz/report" element={<QuizReport />} />

        <Route path="/user/list" element={<User />} />
        <Route path="/add/user" element={<AddUser />} />

        <Route path="/transaction" element={<Transaction />} />
        <Route path="/transaction/add" element={<AddTransaction />} />

        <Route path="/amount" element={<Amount />} />
        <Route path="/amount/add" element={<AddAmount />} />
        <Route path="/amount/withdrawal" element={<AddWithdrawalAmount />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
