// components/Contact.jsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaIndustry } from 'react-icons/fa';

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-md)'
    }}>
      <p>Loading map...</p>
    </div>
  )
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions about our products or services? We're here to help.</p>

          <div className="contact-item">
            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="contact-details">
              <h4>Corporate Office</h4>
              <p><a href="https://maps.app.goo.gl/ej1HwtRCW7QxELd58" target="_blank" rel="noopener noreferrer">2 A Vanasthali Marg, S C Road, Jaipur, Rajasthan 302001</a></p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <FaIndustry />
            </div>
            <div className="contact-details">
              <h4>Manufacturing Facility</h4>
              <p><a href="https://maps.app.goo.gl/BiuM81spZRvnQh9s8" target="_blank" rel="noopener noreferrer">G1-818k, Road No. 14, Vishwakarma Industrial Area, Murlipura, Jaipur, Rajasthan 302013</a></p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <FaPhone />
            </div>
            <div className="contact-details">
              <h4>Phone</h4>
              <p><strong>Mobile:</strong> <a href="tel:+919414716806">+91-9414716806</a> | <a href="tel:+919414460805">+91-9414460805</a></p>
              <p><strong>Landline:</strong> <a href="tel:+9101412361960">0141-2361960</a> | <a href="tel:+9101412332002">0141-2332002</a></p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div className="contact-details">
              <h4>Email</h4>
              <p>info@swastikjaipur.com</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">Send Inquiry</button>
        </form>
      </div>

      {/* OpenStreetMap with Leaflet */}
      <div className="map-section">
        <div className="map-header">
          <h3 className="map-title">Find Us</h3>
          <p className="map-subtitle">Visit our corporate office or manufacturing facility</p>
        </div>
        <div className="map-container">
          <MapComponent />
        </div>
      </div>
    </section>
  );
};

export default Contact;