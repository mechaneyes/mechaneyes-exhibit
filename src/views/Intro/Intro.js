import { useEffect, useContext } from "react";
import AboutContext from "../../store/transition/transition.about.js";

import "./Intro.scss";

let Intro = () => {
  const { isIntroVisible, setIntroVisible } = useContext(AboutContext);
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
            My mediums of choice are light itself, and equally, digitally mediated
            experiences. It's when the two passions intersect that monkeys begin
            to dance.
          </p>
          <p>
            Inside is a glimpse of what I see and what I create for others to
            see.
          </p>
        </div>
      </section>
    </>
  );
};

export default Intro;
