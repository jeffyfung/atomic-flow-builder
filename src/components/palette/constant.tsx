import { ShapeType } from "../../features/shape";
import afidnIcon from "../../res/palette-icons/arc.png";
import afidxcIcon from "../../res/palette-icons/afidx.png";
import afiidxcIcon from "../../res/palette-icons/afiidx.png";
import afiuxcIcon from "../../res/palette-icons/afiux.png";
import afiiuxcIcon from "../../res/palette-icons/afiiux.png";
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
    shapeType: ShapeType.ARC_AFIDN,
    iconElement: <img src={afidnIcon} alt="afidn" width="30px" />,
    nested: false,
  },
  {
    shapeType: ShapeType.ARC_AFIDXC,
    iconElement: <img src={afidxcIcon} alt="afidxc" width="30px" />,
    nested: false,
  },
  {
    shapeType: ShapeType.ARC_AFIIDXC,
    iconElement: <img src={afiidxcIcon} alt="afiidxc" width="30px" />,
    nested: false,
  },
];

const invertedArcCatItemSchema: LeafPaletteItemSchema[] = [
  {
    shapeType: ShapeType.INVERTED_ARC_AFIUN,
    iconElement: <img src={afiunIcon} alt="afiun" width="30px" />,
    nested: false,
  },
  {
    shapeType: ShapeType.INVERTED_ARC_AFIUXC,
    iconElement: <img src={afiuxcIcon} alt="afiuxc" width="30px" />,
    nested: false,
  },
  {
    shapeType: ShapeType.INVERTED_ARC_AFIIUXC,
    iconElement: <img src={afiiuxcIcon} alt="afiiuxc" width="30px" />,
    nested: false,
  },
];

const hollowWedgeCatItemSchema: LeafPaletteItemSchema[] = [
  {
    shapeType: ShapeType.HOLLOW_WEDGE_AFWUN,
    iconElement: <img src={afiunIcon} alt="afwun" width="30px" />,
    nested: false,
  },
];

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
