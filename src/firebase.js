import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: "AIzaSyCJ6WCLQz1npFzHNMK6XRBc3oyJ-iQBE1U",
  authDomain: "xkcd-reader-6f9fc.firebaseapp.com",
  databaseURL: "https://xkcd-reader-6f9fc.firebaseio.com",
  projectId: "xkcd-reader-6f9fc",
  storageBucket: "xkcd-reader-6f9fc.appspot.com",
  messagingSenderId: "588693180118",
  appId: "1:588693180118:web:41094279ea0c3dfe9d8377"
});

export const db = firebase.firestore();
export const auth = firebase.auth();

const { Timestamp, GeoPoint } = firebase.firestore;

export { Timestamp, GeoPoint }
