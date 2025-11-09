// components/Footer.jsx
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About SKYU</h4>
          <ul>
            <li><a href="/#about">Our Story</a></li>
            <li><a href="/#products">Products</a></li>
            <li><a href="/#features">Why Choose Us</a></li>
            <li><a href="/#testimonials">Testimonials</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Products</h4>
          <ul>
            <li><a href="/#products">Construction Machinery</a></li>
            <li><a href="/#products">Agricultural Equipment</a></li>
            <li><a href="/#products">Mixers & Lifts</a></li>
            <li><a href="/#products">Custom Solutions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#contact">Contact Us</a></li>
            <li><a href="/#contact">Get Quote</a></li>
            <li><a href="/#testimonials">Client Reviews</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Swastik Krishi Yantra Udyog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;