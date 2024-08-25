// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore"; // Import Firestore

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCu95C0-9rNEzHXUUd-NKiFJy4-sCP71rQ",
//   authDomain: "flashcard-saas-46445.firebaseapp.com",
//   projectId: "flashcard-saas-46445",
//   storageBucket: "flashcard-saas-46445.appspot.com",
//   messagingSenderId: "287431694571",
//   appId: "1:287431694571:web:c2e1c7afe8c5bdb9f9c6ae",
//   measurementId: "G-5EH5E4V8BM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Firestore and export it
// const db = getFirestore(app);
// export { db };

import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu95C0-9rNEzHXUUd-NKiFJy4-sCP71rQ",
  authDomain: "flashcard-saas-46445.firebaseapp.com",
  projectId: "flashcard-saas-46445",
  storageBucket: "flashcard-saas-46445.appspot.com",
  messagingSenderId: "287431694571",
  appId: "1:287431694571:web:c2e1c7afe8c5bdb9f9c6ae",
  measurementId: "G-5EH5E4V8BM"
};

const app = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      const analytics = getAnalytics(app);
    }
  });
}
