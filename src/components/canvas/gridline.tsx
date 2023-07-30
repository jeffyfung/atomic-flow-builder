import Konva from "konva";
import { useEffect, useRef } from "react";
import { Group, Layer, Line } from "react-konva";

export interface GridlineProps {
  stage: Konva.Stage | null;
  stepSize: number;
}

export const Gridline: React.FC<GridlineProps> = ({ stage, stepSize }) => {
  if (!stage) return <Layer></Layer>;

  const strokeColour = "#d6d5d2";
  const stageWidth = stage.width();
  const stageHeight = stage.height();
  const numXSteps = Math.round(stageWidth / stepSize);
  const numYSteps = Math.round(stageHeight / stepSize);

  let verticals = [];
  for (let i = 0; i <= numXSteps; i++) {
    verticals.push(<Line x={i * stepSize} points={[0, 0, 0, stageHeight]} stroke={strokeColour} strokeWidth={1} />);
  }

  let horizontals = [];
  for (let i = 0; i <= numYSteps; i++) {
    horizontals.push(<Line y={i * stepSize} points={[0, 0, stageWidth, 0]} stroke={strokeColour} strokeWidth={1} />);
  }

  return <Layer>{[...verticals, ...horizontals]}</Layer>;
};
