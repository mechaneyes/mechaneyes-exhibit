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


  return (
    <>
      <img
        className="hamburger-trigger"
        onClick={toggleHamb}
        src="/images/hamburger-trigger.svg"
      />
      <section className={isVisible ? "hamburger" : "hamburger hamburger--hidden"} onClick={() => setVisible(!isVisible)}>
        <Nav map={map} />
      </section>
    </>
  );
};

export default HamburgerMenu;
