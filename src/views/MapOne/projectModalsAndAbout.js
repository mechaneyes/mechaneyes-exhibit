import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { popupClick } from "./popupClick";

// ————————————————————————————————————o————————————————————————————————————o Project Markers + Modals -->
// ———————————————————————————————————— Project Markers + Modals —>
//
export const projectModalsAndAbout = (map, geoFile, activeCat) => {
  // Create popup, but don't add to map yet
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  // ———————————————————————————————————— About Modal for Mobile —>
  //
  // console.log("window.innerWidth", window.innerWidth);
  if (activeCat === "about") {
    if (window.innerWidth <= 767) {
      fetch("/info/info-card--about.html")
        .then((response) => response.text())
        .then((html) => {
          popup
            .setLngLat([-120.37764069625877, 39.126354852592584])
            .setHTML(`<div class="project-modal">${html}</div>`)
            .addTo(map);
        })
        .catch((err) => {
          console.log("not so fetchy");
        });
    }
  }

  fetch(geoFile)
    .then((res) => res.json())
    .then(() => {
      // ———————————————————————————————————— Popup on Marker Click —>
      popupClick(map, popup);
    });
};
