import React from "react";
import { ShapeProperties, ShapeType } from "../../features/shape";
import {
  ArcAFIDN,
  ArcAFIDXC,
  ArcAFIIDXC,
  DotAFCDDC,
  DotAFCDDNC,
  DotAFCDDNXC,
  DotAFCDDN_XC,
  DotAFCDDXC,
  DotAFCDD_XC,
  DotAFCUDC,
  DotAFCUDNC,
  DotAFCUDNXC,
  DotAFCUDN_XC,
  DotAFCUDXC,
  DotAFCUD_XC,
  DotAFD,
  DotAFDDC,
  DotAFDUC,
  DotAF_CDDC,
  DotAF_CDDNC,
  DotAF_CDDNXC,
  DotAF_CDDN_XC,
  DotAF_CDDXC,
  DotAF_CDD_XC,
  DotAF_CUDC,
  DotAF_CUDNC,
  DotAF_CUDNXC,
  DotAF_CUDN_XC,
  DotAF_CUDXC,
  DotAF_CUD_XC,
  DotAF_DDC,
  DotAF_DUC,
  WedgeAFAAUC,
  WedgeAFAUC,
  WedgeAFCCUC,
  WedgeAFCCUNC,
  WedgeAFCCUNXC,
  WedgeAFCCUNXXC,
  WedgeAFCCUXC,
  WedgeAFCCUXXC,
  WedgeAFCUC,
  WedgeAFCUNC,
  WedgeAFCUNXC,
  WedgeAFCUNXXC,
  WedgeAFCUXC,
  WedgeAFCUXXC,
  WedgeAFWUC,
  WedgeAFWUN,
  WedgeAFWWUC,
  StraightLine_AFBD,
  StraightLine_AFBU,
  StraightLine_AFVDJ,
} from "./shape-objects";
import { ArcAFIIUXC, ArcAFIUN, ArcAFIUXC } from "./shape-objects/inverted-arc";
import Konva from "konva";
import { WedgeAFAADC, WedgeAFADC, WedgeAFCCDC, WedgeAFCCDNC, WedgeAFCCDNXC, WedgeAFCCDNXXC, WedgeAFCCDSXC, WedgeAFCCDXXC, WedgeAFCDC, WedgeAFCDNC, WedgeAFCDNXC, WedgeAFCDNXXC, WedgeAFCDXC, WedgeAFCDXXC, WedgeAFWDC, WedgeAFWDN, WedgeAFWWDC } from "./shape-objects/inverted-wedge";
import { AFV$1C, AF_V$1C } from "./shape-objects/drawable-shapes";

export interface ShapeProps {
  selected: boolean;
  shapeId: string;
  shape: ShapeProperties & { id: string };
  onClick: (evt: Konva.KonvaEventObject<MouseEvent>, id: string) => void;
  handleMouseEnter: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  handleMouseLeave: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
  handleDragStart: (event: Konva.KonvaEventObject<DragEvent>) => void;
  handleDragEnd: (event: Konva.KonvaEventObject<DragEvent>, id: string) => void;
  handleAnchorDragMove: (shapeId: string, payload: Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">) => void;
  handleAnchorDragEnd: (shapeId: string, payload: Partial<Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">>) => void;
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
    case ShapeType.SOLID_WEDGE_AFCUSXC:
      return <WedgeAFCUXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCUSNXC:
      return <WedgeAFCUNXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCCUSXC:
      return <WedgeAFCCUXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCCUSNXC:
      return <WedgeAFCCUNXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCUSXXC:
      return <WedgeAFCUXXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCUSNXXC:
      return <WedgeAFCUNXXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCCUSXXC:
      return <WedgeAFCCUXXC {...props} />;
    case ShapeType.SOLID_WEDGE_AFCCUSNXXC:
      return <WedgeAFCCUNXXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFWDN:
      return <WedgeAFWDN {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFWDC:
      return <WedgeAFWDC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFWWDC:
      return <WedgeAFWWDC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFADC:
      return <WedgeAFADC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFAADC:
      return <WedgeAFAADC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDC:
      return <WedgeAFCDC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDNC:
      return <WedgeAFCDNC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDC:
      return <WedgeAFCCDC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDNC:
      return <WedgeAFCCDNC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDXC:
      return <WedgeAFCDXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDNXC:
      return <WedgeAFCDNXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDXC:
      return <WedgeAFCCDSXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDNXC:
      return <WedgeAFCCDNXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDXXC:
      return <WedgeAFCDXXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDNXXC:
      return <WedgeAFCDNXXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDXXC:
      return <WedgeAFCCDXXC {...props} />;
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDNXXC:
      return <WedgeAFCCDNXXC {...props} />;
    //
    case ShapeType.INVERTED_SOLID_WEDGE_AFWDSN:
      return <WedgeAFWDN {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFWDSC:
      return <WedgeAFWDC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFWWDSC:
      return <WedgeAFWWDC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFADSC:
      return <WedgeAFADC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFAADSC:
      return <WedgeAFAADC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSC:
      return <WedgeAFCDC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSNC:
      return <WedgeAFCDNC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSC:
      return <WedgeAFCCDC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSNC:
      return <WedgeAFCCDNC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSXC:
      return <WedgeAFCDXC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSNXC:
      return <WedgeAFCDNXC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSXC:
      return <WedgeAFCCDSXC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSNXC:
      return <WedgeAFCCDNXC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSXXC:
      return <WedgeAFCDXXC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSNXXC:
      return <WedgeAFCDNXXC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSXXC:
      return <WedgeAFCCDXXC {...props} />;
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSNXXC:
      return <WedgeAFCCDNXXC {...props} />;
    //
    case ShapeType.DOT_AFD:
      return <DotAFD {...props} />;
    case ShapeType.DOT_AFDDC:
      return <DotAFDDC {...props} />;
    case ShapeType.DOT_AF_DDC:
      return <DotAF_DDC {...props} />;
    case ShapeType.DOT_AFDUC:
      return <DotAFDUC {...props} />;
    case ShapeType.DOT_AF_DUC:
      return <DotAF_DUC {...props} />;
    case ShapeType.DOT_AFCDDC:
      return <DotAFCDDC {...props} />;
    case ShapeType.DOT_AFCDDNC:
      return <DotAFCDDNC {...props} />;
    case ShapeType.DOT_AF_CDDC:
      return <DotAF_CDDC {...props} />;
    case ShapeType.DOT_AF_CDDNC:
      return <DotAF_CDDNC {...props} />;
    case ShapeType.DOT_AFCUDC:
      return <DotAFCUDC {...props} />;
    case ShapeType.DOT_AFCUDNC:
      return <DotAFCUDNC {...props} />;
    case ShapeType.DOT_AF_CUDC:
      return <DotAF_CUDC {...props} />;
    case ShapeType.DOT_AF_CUDNC:
      return <DotAF_CUDNC {...props} />;
    case ShapeType.DOT_AFCDDXC:
      return <DotAFCDDXC {...props} />;
    case ShapeType.DOT_AFCDDNXC:
      return <DotAFCDDNXC {...props} />;
    case ShapeType.DOT_AF_CDDXC:
      return <DotAF_CDDXC {...props} />;
    case ShapeType.DOT_AF_CDDNXC:
      return <DotAF_CDDNXC {...props} />;
    case ShapeType.DOT_AFCUDXC:
      return <DotAFCUDXC {...props} />;
    case ShapeType.DOT_AFCUDNXC:
      return <DotAFCUDNXC {...props} />;
    case ShapeType.DOT_AF_CUDXC:
      return <DotAF_CUDXC {...props} />;
    case ShapeType.DOT_AF_CUDNXC:
      return <DotAF_CUDNXC {...props} />;
    case ShapeType.DOT_AFCDD_XC:
      return <DotAFCDD_XC {...props} />;
    case ShapeType.DOT_AFCDDN_XC:
      return <DotAFCDDN_XC {...props} />;
    case ShapeType.DOT_AF_CDD_XC:
      return <DotAF_CDD_XC {...props} />;
    case ShapeType.DOT_AF_CDDN_XC:
      return <DotAF_CDDN_XC {...props} />;
    case ShapeType.DOT_AFCUD_XC:
      return <DotAFCUD_XC {...props} />;
    case ShapeType.DOT_AFCUDN_XC:
      return <DotAFCUDN_XC {...props} />;
    case ShapeType.DOT_AF_CUD_XC:
      return <DotAF_CUD_XC {...props} />;
    case ShapeType.DOT_AF_CUDN_XC:
      return <DotAF_CUDN_XC {...props} />;
    case ShapeType.STRAIGHT_LINE_AFBD:
      return <StraightLine_AFBD {...props} />;
    case ShapeType.STRAIGHT_LINE_AFBU:
      return <StraightLine_AFBU {...props} />;
    case ShapeType.STRAIGHT_LINE_AFVDJ:
      return <StraightLine_AFVDJ {...props} />;
    case ShapeType.STRAIGHT_LINE_AFV$1C:
      return <AFV$1C {...props} />;
    case ShapeType.STRAIGHT_LINE_AF_V$1C:
      return <AF_V$1C {...props} />;
    // case ShapeType.STRAIGHT_LINE_AFJ$1C:
    //   return <AFJ$1C {...props} />;
    default:
      return <></>;
  }
  //
};
