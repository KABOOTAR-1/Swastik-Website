// components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const controlsRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleHomeClick = (e) => {
    // If already on home page, prevent reload and scroll to top
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Update URL to remove hash
      window.history.pushState({}, '', '/');
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on controls (theme toggle or hamburger)
      if (controlsRef.current && controlsRef.current.contains(event.target)) {
        return;
      }

      // Close if clicking outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <a href="/" onClick={handleHomeClick}>
            <img src="/swastik_logo_full.png" alt="Swastik Logo" className="logo-icon" />
          </a>
        </div>

        <div className="nav-links-wrapper" ref={menuRef}>
          <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
            <li>
              <a href="/" onClick={handleHomeClick}>
                Home
              </a>
            </li>
            <li>
              <a href="/#about">
                About
              </a>
            </li>
            <li>
              <a href="/products">
                Products
              </a>
            </li>
            <li>
              <a href="/#features">
                Why Us
              </a>
            </li>
            <li>
              <a href="/#contact" className="cta-button">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="header-controls" ref={controlsRef}>
          <ThemeToggle />
          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;