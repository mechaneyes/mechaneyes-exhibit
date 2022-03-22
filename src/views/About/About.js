import { useRef, useState, useEffect } from "react";

import "./About.scss";

let About = (props) => {
  useEffect(() => {});

  return (
    <>
      <section className="about-masking"></section>
      <section className="about-page">
        <h1>Ray Weitzenberg</h1>
        <h3>Artist and Technologist inducing delight online and off</h3>
        <p>
          I'm a visual artist and technologist based out of Brooklyn. In 1994,
          via the mechanism of photography, I discovered a profound appreciation
          for light. I've spent the last 24 years collecting and projecting that
          light, in part shaping that sensibility via the lens of a BFA at
          Parsons.
        </p>
        <p>
          Some recent work is actualized in AR/VR experiences, both mobile
          and immersive. Also under active development is a storytelling
          platform spanning simultaneous digital and physical means of consumption.
        </p>
        <p>
          These are often crafted with bespoke components sometimes operating
          outside my control, in a black box system. Such a system takes input —
          which can come from any one or more sources — then processes it via
          loosely coupled constraints, resulting in imagery composed somewhat
          randomly, bordering on autonomy.
        </p>
      </section>
    </>
  );
};

export default About;
