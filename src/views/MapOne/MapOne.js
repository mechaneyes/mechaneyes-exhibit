// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import { useRef, useEffect, useState } from "react";
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

const MapOne = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Desktop Start
  const [lng] = useState(-120.46122859325533);
  const [lat] = useState(38.738060959397785);

  const [zoom] = useState(15);

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
      document.querySelector(".map-one").style.height =
        "-webkit-fill-available";
    }
  });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mechaneyes/ckb6f9oyu2j4l1ilayacdz8yy",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: false,
      // interactive: disableInteractive,
    });

    map.current.on("load", () => {
      // ————————————————————————————————————o Setup the Map + Terrain —>
      //
      terrain(map.current);

      // Force map to expand to fill viewport
      // Sometimes was loading only in a small area
      map.current.resize();

      // ————————————————————————————————————o Disable Zoom/Pan/Etc Effects —>
      //
      map.current.scrollZoom.disable();
      map.current.boxZoom.disable();
      // map.current.dragPan.disable();
      map.current.touchZoomRotate.disable();
      map.current.keyboard.disable();
      map.current.doubleClickZoom.disable();
      
      // Additional scroll wheel prevention
      map.current.getCanvas().addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, { passive: false });
      
      // Re-disable zoom events after interactions
      const reDisableEffects = () => {
        map.current.scrollZoom.disable();
        map.current.boxZoom.disable();
        map.current.touchZoomRotate.disable();
        map.current.keyboard.disable();
        map.current.doubleClickZoom.disable();
      };
      
      // Listen for events that might re-enable zoom
      map.current.on('click', reDisableEffects);
      map.current.on('popupopen', reDisableEffects);
      map.current.on('popupclose', reDisableEffects);
      map.current.on('zoom', reDisableEffects);
      map.current.on('move', reDisableEffects);

      // ————————————————————————————————————o Category Info Cards —>
      //
      markers(map.current, geoFile);
      labels(map.current, geoFile);
      infoCards(map.current, geoFile, activeCat, firstLoad);
      setTimeout(() => {
        const introCard = document.querySelector(".info-card--intro");
        if (introCard) {
          introCard.classList.remove("info-card--hidden");
        }
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
      if (introCard) {
        introCard.classList.remove("info-card--hidden");
      }
      firstLoad = false;
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: Do we need to run these repeatedly? - https://trello.com/c/tUnEXxaJ/63-todo-do-we-need-to-run-these-repeatedly
  useEffect(() => {
    if (!firstLoad) {
      infoCards(map.current, geoFile, activeCat, firstLoad);
    }
  });

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
      <div ref={mapContainer} className="map-container" />
    </main>
  );
};

export default MapOne;
