import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase - Dattero Project
const firebaseConfigDattero = {
  apiKey: process.env.FIREBASE_API_KEY_D,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN_D,
  projectId: process.env.FIREBASE_PROJECT_ID_D,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_D,
  messagingSenderId: process.env.FIREBASE_MESSAGGING_SENDER_ID_D,
  appId: process.env.FIREBASE_APP_ID_D,
};

const appDattero =
  getApps().find((app) => app.name === "dattero_app") ??
  initializeApp(firebaseConfigDattero, "dattero_app");
const fbAuth = getAuth(appDattero);
const dbDattero = getFirestore(appDattero);

export { fbAuth, dbDattero };

// Initialize Firebase - Zakkini Project
const firebaseConfigZakkini = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const appZakkini =
  getApps().find((app) => app.name === "zakkini_app") ??
  initializeApp(firebaseConfigZakkini, "zakkini_app");
const db = getFirestore(appZakkini);

export { db };

export const USERS_COLLECTION = "users";
export const PROFILES_COLLECTION = "profiles";
