import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { LabelPlacement } from "../../../../../features/shape";
import { getStageDim } from "../../../../canvas/gridline";
import { KonvaEventObject } from "konva/lib/Node";
import { Circle, Group, Line } from "react-konva";
import { GraphLabel } from "../../graph-label";
import { Anchor } from "../anchor";
import { computeDimension, computeNearestSnap } from "..";

const offset = getStageDim(0.15);

export const AF_V$1C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { x, y, stroke1, label1, label2, draw, labelPlacement } = shape;
  const { start, end } = draw!;
  const [nearestSnap, setNearestSnap] = useState<{ x: number; y: number; gridX: number; gridY: number } | null>(null);
  const [existingVertex, setExistingVertex] = useState<{ x: number; y: number; gridX: number; gridY: number } | null>(null);

  const length = Math.abs(end!.y - start!.y);
  const line1Points = [-offset + start!.x, start!.y, -offset + end!.x, end!.y];
  const line2Points = [offset + start!.x, start!.y, offset + end!.x, end!.y];
  const labelY = labelPlacement! === LabelPlacement.HIGH ? length * -0.2 : length * 0.1;

  const handleAnchorDragStart = (v: { x: number; y: number; gridX: number; gridY: number }) => {
    setExistingVertex(v);
  };

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    const { x: vertexX, y: vertexY } = event.target!.absolutePosition();
    setNearestSnap(computeNearestSnap(vertexX, vertexY));
    return computeDimension["2V"]({ x: vertexX, y: vertexY }, existingVertex!);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>) => {
    if (nearestSnap) {
      const payload = computeDimension["2V"](nearestSnap, existingVertex!);
      // TODO:
      // if x-displacement > 0 (+ve / -ve)
      // switch shape

      setNearestSnap(null);
      setExistingVertex(null);
      return payload;
    } else {
      setExistingVertex(null);
      return {};
    }
  };

  return (
    <>
      <Group
        onClick={(event) => onClick(event, shapeId)} //
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Line points={line1Points} stroke={stroke1} strokeWidth={2} lineCap="round" />
        <Line points={line2Points} stroke={stroke1} strokeWidth={2} lineCap="round" />
        {label1 && <GraphLabel x={-offset - 10 - 5 * label1.length} y={labelY} text={label1} />}
        {label2 && <GraphLabel x={offset + 5} y={labelY} text={label2} />}
        {selected && <Anchor vertex={start!} handleDragStart={() => handleAnchorDragStart(end!)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
        {selected && <Anchor vertex={end!} handleDragStart={() => handleAnchorDragStart(start!)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
      </Group>
      {nearestSnap && <Circle x={nearestSnap!.x} y={nearestSnap!.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />}
    </>
  );
};
