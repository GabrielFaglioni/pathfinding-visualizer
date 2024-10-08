import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useSpeed } from "../hooks/useSpeed";
import { useTile } from "../hooks/useTile";
import { MAZES, PATHFINDING_ALGORITHMS, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/helpers";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";

export default function Nav({
  isVisualizationRunningRef
}: {
  isVisualizationRunningRef: MutableRefObject<boolean>;
}): JSX.Element {
  const [isDisabled, setIsDisabled] = useState(false);
  console.log("isVisualizationRunningRef: ", isVisualizationRunningRef);
  const { maze, setMaze, algorithm, setAlgorithm, grid } = usePathfinding();
  const { startTile, endTile } = useTile();
  const { speed, setSpeed } = useSpeed();

  const handleGenerateMaze = async (maze: MazeType): Promise<void> => {
    if (maze === "NONE") {
      setMaze(maze);
      resetGrid({ grid, startTile, endTile });
      return;
    }

    setMaze(maze);
    setIsDisabled(true);
    await runMazeAlgorithm({
      maze,
      grid,
      startTile,
      endTile,
      setIsDisabled,
      speed
    });
    setIsDisabled(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">Pathfinding Visualizer</h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            isDisabled={isDisabled}
            onChange={(e): void => {
              handleGenerateMaze(e.target.value as MazeType);
            }}
          />
          <Select
            label="Graph"
            value={algorithm}
            isDisabled={isDisabled}
            options={PATHFINDING_ALGORITHMS}
            onChange={(e): void => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          />
          <Select
            label="Speed"
            value={speed}
            options={SPEEDS}
            isDisabled={isDisabled}
            onChange={(e): void => {
              setSpeed(parseInt(e.target.value) as SpeedType);
            }}
          />
        </div>
      </div>
    </div>
  );
}
