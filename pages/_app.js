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
import 'leaflet/dist/leaflet.css';
import { initializeApp, getApps } from 'firebase/app';
import { IKContext } from 'imagekitio-react';
import { imagekitConfig } from '../config/imagekit';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default function App({ Component, pageProps }) {
  return (
    <IKContext
      publicKey={imagekitConfig.publicKey}
      urlEndpoint={imagekitConfig.urlEndpoint}
      transformationPosition={imagekitConfig.transformationPosition}
      authenticationEndpoint="/api/imagekit-auth"
    >
      <Component {...pageProps} />
    </IKContext>
  );
}