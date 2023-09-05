import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { Coordinates, DrawableShapeType, LabelPlacement } from "../../../../../features/shape";
import { KonvaEventObject } from "konva/lib/Node";
import { Circle, Group, Line } from "react-konva";
import { GraphLabel } from "../../graph-label";
import { Anchor } from "../anchor";
import { computeNearestSnap, getGridCoordinate, getRelativeStageCoordinate } from "../../../../canvas/gridline/gridline";
import { computeDimension2V } from "..";

export const AFV$1C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleAnchorDragMove, handleAnchorDragEnd }) => {
  const { x, y, stroke1, label1, label2, draw, labelPlacement } = shape;
  if (!draw || draw.type !== DrawableShapeType.TWO_VERTEX) throw new Error("Wrong drawable shape type");
  const { start, end } = draw;
  const [nearestSnap, setNearestSnap] = useState<Coordinates | undefined>(undefined);
  const [existingVertex, setExistingVertex] = useState<Coordinates | null>(null);

  const length = Math.abs(end!.y - start!.y);
  const points = [start!.x, start!.y, end!.x, end!.y];
  const labelY = labelPlacement! === LabelPlacement.HIGH ? length * -0.2 : length * 0.1;

  const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
    event.cancelBubble = true;
    const { x: absX, y: absY } = event.target!.getAbsolutePosition();
    const { stageX, stageY } = getRelativeStageCoordinate(absX, absY);
    const { gridX, gridY } = getGridCoordinate(stageX, stageY);
    setNearestSnap(computeNearestSnap(gridX, gridY));
    return computeDimension2V(shape, { x: stageX, y: stageY, gridX, gridY }, existingVertex!);
  };

  const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>) => {
    if (nearestSnap) {
      const payload = computeDimension2V(shape, nearestSnap, existingVertex!);
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
        <Line points={points} stroke={stroke1} strokeWidth={2} lineCap="round" />
        {label1 && <GraphLabel x={x - 10 - 5 * label1.length} y={y + labelY} text={label1} />}
        {label2 && <GraphLabel x={x + 5} y={y + labelY} text={label2} />}
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
