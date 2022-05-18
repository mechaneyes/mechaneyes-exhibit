import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

export let modals = (map, activeCat) => {
  let staticCards;
  let infoCards;

  fetch("/data/mountains.geojson")
    .then((res) => res.json())
    .then((result) => {
      for (const feature of result.features) {
        // ————————————————————————————————————o————————————————————————————————————o STATIC Intro + About Modals -->
        // ———————————————————————————————————— STATIC Intro + About Modals —>
        // Added as cards glued in place via mountains.geojson
        //
        if (feature.properties.static) {
          let htmlFile = feature.properties.htmlFile;
          let staticClass = feature.properties.staticClass;

          const el = document.createElement("div");
          el.className = `static-card static-card ${staticClass}`;

          // ———————————————————————————————————— Fetch Intro/About HTML —>
          fetch(`/projects/projects/${htmlFile}.html`)
            .then((response) => response.text())
            .then((html) => {
              // console.log(html);
              el.innerHTML = html;
            })
            .catch((err) => {
              console.log("not so static fetchy");
            });

          new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
        } else {
        }

        // ————————————————————————————————————o————————————————————————————————————o Category Info Modals -->
        // ———————————————————————————————————— Category Info Modals —>
        // Added as markers glued in place via mountains.geojson
        //
        const getInfoCard = (infoFileName) => {
          // let infoFile = feature.properties.infoFile;
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

          if (feature.properties.info == true) {
            new mapboxgl.Marker(em)
              .setLngLat(feature.geometry.coordinates)
              .addTo(map);
          }
        };

        console.log('activeCat', activeCat)

        if (activeCat == "photography") {
          if (
            Object.values(feature.properties).indexOf(
              "info-card--photography"
            ) > -1
          ) {
            console.log("feature", feature.properties.infoFile);
            getInfoCard(feature.properties.infoFile);
          }
        } else if (activeCat == "programming") {
          if (
            Object.values(feature.properties).indexOf(
              "info-card--programming"
            ) > -1
          ) {
            getInfoCard(feature.properties.infoFile);
          }
        } else if (activeCat == "design") {
          if (
            Object.values(feature.properties).indexOf("info-card--design") > -1
          ) {
            getInfoCard(feature.properties.infoFile);
          }
        } else if (activeCat == "generative") {
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
      staticCards = document.querySelectorAll(".static-card");
      infoCards = document.querySelectorAll(".info-card");

      map.on("movestart", () => {
        for (const card of staticCards) {
          card.classList.add("static-card--hidden");
        }
        for (const card of infoCards) {
          card.classList.add("info-card--hidden");
        }
      });

      map.on("moveend", () => {
        let zoomLevel = map.getZoom();
        console.log("zoomLevel", zoomLevel);

        for (const card of staticCards) {
          if (zoomLevel >= 13.4) {
            card.style.display = "block";
            card.classList.remove("static-card--hidden");
          } else {
            card.style.display = "none";
          }
        }

        for (const card of infoCards) {
          if (window.innerWidth < 425 && zoomLevel >= 12) {
            card.style.display = "block";
            card.classList.remove("info-card--hidden");
          } else if (zoomLevel >= 13) {
            card.style.display = "block";
            card.classList.remove("info-card--hidden");
          } else {
            card.style.display = "none";
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
      });
    });
};
