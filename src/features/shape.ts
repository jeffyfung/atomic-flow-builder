export interface ShapeProperties {
  type: ShapeType;
  x: number;
  y: number;
  widthFactor?: number;
  heightFactor?: number;
  stroke?: string[];
  fill?: string;
  // radius?: number;
  // rotation?: number;
}

export enum ShapeType {
  ARC_AFIDN,
  ARC_AFIDXC,
  ARC_AFIIDXC,
  INVERTED_ARC_AFIUN,
  INVERTED_ARC_AFIUXC,
  INVERTED_ARC_AFIIUXC,
  HOLLOW_WEDGE_AFWUN, // AFAUN
  HOLLOW_WEDGE_AFWUC,
  HOLLOW_WEDGE_AFWWUC,
  HOLLOW_WEDGE_AFAUC,
  HOLLOW_WEDGE_AFAAUC,
  HOLLOW_WEDGE_AFCUC,
  HOLLOW_WEDGE_AFCUNC,
  HOLLOW_WEDGE_AFCCUC,
  HOLLOW_WEDGE_AFCCUNC,
  HOLLOW_WEDGE_AFCUXC, // AND MORE
  RECT,
  CIRCLE,
  // INVERTED_HOLLOW_WEDGE = "invertedHollowWedge",
  // SOLID_WEDGE = "solidWedge",
  // INVERTED_SOLID_WEDGE = "invertedSolidWedge",
  // DOT = "dot",
}

// TODO: is this func necessary?
// export const getShapeProperties = ({ type, clientX, clientY, offsetX, offsetY, screenX, screenY, coordX, coordY }: DropPoint): ShapeProperties => {
//   switch (type) {
//     case ShapeType.ARC_AFIDN:
//       return {
//         type,
//         x: clientX,
//         y: clientY,
//       };
//     case ShapeType.ARC_AFIDXC:
//       return {
//         type,
//         x: clientX,
//         y: clientY,
//       };
//     case ShapeType.ARC_AFIIDXC:
//       return {
//         type,
//         x: clientX,
//         y: clientY,
//       };
//     case ShapeType.INVERTED_ARC_AFIUN:
//       return {
//         type,
//         x: clientX,
//         y: clientY,
//       };
//     case ShapeType.INVERTED_ARC_AFIUXC:
//       return {
//         type,
//         x: clientX,
//         y: clientY,
//       };
//     case ShapeType.INVERTED_ARC_AFIIUXC:
//       return {
//         type,
//         x: clientX,
//         y: clientY,
//       };
//     // case AtomicFlowShapes.TEST.RECT:
//     //   return {
//     //     type,
//     //     width: 150,
//     //     height: 100,
//     //     stroke: "#000000",
//     //     rotation: 0,
//     //     x: clientX,
//     //     y: clientY,
//     //     // x: coordX - offsetX,
//     //     // y: coordY - offsetY,
//     //   };
//     // case ShapeType.CIRCLE:
//     // return {
//     //   type,
//     //   radius: 50,
//     //   stroke: "#000000",
//     //   x: coordX! - (offsetX - clientX / 2),
//     //   y: coordY! - (offsetY - clientY / 2),
//     // };
//     default:
//       throw new Error("Invalid shape type");
//   }
// };
