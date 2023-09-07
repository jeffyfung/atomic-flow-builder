import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Group, Line } from "react-konva";
import { Anchor } from "../anchor";
import { Coordinates, DrawableShapeType } from "../../../../../features/shape";

export const AFJ$2C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { stroke1, draw } = shape;
  if (!draw || draw.type !== DrawableShapeType.TWO_VERTEX) throw new Error("Wrong drawable shape type");
  const { start, end } = draw;
  const [existingVertex, setExistingVertex] = useState<Coordinates | null>(null);

  const width = end!.x - start!.x;
  const length = end!.y - start!.y;
  const points = [start!.x, start!.y, start!.x + width * 0.1, start!.y + length * 0.25, start!.x + width * 0.9, start!.y + length * 0.75, end!.x, end!.y];

  const handleAnchorUpdatedDim = (_event: KonvaEventObject<DragEvent>) => {
    const data = { drawableShapeType: DrawableShapeType.TWO_VERTEX, existingVertex: existingVertex! };
    handleAnchorDragMove(shapeId, data);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>) => {
    setExistingVertex(null);
    const data = { drawableShapeType: DrawableShapeType.TWO_VERTEX, existingVertex: existingVertex! };
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
            vertex={start!} //
            vertexName="start"
            handleDragStart={() => setExistingVertex(end!)}
            handleDragMove={handleAnchorUpdatedDim}
            handleDragEnd={handleAnchorUpdateEnd}
          />
        )}
        {selected && (
          <Anchor
            vertex={end!} //
            vertexName="end"
            handleDragStart={() => setExistingVertex(start!)}
            handleDragMove={handleAnchorUpdatedDim}
            handleDragEnd={handleAnchorUpdateEnd}
          />
        )}
      </Group>
    </>
  );
};
