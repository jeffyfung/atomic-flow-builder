import { ShapePropertiesWithId, ShapeType } from "../../features/shape";
import { Circle } from "./circle";
import { Rectangle } from "./rectangle";

export interface ShapeProps {
  key: string;
  shape: ShapePropertiesWithId;
}

export const Shape: React.FC<ShapeProps> = ({ shape }) => {
  switch (shape.type) {
    case ShapeType.RECT:
      return <Rectangle {...shape} />;
    case ShapeType.CIRCLE:
      return <Circle {...shape} />;
    default:
      return <></>;
  }
};
