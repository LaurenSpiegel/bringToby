
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBQVmaybB2oemIY2dx6bHiuMgOr42TF2h0",
  authDomain: "toby-34fb3.firebaseapp.com",
  databaseURL: "https://toby-34fb3.firebaseio.com",
  projectId: "toby-34fb3",
  storageBucket: "toby-34fb3.appspot.com",
  messagingSenderId: "485844366333",
};
module.exports = firebase.initializeApp(firebaseConfig);
