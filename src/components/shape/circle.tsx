import { Circle as KonvaCircle } from "react-konva";
import { ShapeProperties } from "../../features/shape";

export const Circle: React.FC<ShapeProperties> = (shapeProps) => {
  return <KonvaCircle {...shapeProps} />;
};
