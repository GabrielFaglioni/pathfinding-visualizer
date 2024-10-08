import { useContext } from "react";
import { TileContext, TileContextInterface } from "../context/TileContext";

export const useTile = (): TileContextInterface => {
  const context = useContext(TileContext);

  if (context === undefined) {
    throw new Error("useTile must be used within a TileProvider");
  }

  return context;
};
