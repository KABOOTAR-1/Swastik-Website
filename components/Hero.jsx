// components/Hero.jsx
import React from 'react';
import { Link } from 'react-scroll';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">Est. 1970</div>
        <h1>Precision Engineering<br />for Modern Industry</h1>
        <p>Leading manufacturer of agricultural and building machinery with 50+ years of excellence</p>
        <div className="hero-cta">
          <Link
            to="products"
            smooth={true}
            duration={500}
            className="btn-primary"
          >
            Explore Products <FaArrowRight />
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="btn-secondary"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;