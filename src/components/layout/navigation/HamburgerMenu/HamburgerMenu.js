import { useState, useEffect } from "react";
import Nav from '../Nav/Nav';
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
    fetch("/data/mobile.geojson")
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
      <section className={isVisible ? "hamburger" : "hamburger hamburger--hidden"}>
        <Nav map={map} />
      </section>
    </>
  );
};

export default HamburgerMenu;
