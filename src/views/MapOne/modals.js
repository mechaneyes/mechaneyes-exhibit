// // ————————————————————————————————————o————————————————————————————————————o Popup on Marker Click -->
// // ———————————————————————————————————— Popup on Marker Click —>
// //
// import mapboxgl from "!mapbox-gl";
// /* eslint import/no-webpack-loader-syntax: off */
// import { handleMedia } from "./media";

// export const modals = (map) => {
//   let currentPopup = null;

//   let allMarkers = document.querySelectorAll(".marker");
//   allMarkers.forEach(function (marker, index) {
//     marker.addEventListener("click", () => {
//       let htmlFile = marker.classList[2];

//       // Remove any existing popup
//       if (currentPopup) {
//         currentPopup.remove();
//       }

//       // Create new popup for this modal
//       currentPopup = new mapboxgl.Popup({
//         closeButton: false, // Disable Mapbox's built-in close button
//         closeOnClick: false,
//       });

//       // ———————————————————————————————————— Fetch Project HTML —>
//       fetch(`/projects/${htmlFile}.html`)
//         .then((response) => {
//           return response.text();
//         })
//         .then((html) => {
//           currentPopup
//             .setLngLat([0, 0])
//             .setHTML(`<div class="project-modal">${html}</div>`)
//             .addTo(map);
//         })
//         .then(() => {
//           setTimeout(() => {
//             // handleMedia();
//             // Scroll modal content to top
//             const modalContent = document.querySelector(".project-modal");
//             const projectContent = document.querySelector(".project");
//             if (modalContent) {
//               modalContent.scrollTop = 0;
//             }
//             if (projectContent) {
//               projectContent.scrollTop = 0;
//             }

//             // Set up close button event listener after content is loaded
//             const popupClose = document.querySelector(".project-close-button");
//             if (popupClose) {
//               popupClose.addEventListener("click", () => {
//                 currentPopup.remove();
//                 currentPopup = null;
//               });
//             }
//           }, 250);
//         })
//         .catch((err) => {
//           console.log("not so fetchy");
//         });
//     });
//   });
// };












// ————————————————————————————————————o————————————————————————————————————o Popup on Marker Click -->
// ———————————————————————————————————— Popup on Marker Click —>
//
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { handleMedia } from "./media";

export const modals = (map) => {
  let currentPopup = null;

  // Function to open modal programmatically
  const openModal = () => {
    let htmlFile = "whirligrid"; // Temporarily hardcoded for dev

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
      .then((response) => {
        return response.text();
      })
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
  };

  // Auto-open modal on page load
  setTimeout(() => {
    openModal();
  }, 1000); // Wait 1 second after page load

  let allMarkers = document.querySelectorAll(".marker");
  allMarkers.forEach(function (marker, index) {
    marker.addEventListener("click", () => {
      openModal(); // Use the same function for consistency
    });
  });
};
