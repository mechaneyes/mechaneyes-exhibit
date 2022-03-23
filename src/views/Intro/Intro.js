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
            the mechanism of photography, I discovered a profound appreciation
            for light. I've spent the last 24 years collecting and projecting
            that light, in part having shaped that sensibility via the lens of
            Parsons School of Design.
          </p>
          <p>
            As much as I am enamored with art, I focus my attention equally on
            the digital side of the equation. It's when the two passions
            intersect that monkeys start to dance.
          </p>
        </div>
      </section>
    </>
  );
};

export default Intro;
