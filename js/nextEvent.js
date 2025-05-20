// js/nextEvent.js

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("nextEventContainer");
  
    // fix: reference eventsData directly
    if (!Array.isArray(eventsData)) {
      console.error("eventsData not found");
      return;
    }
  
    // Find today at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    // Filter & sort upcoming events
    const upcoming = eventsData
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  
    if (upcoming.length === 0) {
      container.innerHTML = `<p style="color:#ccc; text-align:center;">
        No upcoming shows — check back soon!</p>`;
      return;
    }
  
    const e = upcoming[0];
    const card = document.createElement("div");
    card.className = "event-card next-event-card";
    card.innerHTML = `
      <img src="${e.image}" alt="${e.title} Flyer" class="event-flyer" />
      <div class="event-details">
        <h3>${e.title}</h3>
        <p>${e.description}</p>
        <p><strong>Date:</strong> ${new Date(e.date).toLocaleDateString(undefined,{
          year:'numeric',month:'long',day:'numeric'})}</p>
        <p><strong>Time:</strong> ${e.time}</p>
        <p><strong>Location:</strong> ${e.location}</p>
      </div>
    `;
    container.appendChild(card);
  });
  