import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PageLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main style={{ flex: 1, marginTop: "80px" }}>
        <Outlet /> {/* 👈 This shows the nested route page */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageLayout;
