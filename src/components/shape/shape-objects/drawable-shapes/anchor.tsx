import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Circle } from "react-konva";

export interface AnchorProps {
  vertex: { x: number; y: number };
  handlDragMove: (event: KonvaEventObject<DragEvent>) => void;
  handleDragEnd: (event: KonvaEventObject<DragEvent>) => void;
  handleDragStart: () => void;
}

export const Anchor: React.FC<AnchorProps> = ({ vertex, handleDragStart, handlDragMove, handleDragEnd }) => {
  const { x, y } = vertex;
  return (
    <Circle
      x={x} //
      y={y}
      radius={5}
      stroke="#0077b3"
      strokeWidth={1}
      fill="#e6e6e6"
      draggable
      onDragStart={handleDragStart}
      onDragMove={handlDragMove}
      onDragEnd={handleDragEnd}
    />
  );
};
