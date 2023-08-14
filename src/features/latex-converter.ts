import { getGridDim } from "../components/canvas/gridline";
import { LabelPlacement, ShapeProperties } from "./shape";

const roundTo1dp = (val: number): number => {
  return Math.round(val * 10) / 10;
};

export const convertGraphToLatex = (shapes: ShapeProperties[], compact: boolean = false): string => {
  const body = shapes.reduce((prev, curr) => {
    const latex = convertShapeToLatex(curr);
    return (prev += latex + (compact ? "" : "\n"));
  }, "");

  return `\\af{${compact ? "" : "\n"}${body}}`;
};

export const convertShapeToLatex = (shape: ShapeProperties): string => {
  const { type, gridX, gridY, variables } = shape;

  let shapeSyntax: string = type;

  const params = variables.reduce((accu, key) => {
    if (key === "width") {
      const width = getGridDim(Math.abs(shape.draw!.end!.x - shape.draw!.start!.x));
      accu += `{${roundTo1dp(width)}}`;
    } else if (key === "length") {
      const length = getGridDim(Math.abs(shape.draw!.end!.y - shape.draw!.start!.y));
      accu += `{${roundTo1dp(length)}}`;
    } else if (/^label[0-9]$/.test(key)) {
      accu += `{${shape[key]}}`;
    } else if (key === "widthFactor") {
      const widthFactor = shape[key];
      accu += `{${Math.round(widthFactor! * 10)}}{10}`;
    } else if (/^stroke[0-9]$/.test(key)) {
      accu += `{${shape[key]}}`;
    } else if (key === "labelPlacement") {
      shapeSyntax = shapeSyntax.replace("$1", shape[key] === LabelPlacement.HIGH ? "d" : "u");
    }

    return accu;
  }, "");

  return `(${roundTo1dp(gridX)}, ${roundTo1dp(gridY)})*{\\${shapeSyntax} ${params}};`;
};
