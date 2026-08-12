import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';

// Read Vite Environment Variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBeV9GIwQDeuRFTGHpxPcStMYDZ3U2MyZg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sarkari-5930f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sarkari-5930f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sarkari-5930f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "962587671910",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:962587671910:web:023aa624ff60d5fda55ca7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0ZT5YT78FE"
};

// Initialize Firebase App instance safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auto-Sync User Profile Document to Firestore `users/{uid}`
export async function syncUserProfile(user) {
  if (!user || !user.uid) return null;

  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const newUserProfile = {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || user.email?.split('@')[0] || 'Citizen Candidate',
        photoURL: user.photoURL || null,
        createdAt: serverTimestamp(),
        profilePreferences: {
          age: null,
          income: null,
          category: null,
          education: null,
          location: null
        }
      };

      await setDoc(userRef, newUserProfile);
      return newUserProfile;
    } else {
      return userSnap.data();
    }
  } catch (err) {
    console.warn("Firestore sync running in local resilient mode:", err.message);
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email?.split('@')[0] || 'Citizen Candidate',
      photoURL: user.photoURL || null,
      profilePreferences: {}
    };
  }
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  onAuthStateChanged
};
