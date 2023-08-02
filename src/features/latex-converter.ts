import { ShapeProperties } from "./shape";

const roundTo1dp = (val: number): number => {
  return Math.round(val * 10) / 10;
};

export const convertShapeToLatex = (shapes: ShapeProperties[], compact: boolean = false) => {
  let body = "";
  shapes.forEach((shape) => {
    const { type, gridX, gridY, variables } = shape;

    const params = variables.reduce((accu, key) => {
      if (key.startsWith("label")) {
        accu += `{${shape[key]}}`;
      } else if (key === "widthFactor") {
        const widthFactor = shape[key];
        accu += `{${Math.round(widthFactor! * 10)}}{10}`;
      } else if (key.startsWith("stroke")) {
        accu += `{${shape[key]}}`;
      }
      return accu;
    }, "");
    const latex = `(${roundTo1dp(gridX)}, ${roundTo1dp(gridY)})*{\\${type} ${params}};`;
    body += latex + (compact ? "" : "\n");
  });

  return `\\af{${compact ? "" : "\n"}${body}}`;
};
