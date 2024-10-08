import { SPEEDS, WALL_TILE_STYLE } from "../../../utils/constants";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";
import recursiveDivision from "./recursiveDivision";

export async function horizontalDivision({
  grid,
  startTile,
  endTile,
  row,
  col,
  height,
  width,
  setIsDisabled,
  speed
}: {
  grid: GridType;
  startTile: TileType;
  endTile: TileType;
  row: number;
  col: number;
  height: number;
  width: number;
  setIsDisabled: (disabled: boolean) => void;
  speed: SpeedType;
}): Promise<void> {
  const makeWallAtRow = row + getRandInt(0, height - 1) * 2 + 1;
  const makePassageAtCol = col + getRandInt(0, width) * 2;

  const animationSpeed = 10 * SPEEDS.find((s): boolean => s.value === speed)!.value - 5;

  for (let i = 0; i < 2 * width - 1; i += 1) {
    //. Create the horizontal wall
    if (makePassageAtCol !== col + i) {
      const isStartTile = isEqual(grid[makeWallAtRow][col + i], startTile);
      const isEndTile = isEqual(grid[makeWallAtRow][col + i], endTile);
      if (!isStartTile && !isEndTile) {
        grid[makeWallAtRow][col + i].isWall = true; //. Set the current tile as a wall

        document.getElementById(`${makeWallAtRow}-${col + i}`)!.className = `${WALL_TILE_STYLE} animate-wall`; // Add wall style and animation
        await sleep(animationSpeed);
      }
    }
  }

  // Recursively divide the sections above and below the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height: (makeWallAtRow - row + 1) / 2,
    width,
    setIsDisabled,
    speed
  });

  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row: makeWallAtRow + 1,
    col,
    height: height - (makeWallAtRow - row + 1) / 2,
    width,
    setIsDisabled,
    speed
  });
}
