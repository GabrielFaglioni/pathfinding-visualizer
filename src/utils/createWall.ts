import { MAX_COLS, MAX_ROWS, SPEEDS, WALL_TILE_STYLE } from "./constants";
import { isRowColEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const createWall = (startTile: TileType, endTile: TileType, speed: SpeedType): void => {
  const animationSpeed = 6 * SPEEDS.find((s): boolean => s.value === speed)!.value - 1;

  for (let row = 0; row < MAX_ROWS; row++) {
    setTimeout((): void => {
      for (let col = 0; col < MAX_COLS; col++) {
        if (row % 2 === 0 || col % 2 === 0) {
          if (!isRowColEqual(row, col, startTile) && !isRowColEqual(row, col, endTile)) {
            setTimeout((): void => {
              document.getElementById(`${row}-${col}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
            }, animationSpeed * col);
          }
        }
      }
    }, animationSpeed * (MAX_ROWS / 2) * row);
  }
};
