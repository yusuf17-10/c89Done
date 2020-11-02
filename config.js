import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyAYQTh8odv93NMpkrKWrO4R0G4NZ4rPAVk",
    authDomain: "booksanta-16b43.firebaseapp.com",
    databaseURL: "https://booksanta-16b43.firebaseio.com",
    projectId: "booksanta-16b43",
    storageBucket: "booksanta-16b43.appspot.com",
    messagingSenderId: "694996085598",
    appId: "1:694996085598:web:af4941037fa2e2c691bdcf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore();