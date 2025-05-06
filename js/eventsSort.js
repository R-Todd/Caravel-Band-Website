// js/eventsSort.js

document.addEventListener("DOMContentLoaded", function () {
  const upcomingContainer = document.getElementById("upcomingEventsContainer");
  const pastContainer     = document.getElementById("pastEventsContainer");

  if (!Array.isArray(eventsData)) {
    console.error("eventsData is missing or not an array.");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = eventsData.filter(e => new Date(e.date) >= today);
  const pastEvents     = eventsData.filter(e => new Date(e.date) < today);

  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  pastEvents    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Renders full-size event cards for upcoming shows
  const renderEvents = (list, container) => {
    list.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <img src="${event.image}" alt="${event.title} Flyer" class="event-flyer" />
        <div class="event-details">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <p><strong>Date:</strong> ${formatDate(event.date)}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>
      `;
      container.appendChild(card);
    });
  };

  // Renders the past-shows thumbnail list with toggles
  const renderPastEventThumbs = (list, container) => {
    list.forEach(event => {
      const wrapper = document.createElement("div");
      wrapper.className = "past-event-thumb-wrapper";

      const dateObj = new Date(event.date);
      const day   = dateObj.getDate().toString().padStart(2, '0');
      const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();

      const thumbnail = document.createElement("div");
      thumbnail.className = "past-event-thumb";
      thumbnail.innerHTML = `
        <div class="thumb-header">
          <div class="calendar-icon">
            <div class="calendar-day">${day}</div>
            <div class="calendar-month">${month}</div>
          </div>
          <div class="thumb-title-wrapper">
            <h3 class="past-title">${event.title}</h3>
          </div>
          <div class="toggle-icon">+</div>
        </div>
      `;

      // Bind the click to the header (including the + icon)
      const headerDiv = thumbnail.querySelector(".thumb-header");
      const fullDetails = document.createElement("div");
      fullDetails.className = "past-event-details hidden";
      fullDetails.innerHTML = `
        <img src="${event.image}" alt="${event.title} Flyer" class="event-flyer" />
        <div class="event-details">
          <p>${event.description}</p>
          <p><strong>Date:</strong> ${formatDate(event.date)}</p>
          <p><strong>Time:</strong> ${event.time}</p>
          <p><strong>Location:</strong> ${event.location}</p>
        </div>
      `;

      headerDiv.addEventListener("click", () => {
        const wasHidden = fullDetails.classList.contains("hidden");
        fullDetails.classList.toggle("hidden");
        const icon = headerDiv.querySelector(".toggle-icon");
        icon.textContent = fullDetails.classList.contains("hidden") ? "+" : "−";
        console.log(`[TOGGLE] "${event.title}" now ${wasHidden ? 'expanded' : 'collapsed'}`);
      });

      wrapper.appendChild(thumbnail);
      wrapper.appendChild(fullDetails);
      container.appendChild(wrapper);
    });
  };

  // Populate upcoming shows
  if (upcomingEvents.length > 0) {
    renderEvents(upcomingEvents, upcomingContainer);
  } else {
    upcomingContainer.innerHTML = `<p style="color: #ccc; font-style: italic;">No upcoming shows — check back soon!</p>`;
  }

  // Populate past shows, with initial 5 visible
  const visiblePast = pastEvents.slice(0, 5);
  const hiddenPast  = pastEvents.slice(5);

  renderPastEventThumbs(visiblePast, pastContainer);

  if (hiddenPast.length > 0) {
    const hiddenContainer = document.createElement("div");
    hiddenContainer.id = "hiddenPastEvents";
    hiddenContainer.style.display = "none";
    pastContainer.appendChild(hiddenContainer);

    renderPastEventThumbs(hiddenPast, hiddenContainer);

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Show All Past Events";
    toggleBtn.className   = "toggle-button";
    toggleBtn.onclick = () => {
      hiddenContainer.style.display =
        hiddenContainer.style.display === "none" ? "block" : "none";
      toggleBtn.textContent =
        hiddenContainer.style.display === "none"
          ? "Show All Past Events"
          : "Hide Past Events";
    };

    pastContainer.appendChild(toggleBtn);
  }
});

// Utility to format a date string as "Month Day, Year"
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}
