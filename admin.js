// admin.js
import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const addHomeworkForm = document.getElementById('add-homework-form');
const messageDiv = document.getElementById('message');

addHomeworkForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    try {
        await addDoc(collection(db, "homework"), {
            subject,
            description,
        });
        messageDiv.innerHTML = `<div class="alert alert-success">Homework added successfully!</div>`;
        addHomeworkForm.reset(); // Clear form fields
    } catch (error) {
        messageDiv.innerHTML = `<div class="alert alert-danger">Error adding homework: ${error.message}</div>`;
        console.error("Error adding homework:", error);
    }
});
