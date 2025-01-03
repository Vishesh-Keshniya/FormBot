import React from 'react';
import './Navbar.css'; // Custom CSS file for styling
import { useNavigate } from "react-router-dom";

const Navbar = ({ onNavigateToLogin }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="Logo.png" alt="Logo" className="logo" />
        <span className="brand-name">FormBot</span>
      </div>
      <div className="navbar-right">
        <button className="btn-signin"onClick={() => navigate("/login")}>Sign In</button>
        <button className="btn-create" onClick={() => navigate("/login")}>Create a FormBot</button>
      </div>
    </nav>
  );
};

export default Navbar;
