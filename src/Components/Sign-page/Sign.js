import React, { useState } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";

const Sign = ({ onBackClick, onNavigateToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
    const navigate = useNavigate();

  const handleLoginClick = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin(); // Navigate to login page
    }
  };

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick(); // Navigate back to the main page
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
  
    // Check for email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
  
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
      return;
    }
  
    try {
      const response = await fetch("https://server-txml.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("User registered successfully!");
        if (onNavigateToLogin) {
          onNavigateToLogin();
        }
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Server error, please try again later.");
    }
  };

  return (
    <div className="login-page">
      <button className="back-button" onClick={() => navigate("/login")}>
        <img src="arrow_back.png" alt="Back" />
      </button>
      <div className="orange-triangle">
        <img src="taco.png" alt="Orange Triangle" className="taco" />
      </div>
      <div className="pink-ellipse">
        <img src="pinkelip.png" alt="Pink Ellipse" className="pink" />
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <div className="message">{errorMessage}</div>}

          <button type="submit" className="btn login-btn" >Sign Up</button>

          <div className="or">OR</div>

          <button type="button" className="btn google-btn">
            <img src="google.png" alt="Google Icon" />
            Sign Up with Google
          </button>
        </form>

        <div className="register">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="register-btn">Login</button>
        </div>
      </div>

      <div className="bottom-circle">
        <img src="bottomellip.png" alt="Bottom Circle" className="bottom" />
      </div>
    </div>
  );
};

export default Sign;
