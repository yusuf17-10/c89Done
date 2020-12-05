import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = { apiKey: "AIzaSyAT6uaQqCQt2YxchivcLICrzmzZkpHnDjQ", authDomain: "booksanta2-7293e.firebaseapp.com", databaseURL: "https://booksanta2-7293e.firebaseio.com", projectId: "booksanta2-7293e", storageBucket: "booksanta2-7293e.appspot.com", messagingSenderId: "26056951260", appId: "1:26056951260:web:21bc91869e8d63c722fb19" };
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();