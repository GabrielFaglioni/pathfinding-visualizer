import { useRef } from "react";
import "./App.css";
import { Grid } from "./components/Grid";
import Nav from "./components/Nav";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";

function App(): JSX.Element {
  const isVisualizationRunningRef = useRef(false);
  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <Nav isVisualizationRunningRef={isVisualizationRunningRef} />
          <Grid isVisualizationRunningRef={isVisualizationRunningRef} />
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;
