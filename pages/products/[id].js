import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { fetchProducts } from '../../data/products';
import ProductIcon from '../../components/ProductIcon';
import ImageKitImage from '../../components/ImageKitImage';
import { detailImageTransformations } from '../../config/imagekit';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      if (!id) return;

      try {
        const products = await fetchProducts();
        // Try to match by string ID first (Firebase), then by numeric ID (fallback)
        const foundProduct = products.find(p =>
          p.id === id || p.id === parseInt(id)
        );
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="App">
        <Head>
          <title>Loading... - Swastik Krishi Yantra Udyog</title>
        </Head>
        <Header />
        <main style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <p>Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

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

      <main style={{ paddingTop: '4vmin' }}>
        <section className="product-detail">
          <div className="container">
            <div className="product-detail-content">
              <div className="back-link">
                <Link href="/products">
                  <FaArrowLeft /> Back to Products
                </Link>
              </div>
              <div className="product-detail-header">
                <div className="product-icon-large" style={{ position: 'relative', backgroundColor: '#f0f0f0' }}>
                  {product.image ? (
                    (() => {
                      const startTime = performance.now();
                      console.log(`🖼️ [Product Detail] Started loading image for: ${product.name}`);
                      console.log(`   📸 Image URL: ${product.image}`);
                      console.log(`   ⏱️  Start time: ${new Date().toLocaleTimeString()}`);
                      console.log(`   🔄 Loading via ImageKit with high-quality optimization`);
                      return (
                        <ImageKitImage
                          src={product.image}
                          alt={product.name}
                          transformation={detailImageTransformations}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            opacity: 0,
                            transition: 'opacity 0.3s ease-in'
                          }}
                          loading="eager"
                          onLoad={(e) => {
                            const endTime = performance.now();
                            const loadTime = ((endTime - startTime) / 1000).toFixed(2);
                            console.log(`✅ [Product Detail] Successfully loaded image for: ${product.name}`);
                            console.log(`   ⏱️  Load time: ${loadTime} seconds`);
                            console.log(`   🚀 ImageKit optimized & CDN delivered`);
                            console.log(`   ✨ Image now visible to user`);

                            // Fade in the image
                            e.target.style.opacity = '1';
                          }}
                          onError={(e) => {
                            const endTime = performance.now();
                            const loadTime = ((endTime - startTime) / 1000).toFixed(2);
                            console.error(`❌ [Product Detail] Failed to load image for: ${product.name}`);
                            console.error(`   ⏱️  Failed after: ${loadTime} seconds`);
                            console.error(`   Error details:`, e);
                          }}
                        />
                      );
                    })()
                  ) : (
                    <ProductIcon iconName={product.iconName} />
                  )}
                </div>
                <div className="product-info-main">
                  <h1>{product.name}</h1>
                  <p className="product-description-full">{product.description}</p>
                  {product.category && (
                    <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                      <strong>Category:</strong> {product.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="product-detail-grid">
                {/* Show models if available (Firebase products) */}
                {product.models && product.models.length > 0 ? (
                  <div className="product-specifications product-models-section" style={{ gridColumn: '1 / -1' }}>
                    <h2>Available Models</h2>
                    {product.models.map((model, modelIndex) => (
                      <div key={modelIndex} className="model-card">
                        <h3 className="model-name">{model.name}</h3>
                        <div className="specs-grid">
                          {model.specs && model.specs.map((spec, specIndex) => (
                            <div key={specIndex} className="spec-item-detail">
                              <div className="spec-label-detail">{spec.label}</div>
                              <div className="spec-value-detail">{spec.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
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
                )}

                {product.features && product.features.length > 0 && (
                  <div className="product-features">
                    <h2>Key Features</h2>
                    <ul className="features-list">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.applications && product.applications.length > 0 && (
                  <div className="product-applications">
                    <h2>Applications</h2>
                    <ul className="applications-list">
                      {product.applications.map((application, index) => (
                        <li key={index}>{application}</li>
                      ))}
                    </ul>
                  </div>
                )}
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