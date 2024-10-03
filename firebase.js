// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVdTKkjPYyzsShf2wJO9YDldWt8UzY7iA",
  authDomain: "homework-f74b1.firebaseapp.com",
  projectId: "homework-f74b1",
  storageBucket: "homework-f74b1.appspot.com",
  messagingSenderId: "676713283640",
  appId: "1:676713283640:web:a1d5332af8bd600089a6cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Fetch and display homework for non-admins
export async function fetchHomework() {
  const homeworkCollection = collection(db, "homework");
  const homeworkSnapshot = await getDocs(homeworkCollection);
  const homeworkList = document.getElementById('homework-list');
  homeworkList.innerHTML = ""; // Clear the list before appending new items

  homeworkSnapshot.forEach((doc) => {
    const homeworkData = doc.data();

    // Check if homeworkData has subject and description
    const subject = homeworkData.subject || "No Subject";
    const description = homeworkData.description || "No Description";

    const homeworkItem = document.createElement('div');
    homeworkItem.className = 'homework-item';
    homeworkItem.innerText = `${subject}: ${description}`;
    homeworkList.appendChild(homeworkItem);
  });
}


// Admin login
export async function loginAdmin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert('Admin logged in successfully!');
    // Redirect to admin.html after login
    window.location.href = "admin.html";
  } catch (error) {
    alert("Error logging in: " + error.message);
  }
}

// Add new homework (Admin action)
export async function addHomework(subject, description) {
  try {
    await addDoc(collection(db, "homework"), {
      subject,
      description,
    });
    alert('Homework added successfully!');
  } catch (error) {
    console.error("Error adding homework:", error);
  }
}
