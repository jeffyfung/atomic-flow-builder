import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";
import { getStageDim } from "../../../../canvas/gridline/gridline";
import { isArcVertexName } from "../../../../../features/type-util";

export const AF_C$2C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.ARC) throw new Error("Wrong drawable shape type");
  const { top, bottom, middle } = draw;
  const vertices = { top: top!, middle: middle!, bottom: bottom! };
  const [existingVertex, setExistingVertex] = useState<Record<string, Coordinates> | null>(null);

  const offset = getStageDim(0.15);
  const bendingRight = draw.top!.x < draw.middle!.x ? -1 : 1;
  const topToBottom = draw.top!.y < draw.bottom!.y ? -1 : 1;
  const line1Points = [top!.x, top!.y + bendingRight * offset, topToBottom * -offset + middle!.x, middle!.y, bottom!.x, bottom!.y - bendingRight * offset]; //?
  const line2Points = [top!.x, top!.y - bendingRight * offset, topToBottom * offset + middle!.x, middle!.y, bottom!.x, bottom!.y + bendingRight * offset];

  const handleAnchorUpdatedDim = (_event: KonvaEventObject<DragEvent>, vName: "top" | "bottom" | "middle") => {
    const data = { drawableShapeType: DrawableShapeType.ARC, existingVertex: existingVertex!, selectedVName: vName };
    handleAnchorDragMove(shapeId, data);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>, vName: "top" | "bottom" | "middle") => {
    setExistingVertex(null);
    const data = { drawableShapeType: DrawableShapeType.ARC, existingVertex: existingVertex!, selectedVName: vName };
    handleAnchorDragEnd(shapeId, data);
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
            handleDragMove={(e, vertex) => isArcVertexName(vertex) && handleAnchorUpdatedDim(e, vertex)}
            handleDragEnd={(e, vertex) => isArcVertexName(vertex) && handleAnchorUpdateEnd(e, vertex)}
          />
        )}
        {selected && (
          <Anchor
            vertex={middle!} //
            vertexName="middle"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isArcVertexName(vertex) && handleAnchorUpdatedDim(e, vertex)}
            handleDragEnd={(e, vertex) => isArcVertexName(vertex) && handleAnchorUpdateEnd(e, vertex)}
          />
        )}
        {selected && (
          <Anchor
            vertex={bottom!} //
            vertexName="bottom"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isArcVertexName(vertex) && handleAnchorUpdatedDim(e, vertex)}
            handleDragEnd={(e, vertex) => isArcVertexName(vertex) && handleAnchorUpdateEnd(e, vertex)}
          />
        )}
      </Group>
    </>
  );
};
