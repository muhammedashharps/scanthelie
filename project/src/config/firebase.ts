import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8OeoWmR5TWqod7SOH89yuY5wHTxEFSAI",
  authDomain: "scan-the-lie.firebaseapp.com",
  projectId: "scan-the-lie",
  storageBucket: "scan-the-lie.firebasestorage.app",
  messagingSenderId: "299788260655",
  appId: "1:299788260655:web:f8c46ff570c0a25ff67dda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 