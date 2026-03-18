// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRrn_2NO40zYSlrUTmxSE12dqbBKD396g",
  authDomain: "realtor-platform-react.firebaseapp.com",
  projectId: "realtor-platform-react",
  storageBucket: "realtor-platform-react.firebasestorage.app",
  messagingSenderId: "411701011520",
  appId: "1:411701011520:web:74743d40db1436306f2ba5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);