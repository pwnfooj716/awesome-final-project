import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@firebase/storage';

// Replace this with your own config details
// var config = {
//   apiKey: "AIzaSyCIQG0MW0gm_REgMJA26syjnBGO6Jbexeo",
//     authDomain: "fianalprojtest.firebaseapp.com",
//     databaseURL: "https://fianalprojtest.firebaseio.com",
//     projectId: "fianalprojtest",
//     storageBucket: "fianalprojtest.appspot.com",
//     messagingSenderId: "512873415600",
//     appId: "1:512873415600:web:26d0e34e6fa68933"
// };

var config ={
  apiKey: "AIzaSyBV600EvlqysSWX-Nga2kVHZ-Hic7klhGM",
  authDomain: "cs554-awesome-final.firebaseapp.com",
  databaseURL: "https://cs554-awesome-final.firebaseio.com",
  projectId: "cs554-awesome-final",
  storageBucket: "cs554-awesome-final.appspot.com",
  messagingSenderId: "156239022601",
  appId: "1:156239022601:web:f3d724c1685d2929"
}
firebase.initializeApp(config);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 