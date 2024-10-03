// script.js
import { db } from './firebase.js'; // Ensure this path is correct
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function fetchHomework() {
    try {
        console.log("Fetching homework...");
        const homeworkCollection = collection(db, "homework");
        const homeworkSnapshot = await getDocs(homeworkCollection);
        const homeworkList = document.getElementById('homework-list');

        homeworkList.innerHTML = ""; // Clear the list before appending new items
        console.log('Fetched Homework:', homeworkSnapshot.docs); // Log fetched documents

        if (homeworkSnapshot.empty) {
            homeworkList.innerHTML = "<p>No homework found.</p>"; // Informative message if empty
            console.log('No homework found.');
            return;
        }

        homeworkSnapshot.forEach((doc) => {
            const homeworkData = doc.data();
            console.log('Homework Item:', homeworkData); // Log each item
            const homeworkItem = document.createElement('div');
            homeworkItem.className = 'homework-item card p-3 mb-2';
            homeworkItem.innerText = `${homeworkData.subject}: ${homeworkData.description}`;
            homeworkList.appendChild(homeworkItem);
        });
    } catch (error) {
        console.error('Error fetching homework:', error);
    }
}

// Call the function to fetch homework when the page loads
window.onload = fetchHomework;
