import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

// ————————————————————————————————————o————————————————————————————————————o Project Markers + Modals -->
// ———————————————————————————————————— Project Markers + Modals —>
//
export const markersProjectModals = (map, geoFile, activeCat) => {
  // Create popup, but don't add to map yet
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  let zoomLevel = map.getZoom();
  // console.log('zoomLevelzoomLevel', zoomLevel)

  let markerClass;

  // ———————————————————————————————————— About Modal —>
  //
  // console.log("window.innerWidth", window.innerWidth);
  setTimeout(() => {
    if (window.innerWidth < 767) {
      if (activeCat === "about") {
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
  }, 50);

  fetch(geoFile)
    .then((res) => res.json())
    .then((result) => {
      // ———————————————————————————————————— Set Markers —>
      //
      for (const feature of result.features) {
        const el = document.createElement("div");
        el.className = `marker marker--${feature.properties.htmlFile} ${feature.properties.htmlFile}`;
        el.style.backgroundImage = `url(/images/map-marker-1.0.0.svg)`;

        if (feature.properties.hide != "hide") {
          const marker = new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map)
            .setOffset([0, 4]);
        }
      }
    })
    .then(() => {
      // ————————————————————————————————————o————————————————————————————————————o Popup on Marker Click -->
      // ———————————————————————————————————— Popup on Marker Click —>
      // 
      let allMarkers = document.querySelectorAll(".marker");
      allMarkers.forEach(function (marker) {
        // console.log("marker", marker);
        marker.addEventListener("click", () => {
          console.log("marker", marker.classList[2]);

          let htmlFile = marker.classList[2];

          // ———————————————————————————————————— Fetch Project HTML —>
          fetch(`/projects/projects/${htmlFile}.html`)
            .then((response) => response.text())
            .then(imagesLoad())
            .then(videosLoad())
            // .then(videoPlayPause())
            .then((html) => {
              popup
                .setLngLat([0, 0])
                .setHTML(`<div class="project-modal">${html}</div>`)
                .addTo(map);
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
        // Close Modal ... but only when clicking outside the modal -- on
        // the page backtround -- not on the modal itself
        //
        // Closing About page and revealing hamburger nav
        //
        //TODO: TODO About modal re-added after hidden and hamburger displayed - https://trello.com/c/dxOrLXyU/59-todo-about-modal-re-added-after-hidden-and-hamburger-displayed
        let aboutCloseBtn = document.querySelector(
          ".project--about + .mapboxgl-popup-close-button"
        );
        console.log('aboutCloseBtn', aboutCloseBtn)
        if (aboutCloseBtn) {
          aboutCloseBtn.onclick = function () {
            console.log("aboutCloseBtn aboutCloseBtn aboutCloseBtn");
            document
              .querySelector(".mapboxgl-popup-content")
              .classList.add("mapboxgl-popup-content--hidden");
            setTimeout(() => {
              document
                .querySelector(".mapboxgl-popup-content--hidden")
                .remove();
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
              document
                .querySelector(".mapboxgl-popup-content--hidden")
                .remove();
              popupParent.classList.remove("mapboxgl-popup-content--hidden");
            }, 600);
          };
        }

        popupInner.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        // popupParent.addEventListener("click", () => {
        //   popup.remove();
        // });

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
                console.log("hamburgerReplace", hamburgerReplace);
              }, 50);
            };
          });
        });
    });
};

//TODO: TODO: Move these three functions to own file - https://trello.com/c/WebrWOBn/60-todo-move-these-three-functions-to-own-file
// ————————————————————————————————————o————————————————————————————————————o Images+Video -->
// ———————————————————————————————————— Img Sizing + Aspect Ratio —>
// Programmatically setting widths + heights + aspect ratios of all
// images on each individual page.
const imagesLoad = () => {
  var allImages = document.getElementsByTagName("img");
  setTimeout(() => {
    for (const img of allImages) {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
      img.style.aspectRatio = img.naturalWidth / img.naturalHeight;
      img.parentElement.style.aspectRatio =
        img.naturalWidth / img.naturalHeight;
      // console.log('aspect', img.style.aspectRatio)
      // console.log("allImages", allImages);
    }
  }, 100);
};

// ———————————————————————————————————— Video Sizing + Aspect Ratio —>
// delay for loop until all videos are loaded
//
const videosLoad = () => {
  const allVideos = document.getElementsByTagName("video");

  setTimeout(() => {
    for (let oneVid of allVideos) {
      oneVid.width = oneVid.videoWidth;
      oneVid.height = oneVid.videoHeight;
      oneVid.style.aspectRatio = oneVid.videoWidth / oneVid.videoHeight;
      oneVid.parentElement.style.aspectRatio =
        oneVid.videoWidth / oneVid.videoHeight;
      // console.log("aspect", oneVid.style.aspectRatio);
      // console.log("oneVid", oneVid.width);
    }
  }, 100);
};

// ————————————————————————————————————o————————————————————————————————————o Play/Pause Videos -->
// ————————————————————————————————————o Play/Pause Videos —>
// also ... add/remove play buttons
//
// When one video is playing, by clicking another vid the first
// pauses and let's the second play
//
const videoPlayPause = () => {
  let vidsCollection = document.getElementsByTagName("video");
  const vidBtnsCollection = document.getElementsByClassName(
    "project-video__button"
  );

  // if (vidsBtnsArray > 0) {
  setTimeout(() => {
    let vidsArray = Array.from(vidsCollection);
    let vidsBtnsArray = Array.from(vidBtnsCollection);
    // console.log('vidsArray', vidsArray.length)

    if (vidsBtnsArray.length > 1) {
      for (let i = 0; i < vidsArray.length; i++) {
        vidsArray[i].addEventListener("click", (event) => {
          if (vidsArray[i].paused) {
            console.log(
              "vidsBtnsArray[i].classList",
              vidsBtnsArray[0].classList
            );
            vidsArray.forEach((vid) => {
              vid.pause();
            });
            vidsBtnsArray.forEach((btn) => {
              btn.classList.remove("project-video__button--hidden");
            });
            vidsBtnsArray[i].classList.add("project-video__button--hidden");
            vidsArray[i].volume = 0.3;
            vidsArray[i].play();
          } else {
            vidsArray[i].pause();
            vidsBtnsArray[i].classList.remove("project-video__button--hidden");
          }
        });
      }
    } else {
      // TODO: work on the logic here for other cases
      //
      // ————————————————————————————————————o video hero + single video in body —>
      // this pertains to better breaks specifically
      // it has a video hero and a single video in the
      // body of the page
      //
      const soloVid = vidsArray[1];
      const soloBtn = vidsBtnsArray[0];

      soloVid.addEventListener("click", (event) => {
        console.log("soloBtn", soloBtn);
        if (soloVid.paused) {
          soloBtn.classList.add("project-video__button--hidden");
          soloVid.volume = 0.3;
          soloVid.play();
        } else {
          soloVid.pause();
          soloBtn.classList.remove("project-video__button--hidden");
        }
      });
    }
  }, 100);
  // }
};
