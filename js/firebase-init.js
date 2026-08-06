  // Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config

const firebaseConfig = {

  apiKey: "AIzaSyC_OQRVex2rH3tzBfDmaQzc-nPEjX5AsM0",

  authDomain: "ekantra-befbc.firebaseapp.com",

  projectId: "ekantra-befbc",

  storageBucket: "ekantra-befbc.firebasestorage.app",

  messagingSenderId: "421572188153",

  appId: "1:421572188153:web:dd291a3962fe3ea0184f28",

  measurementId: "G-68GZ777N80"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Firestore

const db = getFirestore(app);

// Export

export { db };