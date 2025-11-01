import React from 'react';
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
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
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