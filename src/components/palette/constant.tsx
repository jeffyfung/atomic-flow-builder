import { AtomicFlowShapes, ShapeType } from "../../features/shape";
import afidnIcon from "../../res/palette-icons/arc.png";
import afiunIcon from "../../res/palette-icons/upside_down_arc.png";
import hollowWedgeIcon from "../../res/palette-icons/wedge.png";
import invertedhollowWedgeIcon from "../../res/palette-icons/upside_down_wedge.png";
import solidWedgeIcon from "../../res/palette-icons/solid_wedge.png";
import invertedSolidWedgeIcon from "../../res/palette-icons/upside_down_solid_wedge.png";
import dotIcon from "../../res/palette-icons/dot.png";

export interface PaletteItemSchema {
  iconElement: React.ReactNode;
  nested: true;
  children: LeafPaletteItemSchema[];
}

export interface LeafPaletteItemSchema {
  shapeType: ShapeType;
  nested: false;
  iconElement: React.ReactNode;
}

type PaletteItemSchemaType = PaletteItemSchema | LeafPaletteItemSchema;

const arcCatItemSchema: LeafPaletteItemSchema[] = [
  {
    shapeType: AtomicFlowShapes.ARC.ARC_AFIDN,
    iconElement: <img src={afidnIcon} alt="afid" width="30px" />,
    nested: false,
  },
  {
    shapeType: AtomicFlowShapes.ARC.ARC_AFIUN,
    iconElement: <img src={afiunIcon} alt="afid" width="30px" />,
    nested: false,
  },
  {
    shapeType: AtomicFlowShapes.TEST.RECT,
    iconElement: <img src={afiunIcon} alt="afid" width="30px" />,
    nested: false,
  },
];

const invertedArcCatItemSchema: LeafPaletteItemSchema[] = [];

const hollowWedgeCatItemSchema: LeafPaletteItemSchema[] = [];

const invertedhollowWedgeCatItemSchema: LeafPaletteItemSchema[] = [];

const solidWedgeCatItemSchema: LeafPaletteItemSchema[] = [];

const invertedSolidWedgeCatItemSchema: LeafPaletteItemSchema[] = [];

const dotCatItemSchema: LeafPaletteItemSchema[] = [];

export const paletteItemSchema: PaletteItemSchemaType[] = [
  {
    // shapeType: ShapeType.ARC,
    iconElement: <img src={afidnIcon} alt="arcCatIcon" width="30px" />,
    nested: true,
    children: arcCatItemSchema,
  },
  {
    // shapeType: ShapeType.ARC_AFIUN,
    iconElement: <img src={afiunIcon} alt="invertedArcCatIcon" width="25px" />,
    nested: true,
    children: invertedArcCatItemSchema,
  },
  {
    // shapeType: ShapeType.HOLLOW_WEDGE,
    iconElement: <img src={hollowWedgeIcon} alt="hollowWedgeIcon" width="25px" />,
    nested: true,
    children: hollowWedgeCatItemSchema,
  },
  {
    // shapeType: ShapeType.INVERTED_HOLLOW_WEDGE,
    iconElement: <img src={invertedhollowWedgeIcon} alt="invertedhollowWedgeIcon" width="25px" />,
    nested: true,
    children: invertedhollowWedgeCatItemSchema,
  },
  {
    // shapeType: ShapeType.SOLID_WEDGE,
    iconElement: <img src={solidWedgeIcon} alt="solidWedgeIcon" width="25px" />,
    nested: true,
    children: solidWedgeCatItemSchema,
  },
  {
    // shapeType: ShapeType.INVERTED_SOLID_WEDGE,
    iconElement: <img src={invertedSolidWedgeIcon} alt="invertedSolidWedgeIcon" width="25px" />,
    nested: true,
    children: invertedSolidWedgeCatItemSchema,
  },
  {
    // shapeType: ShapeType.DOT,
    iconElement: <img src={dotIcon} alt="dot" width="23px" />,
    nested: true,
    children: dotCatItemSchema,
  },
];
