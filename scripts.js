import { db } from './firebase.js'; // Import db from firebase.js
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Group subjects into categories
const categories = {
    "Математика": ["Математика", "ФЧ 1", "ФЧ 2", "ФЧ 3"],
    "Разказвателни": ["История", "География", "ЧП"],
    "Други": ["Английски", "Рисуване", "ТиП", "КМИТ 1", "КМИТ 2", "Литература", "Музика", "Час на класа", "Български"]
};

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

        // Prepare an object to hold categorized homework
        const categorizedHomework = {
            "Математика": [],
            "Разказвателни": [],
            "Други": []
        };

        // Sort the homework into categories
        homeworkSnapshot.forEach((doc) => {
            const homeworkData = doc.data();
            const subject = homeworkData.subject;

            // Check which category the subject belongs to and add it
            if (categories["Математика"].includes(subject)) {
                categorizedHomework["Математика"].push(homeworkData);
            } else if (categories["Разказвателни"].includes(subject)) {
                categorizedHomework["Разказвателни"].push(homeworkData);
            } else {
                categorizedHomework["Други"].push(homeworkData);
            }
        });

        // Function to sort "Математика" items with Математика first, followed by ФЧ 1, ФЧ 2, ФЧ 3
        function sortMathHomework(homeworkItems) {
            return homeworkItems.sort((a, b) => {
                const order = ["Математика", "ФЧ 1", "ФЧ 2", "ФЧ 3"];
                return order.indexOf(a.subject) - order.indexOf(b.subject);
            });
        }

        // Function to create and display a category section
        function displayCategory(categoryName, homeworkItems) {
            if (homeworkItems.length > 0) {
                const categoryHeader = document.createElement('h3');
                categoryHeader.innerText = categoryName;
                homeworkList.appendChild(categoryHeader);

                homeworkItems.forEach((homeworkData) => {
                    const homeworkItem = document.createElement('div');
                    homeworkItem.className = 'homework-item card p-3 mb-2';
                    homeworkItem.innerText = `${homeworkData.subject}: ${homeworkData.description}`;
                    homeworkList.appendChild(homeworkItem);
                });
            }
        }

        // Sort "Математика" homework as requested
        const sortedMathHomework = sortMathHomework(categorizedHomework["Математика"]);

        // Display homework for each category
        displayCategory("Математика", sortedMathHomework);
        displayCategory("Разказвателни", categorizedHomework["Разказвателни"]);
        displayCategory("Други", categorizedHomework["Други"]);

    } catch (error) {
        console.error('Error fetching homework:', error);
    }
}

// Call the function to fetch homework when the page loads
window.onload = fetchHomework;
