import firebase from "firebase";

const config = {};
firebase.initializeApp(config);
const firestore = firebase.firestore();

const settings = {};
firestore.settings(settings);

export default firestore;
