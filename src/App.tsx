import "./App.css";
import { Grid } from "./components/Grid";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";

function App(): JSX.Element {
  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <h1>Pathfinding Visualizer</h1>
          <Grid />
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;
