import { useContext } from "react";
import { PathfindingContext, PathfindingContextInterface } from "../context/PathfindingContext";

export const usePathfinding = (): PathfindingContextInterface => {
  const context = useContext(PathfindingContext);

  if (context === undefined) {
    throw new Error("usePathfinding must be used within a PathfindingProvider");
  }

  return context;
};
