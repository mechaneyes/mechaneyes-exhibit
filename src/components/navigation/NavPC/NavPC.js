import { useState, useEffect } from "react";
import ReactGA from 'react-ga';
import "./NavPC.scss";

let Nav = ({ map, geoFile, liftCat, activeCat, liftTitle }) => {

  let isIpad = false
  if (window.innerWidth <= 768) {
    isIpad = true
  }

  // ————————————————————————————————————o————————————————————————————————————o GA Tracking -->
  // ———————————————————————————————————— GA Tracking —>
  // 
  const eventTrack = (category, action, label) => {
    console.log("GA event:", category, ":", action, ":", label);
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    })
  }

  // ————————————————————————————————————o————————————————————————————————————o scrollZoom -->
  // ———————————————————————————————————— scrollZoom —>
  // 
  // Killed scrollZoom when sitting on 'mechaneyes' landing page.
  // Re-enabled when on other pages. Would have been too jarring
  // to start the experience completely lost
  // 
  useEffect(() => {
    fetch(geoFile).then(() => {
      if (liftCat === "mechaneyes") {
        map.current.scrollZoom.disable();
      } else {
        map.current.scrollZoom.enable();
      }
    });
    // setTheTitle('dallas')
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
      if (window.innerWidth > 1700) {
        zoom += 0.2;
      }

      if (isProgramming && window.innerWidth > 1700) {
        zoom += 0.4;
        // console.log('isProgramming', isProgramming)``
      }
      fetch(geoFile)
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
            liftCat("mechaneyes");
            liftTitle("Mechaneyes === Ray Weitzenberg")
            eventTrack("Link", "Nav Click", "Mechaneyes Nav")
          }}
        >
          <h2 className="nav-headline nav-headline--mechaneyes nav-headline--active">
            Mechaneyes
          </h2>
        </a>

        <a
          className="mecha-nav__item"
          onClick={() => {
            if (isIpad) {
              fly(0, 0, 13.6, 238);
            } else {
              fly(0, 0, 13.9, 198);
            }
            liftCat("photography");
            liftTitle("Mechaneyes === Ray Weitzenberg: Photography")
            eventTrack("Link", "Nav Click", "Photography Nav")
          }}
        >
          <h2
            className={
              activeCat == "photography"
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
            if (isIpad) {
              fly(6, 30, 13.16, 300, true);
            } else {
              fly(6, 30, 13.16, 25, true);
            }
            liftCat("programming");
            liftTitle("Mechaneyes === Ray Weitzenberg: Programming")
            eventTrack("Link", "Nav Click", "Programming Nav")
          }}
        >
          <h2
            className={
              activeCat == "programming"
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
            if (isIpad) {
              fly(18, 50, 14, 170);
            } else {
              fly(18, 0, 13.3, 285);
            }
            liftCat("generative");
            liftTitle("Mechaneyes === Ray Weitzenberg: Generative")
            eventTrack("Link", "Nav Click", "Generative Nav")
          }}
        >
          <h2
            className={
              activeCat == "generative"
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
            if (isIpad) {
              fly(13, 30, 14, 210);
            } else {
              fly(13, 0, 14, 210);
            }
            liftCat("design");
            liftTitle("Mechaneyes === Ray Weitzenberg: Design")
            eventTrack("Link", "Nav Click", "Design Nav")
          }}
        >
          <h2
            className={
              activeCat == "design"
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
            liftTitle("Mechaneyes === Ray Weitzenberg: About")
            eventTrack("Link", "Nav Click", "About Nav")
          }}
        >
          <h2
            className={
              activeCat == "about"
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
