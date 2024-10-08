import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

export const createGrid = (startTile: TileType, endTile: TileType): GridType => {
  const grid: GridType = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    grid.push(createRow(row, startTile, endTile));
  }

  return grid;
};

export const createRow = (row: number, startTile: TileType, endTile: TileType): TileType[] => {
  const currentRow: TileType[] = [];
  for (let col = 0; col < MAX_COLS; col++) {
    const tile: TileType = {
      row,
      col,
      isEnd: col === endTile.col && row === endTile.row,
      isStart: col === startTile.col && row === startTile.row,
      isWall: false,
      isPath: false,
      isTraversed: false,
      distance: Infinity,
      parent: null
    };

    currentRow.push(tile);
  }

  return currentRow;
};
