// src/components/Testimonials.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: 'Our relationship with Swastik Krishi Yantra Udyog is not the typical client-vendor relationship. They are like a partner. They know my business inside and out.',
      author: 'Construction Company Director',
      title: 'Large Scale Projects',
      stars: 5,
    },
    {
      id: 2,
      text: 'I have been very happy with you guys so far and would like to start sending more work your way. Very responsive and committed to excellence.',
      author: 'Project Manager',
      title: 'Infrastructure Development',
      stars: 5,
    },
    {
      id: 3,
      text: 'Great supplier with fantastic quick turnaround. Very responsive to inquiries. Their quality is remarkable! 100% rating across 5+ deliveries.',
      author: 'Agricultural Equipment Supplier',
      title: 'Farming Operations',
      stars: 5,
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="stars">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <div className="testimonial-text">"{testimonial.text}"</div>
              <div className="testimonial-author">{testimonial.author}</div>
              <div className="testimonial-title">{testimonial.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;