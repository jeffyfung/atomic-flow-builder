import { useState } from "react";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { computeNearestSnap, getGridCoordinate } from "../../../../canvas/gridline";
import { computeDimensionRect } from "..";
import { Circle, Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { isRectVertexName } from "../../../../../features/type-util";

export const AFCXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, stroke2, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.RECT) throw new Error("Wrong drawable shape type");
  const { p1, p2, p3, p4 } = draw;
  const vertices = { p1: p1!, p2: p2!, p3: p3!, p4: p4! };
  const [nearestSnap, setNearestSnap] = useState<Coordinates | undefined>(undefined);
  const [existingVertex, setExistingVertex] = useState<Record<string, Coordinates> | null>(null);

  const invertStrokeColour: boolean = (p2!.x < p1!.x || p3!.y < p1!.y) && !(p2!.x < p1!.x && p3!.y < p1!.y);
  const width = p2!.x - p1!.x;
  const length = p3!.y - p1!.y;
  const line1Points = [p2!.x, p2!.y, p2!.x - width * 0.25, p2!.y + length * 0.1, p2!.x - width * 0.75, p2!.y + length * 0.9, p3!.x, p3!.y];
  const line2Points = [p1!.x, p1!.y, p1!.x + width * 0.25, p1!.y + length * 0.1, p1!.x + width * 0.75, p1!.y + length * 0.9, p4!.x, p4!.y];

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>, vName: "p1" | "p2" | "p3" | "p4"): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    const { x: _x, y: _y } = event.target!.absolutePosition();
    const { gridX, gridY } = getGridCoordinate(_x, _y);
    setNearestSnap(computeNearestSnap(gridX, gridY));
    return computeDimensionRect({ [vName]: { x: _x, y: _y, gridX, gridY } }, existingVertex!);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>, vName: "p1" | "p2" | "p3" | "p4") => {
    if (nearestSnap) {
      setNearestSnap(undefined);
      setExistingVertex(null);
      return computeDimensionRect({ [vName]: nearestSnap }, existingVertex!);
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
        onMouseOver={handleMouseOver}
        hitStrokeWidth={4}
      >
        <Line points={line1Points} stroke={invertStrokeColour ? stroke1 : stroke2} strokeWidth={2} lineCap="round" tension={0.5} />
        <Line points={line2Points} stroke={invertStrokeColour ? stroke2 : stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
        {selected && (
          <Anchor
            vertex={p1!} //
            vertexName="p1"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e, vertex))}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e, vertex))}
          />
        )}
        {selected && (
          <Anchor
            vertex={p2!} //
            vertexName="p2"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e, vertex))}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e, vertex))}
          />
        )}
        {selected && (
          <Anchor
            vertex={p3!} //
            vertexName="p3"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e, vertex))}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e, vertex))}
          />
        )}
        {selected && (
          <Anchor
            vertex={p4!} //
            vertexName="p4"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e, vertex))}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e, vertex))}
          />
        )}
      </Group>
      {nearestSnap && <Circle x={nearestSnap!.x} y={nearestSnap!.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />}
    </>
  );
};
