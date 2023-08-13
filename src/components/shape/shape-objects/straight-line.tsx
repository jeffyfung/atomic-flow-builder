import { Circle, Group, Shape as KonvaShape, Line, Transformer } from "react-konva";
import { LabelPlacement } from "../../../features/shape";
import { ShapeProps } from "../shape";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { GraphLabel } from "./graph-label";
import { getGridCoordinate, getGridDim, getStageCoordinate, getStageDim } from "../../canvas/gridline";
import { Anchor } from "../anchor";
import { KonvaEventObject } from "konva/lib/Node";
import { SNAP_GRID_THRESHOLD } from "../../canvas/canvas";

export const StraightLine_AFBD: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
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
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1Points} stroke="black" strokeWidth={2} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke="black" strokeWidth={2} lineCap="round" />
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const StraightLine_AFBU: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
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
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1Points} stroke="black" strokeWidth={2} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke="black" strokeWidth={2} lineCap="round" />
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const StraightLine_AFVDJ: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
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
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={points} stroke="black" strokeWidth={2} lineCap="round" dash={[6, 6]} />
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const StraightLine_AFV$1C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { x, y, stroke1, label1, label2, length, labelPlacement } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const [nearestSnap, setNearestSnap] = useState<{ x: number; y: number } | null>(null);
  const [existingVertex, setExistingVertex] = useState<{ x: number; y: number } | null>(null);

  const lineLength = getStageDim(length!);
  const vertex1 = { offsetX: 0, offsetY: -lineLength / 2 };
  const vertex2 = { offsetX: 0, offsetY: lineLength / 2 };

  const points = [vertex1.offsetX, vertex1.offsetY, vertex2.offsetX, vertex2.offsetY];
  const labelY = labelPlacement! === LabelPlacement.HIGH ? lineLength * -0.2 : lineLength * 0.1;

  const computeNewDim = (displaceVertexX: number, displacedVertexY: number, existingVertexX: number, existingVertexY: number): { x: number; y: number; gridX: number; gridY: number; length: number } => {
    const newX = (existingVertexX + displaceVertexX) / 2;
    const newY = (existingVertexY + displacedVertexY) / 2;
    const { gridX: newGridX, gridY: newGridY } = getGridCoordinate(newX, newY);
    const length = getGridDim(Math.abs(existingVertexY - displacedVertexY));

    return {
      x: newX,
      y: newY,
      gridX: newGridX,
      gridY: newGridY,
      length,
    };
  };

  const handleAnchorDragStart = (existingVertex: { offsetX: number; offsetY: number }) => {
    setExistingVertex({
      x: x + existingVertex.offsetX,
      y: y + existingVertex.offsetY,
    });
  };

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    const { x: vertexX, y: vertexY } = event.target!.absolutePosition();

    const { gridX: displacedVertexGridX, gridY: displacedVertexGridY } = getGridCoordinate(vertexX, vertexY);
    const nearestSnapGridX = Math.round(displacedVertexGridX);
    const nearestSnapGridY = Math.round(displacedVertexGridY);
    if (Math.abs(nearestSnapGridX - displacedVertexGridX) < SNAP_GRID_THRESHOLD && Math.abs(nearestSnapGridY - displacedVertexGridY) < SNAP_GRID_THRESHOLD) {
      const { stageX, stageY } = getStageCoordinate(nearestSnapGridX, nearestSnapGridY);
      setNearestSnap({ x: stageX, y: stageY });
    } else {
      setNearestSnap(null);
    }

    return computeNewDim(vertexX, vertexY, existingVertex!.x, existingVertex!.y);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>) => {
    if (nearestSnap) {
      const payload = computeNewDim(nearestSnap.x, nearestSnap.y, existingVertex!.x, existingVertex!.y);
      // if x-displacement > 0 (+ve / -ve)
      // switch shape

      setExistingVertex(null);
      setNearestSnap(null);
      return payload;
    } else {
      return {};
    }
  };

  console.log(x, y);
  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Line ref={shapeRef1} points={points} stroke={stroke1} strokeWidth={2} lineCap="round" />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={labelY} text={label1} />}
        {label2 && <GraphLabel x={5} y={labelY} text={label2} />}
        {selected && <Anchor vertex={vertex1} handleDragStart={() => handleAnchorDragStart(vertex2)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
        {selected && <Anchor vertex={vertex2} handleDragStart={() => handleAnchorDragStart(vertex1)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
      </Group>
      {nearestSnap && <Circle x={nearestSnap!.x} y={nearestSnap!.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />}
    </>
  );
};
