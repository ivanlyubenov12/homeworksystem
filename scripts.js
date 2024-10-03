// scripts.js
import { db, auth } from './firebase.js'; // Import db and auth from firebase.js
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Fetch and display homework for non-admins
async function fetchHomework() {
    try {
        const homeworkCollection = collection(db, "homework");
        const homeworkSnapshot = await getDocs(homeworkCollection);
        const homeworkList = document.getElementById('homework-list');

        homeworkList.innerHTML = ""; // Clear the list before appending new items

        if (homeworkSnapshot.empty) {
            homeworkList.innerHTML = "<p>No homework found.</p>"; // Informative message if empty
            return;
        }

        homeworkSnapshot.forEach((doc) => {
            const homeworkData = doc.data();
            const homeworkItem = document.createElement('div');
            homeworkItem.className = 'homework-item card p-3 mb-2';
            homeworkItem.innerText = `${homeworkData.subject}: ${homeworkData.description}`;
            homeworkList.appendChild(homeworkItem);
        });
    } catch (error) {
        console.error('Error fetching homework:', error);
    }
}

// Admin login
export async function loginAdmin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('Admin logged in successfully!');
        // Redirect to admin.html after login
        window.location.href = "admin.html";
    } catch (error) {
        alert("Error logging in: " + error.message);
    }
}

// Call the function to fetch homework when the page loads
window.onload = fetchHomework;
