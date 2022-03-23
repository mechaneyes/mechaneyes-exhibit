import { useState, useEffect, useContext } from "react";

import "./Intro.scss";

let Intro = (props) => {
  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  useEffect(() => {});

  return (
    <>
      <section className="mecha-intro mecha-intro--pc">
        <div className="mecha-intro__inner">
        <h1>Ray Weitzenberg</h1>
        <h3>Artist and technologist inducing delight online and off</h3>
        <p>
          I'm a visual artist and technologist based in Brooklyn. In 1994, via
          the mechanism of photography, I discovered a profound appreciation for
          light. I've spent the last 24 years collecting and projecting that
          light, in part having shaped that sensibility via the lens of Parsons
          School of Design.
        </p>
        <p>
          As much as I am enamored with art, I focus my attention equally on the
          digital side of the equation. It's when the two passions intersect
          that monkeys start to dance.
        </p>
        <p>
          Under active development is a storytelling platform spanning
          simultaneous digital and physical means of interaction. Other recent
          work is actualized in AR/VR experiences, both mobile and immersive.
        </p>
        <p>
          Elements of these are often crafted with bespoke apps, sometimes
          operating outside my control ... in a black box system. The systems
          take input — which can come from any one or more sources — then
          processes it via loosely coupled constraints, resulting in imagery
          composed somewhat randomly, bordering on autonomy.
        </p>
          <p className="mecha-intro__social"><a href="//www.instagram.com/mechaneyes">Instagram</a> &middot; <a href="//twitter.com/mechaneyes">Twitter</a> &middot; <a href="//github.com/rayweitzenberg">GitHub</a></p>
        </div>
      </section>
    </>
  );
};

export default Intro;
