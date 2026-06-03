// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD9UJxR1UOdmGF_o1osaCOVvSojuwzR1w",
  authDomain: "cadastro-vagas-b3460.firebaseapp.com",
  projectId: "cadastro-vagas-b3460",
  storageBucket: "cadastro-vagas-b3460.firebasestorage.app",
  messagingSenderId: "928810634105",
  appId: "1:928810634105:web:a14a7a58cd5eb858a8fda8",
  measurementId: "G-28SB2EPK3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)