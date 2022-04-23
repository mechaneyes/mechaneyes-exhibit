// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  createContext,
  useContext,
} from "react";
import mapboxgl from "!mapbox-gl";
/* eslint import/no-webpack-loader-syntax: off */
import { CSSTransition } from "react-transition-group";

import useWindowDimensions from "../../utils/windowDimensions";
import Nav from "../../components/layout/navigation/NavPC/NavPC";
import HamburgerMenu from "../../components/layout/navigation/HamburgerMenu/HamburgerMenu";
import AboutContext from "../../store/transition/transition.about.js";
import About from "../About/About";

import "./MapMobile.scss";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVjaGFuZXllcyIsImEiOiJ6V2F6bmFNIn0.mauWWMuRub6GkCxkc49sTg";

export const UmbrellaAboutContext = createContext();

const MapMobile = () => {
  const { height, width } = useWindowDimensions();
  const [isNavVisible, setNavVisible] = useState(true);
  const [isGradientVisible, setGradientVisible] = useState(true);
  const [isLogoTriggered, setLogoTriggered] = useState(false);
  const [isLogoVisible, setLogoVisible] = useState(true);
  const [isTitleVisible, setTitleVisible] = useState(false);
  const [isHamburgerVisible, setHamburgerVisible] = useState(false);
  const [isAboutTriggered, setAboutTriggered] = useState(false);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const hamburgerRef = useRef(null);
  const logoRef = useRef(null);
  const aboutRef = useRef(null);

  const aboutValue = useContext(AboutContext);
  const [isAboutVisible, setAboutVisible] = useState(false);

  // ———————————————————————————————————— Hide Logo onClick —>
  //
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
      // console.log("root.style", root.style);
    });
  }, []);

  // ————————————————————————————————————o————————————————————————————————————o MAPPIN -->
  // ———————————————————————————————————— MAPPIN —>
  const [lng, setLng] = useState(-119.76616356151555);
  const [lat, setLat] = useState(37.522955765043974);

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
        // console.log("url", url, "coordinates", coordinates);

        popup
          .setLngLat(coordinates)
          .setHTML(`<iframe class="project-iframe" src=${url} />`)
          .addTo(map.current);
      });
    });
  });

  // ————————————————————————————————————o————————————————————————————————————o Markers + Popups -->
  // ———————————————————————————————————— Markers + Popups —>
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
              // console.log("coordinates", coordinates);

              popup
                .setLngLat(coordinates)
                .setHTML(`<iframe class="project-iframe" src=${url} />`)
                .addTo(map.current);
            });
          }
        }
      });
  });

  return (
    <>
      <AboutContext.Provider value={{ isAboutVisible, setAboutVisible }}>
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
        <div
          className={
            isAboutVisible
              ? "about-overlay"
              : "about-overlay about-overlay--hidden"
          }
        >
          <About />
        </div>

        <main className="map-one">
          <h2
            className={
              isTitleVisible
                ? "title-mechaneyes"
                : "title-mechaneyes title-mechaneyes--hidden"
            }
          >
            Mechaneyes
          </h2>
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
              setAboutTriggered(true);
            }}
          >
            <Nav map={map} />
          </div>
        </main>
      </AboutContext.Provider>
    </>
  );
};

export default MapMobile;
