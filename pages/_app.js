import '../styles/App.css';
import '../styles/Header.css';
import '../styles/Hero.css';
import '../styles/About.css';
import '../styles/Products.css';
import '../styles/Features.css';
import '../styles/Testimonials.css';
import '../styles/Contact.css';
import '../styles/Footer.css';
import '../styles/ThemeToggle.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}