import { ShapeProperties } from "./shape";

export const isShapePropertiesKey = (val: keyof ShapeProperties | "length" | "width"): val is keyof ShapeProperties => {
  return val !== "length" && val !== "width";
};

export const isArcVertexName = (val: string): val is "top" | "middle" | "bottom" => {
  return ["top", "middle", "bottom"].includes(val);
};

export const isRectVertexName = (val: string): val is "p1" | "p2" | "p3" | "p4" => {
  return ["p1", "p2", "p3", "p4"].includes(val);
};
