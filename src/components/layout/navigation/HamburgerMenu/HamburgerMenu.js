import { useState, useContext } from "react";
import Nav from './NavMobile';
import useWindowDimensions from "../../../../utils/windowDimensions";

import "./HamburgerMenu.scss";
import "./NavMobile.scss";

let HamburgerMenu = (props) => {
  const { height, width } = useWindowDimensions();
  const map = props.map;

  const [isVisible, setVisible] = useState(false);
  
  const toggleHamb = () => {
    setVisible(!isVisible);
    console.log(isVisible)
  };


  return (
    <>
      <img
        className="hamburger-trigger"
        onClick={toggleHamb}
        src="/images/hamburger-trigger.png"
      />
      <section className={isVisible ? "hamburger" : "hamburger hamburger--hidden"} onClick={() => setVisible(!isVisible)}>
        <Nav map={map} />
      </section>
    </>
  );
};

export default HamburgerMenu;
