import { useState, useEffect } from "react";

import "./Nav.scss";

let Nav = (props) => {
  const map = props.map;

  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  let mountainsLoc;
  let fly;

  useEffect(() => {
    // console.log('map', map.current)

    fly = (resortLoc) => {
      fetch("/data/mobile.geojson")
        .then((res) => res.json())
        .then((result) => {
          mountainsLoc = result.features;
          // console.log("mountainsLoc", mountainsLoc[0].geometry.coordinates);
        })
        .then(() => {
          map.current.flyTo({
            center: [
              mountainsLoc[resortLoc].geometry.coordinates[0],
              mountainsLoc[resortLoc].geometry.coordinates[1],
            ],
            zoom: 15,
            speed: 0.7,
            curve: 1.6, // zoom speed
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        });
    };
  });

  return (
    <>
      <nav className="mecha-nav">
        <a className="mecha-nav__item" onClick={() => fly(1)}>
          <img src="/images/icon-photography.png" />
          <h2 className="nav-headline nav-headline--phototograpy">
            Photography
          </h2>
        </a>
        <a className="mecha-nav__item" onClick={() => fly(4)}>
          <img src="/images/icon-programming.png" />
          <h2 className="nav-headline nav-headline--programming">
            Programming
          </h2>
        </a>
        <a className="mecha-nav__item" onClick={() => fly(11)}>
          <img src="/images/icon-installation.png" />
          <h2 className="nav-headline nav-headline--installation">
            Installation
          </h2>
        </a>
        <a className="mecha-nav__item" onClick={() => fly(15)}>
          <img src="/images/icon-generative.png" />
          <h2 className="nav-headline nav-headline--generative">Generative</h2>
        </a>
        <a className="mecha-nav__item" onClick={() => fly(19)}>
          <img src="/images/icon-design.png" />
          <h2 className="nav-headline nav-headline--design">Design</h2>
        </a>
        <a className="mecha-nav__item" onClick={() => fly(4)}>
          <img src="/images/icon-about.png" />
          <h2 className="nav-headline nav-headline--about">About</h2>
        </a>
      </nav>
    </>
  );
};

export default Nav;
