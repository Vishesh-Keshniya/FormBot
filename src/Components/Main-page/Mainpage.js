import React from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";

const MainPage = ({ onNavigateToLogin }) => {
  return (
    <div className="main-page">
      {/* Navbar Component */}
      <Navbar onNavigateToLogin={onNavigateToLogin} />

      {/* Main Content Section */}
      <Main onNavigateToLogin={onNavigateToLogin} />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default MainPage;
