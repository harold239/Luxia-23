// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrgX5PRXiZ_stYMub29pOM4g5KgjIOFNY",
  authDomain: "luxia-23.firebaseapp.com",
  projectId: "luxia-23",
  storageBucket: "luxia-23.firebasestorage.app",
  messagingSenderId: "695743766510",
  appId: "1:695743766510:web:c56bdb29bde7cf025eb8ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)