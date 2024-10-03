// script.js

// Import necessary Firebase functions
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

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

// Fetch and display homework for non-admins
async function fetchHomework() {
    const homeworkCollection = collection(db, "homework");
    const homeworkSnapshot = await getDocs(homeworkCollection);
    const homeworkList = document.getElementById('homework-list');
    
    homeworkList.innerHTML = ""; // Clear the list before appending new items
    homeworkSnapshot.forEach((doc) => {
        const homeworkData = doc.data();
        const homeworkItem = document.createElement('div');
        homeworkItem.className = 'homework-item card p-3 mb-2';
        homeworkItem.innerText = `${homeworkData.subject}: ${homeworkData.description}`;
        homeworkList.appendChild(homeworkItem);
    });
}

// Call fetchHomework when the page loads
window.onload = fetchHomework;
