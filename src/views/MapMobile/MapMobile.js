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
  const [isLogoTriggered, setLogoTriggered] = useState(false);
  const [isLogoVisible, setLogoVisible] = useState(true);
  const [isTitleVisible, setTitleVisible] = useState(false);
  const [isHamburgerVisible, setHamburgerVisible] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const hamburgerRef = useRef(null);
  const logoRef = useRef(null);

  const logoDisplayNone = () => {
    setTimeout(() => {
      setLogoVisible(false);
    }, 1000);
  };

  // ————————————————————————————————————o————————————————————————————————————o Full Screen -->
  // ———————————————————————————————————— Full Screen —>
  // Kill scrolling on iOS Safari ... in turns kills hide/reveal
  // of location bar which would destroy the layout
  //
  // https://pqina.nl/blog/how-to-prevent-scrolling-the-page-on-ios-safari/
  // https://css-tricks.com/updating-a-css-variable-with-javascript/
  //
  useLayoutEffect(() => {
    let root = document.documentElement;
    root.style.setProperty("--height", `${window.innerHeight}px`);

    window.addEventListener("resize", () => {
      root.style.setProperty("--height", `${window.innerHeight}px`);
      console.log("root.style", root.style);
    });
  }, []);

  // ————————————————————————————————————o————————————————————————————————————o MAPPIN -->
  // ———————————————————————————————————— MAPPIN —>
  const [lng, setLng] = useState(-119.76616356151555);
  const [lat, setLat] = useState(37.522955765043974);

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

    // ———————————————————————————————————— LAT+LONG OF MOUSE —>
    // output lat+long of mouse position to console
    //
    map.current.on("touchstart", (e) => {
      let latlong =
        '"coordinates": ' +
        JSON.stringify(e.lngLat.wrap())
          .replace('"lng":', "")
          .replace('"lat":', " ")
          .replace("{", "[")
          .replace("}", "]");
      console.log(latlong);
    });

    // ————————————————————————————————————o————————————————————————————————————o CONTOUR LINES -->
    // ———————————————————————————————————— CONTOUR LINES —>
    map.current.on("load", () => {
      map.current.addSource("mapbox-terrain", {
        type: "vector",
        // Mapbox Terrain v2
        // https://docs.mapbox.com/data/tilesets/reference/mapbox-terrain-v2/
        url: "mapbox://mapbox.mapbox-terrain-v2",
      });

      map.current
        .addLayer({
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
        })
        .addLayer({
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

      // ————————————————————————————————————o————————————————————————————————————o LABELS -->
      // ———————————————————————————————————— LABELS —>
      map.current
        .addSource("mountains", {
          type: "geojson",
          data: "/data/mobile.geojson",
        })

        .addLayer({
          id: "label",
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
          paint: {
            "text-color": "#ffffff",
            "text-halo-color": "#000000",
            "text-halo-width": 3,
          },
        });
    });
  });

  // ————————————————————————————————————o————————————————————————————————————o MARKERS -->
  // ———————————————————————————————————— MARKERS —>
  // https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
  //
  useEffect(() => {
    fetch("/data/mobile.geojson")
      .then((res) => res.json())
      .then((result) => {
        for (const feature of result.features) {
          const el = document.createElement("div");

          switch (feature.properties.medium) {
            case "photography":
              el.className = "marker marker--photography";
              el.style.backgroundImage = `url('/images/icon-photography.png')`;
              break;
            case "programming":
              el.className = "marker marker--programming";
              el.style.backgroundImage = `url('/images/icon-programming.png')`;
              break;
            case "installation":
              el.className = "marker marker--installation";
              el.style.backgroundImage = `url('/images/icon-installation.png')`;
              break;
            case "generative":
              el.className = "marker marker--generative";
              el.style.backgroundImage = `url('/images/icon-generative.png')`;
              break;
            case "design":
              el.className = "marker marker--design";
              el.style.backgroundImage = `url('/images/icon-design.png')`;
              break;
            case "about":
              el.className = "marker marker--about";
              el.style.backgroundImage = `url('/images/icon-about.png')`;
              break;
          }

          if (feature.properties.hide != "hide") {
            const marker = new mapboxgl.Marker(el)
              .setLngLat(feature.geometry.coordinates)
              .addTo(map.current)
              .setOffset([0, 57]);

            // ———————————————————————————————————— CENTER MARKER ON CLICK —>
            marker.getElement().addEventListener("click", () => {
              map.current.flyTo({
                center: feature.geometry.coordinates,
              });
            });
          }
        }
      });

    // ———————————————————————————————————— MO CENTER MARKER ON CLICK —>
    map.current.on("click", "label", (e) => {
      map.current.flyTo({
        center: e.features[0].geometry.coordinates,
      });
    });
  });

  return (
    <>
      <CSSTransition
        in={isHamburgerVisible}
        transitionname="hamburger-show-hide"
        timeout={200}
        nodeRef={hamburgerRef}
      >
        <div ref={hamburgerRef} className="hamburger-holder">
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
        <CSSTransition
          in={isLogoTriggered}
          transitionname="logo-show-hide"
          timeout={200}
          nodeRef={logoRef}
        >
          <img
            ref={logoRef}
            className={
              isLogoVisible
                ? "logo-mechaneyes"
                : "logo-mechaneyes logo-mechaneyes--hidden"
            }
            src="/images/logo-mechaneyes.png"
          />
        </CSSTransition>
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
            setLogoTriggered(true);
            logoDisplayNone();
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
