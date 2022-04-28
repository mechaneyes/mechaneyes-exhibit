import { useState, useEffect } from "react";

import useWindowDimensions from "../../../../utils/windowDimensions";
import "./NavPC.scss";

let Nav = (props) => {
  const { height, width } = useWindowDimensions();
  const map = props.map;

  const [activeNav, setActiveNav] = useState("mechaneyes");


  // ————————————————————————————————————o————————————————————————————————————o scrollZoom -->
  // ———————————————————————————————————— scrollZoom —>
  // 
  // Killed scrollZoom when sitting on 'mechaneyes' landing page.
  // Re-enabled when on other pages. Would have been too jarring
  // to start the experience completely lost
  // 
  useEffect(() => {
    fetch("/data/mountains.geojson").then(() => {
      if (activeNav === "mechaneyes") {
        map.current.scrollZoom.disable();
      } else {
        map.current.scrollZoom.enable();
      }
    });
  });

  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  let mountainsLoc;
  let fly;

  useEffect(() => {
    fly = (
      resortLoc,
      pitch = 0,
      zoom = 14,
      bearing = 0,
      isProgramming = false
    ) => {
      if (width > 1700) {
        zoom += 0.2;
      }

      if (isProgramming && width > 1700) {
        zoom += 0.4;
        // console.log('isProgramming', isProgramming)``
      }
      fetch("/data/mountains.geojson")
        .then((res) => res.json())
        .then((result) => {
          mountainsLoc = result.features;
          // console.log("mountainsLoc", mountainsLoc[0].geometry.coordinates);
        })
        .then(() => {
          map.current.flyTo({
            center: [
              mountainsLoc[resortLoc].geometry.coordinates[0],
              mountainsLoc[resortLoc].geometry.coordinates[1],
            ],
            pitch: pitch,
            bearing: bearing,
            zoom: zoom,
            speed: 0.7,
            curve: 1.6, // zoom speed
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        });

      // If a project popup is visible remove it on nav click
      //
      const popup = document.getElementsByClassName("mapboxgl-popup");
      if (popup.length) {
        popup[0].remove();
      }
    };
  });

  return (
    <>
      <nav className="mecha-nav mecha-nav--pc">
        <a
          className="mecha-nav__item mecha-nav__item--title"
          onClick={() => {
            fly(27, 0, 15, 10);
            setActiveNav("mechaneyes");
          }}
        >
          <h2 className="nav-headline nav-headline--mechaneyes nav-headline--active">
            Mechaneyes
          </h2>
        </a>

        <a
          className="mecha-nav__item"
          onClick={() => {
            fly(0, 0, 13.9, 198);
            setActiveNav("photography");
          }}
        >
          <h2
            className={
              activeNav == "photography"
                ? "nav-headline nav-headline--photography nav-headline--active"
                : "nav-headline nav-headline--photography"
            }
          >
            Photography
          </h2>
        </a>

        <a
          className="mecha-nav__item"
          onClick={() => {
            fly(6, 30, 13.16, 25, true);
            setActiveNav("programming");
          }}
        >
          <h2
            className={
              activeNav == "programming"
                ? "nav-headline nav-headline--programming nav-headline--active"
                : "nav-headline nav-headline--programming"
            }
          >
            Programming
          </h2>
        </a>

        <a
          className="mecha-nav__item"
          onClick={() => {
            fly(18, 0, 13.3, 285);
            setActiveNav("generative");
          }}
        >
          <h2
            className={
              activeNav == "generative"
                ? "nav-headline nav-headline--generative nav-headline--active"
                : "nav-headline nav-headline--generative"
            }
          >
            Generative
          </h2>
        </a>

        <a
          className="mecha-nav__item"
          onClick={() => {
            fly(13, 0, 14, 210);
            setActiveNav("design");
          }}
        >
          <h2
            className={
              activeNav == "design"
                ? "nav-headline nav-headline--design nav-headline--active"
                : "nav-headline nav-headline--design"
            }
          >
            Design
          </h2>
        </a>

        <a
          className="mecha-nav__item"
          onClick={() => {
            fly(28, 0, 15, 10);
            setActiveNav("about");
          }}
        >
          <h2
            className={
              activeNav == "about"
                ? "nav-headline nav-headline--about nav-headline--active"
                : "nav-headline nav-headline--about"
            }
          >
            About
          </h2>
        </a>
      </nav>
    </>
  );
};

export default Nav;
