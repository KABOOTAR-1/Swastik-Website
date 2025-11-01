// src/components/Products.jsx
import React from 'react';
import { FaBox, FaCog, FaWater, FaLeaf, FaTools } from 'react-icons/fa';
import '../styles/Products.css';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Lift Type C Mixer',
      icon: <FaBox />,
      description: 'Heavy-duty construction mixer for concrete floor slabs in multistory buildings.',
      specs: [
        { label: 'Type', value: 'Diesel/Electric' },
        { label: 'Capacity', value: '200-300L' },
        { label: 'Power', value: '5-6.5 HP' },
        { label: 'Weight', value: '800-950kg' },
      ],
    },
    {
      id: 2,
      name: 'Cement Concrete Mixer',
      icon: <FaCog />,
      description: 'Robust and compact mixer for small to medium-scale construction projects.',
      specs: [
        { label: 'Capacity', value: '100-200L' },
        { label: 'Motor Type', value: 'Diesel/Electric' },
        { label: 'Speed', value: '18-20 RPM' },
        { label: 'Dimensions', value: 'Compact Design' },
      ],
    },
    {
      id: 3,
      name: 'Hopper Type Mixer',
      icon: <FaWater />,
      description: 'Mechanical mixer with mobility features for on-site concrete mixing.',
      specs: [
        { label: 'Capacity', value: '150-250L' },
        { label: 'Hopper', value: '30" Drum' },
        { label: 'Wheels', value: 'Pneumatic' },
        { label: 'Portability', value: 'High Mobility' },
      ],
    },
    {
      id: 4,
      name: 'Agricultural Equipment',
      icon: <FaLeaf />,
      description: 'Wide range of farming machinery for soil preparation and harvesting.',
      specs: [
        { label: 'Types', value: '20+ Models' },
        { label: 'Application', value: 'Multi-purpose' },
        { label: 'Durability', value: 'High-Grade' },
        { label: 'Support', value: '24/7 Service' },
      ],
    },
    {
      id: 5,
      name: 'Pumps & Lifting Equipment',
      icon: <FaWater />,
      description: 'High-capacity pumps and lifting systems for construction and water management.',
      specs: [
        { label: 'Types', value: 'Submersible/Centrifugal' },
        { label: 'Capacity', value: '500-5000 LPH' },
        { label: 'Material', value: 'Cast Iron' },
        { label: 'Efficiency', value: 'High Performance' },
      ],
    },
    {
      id: 6,
      name: 'Custom Solutions',
      icon: <FaTools />,
      description: 'Tailored machinery solutions designed to meet specific industrial needs.',
      specs: [
        { label: 'Design', value: 'Customizable' },
        { label: 'Timeline', value: 'Quick Turnaround' },
        { label: 'Quality', value: 'Premium Grade' },
        { label: 'Support', value: 'Full Warranty' },
      ],
    },
  ];

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">Quality machinery built for durability, performance, and reliability</p>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.icon}</div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-description">{product.description}</div>
                <div className="product-specs">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="spec-item">
                      <div className="spec-label">{spec.label}</div>
                      <div>{spec.value}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-learn-more">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;