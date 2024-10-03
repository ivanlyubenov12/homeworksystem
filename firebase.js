// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVdTKkjPYyzsShf2wJO9YDldWt8UzY7iA",
    authDomain: "homework-f74b1.firebaseapp.com",
    projectId: "homework-f74b1",
    storageBucket: "homework-f74b1.appspot.com",
    messagingSenderId: "676713283640",
    appId: "1:676713283640:web:a1d5332af8bd600089a6cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export db and auth for use in other files
export { db, auth };
