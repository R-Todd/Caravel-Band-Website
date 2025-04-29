document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bgVideo');
  const button = document.getElementById('toggleVideoBtn');

  if (video && button) {
    button.addEventListener('click', () => {
      if (video.style.display === 'none') {
        video.style.display = 'block';
        button.textContent = 'Hide Video';
      } else {
        video.style.display = 'none';
        button.textContent = 'Show Video';
      }
    });
  }
});
