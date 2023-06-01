// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-MEEEJtGoHvTGX0dpIbzwpDe_qu7iJzg",
  authDomain: "otpproject-f4749.firebaseapp.com",
  projectId: "otpproject-f4749",
  storageBucket: "otpproject-f4749.appspot.com",
  messagingSenderId: "528085998312",
  appId: "1:528085998312:web:28d34c9f97b0b8fc07c75d",
  measurementId: "G-9CJ3RNWMJ8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)