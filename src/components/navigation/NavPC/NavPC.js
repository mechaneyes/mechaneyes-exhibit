import { useEffect, useCallback, useRef } from "react";
import "./NavPC.scss";

let Nav = ({ map, geoFile, liftCat, activeCat, liftTitle }) => {
  let isIpad = false;
  if (window.innerWidth <= 768) {
    isIpad = true;
  }

  // ————————————————————————————————————o————————————————————————————————————o scrollZoom -->
  // ———————————————————————————————————— scrollZoom —>
  //
  // Killed scrollZoom when sitting on 'mechaneyes' landing page.
  // Re-enabled when on other pages. Would have been too jarring
  // to start the experience completely lost
  //
  useEffect(() => {
    fetch(geoFile).then(() => {
      if (liftCat === "mechaneyes") {
        map.current.scrollZoom.disable();
      } else {
        map.current.scrollZoom.enable();
      }
    });
    // setTheTitle('dallas')
  });

  // ————————————————————————————————————o————————————————————————————————————o FLY -->
  // ———————————————————————————————————— FLY —>
  const mountainsLocRef = useRef(null);

  const fly = useCallback((
    resortLoc,
    pitch = 0,
    zoom = 14,
    bearing = 0,
    isProgramming = false
  ) => {
    if (window.innerWidth > 1700) {
      zoom += 0.2;
    }

    if (isProgramming && window.innerWidth > 1700) {
      zoom += 0.4;
      // console.log('isProgramming', isProgramming)``
    }
    fetch(geoFile)
      .then((res) => res.json())
      .then((result) => {
        mountainsLocRef.current = result.features;
        // console.log("mountainsLoc", mountainsLocRef.current[0].geometry.coordinates);
      })
      .then(() => {
        map.current.flyTo({
          center: [
            mountainsLocRef.current[resortLoc].geometry.coordinates[0],
            mountainsLocRef.current[resortLoc].geometry.coordinates[1],
          ],
          pitch: pitch,
          bearing: bearing,
          zoom: zoom,
          speed: 0.7,
          curve: 1.6, // zoom speed
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      });

    // If a project popup is visible remove it on nav click
    //
    const popup = document.getElementsByClassName("mapboxgl-popup");
    if (popup.length) {
      popup[0].remove();
    }
  }, [map, geoFile]);

  return (
    <>
      <nav className="mecha-nav mecha-nav--pc">
        <button
          className="mecha-nav__item mecha-nav__item--title"
          onClick={() => {
            fly(27, 0, 15, 10);
            liftCat("mechaneyes");
            liftTitle("Mechaneyes === Ray Weitzenberg");
          }}
        >
          <h2 className="nav-headline nav-headline--mechaneyes nav-headline--title">
            Mechaneyes
          </h2>
        </button>

        <button
          className={
            activeCat === "photography"
              ? "mecha-nav__item mecha-nav__item--active"
              : "mecha-nav__item"
            }
          onClick={() => {
            if (isIpad) {
              fly(0, 0, 13.6, 238);
            } else {
              fly(0, 0, 13.9, 198);
            }
            liftCat("photography");
            liftTitle("Mechaneyes === Ray Weitzenberg: Photography");
          }}
        >
          <h2
            className={
              activeCat === "photography"
                ? "nav-headline nav-headline--photography nav-headline--active"
                : "nav-headline nav-headline--photography"
            }
          >
            Photography
          </h2>
        </button>

        <button
          className={
            activeCat === "programming"
              ? "mecha-nav__item mecha-nav__item--active"
              : "mecha-nav__item"
          }
          onClick={() => {
            if (isIpad) {
              fly(6, 30, 13.16, 300, true);
            } else {
              fly(6, 30, 13.16, 25, true);
            }
            liftCat("programming");
            liftTitle("Mechaneyes === Ray Weitzenberg: Programming");
          }}
        >
          <h2
            className={
              activeCat === "programming"
                ? "nav-headline nav-headline--programming nav-headline--active"
                : "nav-headline nav-headline--programming"
            }
          >
            Programming
          </h2>
        </button>

        <button
          className={
            activeCat === "generative"
              ? "mecha-nav__item mecha-nav__item--active"
              : "mecha-nav__item"
          }
          onClick={() => {
            if (isIpad) {
              fly(18, 50, 14, 170);
            } else {
              fly(18, 0, 13.3, 285);
            }
            liftCat("generative");
            liftTitle("Mechaneyes === Ray Weitzenberg: Generative");
          }}
        >
          <h2
            className={
              activeCat === "generative"
                ? "nav-headline nav-headline--generative nav-headline--active"
                : "nav-headline nav-headline--generative"
            }
          >
            Generative
          </h2>
        </button>

        <button
          className={
            activeCat === "design"
              ? "mecha-nav__item mecha-nav__item--active"
              : "mecha-nav__item"
          }
          onClick={() => {
            if (isIpad) {
              fly(13, 30, 14, 210);
            } else {
              fly(13, 0, 14, 210);
            }
            liftCat("design");
            liftTitle("Mechaneyes === Ray Weitzenberg: Design");
          }}
        >
          <h2
            className={
              activeCat === "design"
                ? "nav-headline nav-headline--design nav-headline--active"
                : "nav-headline nav-headline--design"
            }
          >
            Design
          </h2>
        </button>

        <button
          className={
            activeCat === "about"
              ? "mecha-nav__item mecha-nav__item--active"
              : "mecha-nav__item"
          }
          onClick={() => {
            fly(28, 0, 15, 10);
            liftCat("about");
            liftTitle("Mechaneyes === Ray Weitzenberg: About");
          }}
        >
          <h2
            className={
              activeCat === "about"
                ? "nav-headline nav-headline--about nav-headline--active"
                : "nav-headline nav-headline--about"
            }
          >
            About
          </h2>
        </button>
      </nav>
    </>
  );
};

export default Nav;
