import { useRef, useState, useEffect } from "react";

import "./About.scss";

let About = (props) => {
  useEffect(() => {});

  return (
    <>
      <section className="about-page">
        <h1>Ray Weitzenberg</h1>
        <h2>Artist and Technologist inducing delight online and off</h2>
        <p>
          I'm a visual artist and technologist living and working in Brooklyn.
          In 1994, via the mechanism of photography, I discovered a profound
          appreciation for light. With the medium of photography not actually
          being grain in film or pixels on sensors, but being light itself, it
          wasn't a stretch for me to go from collecting light to projecting it.
          Those projections most often materialize at events where the imagery
          is processed, performed and projected live.
        </p>
        <p>
          A significant amount of neoneon work and personal projects is
          actualized in AR/VR experiences, both mobile and immersive. These are
          often crafted with bespoke components sometimes operating outside my
          control, in a black box system. Such a system takes input — which can
          come from any one or more sources — then processes it via loosely
          coupled constraints, resulting in imagery composed somewhat randomly,
          bordering on autonomy.
        </p>
        <button className="about-button">close about</button>
      </section>
    </>
  );
};

export default About;
