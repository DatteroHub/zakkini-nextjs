// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Hint: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIHMQf8QP75KBGbA3sXFqGAQkt0SdokaM",
  authDomain: "dattero-65ea4.firebaseapp.com",
  projectId: "dattero-65ea4",
  storageBucket: "dattero-65ea4.appspot.com",
  messagingSenderId: "959983396856",
  appId: "1:959983396856:web:0bb69b616a37d90782580d"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const fbAuth = getAuth();

export { app, fbAuth };
