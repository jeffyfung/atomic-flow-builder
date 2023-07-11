import { ShapeProperties, ShapeType } from "../../features/shape";
import { ArcAFIDN, ArcAFIDXC, ArcAFIIDXC, WedgeAFWUN } from "../../features/shape-objects";
import { ArcAFIIUXC, ArcAFIUN, ArcAFIUXC } from "../../features/shape-objects/inverted-arc";

export interface ShapeProps {
  key: string;
  shape: ShapeProperties & { id: string };
}

export const Shape: React.FC<ShapeProps> = ({ shape }) => {
  switch (shape.type) {
    case ShapeType.ARC_AFIDN:
      return <ArcAFIDN {...shape} />;
    case ShapeType.ARC_AFIDXC:
      return <ArcAFIDXC {...shape} />;
    case ShapeType.ARC_AFIIDXC:
      return <ArcAFIIDXC {...shape} />;
    case ShapeType.INVERTED_ARC_AFIUN:
      return <ArcAFIUN {...shape} />;
    case ShapeType.INVERTED_ARC_AFIUXC:
      return <ArcAFIUXC {...shape} />;
    case ShapeType.INVERTED_ARC_AFIIUXC:
      return <ArcAFIIUXC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFWUN:
      return <WedgeAFWUN {...shape} />;
    default:
      return <></>;
  }
};
