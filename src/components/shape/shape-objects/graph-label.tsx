import { Text } from "react-konva";

export interface GraphLabelProps {
  x: number;
  y: number;
  text: string;
}

export const GraphLabel: React.FC<GraphLabelProps> = ({ x, y, text }) => {
  return <Text x={x} y={y} text={text} height={15} align="center" verticalAlign="middle" fontFamily={"Calibri"} fontSize={16} fontStyle="italic" fill={"black"} />;
};
