import firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyCV0r85lTLePAFIHLY3rodGM13S1elI_rE",
  authDomain: "reels-project-88fca.firebaseapp.com",
  projectId: "reels-project-88fca",
  storageBucket: "reels-project-88fca.appspot.com",
  messagingSenderId: "342638884559",
  appId: "1:342638884559:web:95d9a4a2b077a7af7ee9ba"
  };

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;

// const firebaseConfig = {
//     apiKey: "AIzaSyDiAizNzb_FEh8eFlVon6uZMjHDYuRGTg8",
//     authDomain: "react-f0e3a.firebaseapp.com",
//     projectId: "react-f0e3a",
//     storageBucket: "react-f0e3a.appspot.com",
//     messagingSenderId: "466193242714",
//     appId: "1:466193242714:web:3e5e3ac22b2302a38d9663"
//   };
