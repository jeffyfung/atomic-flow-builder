import { Coordinates, DrawableShapeType, ShapeProperties } from "../../../../features/shape";
import { getGridCoordinate } from "../../../canvas/gridline";

export * from "./straight-line";
export * from "./curves";
export * from "./arcs";

const computeDimension2V = (shape: ShapeProperties, displacedV: Coordinates, fixedV: Coordinates): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
  const variableWidth = shape.variables.includes("width");
  const variableLength = shape.variables.includes("length");

  const newX = variableWidth ? (fixedV.x + displacedV.x) / 2 : displacedV.x;
  const newY = variableLength ? (fixedV.y + displacedV.y) / 2 : displacedV.y;
  const { gridX: newGridX, gridY: newGridY } = getGridCoordinate(newX, newY);

  return {
    x: newX,
    y: newY,
    gridX: newGridX,
    gridY: newGridY,
    draw: {
      type: DrawableShapeType.TWO_VERTEX,
      preview: true,
      start: {
        x: variableWidth ? fixedV.x : displacedV.x,
        y: variableLength ? fixedV.y : displacedV.y,
        gridX: variableWidth ? fixedV.gridX : displacedV.gridX,
        gridY: variableLength ? fixedV.gridY : displacedV.gridY,
      },
      end: displacedV,
    },
  };
};

// TODO:
const computeDimensionArc = (): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
  throw new Error("not implemented");
};

export const computeDimension: Record<DrawableShapeType, (...args: Parameters<typeof computeDimension2V>) => Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">> = {
  [DrawableShapeType.TWO_VERTEX]: computeDimension2V,
  [DrawableShapeType.ARC]: computeDimensionArc,
};
