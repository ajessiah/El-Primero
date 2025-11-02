document.addEventListener("DOMContentLoaded", () => {
    const trailer = document.getElementById("trailer");
    const timelineContainer = document.querySelector('.timeline-container');
    const timeline = document.querySelector('.timeline');
    const topConnect = document.querySelector('.top-connect-container');
    const bottomConnect = document.querySelector('.bottom-connect-container');
    const timelineEvents = document.querySelectorAll('.tl-event');
    const specDates = document.querySelectorAll('.spec-date');
    const fullSpecDates = document.querySelectorAll('.full-spec-date');
    let inactivityTimer;

    if (trailer) {
      trailer.play().catch(() => {
          const playOnInteraction = () => {
              trailer.play();
              window.removeEventListener("touchstart", playOnInteraction);
              window.removeEventListener("click", playOnInteraction);
          };
          window.addEventListener("touchstart", playOnInteraction, { once: true });
          window.addEventListener("click", playOnInteraction, { once: true });
      });
    }
    if (timelineContainer) {
      function anyEventOpen() {
        return document.querySelector('.event-details.show') !== null;
      }

      function resetTimeline() {
        fullSpecDates.forEach(date => date.style.opacity = "0");
          setTimeout(() => {
            timeline.classList.remove('timeline-left');
            topConnect.classList.remove('timeline-left');
            bottomConnect.classList.remove('timeline-left');
            specDates.forEach(date => date.style.display = "none");
            timelineEvents.forEach(e => e.style.pointerEvents = "none");
            setTimeout(() => {
              fullSpecDates.forEach(date => date.style.opacity = "1");
            }, 300);
          }, 300); 
      }

      function startInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          if (window.innerWidth <= 650 && !anyEventOpen()) {
            resetTimeline();
          }
        }, 10000); 
      }

      if (window.innerWidth <= 650) {
        timelineEvents.forEach(e => e.style.pointerEvents = "none");
        specDates.forEach(date => date.style.display = "none");
      }

      timelineContainer.addEventListener("click", () => {
        if (window.innerWidth <= 650 && !timeline.classList.contains('timeline-left')) {
          timeline.classList.add('timeline-left');
          topConnect.classList.add('timeline-left');
          bottomConnect.classList.add('timeline-left');
          fullSpecDates.forEach(date => date.style.opacity = "0");

          setTimeout(() => {
            timelineEvents.forEach(e => e.style.pointerEvents = "all");
            
            specDates.forEach(date => date.style.display = "inline");
            setTimeout(() => {
              fullSpecDates.forEach(date => date.style.opacity = "1");
            }, 300);
            startInactivityTimer(); 
          }, 300); 


        }
      });

      document.addEventListener('shown.bs.collapse', () => {
        clearTimeout(inactivityTimer); 
      });

      document.addEventListener('hidden.bs.collapse', () => {
        if (!anyEventOpen()) startInactivityTimer();
      });
    }

});
