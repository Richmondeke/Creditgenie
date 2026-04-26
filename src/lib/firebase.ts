import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlx7mFYVNZIl70iTF57dPQPW0LFDlGCtY",
    authDomain: "creditgenie-nexus.firebaseapp.com",
    projectId: "creditgenie-nexus",
    storageBucket: "creditgenie-nexus.firebasestorage.app",
    messagingSenderId: "895881881952",
    appId: "1:895881881952:web:7cc55d0b0f30748c9ad605",
    databaseURL: "https://creditgenie-nexus-default-rtdb.firebaseio.com"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
