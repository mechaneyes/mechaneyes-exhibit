import { useEffect, useContext } from "react";
import AboutContext from "../../store/transition/transition.about.js";

import "./About.scss";

let About = (props) => {
  const { isAboutVisible, setAboutVisible } = useContext(AboutContext);

  let hideAbout;
  useEffect(() => {
    hideAbout = () => {
      setAboutVisible(false);
    };
  });

  return (
    <>
      <section className="about-masking"></section>
      <section className="about-page">
        <div className="about-page__inner">
          <div className="close-icon" onClick={() => hideAbout()}>
            &#10005;
          </div>

          <h1>Ray Weitzenberg</h1>
          <h3>Artist and technologist inducing delight online and off</h3>
          <p>
            I'm a visual artist and technologist based in Brooklyn. In 1994, via
            the mechanism of photography, I discovered a profound appreciation
            for light. I've spent the last 28 years collecting and projecting
            that light, in part having shaped that sensibility via the lens of
            Parsons School of Design.
          </p>
          <p>
            As much as I am enamored with art, I focus my attention equally on
            digital. It's when the two passions intersect that monkeys begin to
            dance.
          </p>
          <p>
            As a Senior Frontend Developer at UNIQLO I take projects from
            conceptualization, through prototyping and development and on into
            production. Nights and weekends I spend immersed in personal
            projects. Under active development is Monolyth, a storytelling
            platform spanning simultaneous digital and physical means of
            interaction. Other recent work is actualized in AR/VR experiences,
            both mobile and immersive.
          </p>
          {/* <p>
            Projects are crafted as or with bespoke apps, operating in a black
            box system often operating outside my control. The systems take
            input — which can come from any one or more sources — then processes
            it via loosely coupled constraints, resulting in imagery composed
            somewhat randomly, bordering on autonomy.
          </p> */}
          <p className="about-page__social">
            <a href="//www.instagram.com/mechaneyes">Instagram</a> &middot;{" "}
            <a href="//twitter.com/mechaneyes">Twitter</a> &middot;{" "}
            <a href="//github.com/rayweitzenberg">GitHub</a> &middot;{" "}
            <a href="//www.linkedin.com/in/rayweitzenberg/">LinkedIn</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
