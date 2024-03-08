import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJ0i62Zc8pnIfVCt5eoRPS3FO5XCvM5F4",
  authDomain: "chat-app-bd9d5.firebaseapp.com",
  projectId: "chat-app-bd9d5",
  storageBucket: "chat-app-bd9d5.appspot.com",
  messagingSenderId: "121981744105",
  appId: "1:121981744105:web:f3c76d70ca0d4a978e5178",
  measurementId: "G-PP745RNW7S",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export { app, auth, provider, db, storage };
