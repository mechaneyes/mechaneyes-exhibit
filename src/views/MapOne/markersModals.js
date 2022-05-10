import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

export const markersModals = (map, geoFile) => {
  // ————————————————————————————————————o————————————————————————————————————o Project Markers + Modals -->
  // ———————————————————————————————————— Project Markers + Modals —>
  //
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

          // ———————————————————————————————————— Popup on Marker Click —>
          //
          marker.getElement().addEventListener("click", () => {
            let coordinates = feature.geometry.coordinates.slice();
            let htmlFile = feature.properties.htmlFile;

            // ———————————————————————————————————— Fetch Project HTML —>
            fetch(`/projects/projects/${htmlFile}.html`)
              .then((response) => response.text())
              .then((html) => {
                // console.log(html);
                popup
                  .setLngLat(coordinates)
                  .setHTML(`<div class="project-modal">${html}</div>`)
                  .addTo(map);
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
          popupClose.addEventListener("click", () => {
            // popup.remove();
            console.log('popup remove')
          });
        });
      }
    });
};
