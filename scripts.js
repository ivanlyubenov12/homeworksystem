const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzebV2dbAsISdNJKTus6F-gsO_lixSPPp8M7Ad93IespMIrKeAYkFAeI_thzTCVVcNK/exec'; // Replace with your actual script URL

function fetchHomework() {
    fetch(`${SCRIPT_URL}?action=getHomework`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('homework-container');
            container.innerHTML = '';  // Clear the container

            data.forEach(function(row) {
                const day = row[0];
                const homework = row[1] || 'No homework assigned';

                // Create a sticky note element
                const stickyNote = document.createElement('div');
                stickyNote.className = 'sticky-note';
                stickyNote.innerHTML = `<h2>${day}</h2><p>${homework}</p>`;
                container.appendChild(stickyNote);
            });
        })
        .catch(error => console.error('Fetch error:', error));
}

// Call fetchHomework on page load
window.onload = fetchHomework;
