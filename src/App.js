import MapOne from "./views/MapOne/MapOne";
import MapMobile from "./views/MapMobile/MapMobile";
import useWindowDimensions from "./utils/windowDimensions";

function App() {
  const { height, width } = useWindowDimensions();

  if (width < 768) {
    return (
      <div className="App">
        {/* <MapMobile /> */}
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
