import { useEffect } from "react";
import useWindowDimensions from "../../../../utils/windowDimensions";

import "./HamburgerMenu.scss";

let HamburgerMenu = (props) => {
  const map = props.map;
  console.log("map", map);
  const { height, width } = useWindowDimensions();

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

    fly = (resortLoc) => {
      map.flyTo({
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
      <img className="hamburger-trigger" src="/images/icon-photography.png" />
      <nav className="hamburger">
        <a className="hamburger__item" onClick={() => fly(2)}>
          <img src="/images/icon-photography.png" />
          <h2 className="hamburger-headline hamburger-headline--phototograpy">
            Photography
          </h2>
        </a>
        <a className="hamburger__item" onClick={() => fly(4)}>
          <img src="/images/icon-programming.png" />
          <h2 className="hamburger-headline hamburger-headline--programming">
            Programming
          </h2>
        </a>
        <a className="hamburger__item" onClick={() => fly(11)}>
          <img src="/images/icon-installation.png" />
          <h2 className="hamburger-headline hamburger-headline--installation">
            Installation
          </h2>
        </a>
        <a className="hamburger__item" onClick={() => fly(15)}>
          <img src="/images/icon-generative.png" />
          <h2 className="hamburger-headline hamburger-headline--generative">
            Generative
          </h2>
        </a>
        <a className="hamburger__item" onClick={() => fly(19)}>
          <img src="/images/icon-design.png" />
          <h2 className="hamburger-headline hamburger-headline--design">
            Design
          </h2>
        </a>
      </nav>
    </>
  );
};

export default HamburgerMenu;
