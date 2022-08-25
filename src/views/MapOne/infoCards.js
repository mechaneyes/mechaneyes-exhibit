import ReactGA from "react-ga";
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

export let infoCards = (map, geoFile, activeCat, firstLoad) => {
  // ———————————————————————————————————— Remove Active Card —>
  // Remove any cards on the page when navigating to the next
  // category. They were getting piled on top of each other.
  //
  let allCards = document.querySelectorAll(".info-card");
  allCards.forEach((card) => {
    card.remove();
  });

  fetch(geoFile)
    .then((res) => res.json())
    .then((result) => {
      for (const feature of result.features) {
        // ————————————————————————————————————o————————————————————————————————————o Category Info Modals -->
        // ———————————————————————————————————— Category Info Modals —>
        // Added as markers glued in place via mountains.geojson
        //
        const getInfoCard = (infoFileName) => {
          // console.log('infoFileName', infoFileName)

          if (!document.querySelector(`.${infoFileName}`)) {
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
          }
        };

        const kittyCat = activeCat;
        switch (kittyCat) {
          case "mechaneyes":
            if (
              Object.values(feature.properties).indexOf("info-card--intro") > -1
            ) {
              getInfoCard(feature.properties.infoFile);
              const introCard = document.querySelector(".info-card--intro");

              // ———————————————————————————————————— Intro Visibility on Load —>
              // Removing the 'hidden' class for the intro on the first page load
              // Subsequent loads disregard this
              //
              // console.log("firstLoad", firstLoad);
              if (firstLoad) {
                introCard.classList.remove("info-card--hidden");
              }
            }

            // disable map zoom when using scroll
            map.scrollZoom.disable();
            break;

          case "about":
            if (
              Object.values(feature.properties).indexOf("info-card--about") > -1
            ) {
              // console.log("feature", feature.properties.infoFile);
              getInfoCard(feature.properties.infoFile);

              // disable map zoom when using scroll
              map.scrollZoom.disable();
              map.dragPan.disable();
            }
            break;

          case "photography":
            if (
              Object.values(feature.properties).indexOf(
                "info-card--photography"
              ) > -1
            ) {
              getInfoCard(feature.properties.infoFile);
            }
            break;

          case "programming":
            if (
              Object.values(feature.properties).indexOf(
                "info-card--programming"
              ) > -1
            ) {
              getInfoCard(feature.properties.infoFile);
            }
            break;

          case "generative":
            if (
              Object.values(feature.properties).indexOf(
                "info-card--generative"
              ) > -1
            ) {
              getInfoCard(feature.properties.infoFile);
            }

            break;
          case "design":
            if (
              Object.values(feature.properties).indexOf("info-card--design") >
              -1
            ) {
              getInfoCard(feature.properties.infoFile);
            }
            break;
        }
      }
    })

    .then(() => {
      let infoCards = document.querySelectorAll(".info-card");

      // ———————————————————————————————————— Move Start/End —>
      //
      map.on("movestart", () => {
        for (const card of infoCards) {
          card.classList.add("info-card--hidden");
        }
      });

      //TODO: Animate info card fade in before moveend - https://trello.com/c/NJhz6wxR/57-animate-info-card-fade-in-before-moveend
      map.on("moveend", () => {
        let zoomLevel = map.getZoom();
        // console.log("zoomLevel", zoomLevel);

        for (const card of infoCards) {
          if (window.innerWidth < 425 && zoomLevel >= 12) {
            card.classList.remove("info-card--hidden");
          } else if (zoomLevel >= 13) {
            card.classList.remove("info-card--hidden");
          } else {
            card.classList.remove("info-card--hidden");
          }
        }

        // ———————————————————————————————————— Close Card on Click —>
        // Close when clicking any part of the info card. Excludes 'About' card
        //
        if (
          !document
            .querySelector(".info-card")
            .classList.contains("info-card--about")
        ) {
          let cardClose = document.querySelector(".info-card");
          if (cardClose) {
            cardClose.onclick = function () {
              allCards = document.querySelectorAll(".info-card");
              allCards.forEach((card) => {
                card.classList.add("info-card--hidden");
                card.remove();
              });
            };
          }
        }

        const eventTrack = (category, action, label) => {
          // console.log("GA event:", category, ":", action, ":", label);
          ReactGA.event({
            category: category,
            action: action,
            label: label,
          });
        };

        const socialLinks = document.querySelectorAll(".about-page__social a");

        socialLinks.forEach((link) => {
          // console.log("link", link.dataset.social);
          link.addEventListener(
            "click",
            function () {
              eventTrack("Link", "Social Click", link.dataset.social);
            },
            false
          );
        });
      });
    });
};
