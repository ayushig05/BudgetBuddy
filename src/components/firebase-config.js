import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs68js7-vsMCAwf3rd4ScE0CxOjj8-BK4",
  authDomain: "expense-tracker-5d68d.firebaseapp.com",
  projectId: "expense-tracker-5d68d",
  storageBucket: "expense-tracker-5d68d.appspot.com",
  messagingSenderId: "3791524007",
  appId: "1:3791524007:web:0c19ee580321a06bd00b82",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
