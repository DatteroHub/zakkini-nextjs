import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO move to env

// Initialize Firebase - Dattero Project
const firebaseConfigDattero = {
  apiKey: "AIzaSyDgJJFiIld-N1-P0a5TvEX9RI24gUYKIdo",
  authDomain: "dattero-org.firebaseapp.com",
  projectId: "dattero-org",
  storageBucket: "dattero-org.appspot.com",
  messagingSenderId: "832236057697",
  appId: "1:832236057697:web:99ebbaad425a76900ce620",
};

const appDattero =
  getApps().find((app) => app.name === "dattero_app") ??
  initializeApp(firebaseConfigDattero, "dattero_app");
const fbAuth = getAuth(appDattero);
const dbDattero = getFirestore(appDattero);

export { fbAuth, dbDattero };

// Initialize Firebase - Zakkini Project
const firebaseConfigZakkini = {
  apiKey: "AIzaSyDUsELlhVlFkMMMXAFy2jyeCEG0CrFRxs0",
  authDomain: "zakkini-app.firebaseapp.com",
  projectId: "zakkini-app",
  storageBucket: "zakkini-app.appspot.com",
  messagingSenderId: "164056834374",
  appId: "1:164056834374:web:8b1989be0656d08c550547",
};

const appZakkini =
  getApps().find((app) => app.name === "zakkini_app") ??
  initializeApp(firebaseConfigZakkini, "zakkini_app");
const db = getFirestore(appZakkini);

export { db };

export const USERS_COLLECTION = "users";
export const PROFILES_COLLECTION = "profiles";
