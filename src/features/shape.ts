import { getGridCoordinate } from "../components/canvas/gridline";

export interface ShapeProperties {
  type: ShapeType;
  x: number;
  y: number;
  gridX: number;
  gridY: number;
  label1?: string;
  label2?: string;
  label3?: string;
  label4?: string;
  label5?: string;
  label6?: string;
  stroke1?: LatexColour;
  stroke2?: LatexColour;
  stroke3?: LatexColour;
  widthFactor?: number;
  heightFactor?: number;
  fill?: string;
  labelPlacement?: LabelPlacement;
  draw?: DrawProperties2V | DrawPropertiesArc | DrawPropertiesRect;
  variables: (keyof ShapeProperties | "length" | "width")[];
}

export interface Coordinates {
  x: number;
  y: number;
  gridX: number;
  gridY: number;
}

export enum DrawableShapeType {
  TWO_VERTEX = "2v",
  ARC = "arc",
  RECT = "rect",
}

interface DrawProperties2V {
  type: DrawableShapeType.TWO_VERTEX;
  preview: boolean;
  start?: Coordinates;
  end?: Coordinates;
}

interface DrawPropertiesArc {
  type: DrawableShapeType.ARC;
  preview: boolean;
  top?: Coordinates;
  bottom?: Coordinates;
  middle?: Coordinates;
}

interface DrawPropertiesRect {
  type: DrawableShapeType.RECT;
  preview: boolean;
  p1?: Coordinates; // topLeft
  p2?: Coordinates; // topRight
  p3?: Coordinates; // bottomLeft
  p4?: Coordinates; // bottomRight
}

export enum LabelPlacement {
  HIGH = "high",
  LOW = "low",
}

export enum ShapeType {
  ARC_AFIDN = "afidn",
  ARC_AFIDXC = "afidxc",
  ARC_AFIIDXC = "afIdxc",
  INVERTED_ARC_AFIUN = "afiun",
  INVERTED_ARC_AFIUXC = "afiuxc",
  INVERTED_ARC_AFIIUXC = "afIuxc",
  HOLLOW_WEDGE_AFWUN = "afwun", // AFAUN
  HOLLOW_WEDGE_AFWUC = "afwuc",
  HOLLOW_WEDGE_AFWWUC = "afWuc",
  HOLLOW_WEDGE_AFAUC = "afauc",
  HOLLOW_WEDGE_AFAAUC = "afAuc",
  HOLLOW_WEDGE_AFCUC = "afcuc",
  HOLLOW_WEDGE_AFCUNC = "afcunc",
  HOLLOW_WEDGE_AFCCUC = "afCuc",
  HOLLOW_WEDGE_AFCCUNC = "afCunc",
  HOLLOW_WEDGE_AFCUXC = "afcuxc",
  HOLLOW_WEDGE_AFCUNXC = "afcunxc",
  HOLLOW_WEDGE_AFCCUXC = "afCuxc",
  HOLLOW_WEDGE_AFCCUNXC = "afCunxc",
  HOLLOW_WEDGE_AFCUXXC = "afcuXc",
  HOLLOW_WEDGE_AFCUNXXC = "afcunXc",
  HOLLOW_WEDGE_AFCCUXXC = "afCuXc",
  HOLLOW_WEDGE_AFCCUNXXC = "afCunXc",
  SOLID_WEDGE_AFWUSN = "afwusn",
  SOLID_WEDGE_AFWUSC = "afwusc",
  SOLID_WEDGE_AFWWUSC = "afWusc",
  SOLID_WEDGE_AFAUSC = "afausc",
  SOLID_WEDGE_AFAAUSC = "afAusc",
  SOLID_WEDGE_AFCUSC = "afcusc",
  SOLID_WEDGE_AFCUSNC = "afcusnc",
  SOLID_WEDGE_AFCCUSC = "afCusc",
  SOLID_WEDGE_AFCCUSNC = "afCusnc",
  SOLID_WEDGE_AFCUSXC = "afcusxc",
  SOLID_WEDGE_AFCUSNXC = "afcusnxc",
  SOLID_WEDGE_AFCCUSXC = "afCusxc",
  SOLID_WEDGE_AFCCUSNXC = "afCusnxc",
  SOLID_WEDGE_AFCUSXXC = "afcusXc",
  SOLID_WEDGE_AFCUSNXXC = "afcusnXc",
  SOLID_WEDGE_AFCCUSXXC = "afCusXc",
  SOLID_WEDGE_AFCCUSNXXC = "afCusnXc",
  INVERTED_HOLLOW_WEDGE_AFWDN = "afwdn",
  INVERTED_HOLLOW_WEDGE_AFWDC = "afwdc",
  INVERTED_HOLLOW_WEDGE_AFWWDC = "afWdc",
  INVERTED_HOLLOW_WEDGE_AFADC = "afadc",
  INVERTED_HOLLOW_WEDGE_AFAADC = "afAdc",
  INVERTED_HOLLOW_WEDGE_AFCDC = "afcdc",
  INVERTED_HOLLOW_WEDGE_AFCDNC = "afcdnc",
  INVERTED_HOLLOW_WEDGE_AFCCDC = "afCdc",
  INVERTED_HOLLOW_WEDGE_AFCCDNC = "afCdnc",
  INVERTED_HOLLOW_WEDGE_AFCDXC = "afcdxc",
  INVERTED_HOLLOW_WEDGE_AFCDNXC = "afcdnxc",
  INVERTED_HOLLOW_WEDGE_AFCCDXC = "afCdxc",
  INVERTED_HOLLOW_WEDGE_AFCCDNXC = "afCdnxc",
  INVERTED_HOLLOW_WEDGE_AFCDXXC = "afcdXc",
  INVERTED_HOLLOW_WEDGE_AFCDNXXC = "afcdnXc",
  INVERTED_HOLLOW_WEDGE_AFCCDXXC = "afCdXc",
  INVERTED_HOLLOW_WEDGE_AFCCDNXXC = "afCdnXc",
  INVERTED_SOLID_WEDGE_AFWDSN = "afwdsn",
  INVERTED_SOLID_WEDGE_AFWDSC = "afwdsc",
  INVERTED_SOLID_WEDGE_AFWWDSC = "afWdsc",
  INVERTED_SOLID_WEDGE_AFADSC = "afadsc",
  INVERTED_SOLID_WEDGE_AFAADSC = "afAdsc",
  INVERTED_SOLID_WEDGE_AFCDSC = "afcdsc",
  INVERTED_SOLID_WEDGE_AFCDSNC = "afcdsnc",
  INVERTED_SOLID_WEDGE_AFCCDSC = "afCdsc",
  INVERTED_SOLID_WEDGE_AFCCDSNC = "afCdsnc",
  INVERTED_SOLID_WEDGE_AFCDSXC = "afcdsxc",
  INVERTED_SOLID_WEDGE_AFCDSNXC = "afcdsnxc",
  INVERTED_SOLID_WEDGE_AFCCDSXC = "afCdsxc",
  INVERTED_SOLID_WEDGE_AFCCDSNXC = "afCdsnxc",
  INVERTED_SOLID_WEDGE_AFCDSXXC = "afcdsXc",
  INVERTED_SOLID_WEDGE_AFCDSNXXC = "afcdsnXc",
  INVERTED_SOLID_WEDGE_AFCCDSXXC = "afCdsXc",
  INVERTED_SOLID_WEDGE_AFCCDSNXXC = "afCdsnXc",
  DOT_AFD = "afd",
  DOT_AFDDC = "afddc",
  DOT_AF_DDC = "afDdc",
  DOT_AFDUC = "afduc",
  DOT_AF_DUC = "afDuc",
  DOT_AFCDDC = "afcddc",
  DOT_AFCDDNC = "afcddnc",
  DOT_AF_CDDC = "afCddc",
  DOT_AF_CDDNC = "afCddnc",
  DOT_AFCUDC = "afcudc",
  DOT_AFCUDNC = "afcudnc",
  DOT_AF_CUDC = "afCudc",
  DOT_AF_CUDNC = "afCudnc",
  DOT_AFCDDXC = "afcddxc",
  DOT_AFCDDNXC = "afcddnxc",
  DOT_AF_CDDXC = "afCddxc",
  DOT_AF_CDDNXC = "afCddnxc",
  DOT_AFCUDXC = "afcudxc",
  DOT_AFCUDNXC = "afcudnxc",
  DOT_AF_CUDXC = "afCudxc",
  DOT_AF_CUDNXC = "afCudnxc",
  DOT_AFCDD_XC = "afcddXc",
  DOT_AFCDDN_XC = "afcddnXc",
  DOT_AF_CDD_XC = "afCddXc",
  DOT_AF_CDDN_XC = "afCddnXc",
  DOT_AFCUD_XC = "afcudXc",
  DOT_AFCUDN_XC = "afcudnXc",
  DOT_AF_CUD_XC = "afCudXc",
  DOT_AF_CUDN_XC = "afCudnXc",
  STRAIGHT_LINE_AFBD = "afbd",
  STRAIGHT_LINE_AFBU = "afbu",
  STRAIGHT_LINE_AFVDJ = "afvdj",
  STRAIGHT_LINE_AFV$1C = "afv$1c",
  STRAIGHT_LINE_AF_V$1C = "afV$1c",
  STRAIGHT_LINE_AFJ$2C = "afj$2c",
  STRAIGHT_LINE_AF_J$2C = "afJ$2c",
  STRAIGHT_LINE_AFC$2C = "afc$2c",
  STRAIGHT_LINE_AF_C$2C = "afC$2c",
  STRAIGHT_LINE_AFEXC = "afexc",
}

export enum LatexColour {
  BLACK = "black",
  BLUE = "blue",
  BROWN = "brown",
  CYAN = "cyan",
  DARKGRAY = "darkgray",
  GRAY = "gray",
  GREEN = "green",
  LIGHTGRAY = "lightgray",
  LIME = "lime",
  MAGENTA = "magenta",
  OLIVE = "olive",
  ORANGE = "orange",
  PINK = "pink",
  PURPLE = "purple",
  RED = "red",
  TEAL = "teal",
  VIOLET = "violet",
  WHITE = "white",
  YELLOW = "yellow",
  // DVIPS_APRICOT = "Apricot",
  // DVIPS_AQUAMARINE = "Aquamarine",
  // DVIPS_BITTERSWEET = "Bittersweet",
  // DVIPS_BLACK = "Black",
  // DVIPS_BLUE = "Blue",
  // DVIPS_BLUE_GREEN = "BlueGreen",
  // DVIPS_BLUE_VIOLET = "BlueViolet",
  // DVIPS_BRICK_RED = "BrickRed",
  // DVIPS_BROWN = "Brown",
  // DVIPS_BURNT_ORANGE = "BurntOrange",
  // DVIPS_CADET_BLUE = "CadetBlue",
  // DVIPS_CARNATION_PINK = "CarnationPink",
  // DVIPS_CERULEAN = "Cerulean",
  // DVIPS_CORNFLOWER_BLUE = "CornflowerBlue",
  // DVIPS_CYAN = "Cyan",
  // DVIPS_DANDELION = "Dandelion",
  // DVIPS_DARK_ORCHID = "DarkOrchid",
  // DVIPS_EMERALD = "Emerald",
  // DVIPS_FORREST_GREEN = "ForrestGreen",
  // DVIPS_FUCHSIA = "Fuchsia",
  // DVIPS_GOLDENROD = "Goldenrod",
  // DVIPS_GRAY = "Gray",
  // DVIPS_GREEN = "Green",
  // DVIPS_GREEN_YELLOW = "GreenYellow",
  // DVIPS_JUNGLE_GREEN = "JungleGreen",
  // DVIPS_LAVENDER = "Lavender",
  // DVIPS_LIME_GREENM = "LimeGreen",
  // DVIPS_MAGENTA = "Magenta",
  // DVIPS_MAHOGANY = "Mahogany",
  // DVIPS_MAROON = "Maroon",
  // DVIPS_MELON = "Melon",
  // DVIPS_MIDNIGHT_BLUE = "MidnightBlue",
  // DVIPS_MULBERRY = "Mulberry",
  // DVIPS_NAVY_BLUE = "NavyBlue",
  // DVIPS_OLIVE_GREEN = "OliveGreen",
  // DVIPS_ORANGE = "Orange",
  // DVIPS_ORANGE_RED = "OrangeRed",
  // DVIPS_ORCHID = "Orchid",
  // DVIPS_PEACH = "Peach",
  // DVIPS_PERIWINKLE = "Periwinkle",
  // DVIPS_PINE_GREEN = "PineGreen",
  // DVIPS_PLUM = "Plum",
  // DVIPS_PROCESS_BLUE = "ProcessBlue",
  // DVIPS_PURPLE = "Purple",
  // DVIPS_RAW_SIENNA = "RawSienna",
  // DVIPS_RED = "Red",
  // DVIPS_RED_ORANGE = "RedOrange",
  // DVIPS_RED_VIOLET = "RedViolet",
  // DVIPS_RHODAMINE = "Rhodamine",
  // DVIPS_ROYAL_BLUE = "RoyalBlue",
  // DVIPS_ROYAL_PURPLE = "RoyalPurple",
  // DVIPS_RUBINE_RED = "RubineRed",
  // DVIPS_SALMON = "Salmon",
  // DVIPS_SEA_GREEN = "SeaGreen",
  // DVIPS_SEPIA = "Sepia",
  // DVIPS_SKY_BLUE = "SkyBlue",
  // DVIPS_SPRING_GREEN = "SpringGreen",
  // DVIPS_TAN = "Tan",
  // DVIPS_TEAL_BLUE = "TealBlue",
  // DVIPS_THISTLE = "Thistle",
  // DVIPS_TURQUOISE = "Turquoise",
  // DVIPS_VIOLET = "Violet",
  // DVIPS_VIOLET_RED = "VioletRed",
  // DVIPS_WHITE = "White",
  // DVIPS_WILD_STRAWBERRY = "WildStrawberry",
  // DVIPS_YELLOW = "Yellow",
  // DVIPS_YELLOW_GREEN = "YellowGreen",
  // DVIPS_YELLOW_ORANGE = "YellowOrange",
}

export const getShapeProperties = (type: ShapeType, x: number, y: number): ShapeProperties => {
  const { gridX, gridY } = getGridCoordinate(x, y);
  switch (type) {
    case ShapeType.ARC_AFIDN:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        variables: [],
      };
    case ShapeType.ARC_AFIDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        widthFactor: 1,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.ARC_AFIIDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_ARC_AFIUN:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        variables: [],
      };
    case ShapeType.INVERTED_ARC_AFIUXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        widthFactor: 1,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_ARC_AFIIUXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.HOLLOW_WEDGE_AFWUN:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        fill: "white",
        variables: [],
      };
    case ShapeType.HOLLOW_WEDGE_AFWUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.HOLLOW_WEDGE_AFWWUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.HOLLOW_WEDGE_AFAUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.HOLLOW_WEDGE_AFAAUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCUNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCCUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCCUNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCUXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCUNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCCUXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCCUNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCUXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCUNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCCUXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.HOLLOW_WEDGE_AFCCUNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.SOLID_WEDGE_AFWUSN:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        fill: "black",
        variables: [],
      };
    case ShapeType.SOLID_WEDGE_AFWUSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.SOLID_WEDGE_AFWWUSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.SOLID_WEDGE_AFAUSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.SOLID_WEDGE_AFAAUSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.SOLID_WEDGE_AFCUSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.SOLID_WEDGE_AFCUSNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.SOLID_WEDGE_AFCCUSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.SOLID_WEDGE_AFCCUSNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.SOLID_WEDGE_AFCUSXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.SOLID_WEDGE_AFCUSNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.SOLID_WEDGE_AFCCUSXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.SOLID_WEDGE_AFCCUSNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.SOLID_WEDGE_AFCUSXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.SOLID_WEDGE_AFCUSNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.SOLID_WEDGE_AFCCUSXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.SOLID_WEDGE_AFCCUSNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFWDN:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        fill: "white",
        variables: [],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFWDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFWWDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFADC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFAADC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCDNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_HOLLOW_WEDGE_AFCCDNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    //
    case ShapeType.INVERTED_SOLID_WEDGE_AFWDSN:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        fill: "black",
        variables: [],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFWDSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFWWDSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFADSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFAADSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCDSNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "white",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.INVERTED_SOLID_WEDGE_AFCCDSNXXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        fill: "black",
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AFD:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        variables: [],
      };
    case ShapeType.DOT_AFDDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.DOT_AF_DDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.DOT_AFDUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.DOT_AF_DUC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        variables: ["label1", "label2", "stroke1"],
      };
    case ShapeType.DOT_AFCDDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AFCDDNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AF_CDDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AF_CDDNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AFCUDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AFCUDNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AF_CUDC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AF_CUDNC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AFCDDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AFCDDNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AF_CDDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AF_CDDNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AFCUDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AFCUDNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AF_CUDXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AF_CUDNXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AFCDD_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AFCDDN_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AF_CDD_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AF_CDDN_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AFCUD_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AFCUDN_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.DOT_AF_CUD_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        stroke3: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "label5", "label6", "widthFactor", "stroke1", "stroke2", "stroke3"],
      };
    case ShapeType.DOT_AF_CUDN_XC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        label3: "",
        label4: "",
        widthFactor: 1,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        variables: ["label1", "label2", "label3", "label4", "widthFactor", "stroke1", "stroke2"],
      };
    case ShapeType.STRAIGHT_LINE_AFBD:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        variables: [],
      };
    case ShapeType.STRAIGHT_LINE_AFBU:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        variables: [],
      };
    case ShapeType.STRAIGHT_LINE_AFVDJ:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        variables: [],
      };
    case ShapeType.STRAIGHT_LINE_AFV$1C:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        labelPlacement: LabelPlacement.HIGH,
        draw: { type: DrawableShapeType.TWO_VERTEX, preview: false },
        variables: ["length", "label1", "label2", "stroke1", "labelPlacement"],
      };
    case ShapeType.STRAIGHT_LINE_AF_V$1C:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        label1: "",
        label2: "",
        stroke1: LatexColour.BLACK,
        labelPlacement: LabelPlacement.HIGH,
        draw: { type: DrawableShapeType.TWO_VERTEX, preview: false },
        variables: ["length", "label1", "label2", "stroke1", "labelPlacement"],
      };
    case ShapeType.STRAIGHT_LINE_AFJ$2C:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        stroke1: LatexColour.BLACK,
        draw: { type: DrawableShapeType.TWO_VERTEX, preview: false },
        variables: ["width", "length", "stroke1"],
      };
    case ShapeType.STRAIGHT_LINE_AF_J$2C:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        stroke1: LatexColour.BLACK,
        draw: { type: DrawableShapeType.TWO_VERTEX, preview: false },
        variables: ["width", "length", "stroke1"],
      };
    case ShapeType.STRAIGHT_LINE_AFC$2C:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        stroke1: LatexColour.BLACK,
        draw: { type: DrawableShapeType.ARC, preview: false },
        variables: ["width", "length", "stroke1"],
      };
    case ShapeType.STRAIGHT_LINE_AF_C$2C:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        stroke1: LatexColour.BLACK,
        draw: { type: DrawableShapeType.ARC, preview: false },
        variables: ["width", "length", "stroke1"],
      };
    case ShapeType.STRAIGHT_LINE_AFEXC:
      return {
        type,
        x,
        y,
        gridX,
        gridY,
        stroke1: LatexColour.BLACK,
        stroke2: LatexColour.BLACK,
        draw: { type: DrawableShapeType.RECT, preview: false },
        variables: ["width", "length", "stroke1", "stroke2"],
      };
    default:
      throw new Error("Invalid shape type");
  }
};
