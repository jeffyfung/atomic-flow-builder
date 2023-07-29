import React from "react";
import { ShapeProperties, ShapeType } from "../../features/shape";
import { ArcAFIDN, ArcAFIDXC, ArcAFIIDXC, WedgeAFAAUC, WedgeAFAUC, WedgeAFCCUC, WedgeAFCCUNC, WedgeAFCUC, WedgeAFCUNC, WedgeAFCUXC, WedgeAFWUC, WedgeAFWUN, WedgeAFWWUC } from "../../features/shape-objects";
import { ArcAFIIUXC, ArcAFIUN, ArcAFIUXC } from "../../features/shape-objects/inverted-arc";
import Konva from "konva";

export interface ShapeProps {
  selected: boolean;
  shapeId: string;
  shape: ShapeProperties & { id: string };
  onClick: (evt: Konva.KonvaEventObject<MouseEvent>, id: string) => void;
  handleMouseEnter: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  handleMouseLeave: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  handleDragEnd: (event: Konva.KonvaEventObject<DragEvent>, id: string) => void;
}

export const Shape: React.FC<ShapeProps> = (props) => {
  switch (props.shape.type) {
    case ShapeType.ARC_AFIDN:
      return <ArcAFIDN {...props} />;
    case ShapeType.ARC_AFIDXC:
      return <ArcAFIDXC {...props} />;
    case ShapeType.ARC_AFIIDXC:
      return <ArcAFIIDXC {...props} />;
    case ShapeType.INVERTED_ARC_AFIUN:
      return <ArcAFIUN {...props} />;
    case ShapeType.INVERTED_ARC_AFIUXC:
      return <ArcAFIUXC {...props} />;
    case ShapeType.INVERTED_ARC_AFIIUXC:
      return <ArcAFIIUXC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFWUN:
      return <WedgeAFWUN {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFWUC:
      return <WedgeAFWUC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFWWUC:
      return <WedgeAFWWUC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFAUC:
      return <WedgeAFAUC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFAAUC:
      return <WedgeAFAAUC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCUC:
      return <WedgeAFCUC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCUNC:
      return <WedgeAFCUNC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUC:
      return <WedgeAFCCUC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUNC:
      return <WedgeAFCCUNC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCUXC:
      return <WedgeAFCUXC {...props} />;
    default:
      return <></>;
  }
};
