import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAyhSYgZqrLQQJexTVcnKhdfvNyUyT-_y8",
    authDomain: "todo-app-67d8c.firebaseapp.com",
    projectId: "todo-app-67d8c",
    storageBucket: "todo-app-67d8c.appspot.com",
    messagingSenderId: "393634314224",
    appId: "1:393634314224:web:ab8022487b58ca93550f35"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };