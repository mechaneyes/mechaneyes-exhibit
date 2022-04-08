import { useState, useEffect, useContext } from "react";

import useWindowDimensions from "../../../../utils/windowDimensions";
import AboutContext from "../../../../store/transition/transition.about.js";
import "./NavPC.scss";

let Nav = (props) => {
  const { height, width } = useWindowDimensions();
  console.log('width', width)

  const map = props.map;

  const { isIntroVisible, setIntroVisible } = useContext(AboutContext);
  const { isAboutVisible, setAboutVisible } = useContext(AboutContext);

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
    // console.log('map', map.current)

    fly = (resortLoc, pitch = 60, zoom = 14, bearing = 0, isProgramming = false) => {
      if (width > 1700) {
        zoom += 0.4
      }

      if (isProgramming && width > 1700) {
        zoom += 0.5
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
        <div className="mecha-nav__item" onClick={() => showIntro()}>
          <h2 className="nav-headline nav-headline--title">Mechaneyes</h2>
        </div>
        <div className="mecha-nav__not-about" onClick={() => clickOtherNav()}>
          <a className="mecha-nav__item" onClick={() => fly(0, 60, 14.3)}>
            <img src="/images/icon-photography.png" />
            <h2 className="nav-headline nav-headline--phototograpy">
              Photography
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(5, 60, 13.5, 20, true)}>
            <img src="/images/icon-programming.png" />
            <h2 className="nav-headline nav-headline--programming">
              Programming
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(15)}>
            <img src="/images/icon-installation.png" />
            <h2 className="nav-headline nav-headline--installation">
              Installation
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(20)}>
            <img src="/images/icon-generative.png" />
            <h2 className="nav-headline nav-headline--generative">
              Generative
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(11, 60, 14.3)}>
            <img src="/images/icon-design.png" />
            <h2 className="nav-headline nav-headline--design">Design</h2>
          </a>
        </div>
        <a className="mecha-nav__item--about" onClick={() => clickAbout()}>
          <img src="/images/icon-about.png" />
          <h2 className="nav-headline nav-headline--about">About</h2>
        </a>
      </nav>
    </>
  );
};

export default Nav;
