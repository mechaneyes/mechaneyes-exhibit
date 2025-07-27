// ————————————————————————————————————o————————————————————————————————————o Popup on Marker Click -->
// ———————————————————————————————————— Popup on Marker Click —>
//
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { handleMedia } from "./media";

export const modals = (map) => {
  // Create popup, but don't add to map yet
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  });

  let allMarkers = document.querySelectorAll(".marker");
  allMarkers.forEach(function (marker, index) {
    marker.addEventListener("click", () => {
      let htmlFile = marker.classList[2];
      console.log("htmlFile", htmlFile);
      console.log("marker", marker);

      // ———————————————————————————————————— Fetch Project HTML —>
      fetch(`/projects/${htmlFile}.html`)
        .then((response) => response.text())
        .then((html) => {
          popup
            .setLngLat([0, 0])
            .setHTML(`<div class="project-modal">${html}</div>`)
            .addTo(map);
        })
        .then(() => {
          setTimeout(() => {
            handleMedia();
            // Scroll modal content to top
            const modalContent = document.querySelector(".project-modal");
            const projectContent = document.querySelector(".project");
            if (modalContent) {
              modalContent.scrollTop = 0;
            }
            if (projectContent) {
              projectContent.scrollTop = 0;
            }
          }, 250);
        })
        .catch((err) => {
          console.log("not so fetchy");
        });
    });
  });

  // ———————————————————————————————————— Popup Close on Click —>
  // Close popup when clicking on background outside popup itself
  //
  popup.on("open", () => {
    const popupClose = document.querySelector(".project-close-button");
    popupClose.addEventListener("click", () => {
      popup.remove();
      console.log("popup closed");
    });
  });
};
