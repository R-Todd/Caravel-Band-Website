// toggleVideo.js

document.addEventListener("DOMContentLoaded", function () {
  // Grab the toggle button and the video wrapper container
  const toggleBtn = document.getElementById("toggleVideoBtn");
  const videoWrapper = document.querySelector(".youtube-video-wrapper");

  // On mobile devices (≤600px), hide the video by default
  if (window.innerWidth <= 600) {
    videoWrapper.classList.remove("fade-in");
    videoWrapper.classList.add("fade-out");
    toggleBtn.textContent = "Show Video"; // update button text
  }

  // When the user clicks the toggle button:
  toggleBtn.addEventListener("click", function () {
    if (videoWrapper.classList.contains("fade-in")) {
      // If video is visible, fade it out
      videoWrapper.classList.remove("fade-in");
      videoWrapper.classList.add("fade-out");
      toggleBtn.textContent = "Show Video";
    } else {
      // If video is hidden, fade it in
      videoWrapper.classList.remove("fade-out");
      videoWrapper.classList.add("fade-in");
      toggleBtn.textContent = "Hide Video";
    }
  });
});
