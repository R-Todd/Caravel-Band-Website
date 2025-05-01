let player;
let isMuted = true;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytplayer', {
    events: {
      onReady: (event) => {
        event.target.mute();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const audioToggleBtn = document.getElementById("audioToggleBtn");

  audioToggleBtn.addEventListener("click", () => {
    if (!player) return;

    if (isMuted) {
      player.unMute();
      audioToggleBtn.textContent = "Mute";
      isMuted = false;
    } else {
      player.mute();
      audioToggleBtn.textContent = "Unmute";
      isMuted = true;
    }
  });
});
