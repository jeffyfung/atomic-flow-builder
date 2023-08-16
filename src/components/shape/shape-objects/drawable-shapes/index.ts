import { Coordinates, DrawableShapeType, ShapeProperties } from "../../../../features/shape";
import { getGridCoordinate } from "../../../canvas/gridline";

export * from "./straight-line";
export * from "./curves";
export * from "./arcs";

export const computeDimension2V = (shape: ShapeProperties, displacedV: Coordinates, fixedV: Coordinates): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
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

export const computeDimensionArc = (displacedV: Record<string, Coordinates>, allVs: Record<string, Coordinates>): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
  const displacedVName = Object.keys(displacedV)[0];
  let { top, middle, bottom } = allVs;
  const { x, gridX } = displacedV[displacedVName];
  if (displacedVName === "middle") {
    middle = { ...middle, x, gridX };
  } else {
    if (displacedVName === "top") {
      middle = { ...middle, y: (displacedV[displacedVName].y + bottom.y) / 2, gridY: (displacedV[displacedVName].gridY + bottom.gridY) / 2 };
      top = displacedV[displacedVName];
      bottom = { ...bottom, x, gridX };
    } else {
      middle = { ...middle, y: (displacedV[displacedVName].y + top.y) / 2, gridY: (displacedV[displacedVName].gridY + top.gridY) / 2 };
      bottom = displacedV[displacedVName];
      top = { ...top, x, gridX };
    }
  }

  const newX = top.x;
  const newY = (top.y + bottom.y) / 2;
  const { gridX: newGridX, gridY: newGridY } = getGridCoordinate(newX, newY);

  return {
    x: newX,
    y: newY,
    gridX: newGridX,
    gridY: newGridY,
    draw: {
      type: DrawableShapeType.ARC,
      preview: true,
      top,
      bottom,
      middle,
    },
  };
};

// TODO: type this properly, or split it into 2 separate functions
// export const computeDimension: Record<DrawableShapeType, (...args: any) => Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">> = {
//   [DrawableShapeType.TWO_VERTEX]: computeDimension2V,
//   [DrawableShapeType.ARC]: computeDimensionArc,
// };
