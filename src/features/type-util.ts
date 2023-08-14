import { ShapeProperties } from "./shape";

export const isShapePropertiesKey = (val: keyof ShapeProperties | "length" | "width"): val is keyof ShapeProperties => {
  return val !== "length" && val !== "width";
};
