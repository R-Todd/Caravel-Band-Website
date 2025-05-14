// youtubeAudio.js

// YouTube player registry
const ytPlayers = {};

// Called automatically by YouTube Iframe API when ready
function onYouTubeIframeAPIReady() {
  ['ytplayer1', 'ytplayer2'].forEach(playerId => {
    ytPlayers[playerId] = new YT.Player(playerId, {
      events: {
        onReady: (event) => event.target.mute()
      }
    });
  });
}

// Toggle mute/unmute on the appropriate player
function toggleAudio(playerId, button) {
  const player = ytPlayers[playerId];
  if (!player) return;

  if (player.isMuted()) {
    player.unMute();
    button.textContent = 'Mute';
  } else {
    player.mute();
    button.textContent = 'Unmute';
  }
}

// Attach event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.audio-toggle-btn').forEach(button => {
    const playerId = button.dataset.player;
    button.addEventListener('click', () => toggleAudio(playerId, button));
  });
});
