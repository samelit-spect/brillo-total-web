// src/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- Sumamos esta importación para la base de datos

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJ67pkpyhOPb4K0rm0S7IzZmfunlHMhPg",
    authDomain: "brillo-total-27944.firebaseapp.com",
    projectId: "brillo-total-27944",
    storageBucket: "brillo-total-27944.firebasestorage.app",
    messagingSenderId: "622768734843",
    appId: "1:622768734843:web:efc280c42440b995c218de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos y EXPORTAMOS Firestore para usar la DB en los componentes
export const db = getFirestore(app);