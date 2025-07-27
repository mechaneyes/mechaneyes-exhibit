import MapOne from "./views/MapOne/MapOne";
import { AboutProvider } from "./store/transition/transition.about.js";

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
