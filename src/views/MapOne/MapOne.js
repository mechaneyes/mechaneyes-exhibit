// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import { useRef, useEffect, useState } from "react";
import ReactGA from 'react-ga';
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */

import NavMobile from "../../components/navigation/NavMobile/NavMobile";
import NavPC from "../../components/navigation/NavPC/NavPC";

import { terrain } from "./terrain";
import { markers } from "./markers";
import { labels } from "./labels";
import { infoCards } from "./infoCards";

import "mapbox-gl/dist/mapbox-gl.css";
import "./MapOne.scss";
import "./MapMobile.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVjaGFuZXllcyIsImEiOiJ6V2F6bmFNIn0.mauWWMuRub6GkCxkc49sTg";

let firstLoad = true;

let geoFile;
if (window.innerWidth <= 444) {
  geoFile = "/data/mobile.geojson";
} else if (window.innerWidth <= 768) {
  geoFile = "/data/mobileToIpad.geojson";
} else {
  geoFile = "/data/mountains.geojson";
}
// console.log("geoFile", geoFile);

const MapOne = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

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
  // const [lng, setLng] = useState(-120.3319982540318);
  // const [lat, setLat] = useState(39.29408664826935);

  const [zoom, setZoom] = useState(15);

  // ————————————————————————————————————o————————————————————————————————————o Page Title -->
  // ————————————————————————————————————o Set Page Title —>
  // Page title set on nav clicks
  //
  const [activeTitle, setTheTitle] = useState("Mechaneyes === Ray Weitzenberg");
  const liftTitle = (theTitle) => {
    setTheTitle(theTitle);
  };

  useEffect(() => {
    document.title = activeTitle;
    ReactGA.pageview(activeTitle);
  });

  // ————————————————————————————————————o————————————————————————————————————o MAPPIN -->
  // ————————————————————————————————————o MAPPIN —>
  useEffect(() => {
    if (window.innerWidth < 600) {
      document.documentElement.style.setProperty(
        "--window-inner-height",
        `${window.innerHeight}px`
      );
    }

    // Is this an iOS device?
    var isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
      // console.log("very much iOS");
      document.querySelector(".map-one").style.height =
        "-webkit-fill-available";
    } else {
      // console.log("not iOS in the slightest");
    }
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mechaneyes/ckb6f9oyu2j4l1ilayacdz8yy",
      center: [lng, lat],
      zoom: zoom,
      // interactive: disableInteractive,
    });

    map.current.on("load", () => {
      // ————————————————————————————————————o Setup the Map + Terrain —>
      //
      terrain(map.current);

      // Force map to expand to fill viewport
      // Sometimes was loading only in a small area
      map.current.resize();

      // ————————————————————————————————————o Category Info Cards —>
      //
      markers(map.current, geoFile, activeCat);
      labels(map.current, geoFile);
      infoCards(map.current, geoFile, activeCat, firstLoad);
      setTimeout(() => {
        const introCard = document.querySelector(".info-card--intro");
        introCard.classList.remove("info-card--hidden");
        // console.log("render");
      }, 500);
    });
  });

  // ————————————————————————————————————o————————————————————————————————————o Current Category -->
  // ————————————————————————————————————o Lifting Current Category Prop —>
  // The currently displayed category is being set by the child,
  // NavMobile component. liftCat is passed as a prop and the state is
  // set by setActiveCat()
  //
  const [activeCat, setActiveCat] = useState("mechaneyes");
  const liftCat = (theCat) => {
    setActiveCat(theCat);
  };

  // ————————————————————————————————————o————————————————————————————————————o First Run -->
  // ————————————————————————————————————o First Run —>
  //
  useEffect(() => {
    firstLoad = true;
    infoCards(map.current, geoFile, activeCat, firstLoad);

    setTimeout(() => {
      const introCard = document.querySelector(".info-card--intro");
      introCard.classList.remove("info-card--hidden");
      firstLoad = false;
    }, 1500);
  }, []);

  //TODO: Do we need to run these repeatedly? - https://trello.com/c/tUnEXxaJ/63-todo-do-we-need-to-run-these-repeatedly
  useEffect(() => {
    if (!firstLoad) {
      infoCards(map.current, geoFile, activeCat, firstLoad);
    }
  });

  // ————————————————————————————————————o————————————————————————————————————o Tools -->
  // ————————————————————————————————————o Lat+Long of Mouse —>
  // tool for positioning projects on catebgory pages.
  // output lat+long of mouse click position to console
  //
  // useEffect(() => {
  //   map.current.on("click", (e) => {
  //     let latlong =
  //       '"coordinates": ' +
  //       JSON.stringify(e.lngLat.wrap())
  //         .replace('"lng":', "")
  //         .replace('"lat":', " ")
  //         .replace("{", "[")
  //         .replace("}", "]");
  //     console.log(latlong);
  //   });

  //   map.current.on("touchstart", (e) => {
  //     let latlong =
  //       '"coordinates": ' +
  //       JSON.stringify(e.lngLat.wrap())
  //         .replace('"lng":', "")
  //         .replace('"lat":', " ")
  //         .replace("{", "[")
  //         .replace("}", "]");
  //     console.log(latlong);
  //   });
  // });

  return (
    <main className="map-one">
      <div className="nav-wrapper">
        <NavPC
          map={map}
          geoFile={geoFile}
          liftCat={liftCat}
          activeCat={activeCat}
          liftTitle={liftTitle}
        />
        <NavMobile
          map={map}
          liftCat={liftCat}
          activeCat={activeCat}
          liftTitle={liftTitle}
        />
      </div>
      {/* Used for positioning various element locations incl category screens */}
      {/* <div className="centerGrid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div> */}
      <div ref={mapContainer} className="map-container" />
    </main>
  );
};

export default MapOne;
