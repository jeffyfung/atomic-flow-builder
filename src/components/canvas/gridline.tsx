import Konva from "konva";
import { useEffect, useRef } from "react";
import { Group, Layer, Line } from "react-konva";

export interface GridlineProps {
  stage: Konva.Stage | null;
  stepSize: number;
}

// TODO: add x-axis, y-axis
export const Gridline: React.FC<GridlineProps> = ({ stage, stepSize }) => {
  if (!stage) return <Layer></Layer>;

  const strokeColour = "#d6d5d2";
  const axisColour = "#8c8c8c";
  const stageWidth = stage.width();
  const stageHeight = stage.height();
  const numXSteps = Math.round(stageWidth / stepSize);
  const numYSteps = Math.round(stageHeight / stepSize);

  let verticals = [];
  for (let i = 0; i <= numXSteps; i++) {
    if (i === Math.floor(numXSteps * 0.4)) {
      verticals.push(<Line key={`vert-origin`} x={i * stepSize} points={[0, 0, 0, stageHeight]} stroke={axisColour} strokeWidth={2.5} />);
    } else {
      verticals.push(<Line key={`vert-${i}`} x={i * stepSize} points={[0, 0, 0, stageHeight]} stroke={strokeColour} strokeWidth={1} />);
    }
  }

  let horizontals = [];
  for (let i = 0; i <= numYSteps; i++) {
    if (i === Math.floor(numYSteps * 0.5)) {
      horizontals.push(<Line key={`hori-origin`} y={i * stepSize} points={[0, 0, stageWidth, 0]} stroke={axisColour} strokeWidth={2} />);
    } else {
      horizontals.push(<Line key={`hori-${i}`} y={i * stepSize} points={[0, 0, stageWidth, 0]} stroke={strokeColour} strokeWidth={1} />);
    }
  }

  return <Layer>{[...verticals, ...horizontals]}</Layer>;
};
