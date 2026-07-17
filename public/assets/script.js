let token = localStorage.getItem("authToken");
let currentUserId = localStorage.getItem("userId")
  ? Number(localStorage.getItem("userId"))
  : null;
let editingPostId = null;

function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        alert(data.errors[0].message);
      } else {
        alert("User registered successfully");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userData.id);
        token = data.token;
        currentUserId = data.userData.id;

        // Fetch categories and posts now that we're logged in
        fetchCategories();
        fetchPosts();

        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function logout() {
  fetch("/api/users/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).then(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    token = null;
    currentUserId = null;
    document.getElementById("auth-container").classList.remove("hidden");
    document.getElementById("app-container").classList.add("hidden");
  });
}

function fetchCategories() {
  fetch("/api/categories")
    .then((res) => res.json())
    .then((categories) => {
      const postCategorySelect = document.getElementById("post-category");
      const filterCategorySelect = document.getElementById("filter-category");

      postCategorySelect.innerHTML = '<option value="">No category</option>';
      filterCategorySelect.innerHTML = '<option value="">All categories</option>';

      categories.forEach((category) => {
        const option1 = document.createElement("option");
        option1.value = category.id;
        option1.textContent = category.category_name;
        postCategorySelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = category.id;
        option2.textContent = category.category_name;
        filterCategorySelect.appendChild(option2);
      });
    })
    .catch((error) => console.log(error));
}

function fetchPosts() {
  const categoryId = document.getElementById("filter-category").value;
  const url = categoryId ? `/api/posts?categoryId=${categoryId}` : "/api/posts";

  fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((posts) => {
      const postsContainer = document.getElementById("posts");
      postsContainer.innerHTML = "";
      posts.forEach((post) => {
        const div = document.createElement("div");
        const categoryName = post.category ? post.category.category_name : "Uncategorized";
        const isOwner = post.userId === currentUserId;

        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <small>By: ${post.postedBy} | Category: ${categoryName} | ${new Date(
            post.createdOn
          ).toLocaleString()}</small>
          ${
            isOwner
              ? `<div>
                   <button onclick="editPost(${post.id})">Edit</button>
                   <button onclick="deletePost(${post.id})">Delete</button>
                 </div>`
              : ""
          }
        `;
        postsContainer.appendChild(div);
      });
    });
}

function editPost(id) {
  fetch(`/api/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((post) => {
      editingPostId = post.id;
      document.getElementById("post-title").value = post.title;
      document.getElementById("post-content").value = post.content;
      document.getElementById("post-category").value = post.categoryId || "";
      document.getElementById("post-form-title").textContent = "Edit Post";
      document.getElementById("cancel-edit-btn").classList.remove("hidden");
    });
}

function cancelEdit() {
  editingPostId = null;
  document.getElementById("post-title").value = "";
  document.getElementById("post-content").value = "";
  document.getElementById("post-category").value = "";
  document.getElementById("post-form-title").textContent = "Create a Post";
  document.getElementById("cancel-edit-btn").classList.add("hidden");
}

function savePost() {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const categoryId = document.getElementById("post-category").value || null;

  const isEditing = editingPostId !== null;
  const url = isEditing ? `/api/posts/${editingPostId}` : "/api/posts";
  const method = isEditing ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, postedBy: "User", categoryId }),
  })
    .then((res) => res.json())
    .then(() => {
      alert(isEditing ? "Post updated successfully" : "Post created successfully");
      cancelEdit();
      fetchPosts();
    });
}

function deletePost(id) {
  if (!confirm("Delete this post?")) return;

  fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(() => {
    fetchPosts();
  });
}

// If already logged in from a previous session, skip straight to the app view
if (token) {
  document.getElementById("auth-container").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");
  fetchCategories();
  fetchPosts();
}
