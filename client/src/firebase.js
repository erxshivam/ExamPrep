import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCO8s99Bm0yTziq5g0QJB0M4UyZHku6-9c",
  authDomain: "examprep-e33b7.firebaseapp.com",
  projectId: "examprep-e33b7",
  storageBucket: "examprep-e33b7.firebasestorage.app",
  messagingSenderId: "995828598315",
  appId: "1:995828598315:web:73f0583075164a65e18c6e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();