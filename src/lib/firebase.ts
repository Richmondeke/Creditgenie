import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // Placeholder config - user or system should replace with real credentials from console
    apiKey: "AIzaSyAs-MOCK-API-KEY",
    authDomain: "creditgenie-nexus.firebaseapp.com",
    projectId: "creditgenie-nexus",
    storageBucket: "creditgenie-nexus.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
