import { getGridDim } from "../components/canvas/gridline/gridline";
import { DrawableShapeType, LabelPlacement, ShapeProperties } from "./shape";
import { isShapePropertiesKey } from "./type-util";

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
  const { type, gridX, gridY, variables, draw } = shape;

  let shapeSyntax: string = type;
  if (draw) {
    switch (draw.type) {
      case DrawableShapeType.TWO_VERTEX:
        const leadingToRight = draw.start!.y > draw.end!.y ? draw.start!.x < draw.end!.x : draw.start!.x > draw.end!.x;
        shapeSyntax = shapeSyntax.replace("$2", leadingToRight ? "r" : "l");
        break;
      case DrawableShapeType.ARC:
        const bendRight = draw.top!.x < draw.middle!.x;
        shapeSyntax = shapeSyntax.replace("$2", bendRight ? "r" : "l");
        break;
    }
  }

  const params = variables.reduce((accu, key) => {
    if (shape.draw) {
      if (key === "width") {
        let width: number;
        switch (shape.draw.type) {
          case DrawableShapeType.TWO_VERTEX:
            width = getGridDim(Math.abs(shape.draw.end!.x - shape.draw.start!.x));
            break;
          case DrawableShapeType.ARC:
            width = getGridDim(Math.abs(shape.draw.top!.x - shape.draw.middle!.x) * 2);
            break;
          case DrawableShapeType.RECT:
            width = getGridDim(Math.abs(shape.draw.p2!.x - shape.draw.p1!.x));
            break;
          default:
            throw new Error("Invalid drawable shape type");
        }
        return accu + `{${roundTo1dp(width)}}`;
      } else if (key === "length") {
        let length: number;
        switch (shape.draw.type) {
          case DrawableShapeType.TWO_VERTEX:
            length = getGridDim(Math.abs(shape.draw.end!.y - shape.draw.start!.y));
            break;
          case DrawableShapeType.ARC:
            length = getGridDim(Math.abs(shape.draw.top!.y - shape.draw.bottom!.y));
            break;
          case DrawableShapeType.RECT:
            length = getGridDim(Math.abs(shape.draw.p3!.y - shape.draw.p1!.y));
            break;
          default:
            throw new Error("Invalid drawable shape type");
        }
        return accu + `{${roundTo1dp(length)}}`;
      }
    }

    if (!isShapePropertiesKey(key)) throw new Error("");

    if (/^label[0-9]$/.test(key)) {
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
