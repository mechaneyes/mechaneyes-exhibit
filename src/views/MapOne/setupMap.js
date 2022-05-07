import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

export const setupMap = (map) => {
  map.addSource("mapbox-terrain", {
    type: "vector",

    // Mapbox Terrain v2
    // https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-v2/
    url: "mapbox://mapbox.mapbox-terrain-v2",
  });

  // ————————————————————————————————————o————————————————————————————————————o Elevation Contour Lines -->
  // ———————————————————————————————————— Elevation Contour Lines —>
  map.addLayer({
    id: "terrain-data",
    type: "line",
    source: "mapbox-terrain",
    "source-layer": "contour",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#0D77FF",
      "line-width": 2,
    },
  });

  // ———————————————————————————————————— Highlighting every 5th and 10th line —>
  //
  // https://blog.mapbox.com/designing-the-swiss-ski-style-in-mapbox-studio-d6d25d1a2aa0#:~:text=Mapbox%20Terrain%20includes%20elevation%20contour%20lines%20from%20zoom%20level%209%20and%20higher.%20You%20can%20use%20the%20index%20field%20to%20highlight%20or%20label%20every%202nd%2C%205th%2C%20or%2010th%20line.
  // https://github.com/mapbox/mapbox-gl-swiss-ski-style/blob/master/cij1zoclj002y8rkkdjl69psd.json#L668
  //
  map.addLayer({
    id: "index-contour",
    type: "line",
    source: "mapbox-terrain",
    "source-layer": "contour",
    filter: ["in", "index", 5, 10],
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#0DFF7F",
      "line-width": 2,
    },
  });

  // ————————————————————————————————————o————————————————————————————————————o Text Labels -->
  // ———————————————————————————————————— Text Labels —>
  //
  map
    .addSource("mountains", {
      type: "geojson",
      data: "/data/mountains.geojson",
      cluster: true,
      clusterMaxZoom: 11, // Max zoom to cluster points on
      clusterMinPoints: 3,
      clusterRadius: 150,
    })
    .addLayer({
      id: "unclustered-label",
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
      },
    });

  // ————————————————————————————————————o————————————————————————————————————o Cluster Circles -->
  // ———————————————————————————————————— Cluster Circles —>
  //
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "mountains",
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        100,
        "#f1f075",
        750,
        "#f28cb1",
      ],
      "circle-radius": 70,
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
    let coordinates = e.features[0].geometry.coordinates.slice();
    let htmlFile = e.features[0].properties.htmlFile;

    popup
      .setLngLat(coordinates)
      .setHTML(
        `<object class="project-modal" type="text/html" data="/projects/${htmlFile}.html"></object>`
      )
      .addTo(map);
  });

  // ———————————————————————————————————— Popup Close on Click —>
  // Close popup when clicking on background outside popup itself
  //
  popup.on("open", () => {
    const popupClose = document.querySelector(".mapboxgl-popup-content");
    popupClose.addEventListener("click", () => {
      popup.remove();
    });
  });
};
