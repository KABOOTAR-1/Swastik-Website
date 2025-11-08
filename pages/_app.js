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
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCItEyEDk97qE8Wfdw4YBX4UQpi27Te8tQ",
  authDomain: "swastik-website-c6008.firebaseapp.com",
  projectId: "swastik-website-c6008",
  storageBucket: "swastik-website-c6008.firebasestorage.app",
  messagingSenderId: "771800332315",
  appId: "1:771800332315:web:4d52c3e5673d27c313a0be",
  measurementId: "G-THBPJXB801"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}