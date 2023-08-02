import { Group, Shape as KonvaShape, Line, RegularPolygon, Transformer } from "react-konva";
import { LatexColour, ShapeProperties } from "../shape";
import { ShapeProps } from "../../components/shape/shape";
import { useEffect, useRef } from "react";
import Konva from "konva";
import { GraphLabel } from "./graph-label";

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

export const WedgeAFWUN: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill } = shape;
  const shapeRef = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const halfSideLength = (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const halfOppoSideLength = DEFAULT_RADIUS * 0.5;
  const borderBox = {
    x: -halfSideLength,
    y: -DEFAULT_RADIUS,
    width: halfSideLength * 2,
    height: halfOppoSideLength + halfSideLength,
  };

  useEffect(() => {
    if (selected) {
      shapeRef.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <RegularPolygon
        ref={shapeRef}
        x={x}
        y={y}
        fill={fill}
        sides={3}
        radius={DEFAULT_RADIUS}
        stroke={LatexColour.BLACK} //
        strokeWidth={4}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      />
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFWUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const points = [0, -DEFAULT_RADIUS, 0, -DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={points} stroke={stroke1} lineCap="round" />
        <RegularPolygon ref={shapeRef2} x={0} y={0} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={-40} text={label1} />}
        {label2 && <GraphLabel x={5} y={-40} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFWWUC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, stroke1, fill } = shape;
  const offset = 2;
  const line1Points = [x - offset, y - DEFAULT_RADIUS, x - offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];
  const line2Points = [x + offset, y - DEFAULT_RADIUS, x + offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Line points={line1Points} stroke={stroke1} lineCap="round" />
      <Line points={line2Points} stroke={stroke1} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};

export const WedgeAFAUC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, stroke1, fill } = shape;
  const points = [x, y + 0.5 * DEFAULT_RADIUS, x, y + 0.5 * DEFAULT_RADIUS + DEFAULT_STROKE_LENGTH];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Line points={points} stroke={stroke1} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};

export const WedgeAFAAUC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, stroke1, fill } = shape;
  const offset = 2;
  const line1Points = [x - offset, y + 0.5 * DEFAULT_RADIUS, x - offset, y + 0.5 * DEFAULT_RADIUS + DEFAULT_STROKE_LENGTH];
  const line2Points = [x + offset, y + 0.5 * DEFAULT_RADIUS, x + offset, y + 0.5 * DEFAULT_RADIUS + DEFAULT_STROKE_LENGTH];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Line points={line1Points} stroke={stroke1} lineCap="round" />
      <Line points={line2Points} stroke={stroke1} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};

export const WedgeAFCUC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, stroke1, stroke2, stroke3, fill } = shape;
  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const line3Points = [x, y - DEFAULT_RADIUS, x, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <KonvaShape
        stroke={stroke1}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0], bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke2}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0], bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <Line points={line3Points} stroke={stroke3} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};

export const WedgeAFCUNC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, stroke1, stroke2, fill } = shape;
  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <KonvaShape
        stroke={stroke1}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0], bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke2}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0], bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};

export const WedgeAFCCUC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, stroke1, stroke2, stroke3, fill } = shape;

  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const offset = 2;
  const line3aPoints = [x + offset, y - DEFAULT_RADIUS, x + offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];
  const line3bPoints = [x - offset, y - DEFAULT_RADIUS, x - offset, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <KonvaShape
        stroke={stroke1}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] + offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke1}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] - offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke2}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] + offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke2}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] - offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <Line points={line3aPoints} stroke={stroke3} lineCap="round" />
      <Line points={line3bPoints} stroke={stroke3} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};

export const WedgeAFCCUNC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, stroke1, stroke2, fill } = shape;
  const arcWidth = DEFAULT_WIDTH * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const offset = 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <KonvaShape
        stroke={stroke1}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] + offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth + offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke1}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomLeftCorner[0] - offset, bottomLeftCorner[1]);
          context.quadraticCurveTo(bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomLeftCorner[0] - arcWidth - offset, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke2}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] + offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth + offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <KonvaShape
        stroke={stroke2}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(bottomRightCorner[0] - offset, bottomRightCorner[1]);
          context.quadraticCurveTo(bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT / 3, bottomRightCorner[0] + arcWidth - offset, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT);
          context.fillStrokeShape(shape);
        }}
      />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};

export const WedgeAFCUXC: React.FC<ShapeProps> = ({ shape, shapeId, onClick, handleMouseEnter, handleMouseLeave }) => {
  const { x, y, widthFactor, stroke1, stroke2, stroke3, fill } = shape;
  const arcWidth = DEFAULT_WIDTH * widthFactor! * 0.5 - (Math.sqrt(3) * DEFAULT_RADIUS) / 2;
  const bottomLeftCorner = [x - (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const bottomRightCorner = [x + (Math.sqrt(3) * DEFAULT_RADIUS) / 2, y + 0.5 * DEFAULT_RADIUS];
  const line1Points = [bottomLeftCorner[0], bottomLeftCorner[1], bottomLeftCorner[0] - arcWidth * 0.2, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.2, bottomLeftCorner[0] - arcWidth * 0.8, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.5, bottomLeftCorner[0] - arcWidth, bottomLeftCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT];
  const line2Points = [bottomRightCorner[0], bottomRightCorner[1], bottomRightCorner[0] + arcWidth * 0.2, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.2, bottomRightCorner[0] + arcWidth * 0.8, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT * 0.5, bottomRightCorner[0] + arcWidth, bottomRightCorner[1] + DEFAULT_ARC_Y_DISPLACEMENT];
  const line3Points = [x, y - DEFAULT_RADIUS, x, y - DEFAULT_RADIUS - DEFAULT_STROKE_LENGTH];

  return (
    <Group onClick={(event) => onClick(event, shapeId)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Line points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
      <Line points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
      <Line points={line3Points} stroke={stroke3} lineCap="round" />
      <RegularPolygon x={x} y={y} fill={fill} sides={3} radius={DEFAULT_RADIUS} stroke={LatexColour.BLACK} strokeWidth={4} />
    </Group>
  );
};
