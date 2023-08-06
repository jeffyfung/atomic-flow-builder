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
  variables: (keyof ShapeProperties)[];
  // radius?: number;
  // rotation?: number;
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

  // AND MORE
  // INVERTED_HOLLOW_WEDGE = "invertedHollowWedge",
  // SOLID_WEDGE = "solidWedge",
  // INVERTED_SOLID_WEDGE = "invertedSolidWedge",
  // DOT = "dot",
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
    // case AtomicFlowShapes.TEST.RECT:
    //   return {
    //     type,
    //     width: 150,
    //     height: 100,
    //     stroke: "#000000",
    //     rotation: 0,
    //     x: clientX,
    //     y: clientY,
    //     // x: coordX - offsetX,
    //     // y: coordY - offsetY,
    //   };
    // case ShapeType.CIRCLE:
    // return {
    //   type,
    //   radius: 50,
    //   stroke: "#000000",
    //   x: coordX! - (offsetX - clientX / 2),
    //   y: coordY! - (offsetY - clientY / 2),
    // };
    default:
      throw new Error("Invalid shape type");
  }
};
