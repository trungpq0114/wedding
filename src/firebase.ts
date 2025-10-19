// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v9-compat and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBz-MqAfW5qUEFXZy4GNg2xIMtlKhjwe7I',
  authDomain: 'wedding-704d8.firebaseapp.com',
  projectId: 'wedding-704d8',
  storageBucket: 'wedding-704d8.firebasestorage.app',
  messagingSenderId: '874180816919',
  appId: '1:874180816919:web:f1ed9a54a3c589232cec52',
  measurementId: 'G-Y5152XET4L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;
