import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

// ————————————————————————————————————o————————————————————————————————————o Project Markers + Modals -->
// ———————————————————————————————————— Project Markers + Modals —>
//
export const markersProjectModals = (map, geoFile) => {
  // Create popup, but don't add to map yet
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  });

  let zoomLevel = map.getZoom();
  // console.log('zoomLevelzoomLevel', zoomLevel)

  fetch(geoFile)
    .then((res) => res.json())
    .then((result) => {
      // ———————————————————————————————————— Markers —>
      //
      for (const feature of result.features) {
        const el = document.createElement("div");
        el.className = "marker";
        el.style.backgroundImage = `url(/images/map-marker-1.0.0.svg)`;

        if (feature.properties.hide != "hide") {
          const marker = new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map)
            .setOffset([0, 4]);

          // ———————————————————————————————————— —>
          // ———————————————————————————————————— Popup on Marker Click —>
          // ———————————————————————————————————— —>
          //
          marker.getElement().addEventListener("click", () => {
            let coordinates = feature.geometry.coordinates.slice();
            let htmlFile = feature.properties.htmlFile;

            // ———————————————————————————————————— Fetch Project HTML —>
            fetch(`/projects/projects/${htmlFile}.html`)
              .then((response) => response.text())
              .then(imagesLoad())
              .then(videosLoad())
              .then(videoPlayPause())
              .then((html) => {
                // console.log(html);
                popup
                  .setLngLat(coordinates)
                  .setHTML(`<div class="project-modal">${html}</div>`)
                  .addTo(map);
              })

              // ———————————————————————————————————— Modal Close Button Position —>
              // Measures modal distance to top and adds 20px to get
              // the proper vertical position of the modal close button
              //
              .then(() => {
                let modalMeasure = document.querySelector(".project-modal");
                modalMeasure = modalMeasure.getBoundingClientRect().top;
                let modalClose = document.querySelector(
                  ".mapboxgl-popup-close-button"
                );
                modalClose.style.top = modalMeasure + 20 + "px";
              })
              .catch((err) => {
                console.log("not so fetchy");
              });
          });
        }

        // ———————————————————————————————————— Popup Close on Click —>
        // Close popup when clicking on background outside popup itself
        //
        popup.on("open", () => {
          const popupClose = document.querySelector(".mapboxgl-popup-content");
          const popupChild = document.querySelector(".project-modal");

          // Close Modal ... but only when clicking outside the modal -- on
          // the page backtround -- not on the modal itself
          popupChild.addEventListener("click", (e) => {
            e.stopPropagation();

            popupClose.addEventListener("click", () => {
              // console.log("popup remove");
              popup.remove();
            });
          });
        });
      }

      // ———————————————————————————————————— Modal Close Button Position —>
      // Repositioning the modal close button when screen is resized
      //
      window.addEventListener("resize", () => {
        let modalMeasure = document.querySelector(".project-modal");
        modalMeasure = modalMeasure.getBoundingClientRect().top;
        // console.log("modalMeasuress", modalMeasure);
        let modalClose = document.querySelector(".mapboxgl-popup-close-button");
        modalClose.style.top = modalMeasure + 20 + "px";
      });
    });
};

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
// ———————————————————————————————————— Play/Pause Videos —>
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

  let vidsArray
  let vidsBtnsArray

  setTimeout(() => {
    vidsArray = Array.from(vidsCollection);
    vidsBtnsArray = Array.from(vidBtnsCollection);
    // console.log("vidsArray", vidsArray);

    for (let i = 0; i < vidsArray.length; i++) {
      vidsArray[i].addEventListener("click", (event) => {
        if (vidsArray[i].paused) {
          vidsArray.forEach((vid) => {
            vid.pause();
          });
          vidsBtnsArray.forEach((btn) => {
            btn.classList.remove("project-video__button--hidden");
          });
          vidsArray[i].volume = 0.3;
          vidsArray[i].play();
          vidsBtnsArray[i].classList.add("project-video__button--hidden");
        } else {
          vidsArray[i].pause();
          vidsBtnsArray[i].classList.remove("project-video__button--hidden");
        }
  
        if (vidsArray[i].playing) {
          vidsArray[i].pause();
          vidsBtnsArray[i].classList.remove("project-video__button--hidden");
        }
      });
    }
  }, 100);
};
