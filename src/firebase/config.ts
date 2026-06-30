import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDJ67pkpyhOPb4K0rm0S7IzZmfunlHMhPg",
    authDomain: "brillo-total-27944.firebaseapp.com",
    projectId: "brillo-total-27944",
    storageBucket: "brillo-total-27944.firebasestorage.app",
    messagingSenderId: "622768734843",
    appId: "1:622768734843:web:efc280c42440b995c218de",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);