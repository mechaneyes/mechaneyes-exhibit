// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from '!mapbox-gl'
import "./MapOne.scss";

/* eslint import/no-webpack-loader-syntax: off */

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

  // Emerald Bay
  const [lng, setLng] = useState(-120.10073846533709);
  const [lat, setLat] = useState(38.95397959307656);

  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mechaneyes/ckb6f9oyu2j4l1ilayacdz8yy",
      center: [lng, lat],
      zoom: zoom,
    });

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
          clusterRadius: 100, // Radius of each cluster when clustering points (defaults to 50)
          clusterProperties: {
            sugarBowl: ["any", ["==", ["get", "interest"], "design"]],
            palisades: ["any", ["==", ["get", "resort"], "Palisades"]],
            homewood: ["any", ["==", ["get", "interest"], "generative"]],
            kirkwood: ["any", ["==", ["get", "interest"], "kirkwood"]],
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
              [">", ["get", "point_count"], 9],
              "#0000ff",
              ["get", "sugarBowl"],
              "#1FF2E3",
              ["get", "palisades"],
              "#13F265",
              ["get", "homewood"],
              "#F21D13",
              "#51bbd6",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              150,
              5,
              150,
              20,
              40,
            ],
            "circle-stroke-width": 55,
            "circle-stroke-color": "#fff",
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
                "\n",
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
                "\n",
                "Palisades",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              ["get", "homewood"],
              [
                "format",
                "Photograhy",
                "\n",
                "Homewood",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              ["get", "kirkwood"],
              [
                "format",
                "Photograhy",
                "\n",
                "Kirkwood",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              [">", ["get", "point_count"], 9],
              [
                "format",
                "wut i done did",
                "\n",
                "stuff",
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
            "circle-color": [
              "match",
              ["get", "interest"],
              "design",
              "#1FF2E3",
              "photo",
              "#13F265",
              "generative",
              "#F21D13",
              "#51bbd6",
            ],
            "circle-radius": 100,
            "circle-stroke-width": 5,
            "circle-stroke-color": "#fff",
          },
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
                "text-font": ["literal", ["DIN Offc Pro Italic"]],
                "font-scale": 0.8,
              },
            ],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 24,
          },
        });
    });
  });

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
};

export default MapOne;
