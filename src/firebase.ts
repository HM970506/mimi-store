import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: `${process.env.apiKey}`,
  authDomain: `${process.env.authDomain}`,
  projectId: `${process.env.projectId}`,
  storageBucket: `${process.env.storageBucket}`,
  messagingSenderId: `${process.env.messageingSenderId}`,
  appId: `${process.env.appId}`,
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
