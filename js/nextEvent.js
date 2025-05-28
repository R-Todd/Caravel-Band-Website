// js/nextEvent.js
// Injects the next upcoming event card into #nextEventSection
// Depends on eventsData from eventsData.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("nextEventSection");
  if (!Array.isArray(eventsData)) {
    console.error("eventsData not found or not an array");
    return;
  }

  // Normalize “today” to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter & sort upcoming events
  const upcoming = eventsData
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // If none, show a friendly message
  if (upcoming.length === 0) {
    container.innerHTML = `
      <p style="color:#ccc; text-align:center; margin:1em 0;">
        No upcoming shows—check back soon!
      </p>
    `;
    return;
  }

  // Otherwise render the next event
  const e = upcoming[0];
  container.innerHTML = `
    <div class="next-event-card">
      <img src="${e.image}" alt="${e.title} Flyer" class="event-flyer" />
      <div class="event-details">
        <h3>${e.title}</h3>
        <p>${e.description}</p>
        <p><strong>Date:</strong> ${new Date(e.date).toLocaleDateString(undefined,{
          year:'numeric', month:'long', day:'numeric'})}</p>
        <p><strong>Time:</strong> ${e.time}</p>
        <p><strong>Location:</strong> ${e.location}</p>
      </div>
    </div>
  `;
});
