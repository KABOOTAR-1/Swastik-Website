// components/Products.jsx
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchProducts } from '../data/products';
import ProductIcon from './ProductIcon';
import ImageKitImage from './ImageKitImage';
import { thumbnailTransformations } from '../config/imagekit';

// Skeleton loader component
const ProductSkeleton = () => (
  <div className="product-card skeleton-card">
    <div className="product-image skeleton skeleton-image"></div>
    <div className="product-info">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-description"></div>
      <div className="skeleton skeleton-description skeleton-description-last"></div>
      <div className="product-specs">
        <div className="spec-item">
          <div className="skeleton skeleton-spec"></div>
        </div>
        <div className="spec-item">
          <div className="skeleton skeleton-spec"></div>
        </div>
      </div>
      <div className="skeleton skeleton-button"></div>
    </div>
  </div>
);

const Products = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);

  // Fetch products from Firebase on component mount
  useEffect(() => {
    const loadProducts = async () => {
      console.log('📦 [Products Component] Fetching products data...');
      try {
        const fetchedProducts = await fetchProducts();
        console.log(`✅ [Products Component] Products data loaded, rendering ${fetchedProducts.length} products`);
        console.log(`   🖼️  Images will load in parallel as they become available`);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10); // Small threshold to avoid showing when barely scrolled
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">Quality machinery built for durability, performance, and reliability</p>
        <div className="products-container">
          <>
            {canScrollLeft && (
              <button className="scroll-arrow scroll-arrow-left" onClick={scrollLeft} aria-label="Scroll left">
                ‹
              </button>
            )}
            <div className="products-grid" ref={scrollRef} onScroll={checkScrollButtons}>
              {products.length === 0 ? (
                // Show 6 skeleton loaders while loading
                <>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </>
              ) : (
                <>
                  {products.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image" style={{ position: 'relative', backgroundColor: '#f0f0f0' }}>
                        {product.image ? (
                          (() => {
                            const startTime = performance.now();
                            console.log(`🖼️ [Products Component] Started loading image for: ${product.name}`);
                            console.log(`   📸 Image URL: ${product.image}`);
                            console.log(`   ⏱️  Start time: ${new Date().toLocaleTimeString()}`);
                            console.log(`   🔄 Loading via ImageKit with auto-optimization`);
                            return (
                              <ImageKitImage
                                src={product.image}
                                alt={product.name}
                                transformation={thumbnailTransformations}
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
                                  console.log(`✅ [Products Component] Successfully loaded image for: ${product.name}`);
                                  console.log(`   ⏱️  Load time: ${loadTime} seconds`);
                                  console.log(`   🚀 ImageKit optimized & CDN delivered`);
                                  console.log(`   ✨ Image now visible to user`);

                                  // Fade in the image
                                  e.target.style.opacity = '1';
                                }}
                                onError={(e) => {
                                  const endTime = performance.now();
                                  const loadTime = ((endTime - startTime) / 1000).toFixed(2);
                                  console.error(`❌ [Products Component] Failed to load image for: ${product.name}`);
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
                </>
              )}
            </div>
            {canScrollRight && (
              <button className="scroll-arrow scroll-arrow-right" onClick={scrollRight} aria-label="Scroll right">
                ›
              </button>
            )}
          </>
        </div>
        <div className="view-all-container">
          <Link href="/products" className="btn-primary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;