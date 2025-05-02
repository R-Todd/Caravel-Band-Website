// js/include.js

// Load HTML into specified element with optional callback
function loadComponent(id, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (typeof callback === "function") {
        callback(); // Run after content is injected
      }
    })
    .catch(error => {
      console.error("Error loading component:", error);
    });
}

// Load header and bind dropdown logic
loadComponent("header", "components/header.html", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-list");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }
});

// Load footer
loadComponent("footer", "components/footer.html");
