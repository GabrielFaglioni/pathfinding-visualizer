import { SPEEDS, TILE_STYLE } from "./constants";
import { sleep } from "./helpers";
import { GridType, SpeedType } from "./types";

export const destroyWall = async (
  grid: GridType,
  row: number,
  col: number,
  isRight: number,
  speed: SpeedType
): Promise<void> => {
  const animationSpeed = 20 * SPEEDS.find((s): boolean => s.value === speed)!.value - 5;

  if (isRight && grid[row][col + 1]) {
    grid[row][col + 1].isWall = false;
    document.getElementById(`${row}-${col + 1}`)!.className = TILE_STYLE;
    await sleep(animationSpeed);
  } else if (grid[row + 1]) {
    grid[row + 1][col].isWall = false;
    document.getElementById(`${row + 1}-${col}`)!.className = TILE_STYLE;
    await sleep(animationSpeed);
  } else {
    grid[row][col].isWall = false;
    document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
    await sleep(animationSpeed);
  }
};
