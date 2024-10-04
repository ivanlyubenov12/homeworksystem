// admin.js
import { db } from './firebase.js';
import { collection, getDocs, addDoc, deleteDoc, query, where, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const addHomeworkForm = document.getElementById('add-homework-form');
const homeworkDropdown = document.getElementById('homework-dropdown');
const deleteButton = document.getElementById('delete-button');

// Fetch and populate homework dropdown
async function loadHomeworkDropdown() {
    try {
        const homeworkCollection = collection(db, "homework");
        const homeworkSnapshot = await getDocs(homeworkCollection);

        homeworkDropdown.innerHTML = ""; // Clear the dropdown before repopulating

        if (homeworkSnapshot.empty) {
            // If there are no homework items, display a default option
            const option = document.createElement('option');
            option.textContent = "Няма зададени домашни";
            option.disabled = true;
            option.selected = true;
            homeworkDropdown.appendChild(option);
            return;
        }

        // Populate dropdown with homework items
        homeworkSnapshot.forEach((doc) => {
            const option = document.createElement('option');
            option.value = doc.id; // Store the document ID as the value
            option.textContent = `${doc.data().subject}: ${doc.data().description}`;
            homeworkDropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading homework dropdown:", error);
    }
}

// Add new homework, deleting old homework if it has the same subject
async function addHomework(subject, description) {
    try {
        const homeworkCollection = collection(db, "homework");

        // Query to check if homework with the same subject already exists
        const existingHomeworkQuery = query(homeworkCollection, where("subject", "==", subject));
        const existingHomeworkSnapshot = await getDocs(existingHomeworkQuery);

        // Delete existing homework with the same subject, if any
        for (const doc of existingHomeworkSnapshot.docs) {
            await deleteDoc(doc.ref);
        }

        // Add new homework
        await addDoc(homeworkCollection, { subject, description });
        alert('Домашно добавено/редактирано успешно!');
    } catch (error) {
        console.error("Грешка!", error);
    }
}

// Delete selected homework
async function deleteHomework(id) {
    try {
        if (!id) return; // Skip if no homework is selected
        await deleteDoc(doc(db, "homework", id));
        alert('Успешно изтрихте домашно!');
    } catch (error) {
        console.error("Грешка!", error);
    }
}

// Event listener for adding homework
addHomeworkForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    await addHomework(subject, description);
    addHomeworkForm.reset(); // Reset the form fields
    loadHomeworkDropdown(); // Refresh the dropdown list
});

// Event listener for deleting homework
deleteButton.addEventListener('click', async () => {
    const selectedId = homeworkDropdown.value;
    await deleteHomework(selectedId);
    loadHomeworkDropdown(); // Refresh the dropdown list after deletion
});

// Load the dropdown when the page loads
window.onload = loadHomeworkDropdown;
