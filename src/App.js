import ReactGA from 'react-ga';
import MapOne from "./views/MapOne/MapOne";

const trackingId = "G-B11K2476V9"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.set({
  username: localStorage.getItem('userName'),
  // Other relevant user information
})

function App() {
  if (window.innerWidth < 768) {
    return (
      <div className="App">
        <MapOne />
      </div>
    );
  } else {
    return (
      <div className="App">
        <MapOne />
      </div>
    );
  }
}

export default App;
