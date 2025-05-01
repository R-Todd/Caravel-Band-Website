document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleVideoBtn");
  const videoWrapper = document.querySelector(".youtube-video-wrapper");

  // Hide on mobile by default
  if (window.innerWidth <= 600) {
    videoWrapper.classList.remove("fade-in");
    videoWrapper.classList.add("fade-out");
    toggleBtn.textContent = "Show Video";
  }

  toggleBtn.addEventListener("click", function () {
    if (videoWrapper.classList.contains("fade-in")) {
      videoWrapper.classList.remove("fade-in");
      videoWrapper.classList.add("fade-out");
      toggleBtn.textContent = "Show Video";
    } else {
      videoWrapper.classList.remove("fade-out");
      videoWrapper.classList.add("fade-in");
      toggleBtn.textContent = "Hide Video";
    }
  });
});
