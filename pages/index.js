import React, { useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    let isScrollingToHash = false;
    let scrollTimeout = null;

    // Function to handle scrolling to hash
    const scrollToHash = (hash, useSmooth = true) => {
      if (hash) {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 80;
          const elementPosition = targetElement.offsetTop;
          const offsetPosition = elementPosition - headerHeight;

          // Set flag to disable scroll spy during programmatic scroll
          isScrollingToHash = true;

          // Clear any existing timeout
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }

          window.scrollTo({
            top: offsetPosition,
            behavior: useSmooth ? 'smooth' : 'auto'
          });

          // Re-enable scroll spy after scroll animation completes
          scrollTimeout = setTimeout(() => {
            isScrollingToHash = false;
          }, useSmooth ? 1000 : 100);
        }
      }
    };

    // Prevent default browser scroll behavior on initial load
    if (window.location.hash) {
      window.history.scrollRestoration = 'manual';
    }

    // Handle initial page load with hash
    if (window.location.hash) {
      // Scroll to top immediately to prevent browser's default scroll
      window.scrollTo(0, 0);

      // Use setTimeout to ensure DOM is fully loaded, then scroll instantly
      setTimeout(() => {
        scrollToHash(window.location.hash, false);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }

    // Handle hash changes (when clicking links)
    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };

    // Scroll spy to update URL based on visible section
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;

    const handleScroll = () => {
      // Don't update hash if we're currently scrolling to a hash
      if (isScrollingToHash) {
        return;
      }

      const scrollPosition = window.scrollY + headerHeight;

      // Check if we're at the very top
      if (window.scrollY < 200) {
        if (window.location.hash) {
          window.history.pushState({}, '', '/');
        }
        return;
      }

      // Find which section is currently in view
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const newHash = `#${sectionId}`;
          if (window.location.hash !== newHash) {
            window.history.pushState({}, '', `/${newHash}`);
          }
        }
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return (
    <div className="App">
      <Head>
        {/* Basic Meta Tags */}
        <title>Swastik Krishi Yantra Udyog - Agricultural Machinery Manufacturers in Jaipur</title>
        <meta name="description" content="Leading manufacturer of agricultural and building machinery in Jaipur since 1970. Quality farming equipment, construction machinery, and industrial solutions." />
        <meta name="keywords" content="agricultural machinery, farming equipment, construction machinery, Jaipur manufacturers, farming tools, industrial equipment" />
        <meta name="author" content="Swastik Krishi Yantra Udyog" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Swastik Krishi Yantra Udyog - Agricultural Machinery Manufacturers" />
        <meta property="og:description" content="Leading manufacturer of agricultural and building machinery in Jaipur since 1970. Quality farming equipment and industrial solutions." />
        <meta property="og:image" content="/swastik_logo_full.png" />
        <meta property="og:url" content="https://swastikjaipur.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Swastik Krishi Yantra Udyog" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Swastik Krishi Yantra Udyog - Agricultural Machinery" />
        <meta name="twitter:description" content="Leading manufacturer of agricultural and building machinery in Jaipur since 1970." />
        <meta name="twitter:image" content="/swastik_logo_full.png" />

        {/* Technical Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1A1A1A" />
        <meta name="msapplication-TileColor" content="#1A1A1A" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://swastikjaipur.com" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/swastik_logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/swastik_logo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Swastik Krishi Yantra Udyog",
            "alternateName": "Swastik Jaipur",
            "description": "Leading manufacturer of agricultural and building machinery in Jaipur since 1970",
            "url": "https://swastikjaipur.com",
            "logo": "https://swastikjaipur.com/swastik_logo_full.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Jaipur",
              "addressRegion": "Rajasthan",
              "addressCountry": "IN"
            },
            "foundingDate": "1970",
            "industry": "Manufacturing",
            "keywords": "agricultural machinery, farming equipment, construction machinery",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "English"
            },
            "sameAs": []
          })
        }}
      />
      <header>
        <Header />
      </header>
      <main>
        <Hero />
        <About />
        <Products />
        <Features />
        <Testimonials />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}