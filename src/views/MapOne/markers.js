import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { modals } from "./modals";

// ————————————————————————————————————o————————————————————————————————————o Project Markers + Modals -->
// ———————————————————————————————————— Project Markers + Modals —>
//
export const markers = (map, geoFile) => {
  // let zoomLevel = map.getZoom();
  // console.log('zoomLevelzoomLevel', zoomLevel)

  fetch(geoFile)
    .then((res) => res.json())
    .then((result) => {
      // ———————————————————————————————————— Set Markers —>
      //
      for (const feature of result.features) {
        // Only create markers for features that have htmlFile and are not hidden
        if (feature.properties.htmlFile && feature.properties.hide !== "hide") {
          const el = document.createElement("div");
          el.className = `marker marker--${feature.properties.htmlFile} ${feature.properties.htmlFile}`;
          el.style.backgroundImage = `url(/images/map-marker-1.0.0.svg)`;

          console.log(`Creating marker for: ${feature.properties.title} with htmlFile: ${feature.properties.htmlFile}`);

          /* eslint-disable-next-line no-unused-vars */
          const marker = new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map)
            .setOffset([0, 4]);
        }
      }
    })
    .then(() => {
      modals(map);
    });
};
