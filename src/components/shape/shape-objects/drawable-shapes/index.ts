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

export const computeDimensionRect = (displacedV: Record<string, Coordinates>, allVs: Record<string, Coordinates>): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
  const displacedVName = Object.keys(displacedV)[0];
  let { p1, p2, p3, p4 } = allVs;
  const { x, y, gridX, gridY } = displacedV[displacedVName];
  switch (displacedVName) {
    case "p1":
      p1 = displacedV[displacedVName];
      p2 = { ...p2, y, gridY };
      p3 = { ...p3, x, gridX };
      break;
    case "p2":
      p2 = displacedV[displacedVName];
      p1 = { ...p1, y, gridY };
      p4 = { ...p4, x, gridX };
      break;
    case "p3":
      p3 = displacedV[displacedVName];
      p1 = { ...p1, x, gridX };
      p4 = { ...p4, y, gridY };
      break;
    case "p4":
      p4 = displacedV[displacedVName];
      p2 = { ...p2, x, gridX };
      p3 = { ...p3, y, gridY };
      break;
  }

  const newX = (p1.x + p2.x) / 2;
  const newY = (p1.y + p3.y) / 2;
  const { gridX: newGridX, gridY: newGridY } = getGridCoordinate(newX, newY);

  return {
    x: newX,
    y: newY,
    gridX: newGridX,
    gridY: newGridY,
    draw: {
      type: DrawableShapeType.RECT,
      preview: true,
      p1,
      p2,
      p3,
      p4,
    },
  };
};

// TODO: type this properly, or split it into 2 separate functions
// export const computeDimension: Record<DrawableShapeType, (...args: any) => Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">> = {
//   [DrawableShapeType.TWO_VERTEX]: computeDimension2V,
//   [DrawableShapeType.ARC]: computeDimensionArc,
// };
