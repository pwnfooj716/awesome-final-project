import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyCIQG0MW0gm_REgMJA26syjnBGO6Jbexeo",
    authDomain: "fianalprojtest.firebaseapp.com",
    databaseURL: "https://fianalprojtest.firebaseio.com",
    projectId: "fianalprojtest",
    storageBucket: "fianalprojtest.appspot.com",
    messagingSenderId: "512873415600",
    appId: "1:512873415600:web:26d0e34e6fa68933"
};
firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 