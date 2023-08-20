import Konva from "konva";
import { Layer, Line, Text } from "react-konva";
import { SnapPointForVertice } from "./canvas";

export const SNAP_GRID_THRESHOLD = 0.4;
export interface GridlineProps {
  stage: Konva.Stage | null;
}

export const stepSize = 20;

let stageRect: {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};
let numXSteps: number;
let numYSteps: number;
let xAxisVal: number;
let yAxisVal: number; // y axis is top-down

export const getRelativeStageCoordinate = (x: number, y: number): { stageX: number; stageY: number } => {
  return {
    stageX: x + stageRect.offsetX,
    stageY: y + stageRect.offsetY,
  };
};

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

export const computeNearestSnap = (gridX: number, gridY: number): SnapPointForVertice["onGrid"] => {
  const nearestSnapGridX = Math.round(gridX);
  const nearestSnapGridY = Math.round(gridY);
  const gridOffsetX = nearestSnapGridX - gridX;
  const gridOffsetY = nearestSnapGridY - gridY;
  if (Math.abs(gridOffsetX) < SNAP_GRID_THRESHOLD && Math.abs(gridOffsetY) < SNAP_GRID_THRESHOLD) {
    const { stageX: x, stageY: y } = getStageCoordinate(nearestSnapGridX, nearestSnapGridY);
    return { x, y, gridX: nearestSnapGridX, gridY: nearestSnapGridY, gridOffsetX, gridOffsetY };
  }
};

export const Gridline: React.FC<GridlineProps> = ({ stage }) => {
  if (!stage) return <Layer></Layer>;

  const strokeColour = "#d6d5d2";
  const axisColour = "#8c8c8c";
  stageRect = {
    width: stage.width(),
    height: stage.height(),
    offsetX: -Math.ceil(stage.position().x / stepSize) * stepSize || 0,
    offsetY: -Math.ceil(stage.position().y / stepSize) * stepSize || 0,
  };
  const extraBufferLines = 15;
  const drawRect = {
    x1: stageRect.offsetX - extraBufferLines * stepSize,
    y1: stageRect.offsetY - extraBufferLines * stepSize,
    x2: stageRect.offsetX + stageRect.width + extraBufferLines * stepSize,
    y2: stageRect.offsetY + stageRect.height + extraBufferLines * stepSize,
  };
  const labelGridSpacing = 5;
  numXSteps = Math.round(stageRect.width / stepSize);
  numYSteps = Math.round(stageRect.height / stepSize);
  xAxisVal = Math.floor(numXSteps * 0.4) * stepSize;
  yAxisVal = Math.floor(numYSteps * 0.5) * stepSize;

  let verticals = [];
  for (let i = -extraBufferLines; i <= numXSteps + extraBufferLines; i++) {
    verticals.push(<Line key={`vert-${i}`} x={stageRect.offsetX + i * stepSize} points={[0, drawRect.y1, 0, drawRect.y2]} stroke={strokeColour} strokeWidth={1} />);
    const gridX = (stageRect.offsetX + i * stepSize - xAxisVal) / stepSize;
    const roundedGridX = Math.round(gridX);
    if (gridX === roundedGridX && roundedGridX % labelGridSpacing === 0) {
      verticals.push(<Text key={`vert-axis-${roundedGridX}`} x={stageRect.offsetX + i * stepSize - 4} y={yAxisVal + 2} text={`${roundedGridX}`} fontFamily={"Calibri"} fontSize={10} fill={axisColour} />);
    }
  }
  verticals.push(<Line key={`vert-origin`} x={xAxisVal} points={[0, drawRect.y1, 0, drawRect.y2]} stroke={axisColour} strokeWidth={2.5} />);

  let horizontals = [];
  for (let i = -extraBufferLines; i <= numYSteps + extraBufferLines; i++) {
    horizontals.push(<Line key={`hori-${i}`} y={stageRect.offsetY + i * stepSize} points={[drawRect.x1, 0, drawRect.x2, 0]} stroke={strokeColour} strokeWidth={1} />);
    const gridY = (stageRect.offsetY + i * stepSize - yAxisVal) / stepSize;
    const roundedGridY = Math.round(gridY);
    if (gridY === roundedGridY && roundedGridY % labelGridSpacing === 0) {
      horizontals.push(<Text key={`hori-axis-${roundedGridY}`} x={xAxisVal - 14} y={stageRect.offsetY + i * stepSize} text={`${-roundedGridY}`} fontFamily={"Calibri"} fontSize={10} fill={axisColour} />);
    }
  }
  horizontals.push(<Line key={`hori-origin`} y={yAxisVal} points={[drawRect.x1, 0, drawRect.x2, 0]} stroke={axisColour} strokeWidth={2} />);

  return <Layer>{[...verticals, ...horizontals]}</Layer>;
};
