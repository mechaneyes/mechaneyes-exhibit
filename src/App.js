import ReactGA from 'react-ga';
import MapOne from "./views/MapOne/MapOne";
import { AboutProvider } from "./store/transition/transition.about.js";

const trackingId = "UA-237074365-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.set({
  username: localStorage.getItem('userName'),
  // Other relevant user information
})

function App() {
  if (window.innerWidth < 768) {
    return (
      <AboutProvider>
        <div className="App">
          <MapOne />
        </div>
      </AboutProvider>
    );
  } else {
    return (
      <AboutProvider>
        <div className="App">
          <MapOne />
        </div>
      </AboutProvider>
    );
  }
}

export default App;
