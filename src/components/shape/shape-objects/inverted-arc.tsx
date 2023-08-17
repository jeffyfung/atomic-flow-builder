import { Group, Shape as KonvaShape, Line, Transformer } from "react-konva";
import { LatexColour } from "../../../features/shape";
import { ShapeProps } from "../shape";
import { useEffect, useRef } from "react";
import Konva from "konva";
import { GraphLabel } from "./graph-label";
import { getStageDim } from "../../canvas/gridline";

export const ArcAFIUN: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y } = shape;
  const shapeRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const arcWidth = getStageDim(5);
  const arcHeight = getStageDim(0.3);
  const arcTopToCenter = getStageDim(0.1);
  const borderBox = {
    x: -arcWidth * 0.5,
    y: -arcTopToCenter,
    width: arcWidth,
    height: arcHeight,
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
        onMouseOver={handleMouseOver}
        stroke={LatexColour.BLACK}
        strokeWidth={4}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(-arcWidth * 0.5, -arcTopToCenter);
          context.quadraticCurveTo(0, arcHeight * 2, arcWidth * 0.5, -arcTopToCenter);
          context.fillStrokeShape(shape);
          context.closePath();
        }}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      />
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const ArcAFIUXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, widthFactor, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const arcWidth = getStageDim(5 * widthFactor!);
  const arcHeight = getStageDim(0.3);
  const arcTopToCenter = getStageDim(0.1);
  const strokeLength = getStageDim(4);
  const strokeSpacing = getStageDim(4 * widthFactor!);
  const leftLinePoints = [-strokeSpacing * 0.5, 0, -strokeSpacing * 0.5, -strokeLength];
  const rightLinePoints = [strokeSpacing * 0.5, 0, strokeSpacing * 0.5, -strokeLength];

  const borderBox = {
    x: -arcWidth * 0.5,
    y: -strokeLength,
    width: arcWidth,
    height: arcHeight - arcTopToCenter + strokeLength,
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
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={leftLinePoints} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={rightLinePoints} stroke={stroke2} lineCap="round" />
        <KonvaShape
          ref={shapeRef3}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-arcWidth * 0.5, -arcTopToCenter);
            context.quadraticCurveTo(0, arcHeight * 2, arcWidth * 0.5, -arcTopToCenter);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        {label1 && <GraphLabel x={-strokeSpacing * 0.5 - 10 - 5 * label1.length} y={-strokeLength * 0.6} text={label1} />}
        {label2 && <GraphLabel x={-strokeSpacing * 0.5 + 5} y={-strokeLength * 0.6} text={label2} />}
        {label3 && <GraphLabel x={strokeSpacing * 0.5 - 10 - 5 * label3.length} y={-strokeLength * 0.6} text={label3} />}
        {label4 && <GraphLabel x={strokeSpacing * 0.5 + 5} y={-strokeLength * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const ArcAFIIUXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, widthFactor, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const arcWidth = getStageDim(5 * widthFactor!);
  const arcHeight = getStageDim(0.3);
  const arcTopToCenter = getStageDim(0.1);
  const strokeLength = getStageDim(4);
  const strokeSpacing = getStageDim(4 * widthFactor!);
  const strokeNeighborSpacing = getStageDim(0.3 * widthFactor!);
  const leftLinePoints = [-strokeSpacing * 0.5 - strokeNeighborSpacing * 0.5, 0, -strokeSpacing * 0.5 - strokeNeighborSpacing * 0.5, -strokeLength];
  const leftLine2Points = [-strokeSpacing * 0.5 + strokeNeighborSpacing * 0.5, 0, -strokeSpacing * 0.5 + strokeNeighborSpacing * 0.5, -strokeLength];
  const rightLinePoints = [strokeSpacing * 0.5 - strokeNeighborSpacing * 0.5, 0, strokeSpacing * 0.5 - strokeNeighborSpacing * 0.5, -strokeLength];
  const rightLine2Points = [strokeSpacing * 0.5 + strokeNeighborSpacing * 0.5, 0, strokeSpacing * 0.5 + strokeNeighborSpacing * 0.5, -strokeLength];

  const borderBox = {
    x: -arcWidth * 0.5,
    y: -strokeLength,
    width: arcWidth,
    height: arcHeight - arcTopToCenter + strokeLength,
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
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={leftLinePoints} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={rightLinePoints} stroke={stroke2} lineCap="round" />
        <Line ref={shapeRef3} points={leftLine2Points} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef4} points={rightLine2Points} stroke={stroke2} lineCap="round" />
        <KonvaShape
          ref={shapeRef5}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-arcWidth * 0.5, -arcTopToCenter);
            context.quadraticCurveTo(0, arcHeight * 2, arcWidth * 0.5, -arcTopToCenter);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        {label1 && <GraphLabel x={-strokeSpacing * 0.5 - strokeNeighborSpacing * 0.5 - 10 - 5 * label1.length} y={-strokeLength * 0.6} text={label1} />}
        {label2 && <GraphLabel x={-strokeSpacing * 0.5 + strokeNeighborSpacing * 0.5 + 5} y={-strokeLength * 0.6} text={label2} />}
        {label3 && <GraphLabel x={strokeSpacing * 0.5 - strokeNeighborSpacing * 0.5 - 10 - 5 * label3.length} y={-strokeLength * 0.6} text={label3} />}
        {label4 && <GraphLabel x={strokeSpacing * 0.5 + strokeNeighborSpacing * 0.5 + 5} y={-strokeLength * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};
