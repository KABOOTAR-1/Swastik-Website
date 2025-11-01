// components/About.jsx
import React from 'react';

const About = () => {
  const stats = [
    { number: '50+', label: 'Years of Excellence' },
    { number: '40+', label: 'Product Types' },
    { number: '2', label: 'Manufacturing Units' },
    { number: '1000+', label: 'Satisfied Clients' },
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-intro">
          <span className="about-label">About Us</span>
          <h2 className="section-title">Building Excellence Since 1970</h2>
          <p className="section-subtitle">
            Five decades of precision engineering, delivering quality agricultural and building machinery across India.
          </p>
        </div>

        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-box">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="about-content">
          <p>
            Founded by Ram Gopal Sharma, Swastik Krishi Yantra Udyog has evolved from a single
            facility in Jaipur to a leading manufacturer with state-of-the-art production capabilities.
            Our expansion to Vishwakarma Industrial Area in 1996 marked a new era of innovation and growth.
          </p>
          <p>
            Today, we manufacture over 40 types of machinery using modern techniques, premium materials,
            and rigorous quality standards—serving construction companies, farming operations, and
            industrial projects with unwavering commitment to excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;