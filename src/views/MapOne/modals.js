import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

export const modals = (map) => {
  // ————————————————————————————————————o————————————————————————————————————o Mechaneyes + About Modals -->
  // ———————————————————————————————————— Mechaneyes + About Modals —>
  // Added as cards glued in place via mountains.geojson
  //
  let staticCards;
  fetch("/data/mountains.geojson")
    .then((res) => res.json())
    .then((result) => {
      for (const feature of result.features) {
        if (feature.properties.static) {
          let htmlFile = feature.properties.htmlFile;
          let staticClass = feature.properties.staticClass;
          const el = document.createElement("div");
          el.className = `static-card static-card ${staticClass}`;
          el.innerHTML = `<object class="static-card__object" type="text/html" data="/projects/projects/${htmlFile}.html"></object>`;

          new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
        }
      }
    })
    .then(() => {
      staticCards = document.querySelectorAll(".static-card");

      map.on("movestart", () => {
        for (const card of staticCards) {
          card.classList.add("static-card--hidden");
        }
      });

      map.on("moveend", () => {
        let zoomLevel = map.getZoom();
        console.log("zoomLevel", zoomLevel);

        for (const card of staticCards) {
          if (zoomLevel >= 13.4) {
            card.style.display = 'block';
            card.classList.remove("static-card--hidden");
          } else {
            card.style.display = 'none';
          }
        }
      });
    });

  // ————————————————————————————————————o————————————————————————————————————o Project Info Modals -->
  // ———————————————————————————————————— Project Info Modals —>
  // Added as markers glued in place via mountains.geojson
  //
  let infoCards;
  fetch("/data/mountains.geojson")
    .then((res) => res.json())
    .then((result) => {
      for (const feature of result.features) {
        let infoFile = feature.properties.infoFile;
        const el = document.createElement("div");
        el.className = `info-card info-card--hidden ${infoFile}`;
        el.innerHTML = `<object class="info-card__object" type="text/html" data="/info/${infoFile}.html"></object>`;

        if (feature.properties.info == true) {
          new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
        }
      }
    })
    .then(() => {
      infoCards = document.querySelectorAll(".info-card");

      map.on("movestart", () => {
        for (const card of infoCards) {
          card.classList.add("info-card--hidden");
        }
      });

      map.on("moveend", () => {
        let zoomLevel = map.getZoom();
        console.log("zoomLevel", zoomLevel);

        for (const card of infoCards) {
          if (zoomLevel >= 13.4) {
            card.style.display = 'block';
            card.classList.remove("info-card--hidden");
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
};
