// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Use Mapbox GL JS in a React app
//

import {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
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

  // Monument Valley
  // const [lng, setLng] = useState(-110.3193009);
  // const [lat, setLat] = useState(36.9852564);

  // Bryce
  // const [lng, setLng] = useState(-112.3183959);
  // const [lat, setLat] = useState(37.573297);

  // Emerald Bay
  // const [lng, setLng] = useState(-120.15983846533709);
  // const [lat, setLat] = useState(38.95397959307656);

  // Desktop Start
  const [lng, setLng] = useState(-120.46122859325533);
  const [lat, setLat] = useState(38.738060959397785);

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
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        //
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

      // Mapbox Terrain includes elevation contour lines from
      // zoom level 9 and higher. You can use the index field
      // to highlight or label every 2nd, 5th, or 10th line.
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

      // ————————————————————————————————————o————————————————————————————————————o CLUSTERS -->
      // ———————————————————————————————————— CLUSTERS —>
      //
      // Create and style CLUSTERS
      // https://docs.mapbox.com/mapbox-gl-js/example/cluster/
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS adds
      // the point_count property to the source data.
      map.current
        .addSource("mountains", {
          type: "geojson",
          // GeoJSON data: Ski resorts and their mountains
          data: "/data/mountains.geojson",
          cluster: true,
          clusterMaxZoom: 17, // Max zoom to cluster points on
          clusterRadius: 10,
          clusterProperties: {
            photography: ["any", ["==", ["get", "interest"], "photography"]],
            programming: ["any", ["==", ["get", "interest"], "programming"]],
            installation: ["any", ["==", ["get", "interest"], "installation"]],
            generative: ["any", ["==", ["get", "interest"], "generative"]],
            design: ["any", ["==", ["get", "interest"], "design"]],
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
              ["get", "photography"],
              "#ff1d4d",
              ["get", "programming"],
              "#13F267",
              ["get", "installation"],
              "#10fdff",
              ["get", "generative"],
              "#f21fd2",
              ["get", "design"],
              "#f6ff2e",
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
              ["get", "photography"],
              [
                "format",
                "Photography",
                "\n",
                "Sugar Bowl",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              ["get", "programming"],
              [
                "format",
                "Programming",
                "\n",
                "Palisades",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              ["get", "design"],
              [
                "format",
                "Design",
                "\n",
                "Homewood",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              ["get", "installation"],
              [
                "format",
                "Installation",
                "\n",
                "Kirkwood",
                {
                  "text-font": ["literal", ["DIN Offc Pro Italic"]],
                  "font-scale": 0.8,
                },
              ],
              ["get", "generative"],
              [
                "format",
                "Generative",
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

        // ————————————————————————————————————o————————————————————————————————————o UNCLUSTERED -->
        // ———————————————————————————————————— UNCLUSTERED —>
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
              "#ff1d4d",
              "Palisades",
              "#13F267",
              "Homewood",
              "#f6ff2e",
              "Kirkwood",
              "#10fdff",
              "Heavenly",
              "#f21fd2",
              "rgba(0, 0, 0, 0)",
            ],
            "circle-radius": 100,
            "circle-stroke-width": ["match", ["get", "hide"], "hide", 0, 5],
            "circle-stroke-color": "#fff",
          },
        })
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

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.current.on("click", "unclustered-point", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }

        console.log('coordinates', coordinates, ' : description', description)

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map.current);
      });

      // ———————————————————————————————————— LAT+LONG OF MOUSE —>
      // output lat+long of mouse position to console
      //
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
