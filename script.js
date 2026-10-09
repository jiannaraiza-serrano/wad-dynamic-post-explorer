const btn = document.querySelector("#loadPosts");
const status = document.querySelector("#status");
const postList = document.querySelector("#postList");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function renderPosts(posts) {
  // loop through each post
  for (const post of posts) {
    const li = document.createElement("li");

    // title as a heading
    const title = document.createElement("h3");
    title.textContent = post.title;

    // body text
    const body = document.createElement("p");
    body.textContent = post.body;

    // title and body inside the list item
    li.appendChild(title);
    li.appendChild(body);

    postList.appendChild(li);
  }
}

// Main async function that loads the posts
async function loadPosts() {
  //Initial state: disable button, show loading message, clear old results
  btn.disabled = true;
  status.textContent = "Loading...";
  postList.innerHTML = "";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("HTTP error! status: " + res.status);
    }

    const posts = await res.json();

    const firstFive = posts.slice(0, 5);

    if (firstFive.length === 0) {
      status.textContent = "No posts were found.";
    } else {
      status.textContent = "Posts loaded successfully!";
      renderPosts(firstFive);
    }

  } catch (err) {
    status.textContent = "Something went wrong: " + err.message + " (click Load Posts to retry)";

  } finally {
    btn.disabled = false;
  }
}

btn.addEventListener("click", loadPosts);