import { Group, Line, Transformer } from "react-konva";
import {} from "../../../features/shape";
import { ShapeProps } from "../shape";
import { useEffect, useRef } from "react";
import Konva from "konva";
import { getStageDim } from "../../canvas/gridline/gridline";

export const StraightLine_AFBD: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const leftPoint = [getStageDim(-0.7), 0];
  const rightPoint = [getStageDim(0.7), 0];
  const topPoint = [0, getStageDim(-0.7)];
  const line1Points = [leftPoint[0], leftPoint[1], rightPoint[0], rightPoint[1]];
  const line2Points = [0, 0, topPoint[0], topPoint[1]];

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
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke="black" strokeWidth={2} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke="black" strokeWidth={2} lineCap="round" />
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const StraightLine_AFBU: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const leftPoint = [getStageDim(-0.7), 0];
  const rightPoint = [getStageDim(0.7), 0];
  const bottomPoint = [0, getStageDim(0.7)];
  const line1Points = [leftPoint[0], leftPoint[1], rightPoint[0], rightPoint[1]];
  const line2Points = [0, 0, bottomPoint[0], bottomPoint[1]];

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
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke="black" strokeWidth={2} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke="black" strokeWidth={2} lineCap="round" />
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const StraightLine_AFVDJ: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const strokeLength = getStageDim(0.7);
  const points = [0, -strokeLength, 0, strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!]);
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
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={points} stroke="black" strokeWidth={2} lineCap="round" dash={[6, 6]} />
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};
