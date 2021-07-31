import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBjmJJmevu3CYNzsI3yEJqVrvBIHZKIebo",
  authDomain: "ecommerce-4fe1e.firebaseapp.com",
  projectId: "ecommerce-4fe1e",
  storageBucket: "ecommerce-4fe1e.appspot.com",
  messagingSenderId: "891922755230",
  appId: "1:891922755230:web:d1b45216d962a2ee48558f",
  measurementId: "G-GYFZQ1R0XD",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };
