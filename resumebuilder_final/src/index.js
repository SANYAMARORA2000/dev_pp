import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore ,createFirestoreInstance} from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';

// Ye extension hame yaad rakni hai 
import { composeWithDevTools} from 'redux-devtools-extension'
var firebaseConfig = {
  apiKey: "AIzaSyD01HL1bS_h3plKK1lVpBDtV1QEPE6kwhE",
  authDomain: "resume-builder-683fa.firebaseapp.com",
  projectId: "resume-builder-683fa",
  storageBucket: "resume-builder-683fa.appspot.com",
  messagingSenderId: "389732796270",
  appId: "1:389732796270:web:9c81ce6ee1eebcd0e8637f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()
const reduxStore = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})), 
    reduxFirestore(firebase) // redux bindings for firestore,
  )
);
ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={reduxStore.dispatch}
      createFirestoreInstance={createFirestoreInstance}>
      <App />
    </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);