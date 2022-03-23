import { useState, useContext } from "react";
import Nav from '../NavMobile/NavMobile';
import AboutContext from "../../../../store/transition/transition.about.js";

import "./HamburgerMenu.scss";

let HamburgerMenu = (props) => {
  const map = props.map;

  const [isVisible, setVisible] = useState(false);
  const { setAboutVisible } = useContext(AboutContext);
  
  const toggleHamb = () => {
    setVisible(!isVisible);
    setAboutVisible(false);
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
