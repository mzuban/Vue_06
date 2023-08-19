import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNiaEPRrz0kpfblqkolqxnqVuZDX_cnPw",
  authDomain: "fipugram4.firebaseapp.com",
  projectId: "fipugram4",
  storageBucket: "fipugram4.appspot.com",
  messagingSenderId: "802865433647",
  appId: "1:802865433647:web:31d09aecba2a08aa780ada",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let storage = firebase.storage();
export { firebase, db, storage };
