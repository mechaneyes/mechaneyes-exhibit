import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

export let modals = (map, activeCat, firstLoad) => {
  // ———————————————————————————————————— Remove Active Card —>
  // Remove any cards on the page when navigating to the next
  // category. They were getting piled on top of each other.
  // 
  let allCards = document.querySelectorAll('.info-card')
  allCards.forEach(card => {
    card.remove()
  })

  fetch("/data/mountains.geojson")
    .then((res) => res.json())
    .then((result) => {
      for (const feature of result.features) {
        // ————————————————————————————————————o————————————————————————————————————o Category Info Modals -->
        // ———————————————————————————————————— Category Info Modals —>
        // Added as markers glued in place via mountains.geojson
        //
        const getInfoCard = (infoFileName) => {
          // console.log('infoFileName', infoFileName)
          const em = document.createElement("div");
          em.className = `info-card info-card--hidden ${infoFileName}`;

          // ———————————————————————————————————— Fetch Info/About HTML —>
          fetch(`/info/${infoFileName}.html`)
            .then((response) => response.text())
            .then((html) => {
              em.innerHTML = html;
            })
            .catch((err) => {
              console.log("not so info fetchy");
            });

          new mapboxgl.Marker(em)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
        };

        // console.log("activeCat", activeCat);

        if (activeCat === "mechaneyes") {
          if (
            Object.values(feature.properties).indexOf("info-card--intro") > -1
          ) {
            getInfoCard(feature.properties.infoFile);
            const introCard = document.querySelector(".info-card--intro");

            // ———————————————————————————————————— Intro Visibility on Load —>
            // Removing the 'hidden' class for the intro on the first page load
            // Subsequent loads disregard this
            //
            if (firstLoad) {
              introCard.classList.remove("info-card--hidden");
            }
          }
        } else if (activeCat === "about") {
          if (
            Object.values(feature.properties).indexOf("info-card--about") > -1
          ) {
            // console.log("feature", feature.properties.infoFile);
            getInfoCard(feature.properties.infoFile);
          }
        } else if (activeCat === "photography") {
          if (
            Object.values(feature.properties).indexOf(
              "info-card--photography"
            ) > -1
          ) {
            // console.log("feature", feature.properties.infoFile);
            getInfoCard(feature.properties.infoFile);
          }
        } else if (activeCat === "programming") {
          if (
            Object.values(feature.properties).indexOf(
              "info-card--programming"
            ) > -1
          ) {
            getInfoCard(feature.properties.infoFile);
          }
        } else if (activeCat === "design") {
          if (
            Object.values(feature.properties).indexOf("info-card--design") > -1
          ) {
            getInfoCard(feature.properties.infoFile);
          }
        } else if (activeCat === "generative") {
          if (
            Object.values(feature.properties).indexOf("info-card--generative") >
            -1
          ) {
            getInfoCard(feature.properties.infoFile);
          }
        }
      }
    })

    .then(() => {
      let infoCards = document.querySelectorAll(".info-card");

      map.on("movestart", () => {
        for (const card of infoCards) {
          card.classList.add("info-card--hidden");
        }
      });

      map.on("moveend", () => {
        let zoomLevel = map.getZoom();
        // console.log("zoomLevel", zoomLevel);

        for (const card of infoCards) {
          if (window.innerWidth < 425 && zoomLevel >= 12) {
            // card.style.display = "block";
            card.classList.remove("info-card--hidden");
          } else if (zoomLevel >= 13) {
            // card.style.display = "block";
            card.classList.remove("info-card--hidden");
          } else {
            // card.style.display = "none";
            card.classList.remove("info-card--hidden");
          }
        }

        const infoCtas = document.querySelectorAll(".info-cta");
        for (const cta of infoCtas) {
          cta.addEventListener("click", (e) => {
            for (const card of infoCards) {
              card.style.display = "none";
            }
          });
        }

        // ———————————————————————————————————— Close Card on Click —>
        // 
        let cardClose = document.querySelector('.mapboxgl-popup-close-button') 
        if (cardClose) {
          cardClose.onclick = function() {
            allCards = document.querySelectorAll('.info-card')
            allCards.forEach(card => {
              card.classList.add("info-card--hidden");
              card.remove()
            })
          }
        }
      });
    })

    // .then(() => {
    //   let cardClose = document.querySelector('.mapboxgl-popup-close-button')
    //   console.log('cardClose', cardClose)
    // })
};
