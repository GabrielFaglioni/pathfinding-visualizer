import { SPEEDS, WALL_TILE_STYLE } from "../../../utils/constants";
import { getRandInt, isEqual, sleep } from "../../../utils/helpers";
import { GridType, SpeedType, TileType } from "../../../utils/types";
import recursiveDivision from "./recursiveDivision";

export async function verticalDivision({
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
  const makeWallAtCol = col + getRandInt(0, width - 1) * 2 + 1;
  const makePassageAtRow = row + getRandInt(0, height) * 2;

  const animationSpeed = 10 * SPEEDS.find((s): boolean => s.value === speed)!.value - 5;

  for (let i = 0; i < 2 * height - 1; i += 1) {
    //. Create the vertical wall
    if (makePassageAtRow !== row + i) {
      const isStartTile = isEqual(grid[row + i][makeWallAtCol], startTile);
      const isEndTile = isEqual(grid[row + i][makeWallAtCol], endTile);

      if (!isStartTile && !isEndTile) {
        grid[row + i][makeWallAtCol].isWall = true; //. Set the current tile as a wall

        document.getElementById(`${row + i}-${makeWallAtCol}`)!.className = `${WALL_TILE_STYLE} animate-wall`; //. Add wall style and animation
        await sleep(animationSpeed);
      }
    }
  }

  //. Recursively divide the sections to the left and right of the wall
  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width: (makeWallAtCol - col + 1) / 2,
    setIsDisabled,
    speed
  });

  await recursiveDivision({
    grid,
    startTile,
    endTile,
    row,
    col: makeWallAtCol + 1,
    height,
    width: width - (makeWallAtCol - col + 1) / 2,
    setIsDisabled,
    speed
  });
}
