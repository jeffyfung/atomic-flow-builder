import { DropPoint } from "./canvas";

// UPDATE according to konva shape properties
export interface ShapeProperties {
  type: ShapeType;
  width?: number;
  height?: number;
  fill?: string;
  stroke: string;
  radius?: number;
  rotation?: number;
  x: number;
  y: number;
}

enum ArcType {
  ARC_AFIDN = "arcAFIDN",
  ARC_AFIUN = "arcAFIUN",
}

enum InvertedArcType {}

enum TestType {
  RECT = "rect",
  CIRCLE = "circle",
}

export const AtomicFlowShapes = {
  ARC: ArcType,
  INVERTED_ARC: InvertedArcType,
  TEST: TestType,
  // HOLLOW_WEDGE = "hollowWedge",
  // INVERTED_HOLLOW_WEDGE = "invertedHollowWedge",
  // SOLID_WEDGE = "solidWedge",
  // INVERTED_SOLID_WEDGE = "invertedSolidWedge",
  // DOT = "dot",
};

export type ShapeType = (typeof AtomicFlowShapes)[keyof typeof AtomicFlowShapes];

export interface ShapePropertiesWithId extends ShapeProperties {
  id: string;
}

export const getShapeProperties = ({ type, clientX, clientY, offsetX, offsetY, screenX, screenY, coordX, coordY }: DropPoint): ShapeProperties => {
  switch (type) {
    case AtomicFlowShapes.TEST.RECT:
      return {
        type,
        width: 150,
        height: 100,
        stroke: "#000000",
        rotation: 0,
        x: clientX,
        y: clientY,
        // x: coordX - offsetX,
        // y: coordY - offsetY,
      };
    // case ShapeType.CIRCLE:
    default:
      return {
        type,
        radius: 50,
        stroke: "#000000",
        x: coordX! - (offsetX - clientX / 2),
        y: coordY! - (offsetY - clientY / 2),
      };
  }
};
