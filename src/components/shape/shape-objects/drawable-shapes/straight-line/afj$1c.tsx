import { useState } from "react";
import { ShapeProps } from "../../../shape";
import { getStageDim } from "../../../../canvas/gridline";
import { KonvaEventObject } from "konva/lib/Node";
import { computeDimension, computeNearestSnap } from "..";
import { Circle, Group, Line } from "react-konva";
import { Anchor } from "../anchor";

export const AFJ$1C: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleAnchorDragMove, handleAnchorDragEnd }) => {
  // const { x, y, stroke1, width, length } = shape;
  // const [nearestSnap, setNearestSnap] = useState<{ x: number; y: number } | null>(null);
  // const [existingVertex, setExistingVertex] = useState<{ x: number; y: number } | null>(null);

  // const lineWidth = getStageDim(width!);
  // const lineLength = getStageDim(length!);
  // const vertex1 = { offsetX: -lineWidth / 2, offsetY: -lineLength / 2 };
  // const vertex2 = { offsetX: lineWidth / 2, offsetY: lineLength / 2 };
  // //
  // const points = [vertex1.offsetX, vertex1.offsetY, vertex1.offsetX * 0.1, vertex1.offsetY * 0.2, vertex1.offsetX * 0.9, vertex1.offsetY * 0.8, vertex2.offsetX, vertex2.offsetY];

  // const handleAnchorDragStart = (existingVertex: { offsetX: number; offsetY: number }) => {
  //   setExistingVertex({
  //     x: x + existingVertex.offsetX,
  //     y: y + existingVertex.offsetY,
  //   });
  // };

  // const handleAnchorUpdatedDim = (event: KonvaEventObject<DragEvent>): Parameters<ShapeProps["handleAnchorDragMove"]>[1] => {
  //   const { x: vertexX, y: vertexY } = event.target!.absolutePosition();
  //   setNearestSnap(computeNearestSnap(vertexX, vertexY));
  //   return computeDimension["2V"](vertexX, vertexY, existingVertex!.x, existingVertex!.y);

  // };

  // const handleAnchorUpdateEnd = (_event: KonvaEventObject<DragEvent>) => {
  //   if (nearestSnap) {
  //     const payload = computeNewDim(nearestSnap.x, nearestSnap.y, existingVertex!.x, existingVertex!.y);
  //     // if x-displacement > 0 (+ve / -ve)
  //     // switch shape

  //     setExistingVertex(null);
  //     setNearestSnap(null);
  //     return payload;
  //   } else {
  //     return {};
  //   }
  // };

  // return (
  //   <>
  //     <Group
  //       x={x} //
  //       y={y}
  //       onClick={(event) => onClick(event, shapeId)}
  //       onMouseEnter={handleMouseEnter}
  //       onMouseLeave={handleMouseLeave}
  //     >
  //       <Line points={points} stroke={stroke1} strokeWidth={2} lineCap="round" />
  //       {selected && <Anchor vertex={vertex1} handleDragStart={() => handleAnchorDragStart(vertex2)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
  //       {selected && <Anchor vertex={vertex2} handleDragStart={() => handleAnchorDragStart(vertex1)} handlDragMove={(e) => handleAnchorDragMove(shapeId, handleAnchorUpdatedDim(e))} handleDragEnd={(e) => handleAnchorDragEnd(shapeId, handleAnchorUpdateEnd(e))} />}
  //     </Group>
  //     {nearestSnap && <Circle x={nearestSnap!.x} y={nearestSnap!.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />}
  //   </>
  // );
  return <></>;
};
