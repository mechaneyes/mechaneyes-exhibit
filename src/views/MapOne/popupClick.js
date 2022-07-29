// ————————————————————————————————————o————————————————————————————————————o Popup on Marker Click -->
// ———————————————————————————————————— Popup on Marker Click —>
//
import { handleMedia } from "./media";

export const popupClick = (map, popup) => {
  let allMarkers = document.querySelectorAll(".marker");
  allMarkers.forEach(function (marker) {
    marker.addEventListener("click", () => {
      // console.log("marker", marker.classList[2]);

      let htmlFile = marker.classList[2];
      // console.log("htmlFile", htmlFile);

      // ———————————————————————————————————— Fetch Project HTML —>
      fetch(`/projects/projects/${htmlFile}.html`)
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
          }, 250);
        })
        .catch((err) => {
          console.log("not so fetchy");
        });
    });
  });
}
