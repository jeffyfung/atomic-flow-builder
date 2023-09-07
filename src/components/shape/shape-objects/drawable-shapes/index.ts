import { Coordinates, DrawableShapeType, ShapeProperties } from "../../../../features/shape";
import { getGridCoordinate } from "../../../canvas/gridline/gridline";

export * from "./straight-line";
export * from "./curves";
export * from "./arcs";
export * from "./boxes";

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
      end: {
        x: displacedV.x,
        y: displacedV.y,
        gridX: displacedV.gridX,
        gridY: displacedV.gridY,
      },
    },
  };
};

export const computeDimensionArc = (displacedV: [string, Coordinates], allVs: Record<string, Coordinates>): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
  const displacedVName = displacedV[0];
  let { top, middle, bottom } = allVs;
  const { x, gridX } = displacedV[1];
  if (displacedVName === "middle") {
    middle = { ...middle, x, gridX };
  } else {
    if (displacedVName === "top") {
      middle = { ...middle, y: (displacedV[1].y + bottom.y) / 2, gridY: (displacedV[1].gridY + bottom.gridY) / 2 };
      top = displacedV[1];
      bottom = { ...bottom, x, gridX };
    } else {
      middle = { ...middle, y: (displacedV[1].y + top.y) / 2, gridY: (displacedV[1].gridY + top.gridY) / 2 };
      bottom = displacedV[1];
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

export const computeDimensionRect = (displacedV: [string, Coordinates], allVs: Record<string, Coordinates>): Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw"> => {
  const displacedVName = displacedV[0];
  let { p1, p2, p3, p4 } = allVs;
  const { x, y, gridX, gridY } = displacedV[1];
  switch (displacedVName) {
    case "p1":
      p1 = displacedV[1];
      p2 = { ...p2, y, gridY };
      p3 = { ...p3, x, gridX };
      break;
    case "p2":
      p2 = displacedV[1];
      p1 = { ...p1, y, gridY };
      p4 = { ...p4, x, gridX };
      break;
    case "p3":
      p3 = displacedV[1];
      p1 = { ...p1, x, gridX };
      p4 = { ...p4, y, gridY };
      break;
    case "p4":
      p4 = displacedV[1];
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
