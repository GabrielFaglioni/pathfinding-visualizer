import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";

export function Grid(): JSX.Element {
  const { grid } = usePathfinding();

  return (
    <div
      className={twMerge(
        // Base classes
        "flex items-center flex-col justify-center border-sky-300 mt-10",
        // Control Grid height
        `lg:min-h-[${MAX_ROWS * 17}px]  md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${
          MAX_ROWS * 7
        }px]`,
        // Controlling grid width
        `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${MAX_COLS * 8}px] w-[${MAX_COLS * 7}px]`
      )}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((tile, _) => {
            // const { row, col, isEnd, isStart, isPath, isTraversed, isWall } = tile;
            return <div className="bg-white h-2 w-2 border" />;
          })}
        </div>
      ))}
    </div>
  );
}
