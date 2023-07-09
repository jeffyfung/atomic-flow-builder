import { AtomicFlowShapes, ShapePropertiesWithId, ShapeType } from "../../features/shape";
import { Circle } from "./circle";
import { Rectangle } from "./rectangle";

export interface ShapeProps {
  key: string;
  shape: ShapePropertiesWithId;
}

export const Shape: React.FC<ShapeProps> = ({ shape }) => {
  switch (shape.type) {
    case AtomicFlowShapes.TEST.RECT:
      return <Rectangle {...shape} />;
    case AtomicFlowShapes.TEST.CIRCLE:
      return <Circle {...shape} />;
    default:
      return <></>;
  }
};
