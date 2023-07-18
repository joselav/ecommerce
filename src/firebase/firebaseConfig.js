// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjjGugnKrX0q6VRlI7OtNczu41NPf-hKE",
  authDomain: "funmug-32a52.firebaseapp.com",
  projectId: "funmug-32a52",
  storageBucket: "funmug-32a52.appspot.com",
  messagingSenderId: "961156692590",
  appId: "1:961156692590:web:51da240916638ed32c447f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)