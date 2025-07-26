import { useEffect, useCallback, useRef, useContext, useState } from "react";
import ReactGA from "react-ga";
import AboutContext from "../../../store/transition/transition.about.js";
import "./NavMobile.scss";

let Nav = ({ map, liftCat, activeCat, liftTitle }) => {
  const { isHamburgerVisible, toggleHamburger } = useContext(AboutContext);
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  // ————————————————————————————————————o————————————————————————————————————o Check Intro Visibility -->
  // ———————————————————————————————————— Check Intro Visibility —>
  //
  useEffect(() => {
    const checkIntroVisibility = () => {
      const introCard = document.querySelector(".info-card--intro");
      const isVisible = !!introCard; // Element exists = visible, doesn't exist = not visible
      setIsIntroVisible(isVisible);
    };

    // Check initially
    checkIntroVisibility();

    // Set up observer to watch for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check if any elements were added or removed
        if (mutation.type === 'childList') {
          checkIntroVisibility();
        }
      });
    });

    // Observe the entire document body for changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  // ————————————————————————————————————o————————————————————————————————————o GA Tracking -->
  // ———————————————————————————————————— GA Tracking —>
  //
  const eventTrack = (category, action, label) => {
    console.log("GA event:", category, ":", action, ":", label);
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };

  // ————————————————————————————————————o————————————————————————————————————o Event Listener for Intro Button -->
  // ———————————————————————————————————— Event Listener for Intro Button —>
  //
  useEffect(() => {
    const handleToggleHamburger = () => {
      console.log("Custom event received, toggling hamburger");
      toggleHamburger();
    };

    window.addEventListener('toggleHamburger', handleToggleHamburger);

    return () => {
      window.removeEventListener('toggleHamburger', handleToggleHamburger);
    };
  }, [toggleHamburger]);

  // ————————————————————————————————————o————————————————————————————————————o scrollZoom -->
  // ———————————————————————————————————— scrollZoom —>
  //
  // Killed scrollZoom when sitting on 'mechaneyes' landing page.
  // Re-enabled when on other pages. Would have been too jarring
  // to start the experience completely lost
  //
  useEffect(() => {
    fetch("/data/mountains.geojson").then(() => {
      if (liftCat === "mechaneyes") {
        map.current.scrollZoom.disable();
      } else {
        map.current.scrollZoom.enable();
      }
    });
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

    if (isProgramming && window.innerWidth < 600) {
      zoom += 0.4;
      // console.log('isProgramming', isProgramming)``
    }
    fetch("/data/mobile.geojson")
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
  }, [map]);

  return (
    <>
      {!isIntroVisible && (
        <img
          className="hamburger-trigger"
          onClick={toggleHamburger}
          src="/images/hamburger-trigger.png"
          alt="hamburger-trigger"
        />
      )}
      <section
        className={isHamburgerVisible ? "hamburger" : "hamburger hamburger--hidden"}
        onClick={() => toggleHamburger()}
      >
        <nav className="mecha-nav mecha-nav--mob">
          <button
            className="mecha-nav__item mecha-nav__item--title"
            onClick={() => {
              fly(27, 0, 15, 10);
              liftCat("mechaneyes");
              liftTitle("Mechaneyes === Ray Weitzenberg");
              eventTrack("Mobile Nav", "Click", "Mechaneyes Nav");
            }}
          >
            <h2 className="nav-headline nav-headline--mechaneyes nav-headline--active">
              Mechaneyes
            </h2>
          </button>

          <button
            className="mecha-nav__item"
            onClick={() => {
              fly(0, 35, 13.3, 88);
              liftCat("photography");
              liftTitle("Mechaneyes === Ray Weitzenberg: Photography");
              eventTrack("Mobile Nav", "Click", "Photography Nav");
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
            className="mecha-nav__item"
            onClick={() => {
              fly(6, 0, 11.81, 130, true);
              liftCat("programming");
              liftTitle("Mechaneyes === Ray Weitzenberg: Programming");
              eventTrack("Mobile Nav", "Click", "Programming Nav");
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
            className="mecha-nav__item"
            onClick={() => {
              fly(18, 0, 13.3, 285);
              liftCat("generative");
              liftTitle("Mechaneyes === Ray Weitzenberg: Generative");
              eventTrack("Mobile Nav", "Click", "Generative Nav");
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
            className="mecha-nav__item"
            onClick={() => {
              fly(13, 0, 13.5, 275);
              liftCat("design");
              liftTitle("Mechaneyes === Ray Weitzenberg: Design");
              eventTrack("Mobile Nav", "Click", "Design Nav");
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
            className="mecha-nav__item"
            onClick={() => {
              fly(28, 0, 15, 10);
              liftCat("about");
              liftTitle("Mechaneyes === Ray Weitzenberg: About");
              eventTrack("Mobile Nav", "Click", "About Nav");
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
      </section>
    </>
  );
};

export default Nav;
