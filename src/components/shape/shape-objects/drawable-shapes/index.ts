import { ShapeProperties } from "../../../../features/shape";
import { SNAP_GRID_THRESHOLD } from "../../../canvas/canvas";
import { getGridCoordinate, getGridDim, getStageCoordinate } from "../../../canvas/gridline";

export * from "./straight-line";

const computeDimension2V = (displacedV: { x: number; y: number }, existingV: { x: number; y: number; gridX: number; gridY: number }): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
  const newX = (existingV.x + displacedV.x) / 2;
  const newY = (existingV.y + displacedV.y) / 2;
  const { gridX: newGridX, gridY: newGridY } = getGridCoordinate(newX, newY);
  // const length = getGridDim(Math.abs(existingV.y - displacedV.y));
  // const width = getGridDim(Math.abs(existingV.x - displacedV.x));
  const { gridX: displacedVGridX, gridY: displacedVGridY } = getGridCoordinate(displacedV.x, displacedV.y);

  return {
    x: newX,
    y: newY,
    gridX: newGridX,
    gridY: newGridY,
    draw: {
      start: existingV,
      end: {
        ...displacedV,
        gridX: displacedVGridX,
        gridY: displacedVGridY,
      },
      // length,
      // width,
    },
  };
};

export const computeDimension = {
  "2V": computeDimension2V,
};

export const computeNearestSnap = (x: number, y: number): { x: number; y: number; gridX: number; gridY: number } | null => {
  const { gridX, gridY } = getGridCoordinate(x, y);
  const nearestSnapGridX = Math.round(gridX);
  const nearestSnapGridY = Math.round(gridY);
  if (Math.abs(nearestSnapGridX - gridX) < SNAP_GRID_THRESHOLD && Math.abs(nearestSnapGridY - gridY) < SNAP_GRID_THRESHOLD) {
    const { stageX: x, stageY: y } = getStageCoordinate(nearestSnapGridX, nearestSnapGridY);
    return { x, y, gridX: nearestSnapGridX, gridY: nearestSnapGridY };
  } else {
    return null;
  }
};
