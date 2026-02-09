// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FAIRBASE_API_KEY,
  authDomain: "gen-lang-client-0121937043.firebaseapp.com",
  projectId: "gen-lang-client-0121937043",
  storageBucket: "gen-lang-client-0121937043.firebasestorage.app",
  messagingSenderId: "1007319330017",
  appId: "1:1007319330017:web:614ec82e60fb5d16dddba0",
  measurementId: "G-PMKJEGK3KC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth,googleProvider}