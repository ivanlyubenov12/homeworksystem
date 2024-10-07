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

        // Define the sorted subjects structure
        const sortedHomework = {
            "Математика": [],
            "Разказвателни": [],
            "КМИТ": [],
            "БЕЛ": [],
            "Други": []
        };

        homeworkSnapshot.forEach((doc) => {
            const homeworkData = doc.data();
            switch (homeworkData.subject) {
                case "Математика":
                case "ФЧ 1":
                case "ФЧ 2":
                case "ФЧ 3":
                    sortedHomework["Математика"].push(homeworkData);
                    break;
                case "История":
                case "География":
                case "ЧП":
                    sortedHomework["Разказвателни"].push(homeworkData);
                    break;
                case "КМИТ 1":
                case "КМИТ 2":
                    sortedHomework["КМИТ"].push(homeworkData);
                    break;
                case "Български":
                case "Литература":
                    sortedHomework["БЕЛ"].push(homeworkData);
                    break;
                default:
                    sortedHomework["Други"].push(homeworkData);
            }
        });

        // Function to display homework items
        function displayHomework(section, items) {
            if (items.length > 0) {
                const sectionTitle = document.createElement('h4');
                sectionTitle.innerText = section;
                homeworkList.appendChild(sectionTitle);

                items.forEach((item) => {
                    const homeworkItem = document.createElement('div');
                    homeworkItem.className = 'homework-item card p-3 mb-2';
                    homeworkItem.innerText = `${item.subject}: ${item.description}`;
                    homeworkList.appendChild(homeworkItem);
                });
            }
        }

        // Display sorted homework
        displayHomework("Математика", sortedHomework["Математика"]);
        displayHomework("Разказвателни", sortedHomework["Разказвателни"]);
        displayHomework("КМИТ", sortedHomework["КМИТ"]);
        displayHomework("БЕЛ", sortedHomework["БЕЛ"]);
        displayHomework("Други", sortedHomework["Други"]);

    } catch (error) {
        console.error('Error fetching homework:', error);
    }
}

// Call the function to fetch homework when the page loads
window.onload = fetchHomework;
