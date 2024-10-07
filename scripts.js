import { db } from './firebase.js'; // Import db from firebase.js
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Fetch and display homework for non-admins
async function fetchHomework() {
    try {
        const homeworkCollection = collection(db, "homework");
        const homeworkSnapshot = await getDocs(homeworkCollection);
        const homeworkList = document.getElementById('homework-list');

        homeworkList.innerHTML = ""; // Clear the list before appending new items

        if (homeworkSnapshot.empty) {
            homeworkList.innerHTML = "<h3>Супер! Нямаме домашни!</h3>"; // Informative message if empty
            return;
        }

        // Categorize subjects
        const categories = {
            "Математика": ["Математика", "ФЧ 1", "ФЧ 2", "ФЧ 3"],
            "Разказвателни": ["История", "География", "ЧП"],
            "Други": ["Английски", "Рисуване", "ТиП", "КМИТ 1", "КМИТ 2", "Литература", "Музика", "Час на класа", "Български"]
        };

        // Create sections for each category
        const categorySections = {
            "Математика": document.createElement('div'),
            "Разказвателни": document.createElement('div'),
            "Други": document.createElement('div')
        };

        // Add titles to each category section
        for (let category in categorySections) {
            const sectionTitle = document.createElement('h4');
            sectionTitle.innerText = category;
            categorySections[category].appendChild(sectionTitle);
        }

        // Add homework items to the appropriate category
        homeworkSnapshot.forEach((doc) => {
            const homeworkData = doc.data();
            const homeworkItem = document.createElement('div');
            homeworkItem.className = 'homework-item card p-3 mb-2';
            homeworkItem.innerText = `${homeworkData.subject}: ${homeworkData.description}`;

            // Append to the right category based on the subject
            for (let category in categories) {
                if (categories[category].includes(homeworkData.subject)) {
                    categorySections[category].appendChild(homeworkItem);
                    break;
                }
            }
        });

        // Append all category sections to the main homework list
        for (let category in categorySections) {
            homeworkList.appendChild(categorySections[category]);
        }
    } catch (error) {
        console.error('Error fetching homework:', error);
    }
}

// Call the function to fetch homework when the page loads
window.onload = fetchHomework;
