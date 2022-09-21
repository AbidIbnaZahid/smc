// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD57irAot5b_zrB8B_fjtsWwNOVqCvjcmQ",
    authDomain: "test-ae4c5.firebaseapp.com",
    projectId: "test-ae4c5",
    storageBucket: "test-ae4c5.appspot.com",
    messagingSenderId: "62938499264",
    appId: "1:62938499264:web:37bb56a3672b02c59f4525",
    measurementId: "G-9VEMTEP0K1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig