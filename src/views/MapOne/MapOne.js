// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import { useRef, useEffect, useState, createContext, useMemo } from "react";
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

import NavPC from "../../components/layout/navigation/NavPC/NavPC";
import Intro from "../Intro/Intro";
import About from "../About/About";
import AboutContext from "../../store/transition/transition.about.js";
// import useWindowDimensions from "../../utils/windowDimensions";

import "./MapOne.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVjaGFuZXllcyIsImEiOiJ6V2F6bmFNIn0.mauWWMuRub6GkCxkc49sTg";

export const UmbrellaAboutContext = createContext();

const MapOne = () => {
  // const { height, width } = useWindowDimensions();

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [isIntroVisible, setIntroVisible] = useState(true);
  const [isAboutVisible, setAboutVisible] = useState(false);

  const providerValue = useMemo(
    () => ({
      isIntroVisible,
      setIntroVisible,
      isAboutVisible,
      setAboutVisible,
    }),
    [isIntroVisible, isAboutVisible]
  );

  // Fitz Roy
  // const [lng, setLng] = useState(-73.0508902);
  // const [lat, setLat] = useState(-49.2740535);

  // Bryce
  // const [lng, setLng] = useState(-112.3183959);
  // const [lat, setLat] = useState(37.573297);

  // Emerald Bay
  // const [lng, setLng] = useState(-120.15983846533709);
  // const [lat, setLat] = useState(38.95397959307656);

  // Desktop Start
  const [lng, setLng] = useState(-120.46122859325533);
  const [lat, setLat] = useState(38.738060959397785);

  // Test Locations
  // const [lng, setLng] = useState(-120.24202219419851);
  // const [lat, setLat] = useState(39.160690302651886);

  const [zoom, setZoom] = useState(15);

  // ————————————————————————————————————o————————————————————————————————————o MAPPIN -->
  // ———————————————————————————————————— MAPPIN —>
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mechaneyes/ckb6f9oyu2j4l1ilayacdz8yy",
      center: [lng, lat],
      // pitch: 50,
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("mapbox-terrain", {
        type: "vector",

        // Mapbox Terrain v2
        // https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-v2/
        url: "mapbox://mapbox.mapbox-terrain-v2",
      });

      // ————————————————————————————————————o————————————————————————————————————o Elevation Contour Lines -->
      // ———————————————————————————————————— Elevation Contour Lines —>
      map.current.addLayer({
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
      map.current.addLayer({
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
      map.current
        .addSource("mountains", {
          type: "geojson",
          data: "/data/mountains.geojson",
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
            // "text-color": "#FF622E",
            "text-color": "#FFF",
          },
        });

      // ———————————————————————————————————— Popup on Label Click —>
      //
      // Create popup, but don't add to map yet
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: false,
      });

      map.current.on("click", "unclustered-label", (e) => {
        let coordinates = e.features[0].geometry.coordinates.slice();
        const url = e.features[0].properties.url;
        let htmlFile = e.features[0].properties.htmlFile;
        // console.log("url", url, "coordinates", coordinates);

        popup
          .setLngLat(coordinates)
          // .setHTML(`<iframe class="project-iframe" src=${url} />`)
          .setHTML(
            `<object type="text/html" data="/projects/projects/${htmlFile}/index.html"></object>
                `
          )
          .addTo(map.current);
      });
    });
  });

  // ————————————————————————————————————o————————————————————————————————————o Project Markers + Popups -->
  // ———————————————————————————————————— Project Markers + Popups —>
  //
  useEffect(() => {
    // Create popup, but don't add to map yet
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
    });

    fetch("/data/mountains.geojson")
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
              .addTo(map.current)
              .setOffset([0, 4]);

            // ———————————————————————————————————— Popup on Marker Click —>
            //
            marker.getElement().addEventListener("click", () => {
              let coordinates = feature.geometry.coordinates.slice();
              let url = feature.properties.url;
              let htmlFile = feature.properties.htmlFile;
              console.log("htmlFile", htmlFile);

              popup
                .setLngLat(coordinates)
                .setHTML(
                  `<object class="project-modal" type="text/html" data="/projects/projects/${htmlFile}/index.html"></object>
                `
                )
                .addTo(map.current);
            });
          }
        }
      });
  });

  // ————————————————————————————————————o————————————————————————————————————o Project Info Cards -->
  // ———————————————————————————————————— Project Info Cards —>
  // Added as markers glued in place via mountains.geojson
  //
  useEffect(() => {
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
              .addTo(map.current);
          }
        }
      });

    let infoCards = document.querySelectorAll(".info-card");

    map.current.on("movestart", () => {
      for (const card of infoCards) {
        card.classList.add("info-card--hidden");
      }
    });

    map.current.on("moveend", () => {
      setTimeout(() => {
        for (const card of infoCards) {
          card.classList.remove("info-card--hidden");
        }
      }, 100);
    });
  });

  // ————————————————————————————————————o————————————————————————————————————o Tools -->
  // ———————————————————————————————————— Lat+Long of Mouse —>
  // output lat+long of mouse click position to console
  //
  useEffect(() => {
    map.current.on("click", (e) => {
      let latlong =
        '"coordinates": ' +
        JSON.stringify(e.lngLat.wrap())
          .replace('"lng":', "")
          .replace('"lat":', " ")
          .replace("{", "[")
          .replace("}", "]");
      console.log(latlong);
    });
  });

  return (
    <main className="map-one">
      <AboutContext.Provider value={providerValue}>
        <div className="nav-wrapper">
          <NavPC map={map} />
        </div>
        <div ref={mapContainer} className="map-container" />
        <div
          className={
            isIntroVisible
              ? "intro-wrapper"
              : "intro-wrapper intro-wrapper--hidden"
          }
        >
          <Intro />
        </div>
        <div
          className={
            isAboutVisible
              ? "about-wrapper"
              : "about-wrapper about-wrapper--hidden"
          }
        >
          <About />
        </div>
      </AboutContext.Provider>
    </main>
  );
};

export default MapOne;
