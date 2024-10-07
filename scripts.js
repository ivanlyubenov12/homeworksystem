import { db } from './firebase.js'; // Import db from firebase.js
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Group subjects into categories
const categories = {
    "Математика": ["Математика", "ФЧ 1", "ФЧ 2", "ФЧ 3"],
    "Разказвателни": ["История", "География", "ЧП"],
    "КМИТ": ["КМИТ 1", "КМИТ 2"],
    "БЕЛ": ["Български", "Литература"],
    "Други": ["Английски", "Рисуване", "ТиП", "Музика", "Час на класа"]
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
            "КМИТ": [],
            "БЕЛ": [],
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
            } else if (categories["КМИТ"].includes(subject)) {
                categorizedHomework["КМИТ"].push(homeworkData);
            } else if (categories["БЕЛ"].includes(subject)) {
                categorizedHomework["БЕЛ"].push(homeworkData);
            } else {
                categorizedHomework["Други"].push(homeworkData);
            }
        });

        // Function to sort "Математика" items
        function sortMathHomework(homeworkItems) {
            const order = ["Математика", "ФЧ 1", "ФЧ 2", "ФЧ 3"];
            return homeworkItems.sort((a, b) => order.indexOf(a.subject) - order.indexOf(b.subject));
        }

        // Function to sort "КМИТ" items
        function sortKMITHomework(homeworkItems) {
            const order = ["КМИТ 1", "КМИТ 2"];
            return homeworkItems.sort((a, b) => order.indexOf(a.subject) - order.indexOf(b.subject));
        }

        // Function to sort "БЕЛ" items
        function sortBELHomework(homeworkItems) {
            const order = ["Български", "Литература"];
            return homeworkItems.sort((a, b) => order.indexOf(a.subject) - order.indexOf(b.subject));
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

        // Sort homework for each category as needed
        const sortedMathHomework = sortMathHomework(categorizedHomework["Математика"]);
        const sortedKMITHomework = sortKMITHomework(categorizedHomework["КМИТ"]);
        const sortedBELHomework = sortBELHomework(categorizedHomework["БЕЛ"]);

        // Display homework for each category
        displayCategory("Математика", sortedMathHomework);
        displayCategory("Разказвателни", categorizedHomework["Разказвателни"]);
        displayCategory("КМИТ", sortedKMITHomework);
        displayCategory("БЕЛ", sortedBELHomework);
        displayCategory("Други", categorizedHomework["Други"]);

    } catch (error) {
        console.error('Error fetching homework:', error);
    }
}

// Call the function to fetch homework when the page loads
window.onload = fetchHomework;
