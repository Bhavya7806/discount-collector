import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut ,
  GoogleAuthProvider, // NEW
  signInWithPopup
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// 1. YOUR FIREBASE CONFIGURATION HERE
const firebaseConfig = {
    apiKey: "AIzaSyCLuuKAoju5CRVvuEPBIghSARRnCeCiIuo",
    authDomain: "studentcollector.firebaseapp.com",
    projectId: "studentcollector",
    storageBucket: "studentcollector.firebasestorage.app",
    messagingSenderId: "1088535233188",
    appId: "1:1088535233188:web:b1b738a7e5b5d534b51c31",
    measurementId: "G-3WL62F5WFB"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// 2. Export the necessary functions
export { 
  auth, 
  db,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,   // Export
  googleProvider
};