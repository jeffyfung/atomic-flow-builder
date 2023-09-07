import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";
import { isArcVertexName } from "../../../../../features/type-util";

export const AFC$2C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.ARC) throw new Error("Wrong drawable shape type");
  const { top, bottom, middle } = draw;
  const vertices = { top: top!, middle: middle!, bottom: bottom! };
  const [existingVertex, setExistingVertex] = useState<Record<string, Coordinates> | null>(null);

  const points = [top!.x, top!.y, middle!.x, middle!.y, bottom!.x, bottom!.y];

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
        <Line points={points} stroke={stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
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
