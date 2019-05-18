import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@firebase/storage';


var config ={
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DBURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_MSID,
  appId: process.env.REACT_APP_APPID
}
firebase.initializeApp(config);

export default firebase 

