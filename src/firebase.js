
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8Ee-NxpX3ZTyBCjOJs7a3Mj97MeWwwPg",
    authDomain: "olga-s-little-chat.firebaseapp.com",
    projectId: "olga-s-little-chat",
    storageBucket: "olga-s-little-chat.firebasestorage.app",
    messagingSenderId: "481316648188",
    appId: "1:481316648188:web:36bf76ecd3bff4a0605379"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };