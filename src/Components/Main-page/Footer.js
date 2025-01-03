import React from "react";
import "./Footer.css"; // Include a separate CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
       <ul>
       <span className="log"> <img src="Logo.png" alt="Logo" className="logo" /></span>
        <span className="brand-name">FormBot</span>
        <p className="made">Made with ❤️ by <br/> @cuvette</p>
        </ul>
        </div>
        <div className="footer-section">
        
          <ul>
              <h4>Product</h4>
            <li><a href="#status" target="_blank" rel="noopener noreferrer">Status  <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#documentation" target="_blank" rel="noopener noreferrer">Documentation <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#roadmap" target="_blank" rel="noopener noreferrer">Roadmap <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#pricing" target="_blank" rel="noopener noreferrer">Pricing</a></li>
          </ul>
        </div>
        <div className="footer-section">
         
          <ul>
          <h4>Community</h4>
            <li><a href="#discord" target="_blank" rel="noopener noreferrer">Discord <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#github" target="_blank" rel="noopener noreferrer">GitHub Repository <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#twitter" target="_blank" rel="noopener noreferrer">Twitter <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#oss-friends" target="_blank" rel="noopener noreferrer">OSS Friends</a></li>
          </ul>
        </div>
        <div className="footer-section">
          
          <ul>
          <h4>Company</h4>
            <li><a href="#about" target="_blank" rel="noopener noreferrer">About <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#contact" target="_blank" rel="noopener noreferrer">Contact <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#terms" target="_blank" rel="noopener noreferrer">Terms of Service <img src="Link.png" alt="Left" className="Link" /></a></li>
            <li><a href="#privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
