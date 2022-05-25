/* eslint-disable */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcRdAbmB_N2z_OSylkr3fQqXkjyjmaiLc",
  authDomain: "cec275-3.firebaseapp.com",
  projectId: "cec275-3",
  storageBucket: "cec275-3.appspot.com",
  messagingSenderId: "751410396654",
  appId: "1:751410396654:web:064cc5730b34e62869a2ff",
  measurementId: "G-T6ZD4743T8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
