// admin.js
import { db, storage } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

// Login System
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginSection = document.getElementById("login-section");
const adminSection = document.getElementById("admin-section");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout-btn");

const correctUsername = "Rushi";
const correctPassword = "Rushisd";

loginBtn.onclick = () => {
  const enteredUsername = usernameInput.value.trim();
  const enteredPassword = passwordInput.value.trim();

  if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
    loginSection.classList.add("hidden");
    adminSection.classList.remove("hidden");
  } else {
    loginError.classList.remove("hidden");
  }
};

logoutBtn.onclick = () => {
  adminSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
};

// Blog Upload
const blogForm = document.getElementById("blog-form");
const statusDiv = document.getElementById("status");

blogForm.onsubmit = async (e) => {
  e.preventDefault();
  statusDiv.innerText = "Publishing...";

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const imgFile = document.getElementById("image").files[0];
  const videoUrl = document.getElementById("videoUrl").value;
  let imgUrl = "";

  if (imgFile) {
    const storageRef = ref(storage, `blog_images/${Date.now()}_${imgFile.name}`);
    await uploadBytes(storageRef, imgFile);
    imgUrl = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "blogs"), {
    title,
    content,
    image: imgUrl,
    video: videoUrl,
    createdAt: serverTimestamp(),
  });

  statusDiv.innerText = "Published!";
  blogForm.reset();
};
