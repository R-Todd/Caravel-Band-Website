// js/eventsSort.js

document.addEventListener("DOMContentLoaded", function () {
  const upcomingContainer = document.getElementById("upcomingEventsContainer");
  const pastContainer     = document.getElementById("pastEventsContainer");

  if (!Array.isArray(eventsData)) {
    console.error("eventsData is missing or not an array.");
    return;
  }

  // Normalize “today” to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Split events
  const upcomingEvents = eventsData.filter(e => new Date(e.date) >= today);
  const pastEvents     = eventsData.filter(e => new Date(e.date) <  today);

  // Sort
  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  pastEvents    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Helper: format date
  function formatDate(dateStr) {
    return new Date(dateStr)
      .toLocaleDateString(undefined, {
        year:  'numeric',
        month: 'long',
        day:   'numeric'
      });
  }

  // Render Upcoming Shows
  function renderEvents(list, container) {
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
  }

  // Render Past Shows as an accordion
  function renderPastEventThumbs(list, container) {
    list.forEach(event => {
      const wrapper = document.createElement("div");
      wrapper.className = "past-event-thumb-wrapper";

      const dateObj = new Date(event.date);
      const day   = String(dateObj.getDate()).padStart(2, '0');
      const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();

      // Banner
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

      // Detail panel
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

      // Accordion behavior:
      thumbnail.addEventListener("click", () => {
        const isOpening = fullDetails.classList.contains("hidden");

        // 1) Close all other panels:
        pastContainer.querySelectorAll(".past-event-details")
          .forEach(d => d.classList.add("hidden"));
        // 2) Reset every icon to "+"
        pastContainer.querySelectorAll(".toggle-icon")
          .forEach(ic => ic.textContent = "+");

        // 3) If we were closed, open this one:
        if (isOpening) {
          fullDetails.classList.remove("hidden");
          thumbnail.querySelector(".toggle-icon").textContent = "−";
        }
      });

      wrapper.appendChild(thumbnail);
      wrapper.appendChild(fullDetails);
      container.appendChild(wrapper);
    });
  }

  // Populate upcoming
  if (upcomingEvents.length) {
    renderEvents(upcomingEvents, upcomingContainer);
  } else {
    upcomingContainer.innerHTML = `<p style="color: #ccc; font-style: italic;">
      No upcoming shows — check back soon!</p>`;
  }

  // Populate past (first 5 visible, rest toggled by “Show All”)
  const visiblePast = pastEvents.slice(0, 5);
  const hiddenPast  = pastEvents.slice(5);

  renderPastEventThumbs(visiblePast, pastContainer);

  if (hiddenPast.length) {
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
    // place it after all past-event-thumb-wrappers
    pastContainer.appendChild(toggleBtn);
  }
});
