import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

//import firebase from "firebase/compat/app";
//import "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
};

// init firebase app
export default initializeApp(firebaseConfig);

// init services
export const db = getFirestore();
export const collection_name = "cars";
export const auth = getAuth();

//const storage = firebase.storage;

//console.log(db)

// db.collection("cars")
//   .get()
//   .then((snapshot) => {
//     console.log(snapshot);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// const app = !firebase.app.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();

// const db = app.firestore;
// const auth = app.auth;
// const storage = firebase.storage;

// export default { auth, db, storage };

//export default { app, db };
