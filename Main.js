// main.js
import { db } from "./firebase-config.js";
import { collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const postsDiv = document.getElementById("posts");

async function loadPosts() {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    const data = doc.data();
    const postEl = document.createElement("article");
    postEl.className = "border p-6 rounded-lg shadow";
    postEl.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">${data.title}</h2>
      <p class="mb-4">${data.content}</p>
      ${data.image ? `<img src="${data.image}" class="mb-4 max-h-64 w-full object-cover"/>` : ""}
      ${data.video ? `<div class="mb-4"><iframe width="560" height="315" src="${data.video.replace("watch?v=", "embed/")}" frameborder="0" allowfullscreen></iframe></div>` : ""}
      <small class="text-gray-500">${new Date(data.createdAt.seconds * 1000).toLocaleString()}</small>
    `;
    postsDiv.appendChild(postEl);
  });
}

loadPosts();
