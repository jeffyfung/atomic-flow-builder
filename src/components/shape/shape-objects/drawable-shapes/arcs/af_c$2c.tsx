import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Circle, Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";
import { computeNearestSnap, getGridCoordinate, getRelativeStageCoordinate, getStageDim } from "../../../../canvas/gridline";
import { computeDimensionArc } from "..";
import { isArcVertexName } from "../../../../../features/type-util";

export const AF_C$2C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.ARC) throw new Error("Wrong drawable shape type");
  const { top, bottom, middle } = draw;
  const vertices = { top: top!, middle: middle!, bottom: bottom! };
  const [nearestSnap, setNearestSnap] = useState<Coordinates | undefined>(undefined);
  const [existingVertex, setExistingVertex] = useState<Record<string, Coordinates> | null>(null);

  const offset = getStageDim(0.15);
  const bendingRight = draw.top!.x < draw.middle!.x ? -1 : 1;
  const topToBottom = draw.top!.y < draw.bottom!.y ? -1 : 1;
  const line1Points = [top!.x, top!.y + bendingRight * offset, topToBottom * -offset + middle!.x, middle!.y, bottom!.x, bottom!.y - bendingRight * offset]; //?
  const line2Points = [top!.x, top!.y - bendingRight * offset, topToBottom * offset + middle!.x, middle!.y, bottom!.x, bottom!.y + bendingRight * offset];

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>, vName: "top" | "bottom" | "middle"): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    const { x: absX, y: absY } = event.target!.getAbsolutePosition();
    const { stageX, stageY } = getRelativeStageCoordinate(absX, absY);
    const { gridX, gridY } = getGridCoordinate(stageX, stageY);
    setNearestSnap(computeNearestSnap(gridX, gridY));
    return computeDimensionArc({ [vName]: { x: stageX, y: stageY, gridX, gridY } }, existingVertex!);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>, vName: "top" | "bottom" | "middle") => {
    if (nearestSnap) {
      const payload = computeDimensionArc({ [vName]: nearestSnap }, existingVertex!);
      setNearestSnap(undefined);
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
        onMouseOver={handleMouseOver}
        hitStrokeWidth={4}
      >
        <Line points={line1Points} stroke={stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
        <Line points={line2Points} stroke={stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
        {selected && (
          <Anchor
            vertex={top!} //
            vertexName="top"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isArcVertexName(vertex) && handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e, vertex))}
            handleDragEnd={(e, vertex) => isArcVertexName(vertex) && handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e, vertex))}
          />
        )}
        {selected && (
          <Anchor
            vertex={middle!} //
            vertexName="middle"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isArcVertexName(vertex) && handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e, vertex))}
            handleDragEnd={(e, vertex) => isArcVertexName(vertex) && handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e, vertex))}
          />
        )}
        {selected && (
          <Anchor
            vertex={bottom!} //
            vertexName="bottom"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isArcVertexName(vertex) && handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e, vertex))}
            handleDragEnd={(e, vertex) => isArcVertexName(vertex) && handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e, vertex))}
          />
        )}
      </Group>
      {nearestSnap && <Circle x={nearestSnap!.x} y={nearestSnap!.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />}
    </>
  );
};
