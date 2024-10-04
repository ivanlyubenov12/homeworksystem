// login.js
import { auth } from './firebase.js'; // Import auth from firebase.js
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const loginForm = document.getElementById('login-form');
const loginMessageDiv = document.getElementById('login-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginMessageDiv.innerHTML = '<div class="alert alert-success">Успешно влизане!</div>';
        // Redirect to admin.html after login
        window.location.href = "admin.html";
    } catch (error) {
        loginMessageDiv.innerHTML = `<div class="alert alert-danger">Грешка! ${error.message}</div>`;
        console.error("Error logging in:", error);
    }
});
