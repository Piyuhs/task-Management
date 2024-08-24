// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection,getDocs, addDoc, deleteDoc, doc,updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSJC0lZBIgNla82vBBnWuIV8ExWMmgfQM",
  authDomain: "otp-project-1b20c.firebaseapp.com",
  projectId: "otp-project-1b20c",
  storageBucket: "otp-project-1b20c.appspot.com",
  messagingSenderId: "683226832832",
  appId: "1:683226832832:web:1923c321d3a867eba6f225",
  measurementId: "G-XCGDY558Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 

const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc };