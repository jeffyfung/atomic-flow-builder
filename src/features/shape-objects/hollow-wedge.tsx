import { Shape as KonvaShape, Line, RegularPolygon } from "react-konva";
import { ShapeProperties } from "../shape";

// for both hollow and solid wedge

// afcuxc - replace afcuc? (with width factor)
// afcunxc - replace ...?
// afccuxc - replace ...?
// afccunxc - replace ...?

// taller versions of above??

const DEFAULT_RADIUS = 20;
const DEFAULT_STROKE_LENGTH = 30;
const DEFAULT_WIDTH = 50;
const DEFAULT_ARC_Y_DISPLACEMENT = 30;

export const WedgeAFWUN: React.FC<ShapeProperties> = ({ x, y, fill }) => {
  return <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />;
};

export const WedgeAFWUC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const points = [x, y - DEFAULT_RADIUS, x, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <>
      <Line points={points} stroke={stroke[0]} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFWWUC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const offset = 2;
  const line1Points = [x - offset, y - DEFAULT_RADIUS, x - offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];
  const line2Points = [x + offset, y - DEFAULT_RADIUS, x + offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <>
      <Line points={line1Points} stroke={stroke[0]} lineCap="round" />
      <Line points={line2Points} stroke={stroke[0]} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFAUC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const points = [x, y + 0.5 * DEFAULT_RADIUS, x, y + 0.5 * DEFAULT_RADIUS + DEFAULT_STROKE_LENGTH];

  return (
    <>
      <Line points={points} stroke={stroke[0]} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFAAUC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const offset = 2;
  const line1Points = [x - offset, y + 0.5 * DEFAULT_RADIUS, x - offset, y + 0.5 * DEFAULT_RADIUS + DEFAULT_STROKE_LENGTH];
  const line2Points = [x + offset, y + 0.5 * DEFAULT_RADIUS, x + offset, y + 0.5 * DEFAULT_RADIUS + DEFAULT_STROKE_LENGTH];

  return (
    <>
      <Line points={line1Points} stroke={stroke[0]} lineCap="round" />
      <Line points={line2Points} stroke={stroke[0]} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFCUC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black", "black", "black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const line3Points = [x, y - DEFAULT_RADIUS, x, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <>
      <KonvaShape
        stroke={stroke[0]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0], bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[1]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0], bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <Line points={line3Points} stroke={stroke[2]} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFCUNC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black", "black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];

  return (
    <>
      <KonvaShape
        stroke={stroke[0]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0], bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[1]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0], bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFCCUC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black", "black", "black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const offset = 2;
  const line3aPoints = [x + offset, y - DEFAULT_RADIUS, x + offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];
  const line3bPoints = [x - offset, y - DEFAULT_RADIUS, x - offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <>
      <KonvaShape
        stroke={stroke[0]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] + offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[0]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] - offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[1]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] + offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[1]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] - offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <Line points={line3aPoints} stroke={stroke[2]} lineCap="round" />
      <Line points={line3bPoints} stroke={stroke[2]} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFCCUNC: React.FC<ShapeProperties> = ({ x, y, fill, stroke }) => {
  const defaultProps = {
    stroke: ["black", "black"],
  };

  if (!stroke) stroke = defaultProps.stroke;
  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const offset = 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];

  return (
    <>
      <KonvaShape
        stroke={stroke[0]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] + offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[0]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] - offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[1]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] + offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke[1]}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] - offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
};

export const WedgeAFCUXC: React.FC<ShapeProperties> = ({ x, y, fill, stroke, widthFactor }) => {
  const defaultProps = {
    widthFactor: 2,
    stroke: ["black", "black", "black"],
  };

  if (!widthFactor) widthFactor = defaultProps.widthFactor;
  if (!stroke) stroke = defaultProps.stroke;
  const arcWidth = DEFAULT_WIDTH * widthFactor * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const line1Points = [bottomLeftCorner[0], bottomLeftCorner[1], bottomLeftCorner[0] - arcWidth * 0.2, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.2, bottomLeftCorner[0] - arcWidth * 0.8, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.5, bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT];
  const line2Points = [bottomRightCorner[0], bottomRightCorner[1], bottomRightCorner[0] + arcWidth * 0.2, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.2, bottomRightCorner[0] + arcWidth * 0.8, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.5, bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT];
  const line3Points = [x, y - DEFAULT_RADIUS, x, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <>
      <Line points={line1Points} stroke={stroke[0]} lineCap="round" tension={0.5} />
      <Line points={line2Points} stroke={stroke[1]} lineCap="round" tension={0.5} />
      <Line points={line3Points} stroke={stroke[2]} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke="black" strokeWidth={4} />
    </>
  );
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
