/* eslint-disable */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AiLc",
  authDomain: "ceom",
  projectId: "ec",
  storageBucket: "cecom",
  messagingSenderId: "754",
  appId: "1f",
  measurementId: "T8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
