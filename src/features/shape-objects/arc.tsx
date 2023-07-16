import { Shape as KonvaShape, Line } from "react-konva";
import { LatexColour, ShapeProperties } from "../shape";

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 10;

// TODO: what unit is x and y??
export const ArcAFIDN: React.FC<ShapeProperties> = ({ x, y }) => {
  return (
    <KonvaShape
      stroke={LatexColour.BLACK}
      strokeWidth={4}
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(x, y);
        context.quadraticCurveTo(x + DEFAULT_WIDTH / 2, y - DEFAULT_HEIGHT * 2, x + DEFAULT_WIDTH, y);
        context.fillStrokeShape(shape);
      }}
    />
  );
};

export const ArcAFIDXC: React.FC<ShapeProperties> = ({ x, y, widthFactor, stroke }) => {
  // TODO (later): account for labels
  const defaultProps = {
    widthFactor: 1,
    stroke: [LatexColour.BLACK, LatexColour.BLACK],
  };

  if (!widthFactor) widthFactor = defaultProps.widthFactor;
  if (!stroke) stroke = defaultProps.stroke;
  const width = DEFAULT_WIDTH * widthFactor;
  const height = DEFAULT_HEIGHT;
  const leftLinePoints = [x + width * 0.1, y - 2, x + width * 0.1, y + 40];
  const rightLinePoints = [x + width * 0.9, y - 2, x + width * 0.9, y + 40];

  return (
    <>
      <Line points={leftLinePoints} stroke={stroke[0]} lineCap="round" />
      <Line points={rightLinePoints} stroke={stroke[1]} lineCap="round" />
      <KonvaShape
        width={width}
        height={height}
        stroke={LatexColour.BLACK}
        strokeWidth={4}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(x, y);
          context.quadraticCurveTo(x + width / 2, y - height * 2, x + width, y);
          context.fillStrokeShape(shape);
        }}
      />
    </>
  );
};

export const ArcAFIIDXC: React.FC<ShapeProperties> = ({ x, y, widthFactor, stroke }) => {
  // TODO (later): account for labels
  const defaultProps = {
    widthFactor: 1,
    stroke: [LatexColour.BLACK, LatexColour.BLACK],
  };

  if (!widthFactor) widthFactor = defaultProps.widthFactor;
  if (!stroke) stroke = defaultProps.stroke;
  const width = DEFAULT_WIDTH * widthFactor;
  const height = DEFAULT_HEIGHT;
  const leftLinePoints = [x + width * 0.1 - 2, y - 2, x + width * 0.1 - 2, y + 40];
  const leftLine2Points = [x + width * 0.1 + 2, y - 2, x + width * 0.1 + 2, y + 40];
  const rightLinePoints = [x + width * 0.9 - 2, y - 2, x + width * 0.9 - 2, y + 40];
  const rightLine2Points = [x + width * 0.9 + 2, y - 2, x + width * 0.9 + 2, y + 40];

  return (
    <>
      <Line points={leftLinePoints} stroke={stroke![0]} lineCap="round" />
      <Line points={rightLinePoints} stroke={stroke![1]} lineCap="round" />
      <Line points={leftLine2Points} stroke={stroke![0]} lineCap="round" />
      <Line points={rightLine2Points} stroke={stroke![1]} lineCap="round" />
      <KonvaShape
        width={width}
        height={height}
        stroke={LatexColour.BLACK}
        strokeWidth={4}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(x, y);
          context.quadraticCurveTo(x + width / 2, y - height * 2, x + width, y);
          context.fillStrokeShape(shape);
        }}
      />
    </>
  );
};
