import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { computeDimension } from "..";
import { Circle, Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { computeNearestSnap, getGridCoordinate, getStageDim } from "../../../../canvas/gridline";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";

export const AF_J$2C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.TWO_VERTEX) throw new Error("Wrong drawable shape type");
  const { start, end } = draw;
  const [nearestSnap, setNearestSnap] = useState<Coordinates | null>(null);
  const [existingVertex, setExistingVertex] = useState<Coordinates | null>(null);

  const offset = getStageDim(0.15);
  const width = end!.x - start!.x;
  const length = end!.y - start!.y;
  const line1Points = [-offset + start!.x, start!.y, -offset + start!.x + width * 0.1, start!.y + length * 0.25, -offset + start!.x + width * 0.9, start!.y + length * 0.75, -offset + end!.x, end!.y];
  const line2Points = [offset + start!.x, start!.y, offset + start!.x + width * 0.1, start!.y + length * 0.25, offset + start!.x + width * 0.9, start!.y + length * 0.75, offset + end!.x, end!.y];

  const handleAnchorDragStart = (v: Coordinates) => {
    setExistingVertex(v);
  };

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    const { x: _x, y: _y } = event.target!.absolutePosition();
    const { gridX, gridY } = getGridCoordinate(_x, _y);
    setNearestSnap(computeNearestSnap(gridX, gridY));
    return computeDimension["2v"](shape, { x: _x, y: _y, gridX, gridY }, existingVertex!);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>) => {
    if (nearestSnap) {
      const payload = computeDimension["2v"](shape, nearestSnap, existingVertex!);
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
        <Line points={line1Points} stroke={stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
        <Line points={line2Points} stroke={stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
        {selected && <Anchor vertex={start!} handleDragStart={() => handleAnchorDragStart(end!)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
        {selected && <Anchor vertex={end!} handleDragStart={() => handleAnchorDragStart(start!)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
      </Group>
      {nearestSnap && <Circle x={nearestSnap!.x} y={nearestSnap!.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />}
    </>
  );
};
