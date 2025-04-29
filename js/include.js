// js/include.js
///////----This file loads universal design components from the /components file----///////

// Load HTML into specified element
function loadComponent(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading component:", error);
    });
}

// Load header and footer
loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");
