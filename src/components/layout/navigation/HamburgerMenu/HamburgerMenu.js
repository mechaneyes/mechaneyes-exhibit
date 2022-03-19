import { useState, useEffect } from "react";
import useWindowDimensions from "../../../../utils/windowDimensions";

import "./HamburgerMenu.scss";

let HamburgerMenu = (props) => {
  const map = props.map;
  const { height, width } = useWindowDimensions();

  const [isVisible, setVisible] = useState(false);
  const toggleHamb = () => {
    setVisible(!isVisible);
  };

  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  let mountainsLoc;
  let fly;

  useEffect(() => {
    fetch("/data/mountains.geojson")
      .then((res) => res.json())
      .then((result) => {
        mountainsLoc = result.features;
        // console.log("mountainsLoc", mountainsLoc[0].geometry.coordinates);
      });

    // console.log('map', map.current)

    fly = (resortLoc) => {
      toggleHamb();
      map.current.flyTo({
        center: [
          mountainsLoc[resortLoc].geometry.coordinates[0],
          mountainsLoc[resortLoc].geometry.coordinates[1],
        ],
        zoom: 14,
        speed: 0.7,
        curve: 1.6, // zoom speed
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    };
  });

  return (
    <>
      <img
        className="hamburger-trigger"
        onClick={toggleHamb}
        src="/images/hamburger-trigger.svg"
      />
      <nav className={isVisible ? "hamburger" : "hamburger hamburger--hidden"}>
        <section className="hp-nav">
          <a className="hp-nav__item" onClick={() => fly(2)}>
            <img src="/images/icon-photography.png" />
            <h2 className="nav-headline nav-headline--phototograpy">
              Photography
            </h2>
          </a>
          <a className="hp-nav__item" onClick={() => fly(4)}>
            <img src="/images/icon-programming.png" />
            <h2 className="nav-headline nav-headline--programming">
              Programming
            </h2>
          </a>
          <a className="hp-nav__item" onClick={() => fly(11)}>
            <img src="/images/icon-installation.png" />
            <h2 className="nav-headline nav-headline--installation">
              Installation
            </h2>
          </a>
          <a className="hp-nav__item" onClick={() => fly(15)}>
            <img src="/images/icon-generative.png" />
            <h2 className="nav-headline nav-headline--generative">
              Generative
            </h2>
          </a>
          <a className="hp-nav__item" onClick={() => fly(19)}>
            <img src="/images/icon-design.png" />
            <h2 className="nav-headline nav-headline--design">Design</h2>
          </a>
          <a className="hp-nav__item" onClick={() => fly(4)}>
            <img src="/images/icon-about.png" />
            <h2 className="nav-headline nav-headline--about">
              About
            </h2>
          </a>
        </section>
      </nav>
    </>
  );
};

export default HamburgerMenu;
