import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';

const ProductsPage = () => {
  useEffect(() => {
    // Scroll to top with a small offset to account for fixed header
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Head>
        <title>Our Products - Swastik Krishi Yantra Udyog</title>
        <meta name="description" content="Explore our complete range of agricultural and construction machinery. Quality equipment for farming and building needs." />
        <link rel="icon" href="/swastik_logo.png" />
      </Head>

      <header>
        <Header />
      </header>

      <main>
        <section className="products-page">
          <div className="container">
            <h1 className="page-title">Our Products</h1>
            <p className="page-subtitle">Comprehensive range of quality machinery for agricultural and construction needs</p>

            <div className="products-full-grid">
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
                    <Link href={`/products/${product.id}`} className="btn-learn-more">
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ProductsPage;