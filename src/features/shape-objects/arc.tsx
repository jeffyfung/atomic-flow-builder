import { Group, Shape as KonvaShape, Line } from "react-konva";
import { LatexColour, ShapeProperties } from "../shape";
import { ShapeProps } from "../../components/shape/shape";

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 10;

// TODO: what unit is x and y??
export const ArcAFIDN: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y } = shape;
  return (
    <KonvaShape
      onClick={(event) => onClick(event, shapeId)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

export const ArcAFIDXC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  // TODO (later): account for labels
  const { x, y, widthFactor, stroke } = shape;
  const width = DEFAULT_WIDTH * widthFactor!;
  const height = DEFAULT_HEIGHT;
  const leftLinePoints = [x + width * 0.1, y - 2, x + width * 0.1, y + 40];
  const rightLinePoints = [x + width * 0.9, y - 2, x + width * 0.9, y + 40];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Line points={leftLinePoints} stroke={stroke![0]} lineCap="round" />
      <Line points={rightLinePoints} stroke={stroke![1]} lineCap="round" />
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
    </Group>
  );
};

export const ArcAFIIDXC: React.FC<ShapeProps> = ({ shape, onClick, shapeId, handleMouseEnter, handleMouseLeave }) => {
  // TODO (later): account for labels
  const { x, y, widthFactor, stroke } = shape;
  const width = DEFAULT_WIDTH * widthFactor!;
  const height = DEFAULT_HEIGHT;
  const leftLinePoints = [x + width * 0.1 - 2, y - 2, x + width * 0.1 - 2, y + 40];
  const leftLine2Points = [x + width * 0.1 + 2, y - 2, x + width * 0.1 + 2, y + 40];
  const rightLinePoints = [x + width * 0.9 - 2, y - 2, x + width * 0.9 - 2, y + 40];
  const rightLine2Points = [x + width * 0.9 + 2, y - 2, x + width * 0.9 + 2, y + 40];

  // TODO: add onClick
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
