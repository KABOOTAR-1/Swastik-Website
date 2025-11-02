import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { products } from '../../data/products';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="App">
        <Head>
          <title>Product Not Found - Swastik Krishi Yantra Udyog</title>
        </Head>
        <Header />
        <main style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link href="/products" className="btn-primary">
            View All Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Head>
        <title>{product.name} - Swastik Krishi Yantra Udyog</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/swastik_logo.png" />
      </Head>

      <Header />

      <main>
        <section className="product-detail">
          <div className="container">
            <div className="back-link">
              <Link href="/products">
                <FaArrowLeft /> Back to Products
              </Link>
            </div>

            <div className="product-detail-content">
              <div className="product-detail-header">
                <div className="product-icon-large">{product.icon}</div>
                <div className="product-info-main">
                  <h1>{product.name}</h1>
                  <p className="product-description-full">{product.description}</p>
                </div>
              </div>

              <div className="product-detail-grid">
                <div className="product-specifications">
                  <h2>Specifications</h2>
                  <div className="specs-grid">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="spec-item-detail">
                        <div className="spec-label-detail">{spec.label}</div>
                        <div className="spec-value-detail">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-features">
                  <h2>Key Features</h2>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="product-applications">
                  <h2>Applications</h2>
                  <ul className="applications-list">
                    {product.applications.map((application, index) => (
                      <li key={index}>{application}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="product-actions">
                <Link href="/#contact" className="btn-primary">
                  Get Quote
                </Link>
                <Link href="/products" className="btn-secondary">
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;