import { useState, useEffect } from "react";

import useWindowDimensions from "../../../utils/windowDimensions";
import "./NavMobile.scss";

let Nav = ( { map, liftCat } ) => {
  const { height, width } = useWindowDimensions();
  // const map = props.map;

  const [isVisible, setVisible] = useState(false);
  const toggleHamb = () => {
    setVisible(!isVisible);
    console.log(isVisible);
  };

  // ————————————————————————————————————o————————————————————————————————————o scrollZoom -->
  // ———————————————————————————————————— scrollZoom —>
  //
  // Killed scrollZoom when sitting on 'mechaneyes' landing page.
  // Re-enabled when on other pages. Would have been too jarring
  // to start the experience completely lost
  //
  useEffect(() => {
    fetch("/data/mountains.geojson").then(() => {
      if (liftCat === "mechaneyes") {
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

      if (isProgramming && width < 600) {
        zoom += 0.4;
        // console.log('isProgramming', isProgramming)``
      }
      fetch("/data/mobile.geojson")
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
      <img
        className="hamburger-trigger"
        onClick={toggleHamb}
        src="/images/hamburger-trigger.png"
      />
      <section
        className={isVisible ? "hamburger" : "hamburger hamburger--hidden"}
        onClick={() => setVisible(!isVisible)}
      >
        <nav className="mecha-nav mecha-nav--mob">
          <a
            className="mecha-nav__item mecha-nav__item--title"
            onClick={() => {
              fly(27, 0, 15, 10);
              liftCat("mechaneyes");
            }}
          >
            <h2 className="nav-headline nav-headline--mechaneyes nav-headline--active">
              Mechaneyes
            </h2>
          </a>

          <a
            className="mecha-nav__item"
            onClick={() => {
              fly(0, 35, 13.3, 88);
              liftCat("photography");
            }}
          >
            <h2
              className={
                liftCat == "photography"
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
              fly(6, 10, 11.81, 310, true);
              liftCat("programming");
            }}
          >
            <h2
              className={
                liftCat == "programming"
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
              liftCat("generative");
            }}
          >
            <h2
              className={
                liftCat == "generative"
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
              fly(13, 0, 13.5, 275);
              liftCat("design");
            }}
          >
            <h2
              className={
                liftCat == "design"
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
              liftCat("about");
            }}
          >
            <h2
              className={
                liftCat == "about"
                  ? "nav-headline nav-headline--about nav-headline--active"
                  : "nav-headline nav-headline--about"
              }
            >
              About
            </h2>
          </a>
        </nav>
      </section>
    </>
  );
};

export default Nav;
