import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA611B_g2Tkx3eYJpVTu_c7hpUiR81LB74",
  authDomain: "my-food-diary-c8b1f.firebaseapp.com",
  databaseURL: "https://my-food-diary-c8b1f.firebaseio.com",
  projectId: "my-food-diary-c8b1f",
  storageBucket: "my-food-diary-c8b1f.appspot.com",
  messagingSenderId: "162264444923"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
