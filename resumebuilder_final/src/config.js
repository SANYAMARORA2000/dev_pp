import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// Initialize Firebase
let fbObj = {
    apiKey: "AIzaSyD01HL1bS_h3plKK1lVpBDtV1QEPE6kwhE",
  authDomain: "resume-builder-683fa.firebaseapp.com",
  projectId: "resume-builder-683fa",
  storageBucket: "resume-builder-683fa.appspot.com",
  messagingSenderId: "389732796270",
  appId: "1:389732796270:web:9c81ce6ee1eebcd0e8637f"
}
firebase.initializeApp(fbObj);
export default firebase;
