import firebase from "firebase";



let firebaseConfig = {
    apiKey: "AIzaSyDIdzOG-KZLM07vUr0eUqEGhY5ISb9YMzY",
    authDomain: "react-login-15c66.firebaseapp.com",
    projectId: "react-login-15c66",
    storageBucket: "react-login-15c66.appspot.com",
    messagingSenderId: "37758266636",
    appId: "1:37758266636:web:aebe1a073d508f64ecad29"
  };

  let firebaseapp=firebase.initializeApp(firebaseConfig);
  export let firebaseAuth=firebase.auth();

