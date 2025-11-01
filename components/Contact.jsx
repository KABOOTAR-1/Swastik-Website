// components/Contact.jsx
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaIndustry } from 'react-icons/fa';

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
              <p>2A, Vanasthali Marg, Jaipur, Rajasthan</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <FaIndustry />
            </div>
            <div className="contact-details">
              <h4>Manufacturing Facility</h4>
              <p>Vishwakarma Industrial Area, Road No 14, Jaipur</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <FaPhone />
            </div>
            <div className="contact-details">
              <h4>Phone</h4>
              <p>+91-XXX-XXX-XXXX</p>
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
    </section>
  );
};

export default Contact;