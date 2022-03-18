// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

import useWindowDimensions from "../../utils/windowDimensions";

import "./MapMobile.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVjaGFuZXllcyIsImEiOiJ6V2F6bmFNIn0.mauWWMuRub6GkCxkc49sTg";

const MapMobile = () => {
  const { height, width } = useWindowDimensions();
  const [isVisible, setVisible] = useState(true);

  const mapContainer = useRef(null);
  const map = useRef(null);

  let triggerOverlay = () => {
    setVisible(false);
  };

  // Emerald Bay
  const [lng, setLng] = useState(-120.32891722957555);
  const [lat, setLat] = useState(38.49896894136924);

//   const [zoom, setZoom] = useState(6);
  const [zoom, setZoom] = useState(15);

  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  let mountainsLoc;
  let fly;

  useEffect(() => {
    fetch("/data/mountains.geojson")
      .then((res) => res.json())
      .then((result) => {
        mountainsLoc = result.features;
        // console.log("mountainsLoc", mountainsLoc[0].geometry.coordinates);
      });

    fly = (resortLoc) => {
      map.current.flyTo({
        center: [
          mountainsLoc[resortLoc].geometry.coordinates[0],
          mountainsLoc[resortLoc].geometry.coordinates[1],
        ],
        zoom: 14,
        speed: 0.7,
        curve: 1.6, // zoom speed
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    };
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mechaneyes/ckb6f9oyu2j4l1ilayacdz8yy",
      center: [lng, lat],
      pitch: 60,
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("mapbox-terrain", {
        type: "vector",
        // Mapbox Terrain v2
        // https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-v2/
        url: "mapbox://mapbox.mapbox-terrain-v2",
      });

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
    });
  });

  return (
    <main
      className="map-one"
      onClick={() => triggerOverlay()}
      onWheel={() => triggerOverlay()}
      onTouchStart={() => triggerOverlay()}
    >
      <div className={isVisible ? "overlay" : "overlay overlay--hidden"}>
        {/* https://pierrerougemont.tumblr.com/post/135589893117 */}
        <img src="/images/mousewheel-giphy-one.gif" />
        <h2>Mousewheel &middot; Pinch &middot; Click &middot; Drag</h2>
      </div>
      <button id="fly" onClick={() => fly(2)}>
        Sugar Bowl
      </button>
      <button id="fly" onClick={() => fly(4)}>
        Palisades
      </button>
      <button id="fly" onClick={() => fly(11)}>
        Homewood
      </button>
      <button id="fly" onClick={() => fly(15)}>
        Kirkwood
      </button>
      <button id="fly" onClick={() => fly(19)}>
        Heavenly
      </button>
      <img className="logo-mechaneyes" src="/images/logo-mechaneyes.png" />
      <div ref={mapContainer} className="map-container" />
      <div className="gradient-overlay" />
      <section className="hp-nav">
          <a className="hp-nav__item">
              <img src="/images/icon-photography.png" />
              <h2 className="nav-headline nav-headline--phototograpy">Photography</h2>
          </a>
          <a className="hp-nav__item">
              <img src="/images/icon-programming.png" />
              <h2 className="nav-headline nav-headline--programming">Programming</h2>
          </a>
          <a className="hp-nav__item">
              <img src="/images/icon-installation.png" />
              <h2 className="nav-headline nav-headline--installation">Installation</h2>
          </a>
          <a className="hp-nav__item">
              <img src="/images/icon-generative.png" />
              <h2 className="nav-headline nav-headline--generative">Generative</h2>
          </a>
          <a className="hp-nav__item">
              <img src="/images/icon-design.png" />
              <h2 className="nav-headline nav-headline--design">Design</h2>
          </a>
      </section>
    </main>
  );
};

export default MapMobile;
