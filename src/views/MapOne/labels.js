import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { handleMedia } from "./media";

// ————————————————————————————————————o————————————————————————————————————o Project Text Labels -->
// ———————————————————————————————————— Project Text Labels —>
//
export const labels = (map, geoFile) => {
  map
    .addLayer({
      id: "unclustered-white-label",
      type: "symbol",
      source: "mountains",
      layout: {
        "text-field": [
          "format",
          ["get", "title"],
          "\n",
          ["get", "description"],
          {
            "text-font": ["literal", ["DIN Offc Pro Medium"]],
            "font-scale": 0.8,
          },
        ],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 24,
        "text-offset": [0, -4],
      },
      paint: {
        "text-color": "#FFF",
        "text-halo-color": "black",
        "text-halo-width": 1,
        "text-halo-blur": 1,
      },
    });

  // ———————————————————————————————————— Popup on Label Click —>
  // Popups are the project pages/files
  //
  let currentPopup = null;

  map.on("click", "unclustered-label", (e) => {
    let htmlFile = e.features[0].properties.htmlFile;

    // Remove any existing popup
    if (currentPopup) {
      currentPopup.remove();
    }

    // Create new popup for this modal
    currentPopup = new mapboxgl.Popup({
      closeButton: false, // Disable Mapbox's built-in close button
      closeOnClick: false,
    });

    // ———————————————————————————————————— Fetch Project HTML —>
    fetch(`/projects/${htmlFile}.html`)
      .then((response) => response.text())
      .then((html) => {
        currentPopup
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

          // Set up close button event listener after content is loaded
          const popupClose = document.querySelector(".project-close-button");
          if (popupClose) {
            popupClose.addEventListener("click", () => {
              currentPopup.remove();
              currentPopup = null;
            });
          }
        }, 250);
      })
      .catch((err) => {
        console.log("not so fetchy");
      });
  });
};
