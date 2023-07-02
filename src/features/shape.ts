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

export enum ShapeType {
  RECT = "rect",
  CIRCLE = "circle",
  TRI_WEDGE = "triWedge",
  TRI_WEDGE_SOLID = "triWedgeSolid",
}

export interface ShapePropertiesWithId extends ShapeProperties {
  id: string;
}

export const getShapeProperties = ({ type, clientX, clientY, offsetX, offsetY, coordX, coordY }: DropPoint): ShapeProperties => {
  switch (type) {
    case ShapeType.RECT:
      return {
        type,
        width: 150,
        height: 100,
        stroke: "#000000",
        rotation: 0,
        x: coordX - offsetX,
        y: coordY - offsetY,
      };
    // case ShapeType.CIRCLE:
    default:
      return {
        type,
        radius: 50,
        stroke: "#000000",
        x: coordX - (offsetX - clientX / 2),
        y: coordY - (offsetY - clientY / 2),
      };
  }
};
