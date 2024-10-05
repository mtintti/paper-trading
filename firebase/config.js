// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxcmRo0q2oc6Vk8DMXz_8w7LNbHBjv6oc",
  authDomain: "paper-trading-35a69.firebaseapp.com",
  projectId: "paper-trading-35a69",
  storageBucket: "paper-trading-35a69.appspot.com",
  messagingSenderId: "836186674603",
  appId: "1:836186674603:web:732864a50431c275302eee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const db = getFirestore(app);
export{db};