import { useState } from "react";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { isRectVertexName } from "../../../../../features/type-util";

export const AFEXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, stroke2, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.RECT) throw new Error("Wrong drawable shape type");
  const { p1, p2, p3, p4 } = draw;
  const vertices = { p1: p1!, p2: p2!, p3: p3!, p4: p4! };
  const [existingVertex, setExistingVertex] = useState<Record<string, Coordinates> | null>(null);

  const invertStrokeColour: boolean = (p2!.x < p1!.x || p3!.y < p1!.y) && !(p2!.x < p1!.x && p3!.y < p1!.y);
  const width = p2!.x - p1!.x;
  const length = p3!.y - p1!.y;
  const line1Points = [p2!.x, p2!.y, p2!.x - width * 0.1, p2!.y + length * 0.25, p2!.x - width * 0.9, p2!.y + length * 0.75, p3!.x, p3!.y];
  const line2Points = [p1!.x, p1!.y, p1!.x + width * 0.1, p1!.y + length * 0.25, p1!.x + width * 0.9, p1!.y + length * 0.75, p4!.x, p4!.y];

  const handleAnchorUpdatedDim = (_event: KonvaEventObject<DragEvent>, vName: "p1" | "p2" | "p3" | "p4") => {
    const data = { drawableShapeType: DrawableShapeType.RECT, existingVertex: existingVertex!, selectedVName: vName };
    handleAnchorDragMove(shapeId, data);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>, vName: "p1" | "p2" | "p3" | "p4") => {
    setExistingVertex(null);
    const data = { drawableShapeType: DrawableShapeType.RECT, existingVertex: existingVertex!, selectedVName: vName };
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
        <Line points={line1Points} stroke={invertStrokeColour ? stroke1 : stroke2} strokeWidth={2} lineCap="round" tension={0.5} />
        <Line points={line2Points} stroke={invertStrokeColour ? stroke2 : stroke1} strokeWidth={2} lineCap="round" tension={0.5} />
        {selected && (
          <Anchor
            vertex={p1!} //
            vertexName="p1"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdatedDim(e, vertex)}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdateEnd(e, vertex)}
          />
        )}
        {selected && (
          <Anchor
            vertex={p2!} //
            vertexName="p2"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdatedDim(e, vertex)}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdateEnd(e, vertex)}
          />
        )}
        {selected && (
          <Anchor
            vertex={p3!} //
            vertexName="p3"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdatedDim(e, vertex)}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdateEnd(e, vertex)}
          />
        )}
        {selected && (
          <Anchor
            vertex={p4!} //
            vertexName="p4"
            handleDragStart={() => setExistingVertex(vertices)}
            handleDragMove={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdatedDim(e, vertex)}
            handleDragEnd={(e, vertex) => isRectVertexName(vertex) && handleAnchorUpdateEnd(e, vertex)}
          />
        )}
      </Group>
    </>
  );
};
