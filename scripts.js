const SCRIPT_URL = 'YOUR_SCRIPT_WEB_APP_URL';

// Fetch homework and display it in sticky notes
function fetchHomework() {
  fetch(`${SCRIPT_URL}?action=getHomework`)
    .then(response => response.json())
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
    });
}

// Update homework for a specific day
function updateHomework(day, homework) {
  fetch(`${SCRIPT_URL}?action=updateHomework`, {
    method: 'POST',
    body: JSON.stringify({ day: day, homework: homework }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Homework updated successfully!');
    } else {
      alert('Failed to update homework.');
    }
  });
}
