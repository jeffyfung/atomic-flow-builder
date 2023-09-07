import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { Coordinates, DrawableShapeType, LabelPlacement } from "../../../../../features/shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Group, Line } from "react-konva";
import { GraphLabel } from "../../graph-label";
import { Anchor } from "../anchor";

export const AFV$1C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { x, y, stroke1, label1, label2, draw, labelPlacement } = shape;
  if (!draw || draw.type !== DrawableShapeType.TWO_VERTEX) throw new Error("Wrong drawable shape type");
  const { start, end } = draw;
  const [existingVertex, setExistingVertex] = useState<Coordinates | null>(null);

  const length = Math.abs(end!.y - start!.y);
  const points = [start!.x, start!.y, end!.x, end!.y];
  const labelY = labelPlacement! === LabelPlacement.HIGH ? length * -0.2 : length * 0.1;

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
        <Line points={points} stroke={stroke1} strokeWidth={2} lineCap="round" />
        {label1 && <GraphLabel x={x - 10 - 5 * label1.length} y={y + labelY} text={label1} />}
        {label2 && <GraphLabel x={x + 5} y={y + labelY} text={label2} />}
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
