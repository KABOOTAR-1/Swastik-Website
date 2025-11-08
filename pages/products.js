import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchProducts } from '../data/products';
import ProductIcon from '../components/ProductIcon';
import ImageKitImage from '../components/ImageKitImage';
import { productImageTransformations } from '../config/imagekit';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Scroll to top with a small offset to account for fixed header
    window.scrollTo(0, 0);

    // Fetch products from Firebase
    const loadProducts = async () => {
      console.log('📦 [Products Page] Fetching products data...');
      try {
        const fetchedProducts = await fetchProducts();
        console.log(`✅ [Products Page] Products data loaded, rendering ${fetchedProducts.length} products`);
        console.log(`   🖼️  Images will load in parallel as they become available`);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
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

            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p>Loading products...</p>
              </div>
            ) : (
              <div className="products-full-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image" style={{ position: 'relative', backgroundColor: '#f0f0f0' }}>
                      {product.image ? (
                        (() => {
                          const startTime = performance.now();
                          console.log(`🖼️ [Products Page] Started loading image for: ${product.name}`);
                          console.log(`   📸 Image URL: ${product.image}`);
                          console.log(`   ⏱️  Start time: ${new Date().toLocaleTimeString()}`);
                          console.log(`   🔄 Loading via ImageKit with auto-optimization`);
                          return (
                            <ImageKitImage
                              src={product.image}
                              alt={product.name}
                              transformation={productImageTransformations}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0,
                                transition: 'opacity 0.3s ease-in'
                              }}
                              loading="lazy"
                              onLoad={(e) => {
                                const endTime = performance.now();
                                const loadTime = ((endTime - startTime) / 1000).toFixed(2);
                                console.log(`✅ [Products Page] Successfully loaded image for: ${product.name}`);
                                console.log(`   ⏱️  Load time: ${loadTime} seconds`);
                                console.log(`   🚀 ImageKit optimized & CDN delivered`);
                                console.log(`   ✨ Image now visible to user`);

                                // Fade in the image
                                e.target.style.opacity = '1';
                              }}
                              onError={(e) => {
                                const endTime = performance.now();
                                const loadTime = ((endTime - startTime) / 1000).toFixed(2);
                                console.error(`❌ [Products Page] Failed to load image for: ${product.name}`);
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
            )}
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