import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="main-content">{children}</main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
