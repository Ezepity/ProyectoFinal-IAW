// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeLL1ZDLsMyQppfODyndCoWAIrGW9qA3E",
  authDomain: "proyecto-final-iaw-75ff4.firebaseapp.com",
  projectId: "proyecto-final-iaw-75ff4",
  storageBucket: "proyecto-final-iaw-75ff4.appspot.com",
  messagingSenderId: "32752527903",
  appId: "1:32752527903:web:55e421acbbbbac6bfb432a",
  measurementId: "G-Y4V1WJ6LLK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
