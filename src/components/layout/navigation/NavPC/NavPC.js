import { useState, useEffect, useContext } from "react";

import useWindowDimensions from "../../../../utils/windowDimensions";
import AboutContext from "../../../../store/transition/transition.about.js";
import "./NavPC.scss";

let Nav = (props) => {
  const { height, width } = useWindowDimensions();

  const map = props.map;

  const { isIntroVisible, setIntroVisible } = useContext(AboutContext);
  const { isAboutVisible, setAboutVisible } = useContext(AboutContext);
  const [activeNav, setActiveNav] = useState("zero");

  useEffect(() => {
    console.log("activeNav", activeNav);
  });

  let navElements;
  let showIntro;
  let clickAbout;
  let clickOtherNav;
  useEffect(() => {
    showIntro = () => {
      setIntroVisible(true);
      setAboutVisible(false);
      // console.log("isIntroVisible", isIntroVisible);
    };

    clickAbout = () => {
      setIntroVisible(false);
      setAboutVisible(true);
      // console.log("isAboutVisible", isAboutVisible);
    };

    clickOtherNav = () => {
      setIntroVisible(false);
      setAboutVisible(false);
      // console.log("isAboutVisible", isAboutVisible);
    };
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
        zoom += 0.5;
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
        <div
          className="mecha-nav__item mecha-nav__item--title"
          onClick={() => {
            showIntro();
            setActiveNav("title");
          }}
        >
          <h2
            className={
              activeNav == "title"
                ? "nav-headline nav-headline--title nav-headline--active"
                : "nav-headline nav-headline--title"
            }
          >
            Mechaneyes
          </h2>
        </div>

        <div className="mecha-nav__not-about" onClick={() => clickOtherNav()}>
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
              fly(6, 20, 13.16, 25, true);
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
              fly(18, 40, 13.3, 200);
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
        </div>

        <a
          className="mecha-nav__item mecha-nav__item--about"
          onClick={() => {
            // clickAbout();
            fly(29, 0, 15, 10);
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
