import { Shape as KonvaShape, Line, RegularPolygon } from "react-konva";
import { ShapeProperties } from "../shape";

// for both hollow and solid wedge

const DEFAULT_SIDE_LENGTH = 15;

// afwun / afaun - is there a difference???
// afwuc - labels, color
// afWuc - labels, color
// afauc - labels, color
// afAuc - labels, color
// afcuc - labels, color
// afcunc - labels, color
// afCuc - labels, color
// afCunc - labels, color

export const WedgeAFWUN: React.FC<ShapeProperties> = ({ x, y, fill }) => {
  return <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_SIDE_LENGTH} stroke="black" strokeWidth={5} />;
};

{
  /* <KonvaShape
        width={width}
        height={height}
        stroke="black"
        strokeWidth={4}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(x, y);
          context.quadraticCurveTo(x + width / 2, y - height * 2, x + width, y);
          context.fillStrokeShape(shape);
        }}
      /> */
}
