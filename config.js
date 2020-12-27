import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBuxuCTni4uXXAtjFa9ruhuPTo5Cbup4_o",
    authDomain: "booksanta-92265.firebaseapp.com",
    projectId: "booksanta-92265",
    storageBucket: "booksanta-92265.appspot.com",
    messagingSenderId: "1083398160706",
    appId: "1:1083398160706:web:99b6fe2200d7a429dd88db"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();