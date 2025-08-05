// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpsqkb2wLAfvwKphENQSX8CudKoQHV82s",
  authDomain: "foodi-client-5a63b.firebaseapp.com",
  projectId: "foodi-client-5a63b",
  storageBucket: "foodi-client-5a63b.appspot.com",
  messagingSenderId: "665921093311",
  appId: "1:665921093311:web:b62e9fb27ad85ebd32500a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;