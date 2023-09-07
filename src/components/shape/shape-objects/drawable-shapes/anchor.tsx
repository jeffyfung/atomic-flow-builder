import { KonvaEventObject } from "konva/lib/Node";
import { Circle } from "react-konva";
import { Coordinates } from "../../../../features/shape";
export interface AnchorProps {
  vertex: Coordinates;
  vertexName: string;
  handleDragStart: (event?: KonvaEventObject<DragEvent>) => void;
  handleDragMove: (event: KonvaEventObject<DragEvent>, vName: string) => void;
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
      onDragMove={(e) => {
        e.cancelBubble = true;
        handleDragMove(e, vertexName);
      }}
      onDragEnd={(e) => {
        e.cancelBubble = true;
        handleDragEnd(e, vertexName);
      }}
    />
  );
};
