import Konva from "konva";
import { Layer, Line, Text } from "react-konva";

export interface GridlineProps {
  stage: Konva.Stage | null;
}

export const stepSize = 20;
let stageWidth: number;
let stageHeight: number;
let numXSteps: number;
let numYSteps: number;
let xAxisVal: number;
let yAxisVal: number; // y axis is top-down

export const getGridCoordinate = (x: number, y: number): { gridX: number; gridY: number } => {
  return {
    gridX: (x - xAxisVal) / stepSize,
    gridY: (yAxisVal - y) / stepSize,
  };
};

export const getStageCoordinate = (x: number, y: number): { stageX: number; stageY: number } => {
  return {
    stageX: x * stepSize + xAxisVal,
    stageY: yAxisVal - y * stepSize,
  };
};

export const getStageDim = (val: number): number => {
  return val * stepSize;
};

export const getGridDim = (val: number): number => {
  return val / stepSize;
};

export const Gridline: React.FC<GridlineProps> = ({ stage }) => {
  if (!stage) return <Layer></Layer>;

  const strokeColour = "#d6d5d2";
  const axisColour = "#8c8c8c";
  stageWidth = stage.width();
  stageHeight = stage.height();
  numXSteps = Math.round(stageWidth / stepSize);
  numYSteps = Math.round(stageHeight / stepSize);
  const xAxisIdx = Math.floor(numXSteps * 0.4);
  const yAxisIdx = Math.floor(numYSteps * 0.5);

  let verticals = [];
  let xIdx = -xAxisIdx;
  for (let i = 0; i <= numXSteps; i++) {
    if (i === xAxisIdx) {
      xAxisVal = i * stepSize;
      verticals.push(<Line key={`vert-origin`} x={xAxisVal} points={[0, 0, 0, stageHeight]} stroke={axisColour} strokeWidth={2.5} />);
    } else {
      verticals.push(<Line key={`vert-${i}`} x={i * stepSize} points={[0, 0, 0, stageHeight]} stroke={strokeColour} strokeWidth={1} />);
    }
    if ((i - xAxisIdx) % 5 === 0) {
      verticals.push(<Text key={`vert-axis-${xIdx}`} x={i * stepSize - 4} y={yAxisIdx * stepSize + 2} text={`${xIdx}`} fontFamily={"Calibri"} fontSize={10} fill={axisColour} />);
    }
    xIdx++;
  }

  let horizontals = [];
  let yIdx = yAxisIdx;
  for (let i = 0; i <= numYSteps; i++) {
    if (i === yAxisIdx) {
      yAxisVal = i * stepSize;
      horizontals.push(<Line key={`hori-origin`} y={yAxisVal} points={[0, 0, stageWidth, 0]} stroke={axisColour} strokeWidth={2} />);
    } else {
      horizontals.push(<Line key={`hori-${i}`} y={i * stepSize} points={[0, 0, stageWidth, 0]} stroke={strokeColour} strokeWidth={1} />);
    }
    if ((i - yAxisIdx) % 5 === 0) {
      horizontals.push(<Text key={`hori-axis-${i}`} x={xAxisIdx * stepSize - 14} y={i * stepSize - 4} text={`${yIdx}`} fontFamily={"Calibri"} fontSize={10} fill={axisColour} />);
    }
    yIdx--;
  }

  return <Layer>{[...verticals, ...horizontals]}</Layer>;
};
