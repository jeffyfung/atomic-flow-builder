import { ShapeProperties, ShapeType } from "../../features/shape";
import { ArcAFIDN, ArcAFIDXC, ArcAFIIDXC, WedgeAFAAUC, WedgeAFAUC, WedgeAFCCUC, WedgeAFCCUNC, WedgeAFCUC, WedgeAFCUNC, WedgeAFCUXC, WedgeAFWUC, WedgeAFWUN, WedgeAFWWUC } from "../../features/shape-objects";
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
    case ShapeType.HOLLOW_WEDGE_AFWUC:
      return <WedgeAFWUC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFWWUC:
      return <WedgeAFWWUC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFAUC:
      return <WedgeAFAUC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFAAUC:
      return <WedgeAFAAUC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFCUC:
      return <WedgeAFCUC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFCUNC:
      return <WedgeAFCUNC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUC:
      return <WedgeAFCCUC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUNC:
      return <WedgeAFCCUNC {...shape} />;
    case ShapeType.HOLLOW_WEDGE_AFCUXC:
      return <WedgeAFCUXC {...shape} />;
    default:
      return <></>;
  }
};
