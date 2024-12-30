// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgr2Qj4e5QV1xHPF7vuAuETvZY5uKgf3Q",
  authDomain: "apple-b1193.firebaseapp.com",
  projectId: "apple-b1193",
  storageBucket: "apple-b1193.firebasestorage.app",
  messagingSenderId: "301879306309",
  appId: "1:301879306309:web:ca4ecbebd78708cd3e1b2c",
  measurementId: "G-95LHRMYRFX",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
