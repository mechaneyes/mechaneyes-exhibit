import MapOne from "./views/MapOne/MapOne";

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
