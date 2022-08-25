// ————————————————————————————————————o————————————————————————————————————o Popup on Marker Click -->
// ———————————————————————————————————— Popup on Marker Click —>
//
import ReactGA from "react-ga";
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { handleMedia } from "./media";

export const modals = (map) => {
  const eventTrack = (category, action, label) => {
    console.log("GA event:", category, ":", action, ":", label);
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };

  // Create popup, but don't add to map yet
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  let allMarkers = document.querySelectorAll(".marker");
  allMarkers.forEach(function (marker) {
    marker.addEventListener("click", () => {
      // console.log("marker", marker.classList[2]);

      let htmlFile = marker.classList[2];
      console.log("htmlFile", htmlFile);

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
          }, 250);
          eventTrack("Modal", "Modal Open", htmlFile);
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
    const popupParent = document.querySelector(".mapboxgl-popup-content");
    const popupInner = document.querySelector(".project-modal");
    const popupClose = document.querySelector(
      // ".mapboxgl-popup-close-button"
      ".project-close-button"
    );

    // Move close button to inside .project-modal sibling
    // Allows for proper positioning
    //
    popupInner.appendChild(popupClose);

    // ———————————————————————————————————— About Popup —>
    // Closing About page and revealing hamburger nav
    //
    //TODO: TODO About modal re-added after hidden and hamburger displayed - https://trello.com/c/dxOrLXyU/59-todo-about-modal-re-added-after-hidden-and-hamburger-displayed
    let aboutCloseBtn = document.querySelector(
      ".project--about + .mapboxgl-popup-close-button"
    );

    if (aboutCloseBtn) {
      aboutCloseBtn.onclick = function () {
        document
          .querySelector(".mapboxgl-popup-content")
          .classList.add("mapboxgl-popup-content--hidden");
        setTimeout(() => {
          document.querySelector(".mapboxgl-popup-content--hidden").remove();
        }, 600);

        let hamburgerReplace = document.querySelector(".hamburger");
        hamburgerReplace.classList.remove("hamburger--hidden");
      };
      // if NOT About page, fade out and close the modal
      //
    } else {
      popupClose.onclick = function () {
        popupParent.classList.add("mapboxgl-popup-content--hidden");

        setTimeout(() => {
          document.querySelector(".mapboxgl-popup-content--hidden").remove();
          popupParent.classList.remove("mapboxgl-popup-content--hidden");
        }, 600);
      };
    }

    popupInner.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Close Modal ... but only when clicking outside the modal -- on
    // the page background -- not on the modal itself
    //
    popupParent.addEventListener("click", () => {
      popup.remove();
    });

    // ———————————————————————————————————— After About Close.. Hammy —>
    // Messy, I know ... after About page is shown, the hamburger menu
    // is revealed. Below is what's needed to then hide the menu when
    // selecting the next category to navigate to
    //
    const headlineClicked = document.querySelectorAll(".nav-headline");
    headlineClicked.forEach((headline) => {
      headline.onclick = function () {
        setTimeout(() => {
          const hamburgerReplace = document.querySelector(".hamburger");
          hamburgerReplace.classList.add("hamburger--hidden");
        }, 50);
      };
    });
  });
};
