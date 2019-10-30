import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB5zZiB86trnimmAFdt1Y3D2y7-L1WqhzU",
  authDomain: "forestellaschedule.firebaseapp.com",
  databaseURL: "https://forestellaschedule.firebaseio.com",
  projectId: "forestellaschedule",
  storageBucket: "forestellaschedule.appspot.com",
  messagingSenderId: "915810306801",
  appId: "1:915810306801:web:7d37f8164d4e15526e7750",
  measurementId: "G-J1VJ13S7SY"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();

const settings = {};
firestore.settings(settings);

export default firestore;
