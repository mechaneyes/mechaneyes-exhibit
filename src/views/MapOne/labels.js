import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { handleMedia } from "./media";

// ————————————————————————————————————o————————————————————————————————————o Project Text Labels -->
// ———————————————————————————————————— Project Text Labels —>
//
export const labels = (map, geoFile) => {
  map
    .addLayer({
      id: "unclustered-white-label",
      type: "symbol",
      source: "mountains",
      layout: {
        "text-field": [
          "format",
          ["get", "title"],
          "\n",
          ["get", "description"],
          {
            "text-font": ["literal", ["DIN Offc Pro Medium"]],
            "font-scale": 0.8,
          },
        ],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 24,
        "text-offset": [0, -4],
      },
      paint: {
        "text-color": "#FFF",
        "text-halo-color": "black",
        "text-halo-width": 1,
        "text-halo-blur": 1,
      },
    });

  // ———————————————————————————————————— Popup on Label Click —>
  // Popups are the project pages/files
  //
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  });

  map.on("click", "unclustered-label", (e) => {
    let htmlFile = e.features[0].properties.htmlFile;

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
      })
      .catch((err) => {
        console.log("not so fetchy");
      });
  });
};
