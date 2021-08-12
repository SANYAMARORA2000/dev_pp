import firebase from "firebase";



let firebaseConfig = {

  apiKey: "AIzaSyDh1lsH8DOeA43bXVn0Eoee3C_oa2XL-6c",
  authDomain: "musicplayer-login-229c1.firebaseapp.com",
  projectId: "musicplayer-login-229c1",
  storageBucket: "musicplayer-login-229c1.appspot.com",
  messagingSenderId: "1089423919213",
  appId: "1:1089423919213:web:3b6e581c868a4cb8a69764"

   
  };

  let firebaseApp=firebase.initializeApp(firebaseConfig);
export let firebaseAuth=firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp=firebase.firestore.FieldValue.serverTimestamp;

