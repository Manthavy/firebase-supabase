// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Optional: Import Analytics only if you're using it in the browser
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyABPkDQGLvMNL5YiZBcT4KjXBb8xUJzI30",
  // authDomain: "my-project-f739d.firebaseapp.com",
  // projectId: "my-project-f739d",
  // storageBucket: "my-project-f739d.appspot.com", // fixed typo: was "firebasestorage.app"
  // messagingSenderId: "993887471257",
  // appId: "1:993887471257:web:bc3fa98363a62a79099a08",
  // measurementId: "G-5PWFBV7FPW",
  apiKey: "AIzaSyB3QOJHuZMEr5N15F6j3MoeJY8RJlwvsDo",
  authDomain: "fullstack-project-c82b3.firebaseapp.com",
  projectId: "fullstack-project-c82b3",
  storageBucket: "fullstack-project-c82b3.firebasestorage.app", // fixed typo: was "firebasestorage.app"
  messagingSenderId: "28385965806",
  appId: "1:28385965806:web:ee108618996913a98225ff",
  measurementId: "G-GB5LYXZ72T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firestore and export it
// export const db = getFirestore(app);
export {db, storage};
// Optional: Initialize Analytics only if supported (e.g., not on SSR)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) getAnalytics(app);
  });
}
