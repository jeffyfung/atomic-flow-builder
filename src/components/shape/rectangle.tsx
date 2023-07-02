import { Rect as KonvaRectangle } from "react-konva";
import { ShapeProperties } from "../../features/shape";

export const Rectangle: React.FC<ShapeProperties> = (shapeProps) => {
  return <KonvaRectangle {...shapeProps} />;
};
