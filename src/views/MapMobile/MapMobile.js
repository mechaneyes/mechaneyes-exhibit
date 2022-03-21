// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { CSSTransition } from "react-transition-group";

import useWindowDimensions from "../../utils/windowDimensions";
import Nav from "../../components/layout/navigation/Nav/Nav";
import HamburgerMenu from "../../components/layout/navigation/HamburgerMenu/HamburgerMenu";

import "./MapMobile.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVjaGFuZXllcyIsImEiOiJ6V2F6bmFNIn0.mauWWMuRub6GkCxkc49sTg";

const MapMobile = () => {
  const { height, width } = useWindowDimensions();
  const [isNavVisible, setNavVisible] = useState(true);
  const [isGradientVisible, setGradientVisible] = useState(true);
  const [isLogoVisible, setLogoVisible] = useState(true);
  const [isTitleVisible, setTitleVisible] = useState(false);
  const [isHamburgerVisible, setHamburgerVisible] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);

  // ————————————————————————————————————o————————————————————————————————————o Full Screen -->
  // ———————————————————————————————————— Full Screen —>
  // Kill scrolling on iOS Safari ... in turns kills hide/reveal
  // of location bar which would destroy the layout
  //
  // https://pqina.nl/blog/how-to-prevent-scrolling-the-page-on-ios-safari/
  // https://css-tricks.com/updating-a-css-variable-with-javascript/
  //
  let root = document.documentElement;
  root.style.setProperty("--height", `${window.innerHeight}px`);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      root.style.setProperty("--height", `${window.innerHeight}px`);
      console.log("root.style", root.style);
    });
  }, []);

  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  let mountainsLoc;
  let fly;
  useEffect(() => {
    fetch("/data/mobile.geojson")
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
        zoom: 15,
        speed: 0.7,
        curve: 1.6, // zoom speed
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    };
  });

  // ————————————————————————————————————o————————————————————————————————————o MAPPIN -->
  // ———————————————————————————————————— MAPPIN —>
  const [lng, setLng] = useState(-119.85973831205467);
  const [lat, setLat] = useState(37.54733615641251);

  // const [lng, setLng] = useState(-119.78446057448917);
  // const [lat, setLat] = useState(37.58532636803403);

  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mechaneyes/ckb6f9oyu2j4l1ilayacdz8yy",
      center: [lng, lat],
      pitch: 60,
      zoom: zoom,
    });

    map.current.on("touchstart", (e) => {
      console.log(JSON.stringify(e.lngLat.wrap()));
    });

    map.current.on("load", () => {
      map.current.addSource("mapbox-terrain", {
        type: "vector",
        // Mapbox Terrain v2
        // https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-v2/
        url: "mapbox://mapbox.mapbox-terrain-v2",
      });

      // ————————————————————————————————————o————————————————————————————————————o CONTOUR LINES -->
      // ———————————————————————————————————— CONTOUR LINES —>
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

      // ———————————————————————————————————— MO CONTOUR LINES —>
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

      // ————————————————————————————————————o————————————————————————————————————o CLUSTERS -->
      // ———————————————————————————————————— CLUSTERS —>
      map.current
        .addSource("mountains", {
          type: "geojson",
          // GeoJSON data: Ski resorts and their mountains
          data: "/data/mobile.geojson",
          cluster: true,
          clusterMaxZoom: 17, // Max zoom to cluster points on
          clusterRadius: 100,
          clusterProperties: {
            sugarBowl: ["any", ["==", ["get", "interest"], "design"]],
            palisades: ["any", ["==", ["get", "resort"], "Palisades"]],
            homewood: ["any", ["==", ["get", "interest"], "generative"]],
            kirkwood: ["any", ["==", ["get", "interest"], "kirkwood"]],
            heavenly: ["any", ["==", ["get", "interest"], "heavenly"]],
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
              "#0381ff",
              ["get", "sugarBowl"],
              "#F21FD2",
              ["get", "palisades"],
              "#13F267",
              ["get", "homewood"],
              "#F5FF2E",
              ["get", "kirkwood"],
              "#0DFDFF",
              ["get", "heavenly"],
              "#FF1D4D",
              "#51bbd6",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              140,
              40,
              140,
              60,
              80,
            ],
            "circle-stroke-width": 55,
            "circle-stroke-color": "#fff",
          },
        })

        // ————————————————————————————————————o————————————————————————————————————o CLUSTER COPY -->
        // ———————————————————————————————————— CLUSTER COPY —>
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
              ["get", "heavenly"],
              [
                "format",
                "Photograhy",
                "\n",
                "Heavenly",
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

        // ————————————————————————————————————o————————————————————————————————————o UNCLUSTERED COLORS -->
        // ———————————————————————————————————— UNCLUSTERED COLORS —>
        .addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "mountains",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": [
              "match",
              ["get", "resort"],
              "Sugar Bowl",
              "#F21FD2",
              "Palisades",
              "#13F267",
              "Homewood",
              "#F5FF2E",
              "Kirkwood",
              "#0DFDFF",
              "Heavenly",
              "#FF1D4D",
              "rgba(0, 0, 0, 0)",
            ],
            "circle-radius": 100,
            "circle-stroke-width": ["match", ["get", "hide"], "hide", 0, 5],
            "circle-stroke-color": "#fff",
          },
        })

        // ————————————————————————————————————o————————————————————————————————————o UNCLUSTERED LABELS -->
        // ———————————————————————————————————— UNCLUSTERED LABELS —>
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

  //   const renderHamburger = () => {
  //     if (isHamburgerVisible) {
  //       return <HamburgerMenu map={map} />;
  //     } else {
  //       return;
  //     }
  //   };

  return (
    <>
      <CSSTransition
        in={isHamburgerVisible}
        transitionName="hamburger-show-hide"
        timeout={200}
      >
        <div className="hamburger-holder">
          <HamburgerMenu map={map} />
        </div>
      </CSSTransition>

      <main className="map-one">
        <h1
          className={
            isTitleVisible
              ? "title-mechaneyes"
              : "title-mechaneyes title-mechaneyes--hidden"
          }
        >
          Mechaneyes
        </h1>
        <img
          className={
            isLogoVisible
              ? "logo-mechaneyes"
              : "logo-mechaneyes logo-mechaneyes--hidden"
          }
          src="/images/logo-mechaneyes.png"
        />
        <div ref={mapContainer} className="map-container" />
        <div
          className={
            isGradientVisible
              ? "gradient-overlay"
              : "gradient-overlay gradient-overlay--hidden"
          }
        />
        <div
          className={
            isNavVisible ? "nav-visible" : "nav-visible nav-visible--hidden"
          }
          onClick={() => {
            setNavVisible(false);
            setGradientVisible(false);
            setLogoVisible(false);
            setTitleVisible(true);
            setHamburgerVisible(true);
          }}
        >
          <Nav map={map} />
        </div>
      </main>
    </>
  );
};

export default MapMobile;
