// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./MapOne.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVjaGFuZXllcyIsImEiOiJ6V2F6bmFNIn0.mauWWMuRub6GkCxkc49sTg";

const MapOne = () => {
  const mapContainer = useRef(null);
  // Fitz Roy
  //   const [lng, setLng] = useState(-73.0508902);
  //   const [lat, setLat] = useState(-49.2740535);

  // Monument Valley
  //   const [lng, setLng] = useState(-110.3193009);
  //   const [lat, setLat] = useState(36.9852564);

  // Bryce
  //   const [lng, setLng] = useState(-112.3183959);
  //   const [lat, setLat] = useState(37.573297);

  // Needles South Dakota
  //   const [lng, setLng] = useState(-103.5991371);
  //   const [lat, setLat] = useState(43.7856554);

  // Liberty Bell Mountain, Washington
  //   const [lng, setLng] = useState(-120.6755025);
  //   const [lat, setLat] = useState(48.515577);

  // Homewood
  //   const [lng, setLng] = useState(-120.2868519);
  //   const [lat, setLat] = useState(39.1982388);

  // Granite Chief
  //   const [lng, setLng] = useState(-120.2868638);
  //   const [lat, setLat] = useState(39.1982388);

  // Mt Lincoln
  const [lng, setLng] = useState(-120.330005);
  const [lat, setLat] = useState(39.2875296);

  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mechaneyes/ckb6f9oyu2j4l1ilayacdz8yy",
      center: [lng, lat],
      zoom: zoom,
    });

    // filters for classifying earthquakes into five categories based on magnitude
    const resort1 = ["get", "resort"];
    // const resort2 = ["all", [">=", ["get", "resort"], 2], ["<", ["get", "resort"], 3]];
    // const resort3 = ["all", [">=", ["get", "resort"], 3], ["<", ["get", "resort"], 4]];
    // const resort4 = ["all", [">=", ["get", "resort"], 4], ["<", ["get", "resort"], 5]];
    // const resort5 = [">=", ["get", "resort"], 5];

    // colors to use for the categories
    const colors = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"];

    map.on("load", () => {
      map.addSource("mapbox-terrain", {
        type: "vector",
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        //
        // Mapbox Terrain v2
        // https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-v2/
        url: "mapbox://mapbox.mapbox-terrain-v2",
      });

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
          "line-color": "#0381ff",
          "line-width": 2,
        },
      });

      // Mapbox Terrain includes elevation contour lines from
      // zoom level 9 and higher. You can use the index field
      // to highlight or label every 2nd, 5th, or 10th line.
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
          "line-color": "#ff3503",
          "line-width": 2,
        },
      });

      // Create and style CLUSTERS
      // https://docs.mapbox.com/mapbox-gl-js/example/cluster/
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map
        .addSource("mountains", {
          type: "geojson",
          // Point to GeoJSON data. Ski resorts and their mountains
          data: "/data/mountains.geojson",
          cluster: true,
          clusterMaxZoom: 17, // Max zoom to cluster points on
          clusterRadius: 250, // Radius of each cluster when clustering points (defaults to 50)
          clusterProperties: {
            sugarBowl: ["any", ["==", ["get", "interest"], "design"]],
            palisades: ["any", ["==", ["get", "interest"], "photo"]],
          },
        })
        .addLayer({
          id: "clusters",
          type: "circle",
          source: "mountains",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "case",
              ["get", "sugarBowl"],
              "#51bbd6",
              ["get", "palisades"],
              "#ff0000",
              "#51bbd6",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              100,
              2,
              150,
              20,
              40,
            ],
          },
        })
        .addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "mountains",
          filter: ["has", "point_count"],
          // Formatting headlines and sub headlines
          // https://blog.mapbox.com/create-a-clear-context-with-rich-text-labels-3f54a36c716b
          layout: {
            "text-field": [
              "case",
              ["get", "sugarBowl"],
              [
                "format",
                "Design",
                {},
                "\n",
                {},
                "Sugar Bowl",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              ["get", "palisades"],
              [
                "format",
                "Photograhy",
                {},
                "\n",
                {},
                "Palisades",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              "#51bbd6",
            ],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 28,
          },
        })
        .addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "mountains",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 80,
            "circle-stroke-width": 10,
            "circle-stroke-color": "#fff",
          },
        })
        .addLayer({
          id: "unclustered-label",
          type: "symbol",
          source: "mountains",
          layout: {
            "text-field": "{title} \n {description}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 24,
          },
        });
    });
  });

  return (
    <>
      {/* <h1>MapOne</h1> */}
      <div ref={mapContainer} className="map-container" />
    </>
  );
};

export default MapOne;
