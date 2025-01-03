import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  // Fetch current username and email from server
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            // Token is expired, log out the user
            alert("Session expired. Please log in again.");
            localStorage.removeItem("jwtToken");
            window.location.href = "/login";
            return;
          }

          const response = await fetch("http://localhost:8000/username", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.username) {
              setUsername(data.username);
            }
          } else {
            console.log("Error fetching user details");
          }
        } else {
          console.log("Token not found");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle update request
  const handleUpdate = async () => {
    if (!username || !email || !oldPassword || !newPassword) {
      alert("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken'); // Get the JWT token from localStorage
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem('jwtToken');
        window.location.href = "/login";
        return;
      }

      const response = await fetch("http://localhost:8000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, oldPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Update successful");
      } else {
        alert(data.message); // Display specific error message from server
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert("Logged out successfully");
        localStorage.removeItem('jwtToken'); // Clear token
        window.location.href = "/login";
      } else {
        alert("Error logging out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div><div className="container">
      <h1 className="title">Settings</h1>
      <div className="form">
        <div className="inputContainer">
          <img src="user.png" alt="User Icon" className="icon" />
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input1"
          />
        </div>

        <div className="inputContainer">
        <img src="lock.png" alt="Lock Icon" className="icon" />
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input1"
          />
        </div>

        <div className="inputContainer">
          <img src="lock.png" alt="Lock Icon" className="icon" />
          <input
            type={showOldPassword ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="input1"
          />
          <img
            src="eye.png"
            alt="Toggle Visibility"
            className="eyeIcon"
            onClick={() => setShowOldPassword(!showOldPassword)}
          />
        </div>

        <div className="inputContainer">
          <img src="lock.png" alt="Lock Icon" className="icon" />
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input1"
          />
          <img
            src="eye.png"
            alt="Toggle Visibility"
            className="eyeIcon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        </div>

        <button onClick={handleUpdate} className="update-button">
          Update
        </button>

       
       
      </div>
    </div>
    <div className="setting-logout"> 
        <button  onClick={() => navigate("/")} className="logoutButton">
        <img src="Logout.png"></img> Logout
        </button>
        </div>
    </div>
  );
};

export default Settings;
