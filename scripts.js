// script.js

import { db } from './firebase.js'; // Adjust the path if needed
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Fetch and display homework for non-admins
async function fetchHomework() {
    const homeworkCollection = collection(db, "homework");
    const homeworkSnapshot = await getDocs(homeworkCollection);
    const homeworkList = document.getElementById('homework-list');
    
    homeworkList.innerHTML = ""; // Clear the list before appending new items
    console.log('Fetched Homework:', homeworkSnapshot.docs); // Check what you fetched

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
