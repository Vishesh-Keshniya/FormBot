import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onBackClick, onNavigateToSignUp, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Back Button Click
  const handleBackClick = () => {
    if (onBackClick) onBackClick();
  };

  // Handle Register Button Click
  const handleRegisterClick = () => {
    if (onNavigateToSignUp) onNavigateToSignUp();
  };

  // Handle Form Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading state to true
  
    try {
      const response = await fetch('https://server-txml.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Login Successful!');
        localStorage.setItem('jwtToken', data.token); // Store token in localStorage
        console.log('JWT Token:', data.token); // Log to ensure token is stored
        
        // Navigate to dashboard after login success
        navigate("/dashboard");
        
        if (onLoginSuccess) onLoginSuccess(); // Optional callback if needed
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', error); // For debugging
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <button className="back-button" onClick={() => navigate("/")}>
        <img src="arrow_back.png" alt="Back" />
      </button>

      <div className="orange-triangle">
        <img src="taco.png" alt="Triangle Design" />
      </div>

      <div className="login-container">
        <form onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In' }
          </button>

          <div className="or">OR</div>

          <button type="button" className="btn google-btn">
            <img src="google.png" alt="Google Icon" />
            Sign In with Google
          </button>
        </form>

        <div className="register">
          Don’t have an account?{' '}
          <button onClick={() => navigate("/signup")} className="register-btn">
            Register now
          </button>
        </div>

        <div className="pink-ellipse">
          <img src="pinkelip.png" alt="Pink Ellipse" className="pink" />
        </div>

        <div className="bottom-circle">
          <img src="bottomellip.png" alt="Bottom Circle" className="bottom" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
