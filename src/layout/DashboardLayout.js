import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Main Content */}
      <main style={{ flex: 1, marginTop: "80px" }}>
        {children}
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
