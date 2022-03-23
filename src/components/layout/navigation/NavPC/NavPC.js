import { useState, useEffect, useContext } from "react";

import AboutContext from "../../../../store/transition/transition.about.js";
import "./NavPC.scss";

let Nav = (props) => {
  const map = props.map;

  const { isAboutVisible, setAboutVisible } = useContext(AboutContext);
  let updateAbout;
  useEffect(() => {
    updateAbout = () => {
      setAboutVisible(true);
      console.log("isAboutVisible", isAboutVisible);
    };
  });

  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  let mountainsLoc;
  let fly;

  useEffect(() => {
    // console.log('map', map.current)

    fly = (resortLoc, angle = 60) => {
      fetch("/data/mountains.geojson")
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
            zoom: 14,
            pitch: angle,
            speed: 0.7,
            curve: 1.6, // zoom speed
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        });
    };
  });

  return (
    <>
      <nav className="mecha-nav mecha-nav--pc">
        <div className="mecha-nav__item">
          <h2 className="nav-headline nav-headline--title">Mechaneyes</h2>
        </div>
        <div className="mecha-nav__not-about" onClick={() => setAboutVisible(false)}>
          <a className="mecha-nav__item" onClick={() => fly(0)}>
            <img src="/images/icon-photography.png" />
            <h2 className="nav-headline nav-headline--phototograpy">
              Photography
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(5)}>
            <img src="/images/icon-programming.png" />
            <h2 className="nav-headline nav-headline--programming">
              Programming
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(12)}>
            <img src="/images/icon-installation.png" />
            <h2 className="nav-headline nav-headline--installation">
              Installations
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(14)}>
            <img src="/images/icon-generative.png" />
            <h2 className="nav-headline nav-headline--generative">
              Generative
            </h2>
          </a>
          <a className="mecha-nav__item" onClick={() => fly(20)}>
            <img src="/images/icon-design.png" />
            <h2 className="nav-headline nav-headline--design">Design</h2>
          </a>
        </div>
        <a className="mecha-nav__item--about" onClick={() => updateAbout()}>
          <img src="/images/icon-about.png" />
          <h2 className="nav-headline nav-headline--about">About</h2>
        </a>
      </nav>
    </>
  );
};

export default Nav;
