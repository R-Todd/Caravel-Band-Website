// youtubeAudio.js

let player;      // reference to the YouTube player instance
let isMuted = true; // track current mute state

// This function is called automatically by the YouTube IFrame API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    events: {
      onReady: (event) => {
        // Mute the video as soon as it’s ready
        event.target.mute();
      }
    }
  });
}

// Wait for the DOM so the audio toggle button exists
document.addEventListener("DOMContentLoaded", () => {
  const audioToggleBtn = document.getElementById("audioToggleBtn");

  // Click handler to mute/unmute the video
  audioToggleBtn.addEventListener("click", () => {
    if (!player) return; // guard if API isn’t ready yet

    if (isMuted) {
      player.unMute();               // unmute video
      audioToggleBtn.textContent = "Mute";
      isMuted = false;
    } else {
      player.mute();                 // mute video
      audioToggleBtn.textContent = "Unmute";
      isMuted = true;
    }
  });
});
