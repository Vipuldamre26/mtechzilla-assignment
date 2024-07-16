// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_POwVcK9ZrUDQ4ae6pHgHdyrTefQ4Crc",
  authDomain: "mtechzilla-auth-d85e5.firebaseapp.com",
  projectId: "mtechzilla-auth-d85e5",
  storageBucket: "mtechzilla-auth-d85e5.appspot.com",
  messagingSenderId: "935060712596",
  appId: "1:935060712596:web:188e6be5eaaf4bca5e9881"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };