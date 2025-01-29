// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMwhitHdVxOWyxcq1AEz_VN4_t3INxtho",
    authDomain: "udemy-discord-clone-87f11.firebaseapp.com",
    projectId: "udemy-discord-clone-87f11",
    storageBucket: "udemy-discord-clone-87f11.firebasestorage.app",
    messagingSenderId: "497518368118",
    appId: "1:497518368118:web:c52acff6c90d60493ed657",
    measurementId: "G-8H1NXFE64E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
