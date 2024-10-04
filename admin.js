// admin.js
import { db } from './firebase.js';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const addHomeworkForm = document.getElementById('add-homework-form');
const homeworkDropdown = document.getElementById('homework-dropdown');
const deleteButton = document.getElementById('delete-button');

// Fetch all homework and populate the dropdown
async function loadHomeworkDropdown() {
    const homeworkCollection = collection(db, "homework");
    const homeworkSnapshot = await getDocs(homeworkCollection);

    homeworkDropdown.innerHTML = ""; // Clear existing options

    homeworkSnapshot.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = `${doc.data().subject}: ${doc.data().description}`;
        homeworkDropdown.appendChild(option);
    });
}

// Add new homework (replacing old homework with the same subject)
async function addHomework(subject, description) {
    const homeworkCollection = collection(db, "homework");

    // Delete any existing homework with the same subject
    const existingHomeworkQuery = query(homeworkCollection, where("subject", "==", subject));
    const existingHomeworkSnapshot = await getDocs(existingHomeworkQuery);
    existingHomeworkSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });

    // Add the new homework
    await addDoc(homeworkCollection, { subject, description });
}

// Delete selected homework
async function deleteHomework(id) {
    if (!id) return;
    await deleteDoc(doc(db, "homework", id));
}

// Event listener for adding homework
addHomeworkForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    await addHomework(subject, description);
    alert('Homework added/updated successfully!');
    addHomeworkForm.reset();
    loadHomeworkDropdown(); // Reload dropdown after adding homework
});

// Event listener for deleting homework
deleteButton.addEventListener('click', async () => {
    const selectedId = homeworkDropdown.value;
    await deleteHomework(selectedId);
    alert('Homework deleted successfully!');
    loadHomeworkDropdown(); // Reload dropdown after deletion
});

// Load dropdown on page load
window.onload = loadHomeworkDropdown;
