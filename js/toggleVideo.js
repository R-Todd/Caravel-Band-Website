// toggleVideo.js

// Toggle visibility (fade-in/out) of a video wrapper
function toggleVisibility(wrapperId, button) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;

  const isVisible = wrapper.classList.contains('fade-in');
  wrapper.classList.toggle('fade-in', !isVisible);
  wrapper.classList.toggle('fade-out', isVisible);
  button.textContent = isVisible ? 'Show Video' : 'Hide Video';
}

// Wait until the DOM is ready to attach button listeners
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toggle-video-btn').forEach(button => {
    const wrapperId = button.dataset.wrapper;
    button.addEventListener('click', () => toggleVisibility(wrapperId, button));
  });
});
