import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'

const loadFirebase = () => {
  const firebaseConfig = {
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyAG4edtt6FDFZCcWQGvekRm7fuRy2JeoFo",
    authDomain: "lugar-livre.firebaseapp.com",
    databaseURL: "https://lugar-livre.firebaseio.com",
    projectId: "lugar-livre",
    storageBucket: "lugar-livre.appspot.com",
    messagingSenderId: "34933409514",
    appId: "1:34933409514:web:236c046ac123995bf73993",
    measurementId: "G-FD37WGZTEM"
  };
  console.log(process.env);
  try {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  } catch(error) {
    if (!/already exists/.test(error.message)) {
      console.log('ups ', error.message);
    }
  }
  return firebase;
}

export default loadFirebase;