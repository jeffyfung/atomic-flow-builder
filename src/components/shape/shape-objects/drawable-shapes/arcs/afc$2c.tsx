import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Circle, Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";
import { computeNearestSnap, getGridCoordinate, getRelativeStageCoordinate } from "../../../../canvas/gridline";
import { computeDimensionArc } from "..";
import { isArcVertexName } from "../../../../../features/type-util";

export const AFC$2C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.ARC) throw new Error("Wrong drawable shape type");
  const { top, bottom, middle } = draw;
  const vertices = { top: top!, middle: middle!, bottom: bottom! };
  const [nearestSnap, setNearestSnap] = useState<Coordinates | undefined>(undefined);
  const [existingVertex, setExistingVertex] = useState<Record<string, Coordinates> | null>(null);

  const points = [top!.x, top!.y, middle!.x, middle!.y, bottom!.x, bottom!.y];

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>, vName: "top" | "bottom" | "middle"): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    event.cancelBubble = true;
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
        <Line points={points} stroke={stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
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
