import React from "react";
import { ShapeProperties, ShapeType } from "../../features/shape";
import { ArcAFIDN, ArcAFIDXC, ArcAFIIDXC, WedgeAFAAUC, WedgeAFAUC, WedgeAFCCUC, WedgeAFCCUNC, WedgeAFCCUNXC, WedgeAFCCUNXXC, WedgeAFCCUXC, WedgeAFCCUXXC, WedgeAFCUC, WedgeAFCUNC, WedgeAFCUNXC, WedgeAFCUNXXC, WedgeAFCUXC, WedgeAFCUXXC, WedgeAFWUC, WedgeAFWUN, WedgeAFWWUC } from "../../features/shape-objects";
import { ArcAFIIUXC, ArcAFIUN, ArcAFIUXC } from "../../features/shape-objects/inverted-arc";
import Konva from "konva";

export interface ShapeProps {
  selected: boolean;
  shapeId: string;
  shape: ShapeProperties & { id: string };
  onClick: (evt: Konva.KonvaEventObject<MouseEvent>, id: string) => void;
  handleMouseEnter: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  handleMouseLeave: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  handleDragStart: (event: Konva.KonvaEventObject<DragEvent>) => void;
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
    case ShapeType.HOLLOW_WEDGE_AFCUNXC:
      return <WedgeAFCUNXC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUXC:
      return <WedgeAFCCUXC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUNXC:
      return <WedgeAFCCUNXC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCUXXC:
      return <WedgeAFCUXXC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCUNXXC:
      return <WedgeAFCUNXXC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUXXC:
      return <WedgeAFCCUXXC {...props} />;
    case ShapeType.HOLLOW_WEDGE_AFCCUNXXC:
      return <WedgeAFCCUNXXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFWUSN:
      return <WedgeAFWUN {...props} />;
    case ShapeType.SOLID_WEDGE_AFWUSC:
      return <WedgeAFWUC {...props} />;
    case ShapeType.SOLID_WEDGE_AFWWUSC:
      return <WedgeAFWWUC {...props} />;
    case ShapeType.SOLID_WEDGE_AFAUSC:
      return <WedgeAFAUC {...props} />;
    case ShapeType.SOLID_WEDGE_AFAAUSC:
      return <WedgeAFAAUC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCUSC:
      return <WedgeAFCUC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCUSNC:
      return <WedgeAFCUNC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCCUSC:
      return <WedgeAFCCUC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCCUSNC:
      return <WedgeAFCCUNC {...props} />;
    default:
      return <></>;
  }
};
