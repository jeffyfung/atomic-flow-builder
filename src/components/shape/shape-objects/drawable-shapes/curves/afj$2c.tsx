import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Circle, Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";
import { computeNearestSnap, getGridCoordinate } from "../../../../canvas/gridline";
import { computeDimension2V } from "..";

export const AFJ$2C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.TWO_VERTEX) throw new Error("Wrong drawable shape type");
  const { start, end } = draw;
  const [nearestSnap, setNearestSnap] = useState<Coordinates | null>(null);
  const [existingVertex, setExistingVertex] = useState<Coordinates | null>(null);

  const width = end!.x - start!.x;
  const length = end!.y - start!.y;
  const points = [start!.x, start!.y, start!.x + width * 0.1, start!.y + length * 0.25, start!.x + width * 0.9, start!.y + length * 0.75, end!.x, end!.y];

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    const { x: _x, y: _y } = event.target!.absolutePosition();
    const { gridX, gridY } = getGridCoordinate(_x, _y);
    setNearestSnap(computeNearestSnap(gridX, gridY));
    return computeDimension2V(shape, { x: _x, y: _y, gridX, gridY }, existingVertex!);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>) => {
    if (nearestSnap) {
      const payload = computeDimension2V(shape, nearestSnap, existingVertex!);
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
        <Line points={points} stroke={stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
        {selected && (
          <Anchor
            vertex={start!} //
            vertexName="start"
            handleDragStart={() => setExistingVertex(end!)}
            handleDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))}
            handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))}
          />
        )}
        {selected && (
          <Anchor
            vertex={end!} //
            vertexName="end"
            handleDragStart={() => setExistingVertex(start!)}
            handleDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))}
            handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))}
          />
        )}
      </Group>
      {nearestSnap && <Circle x={nearestSnap!.x} y={nearestSnap!.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />}
    </>
  );
};