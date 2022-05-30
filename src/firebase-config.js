import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBIMXMWrWCPlzialR25ctSEFIBf7KGgGo",
  authDomain: "stint-pomodoro.firebaseapp.com",
  projectId: "stint-pomodoro",
  storageBucket: "stint-pomodoro.appspot.com",
  messagingSenderId: "139209721745",
  appId: "1:139209721745:web:64abe29a1d169cd02cfc30",
  measurementId: "G-GFMNWSEWHZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
