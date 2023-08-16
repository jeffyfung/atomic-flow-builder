import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Circle } from "react-konva";
import { Coordinates } from "../../../../features/shape";

export interface AnchorProps {
  vertex: Coordinates;
  vertexName: string;
  handleDragStart: () => void;
  handleDragMove: (event: KonvaEventObject<DragEvent>, vName: string) => void; // optional?
  handleDragEnd: (event: KonvaEventObject<DragEvent>, vName: string) => void;
}

export const Anchor: React.FC<AnchorProps> = ({ vertex, vertexName, handleDragStart, handleDragMove, handleDragEnd }) => {
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
      onDragMove={(e) => handleDragMove(e, vertexName)}
      onDragEnd={(e) => handleDragEnd(e, vertexName)}
    />
  );
};
