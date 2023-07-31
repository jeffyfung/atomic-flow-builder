import { Group, Shape as KonvaShape, Line, Transformer } from "react-konva";
import { LatexColour } from "../shape";
import { ShapeProps } from "../../components/shape/shape";
import { useEffect, useRef } from "react";
import Konva from "konva";
import { GraphLabel } from "./graph-label";

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 10;

export const ArcAFIUN: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragEnd }) => {
  const { x, y } = shape;
  const shapeRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const borderBox = {
    x: 0,
    y: 0,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
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
      <KonvaShape
        ref={shapeRef}
        x={x}
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        stroke={LatexColour.BLACK}
        strokeWidth={4}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(0, 0);
          context.quadraticCurveTo(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT * 2, DEFAULT_WIDTH, 0);
          context.fillStrokeShape(shape);
          context.closePath();
        }}
        draggable
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      />
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const ArcAFIUXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragEnd }) => {
  const { x, y, widthFactor, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const width = DEFAULT_WIDTH * widthFactor!;
  const height = DEFAULT_HEIGHT;
  const leftLinePoints = [width * 0.1, 2, width * 0.1, -40];
  const rightLinePoints = [width * 0.9, 2, width * 0.9, -40];

  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const borderBox = {
    x: 0,
    y: 0,
    width: width,
    height: height,
  };

  useEffect(() => {
    if (selected) {
      shapeRef3.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, widthFactor]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={leftLinePoints} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={rightLinePoints} stroke={stroke2} lineCap="round" />
        <KonvaShape
          ref={shapeRef3}
          width={width}
          height={height}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(width / 2, height * 2, width, 0);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        {label1 && <GraphLabel x={width * 0.1 - 10 - 5 * label1.length} y={-height * 2.5} text={label1} />}
        {label2 && <GraphLabel x={width * 0.1 + 5} y={-height * 2.5} text={label2} />}
        {label3 && <GraphLabel x={width * 0.9 - 10 - 5 * label3.length} y={-height * 2.5} text={label3} />}
        {label4 && <GraphLabel x={width * 0.9 + 5} y={-height * 2.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const ArcAFIIUXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragEnd }) => {
  const { x, y, widthFactor, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const width = DEFAULT_WIDTH * widthFactor!;
  const height = DEFAULT_HEIGHT;
  const leftLinePoints = [width * 0.1 - 2, 2, width * 0.1 - 2, -40];
  const leftLine2Points = [width * 0.1 + 2, 2, width * 0.1 + 2, -40];
  const rightLinePoints = [width * 0.9 - 2, 2, width * 0.9 - 2, -40];
  const rightLine2Points = [width * 0.9 + 2, 2, width * 0.9 + 2, -40];

  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const borderBox = {
    x: 0,
    y: 0,
    width: width,
    height: height,
  };

  useEffect(() => {
    if (selected) {
      shapeRef5.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, widthFactor]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={leftLinePoints} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={rightLinePoints} stroke={stroke2} lineCap="round" />
        <Line ref={shapeRef3} points={leftLine2Points} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef4} points={rightLine2Points} stroke={stroke2} lineCap="round" />
        <KonvaShape
          ref={shapeRef5}
          width={width}
          height={height}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(width / 2, height * 2, width, 0);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        {label1 && <GraphLabel x={width * 0.1 - 12 - 5 * label1.length} y={-height * 2.5} text={label1} />}
        {label2 && <GraphLabel x={width * 0.1 + 7} y={-height * 2.5} text={label2} />}
        {label3 && <GraphLabel x={width * 0.9 - 12 - 5 * label3.length} y={-height * 2.5} text={label3} />}
        {label4 && <GraphLabel x={width * 0.9 + 7} y={-height * 2.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};
