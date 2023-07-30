import { ShapeProperties } from "./shape";

export const latexConverter = (shapes: ShapeProperties[]) => {
  let body = "";
  shapes.forEach((shape) => {
    const { type, x, y, variables } = shape;
    // TODO: need to convert coordinates

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
    const latex = `(${x}, ${y})*{\\${type} ${params}};`;
    body += latex + "\n";
  });

  return `\\af{\n${body}}`;
};