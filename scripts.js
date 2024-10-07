import { fetchHomework } from './firebase.js';

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndDisplayHomework();
});

async function fetchAndDisplayHomework() {
    const homeworkList = document.getElementById('homework-list');
    homeworkList.innerHTML = ''; // Clear the list

    const homeworkData = await fetchHomework();

    // Categorize subjects
    const categories = {
        "Математика": ["Математика", "ФЧ 1", "ФЧ 2", "ФЧ 3"],
        "Разказвателни": ["История", "География", "ЧП"],
        "Други": ["Английски", "Рисуване", "ТиП", "КМИТ 1", "КМИТ 2", "Литература", "Музика", "Час на класа", "Български"]
    };

    // Create and display homework sections
    Object.keys(categories).forEach(category => {
        const section = document.createElement('div');
        section.className = 'homework-category mt-4';
        
        // Add section title
        const sectionTitle = document.createElement('h4');
        sectionTitle.innerText = category;
        section.appendChild(sectionTitle);

        // Filter homework that belongs to the current category
        const filteredHomework = homeworkData.filter(hw => categories[category].includes(hw.subject));
        
        // Add homework items to the section
        filteredHomework.forEach(homework => {
            const homeworkItem = document.createElement('div');
            homeworkItem.className = 'homework-item mb-3 p-3 bg-white rounded shadow-sm';
            homeworkItem.innerText = `${homework.subject}: ${homework.description}`;
            section.appendChild(homeworkItem);
        });

        // Append section to homework list
        homeworkList.appendChild(section);
    });
}
