import { END_TILE_CONFIGURATION, MAX_COLS, MAX_ROWS, START_TILE_CONFIGURATION, TILE_STYLE } from "./constants";
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

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve): number => setTimeout(resolve, ms));
};

export const isEqual = (a: TileType, b: TileType): boolean => {
  return a.row === b.row && a.col === b.col;
};

export const isRowColEqual = (row: number, col: number, tile: TileType): boolean => {
  return row === tile.row && col === tile.col;
};

export const checkIfStartOrEnd = (row: number, col: number): boolean => {
  return (row === 1 && col === 1) || (row === MAX_ROWS - 2 && col === MAX_COLS - 2);
};

export const createNewGrid = (grid: GridType, row: number, col: number): TileType[][] => {
  const newGrid = grid.slice();
  const newTile = {
    ...newGrid[row][col],
    isWall: !newGrid[row][col].isWall
  };

  newGrid[row][col] = newTile;
  return newGrid;
};

export const resetGrid = ({
  grid,
  startTile = START_TILE_CONFIGURATION,
  endTile = END_TILE_CONFIGURATION
}: {
  grid: GridType;
  startTile?: TileType;
  endTile?: TileType;
}): void => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const tile = grid[row][col];
      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;
      tile.isWall = false;

      if (!isEqual(startTile, tile) && !isEqual(endTile, tile)) {
        const tileElement = document.getElementById(`${tile.row}-${tile.col}`);

        if (tileElement) {
          tileElement.className = TILE_STYLE;
        }

        if (tile.row === MAX_ROWS - 1) {
          tileElement?.classList.add("border-b");
        }

        if (tile.col === 0) {
          tileElement?.classList.add("border-l");
        }
      }
    }
  }
};

export const getRandInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
