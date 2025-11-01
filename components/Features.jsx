// components/Features.jsx
import React from 'react';
import { FaCheckCircle, FaClock, FaHeadset, FaDollarSign } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaCheckCircle />,
      title: 'Quality Assured',
      description: 'Premium raw materials and rigorous testing ensure superior durability and performance.',
    },
    {
      id: 2,
      icon: <FaClock />,
      title: 'Quick Turnaround',
      description: 'Fast manufacturing and delivery keep your projects on schedule without compromising quality.',
    },
    {
      id: 3,
      icon: <FaHeadset />,
      title: 'Expert Support',
      description: 'Dedicated technical team providing 24/7 support, maintenance, and service for all equipment.',
    },
    {
      id: 4,
      icon: <FaDollarSign />,
      title: 'Competitive Pricing',
      description: 'Transparent pricing with excellent value. Volume discounts available for bulk orders.',
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">Why Choose SKYU?</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-box">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-title">{feature.title}</div>
              <div className="feature-text">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;