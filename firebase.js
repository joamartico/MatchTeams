import firebase from "firebase"

import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCzu4ShIphQuyEkWQAwk2v4f5vMIGih_-4",
    authDomain: "teamandmatch.firebaseapp.com",
    projectId: "teamandmatch",
    storageBucket: "teamandmatch.appspot.com",
    messagingSenderId: "876338131397",
    appId: "1:876338131397:web:34a2ba06b9695e751f9bac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()

  export default firebase

 