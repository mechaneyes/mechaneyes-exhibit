import { useEffect, useContext } from "react";
import AboutContext from "../../store/transition/transition.about.js";

import "./Intro.scss";

let Intro = () => {
  const { isIntroVisible, setIntroVisible, toggleHamburger } = useContext(AboutContext);
  let hideIntro;

  useEffect(() => {
    hideIntro = () => {
      setIntroVisible(false);
      // console.log("isIntroVisible", isIntroVisible);
    };
  });

  return (
    <>
      <section className="intro intro--pc">
        <div className="intro__inner">
          {/* <div className="close-icon" onClick={() => hideIntro()}>&#10005;</div> */}
          <img className="logo-mechaneyes" src="/images/logo-mechaneyes.png" />
          <h1>Ray Weitzenberg</h1>
          <h3>Artist and technologist inducing delight online and off</h3>
          <p>
            My mediums of choice are light itself, and equally, digitally
            mediated experiences. It's when the two passions intersect that
            monkeys begin to dance.
          </p>
          <p>Inside is a glimpse of what I see and create for others to see.</p>
          <button 
            className="intro-hamburger-button"
            onClick={toggleHamburger}
          >
            Menu
          </button>
        </div>
        
      </section>
    </>
  );
};

export default Intro;
