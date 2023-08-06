import { Group, Shape as KonvaShape, Line, RegularPolygon, Transformer } from "react-konva";
import { LatexColour } from "../shape";
import { ShapeProps } from "../../components/shape/shape";
import { useEffect, useRef } from "react";
import Konva from "konva";
import { GraphLabel } from "./graph-label";
import { getStageDim } from "../../components/canvas/gridline";

// for both hollow and solid wedge

// afcuxc - replace afcuc? (with width factor)
// afcunxc - replace ...?
// afccuxc - replace ...?
// afccunxc - replace ...?

// taller versions of above??

// TODO: rename to Wedge.tsx?

export const WedgeAFWUN: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill } = shape;
  const shapeRef = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const borderBox = {
    x: -sideLength * 0.5,
    y: -radius,
    width: sideLength,
    height: 1.732 * sideLength * 0.5, // tan 60
  };

  useEffect(() => {
    if (selected) {
      shapeRef.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <RegularPolygon
        ref={shapeRef} //
        x={x}
        y={y}
        fill={fill}
        sides={3}
        radius={radius}
        stroke={LatexColour.BLACK}
        strokeWidth={4}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      />
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFWUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const points = [0, -radius, 0, -radius - strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={points} stroke={stroke1} lineCap="round" />
        <RegularPolygon ref={shapeRef2} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={-radius - strokeLength * 0.5} text={label1} />}
        {label2 && <GraphLabel x={5} y={-radius - strokeLength * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFWWUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const offset = getStageDim(0.15);
  const line1Points = [-offset, -radius, -offset, -radius - strokeLength];
  const line2Points = [offset, -radius, offset, -radius - strokeLength];

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke1} lineCap="round" />
        <RegularPolygon ref={shapeRef3} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset - 10 - 5 * label1.length} y={-radius - strokeLength * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + 5} y={-radius - strokeLength * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFAUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const centerToTriBottom = sideLength * 0.5 * 1.732 - radius; // tan 60
  const points = [0, centerToTriBottom, 0, centerToTriBottom + strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={points} stroke={stroke1} lineCap="round" />
        <RegularPolygon ref={shapeRef2} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={centerToTriBottom + strokeLength * 0.4} text={label1} />}
        {label2 && <GraphLabel x={5} y={centerToTriBottom + strokeLength * 0.4} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFAAUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const centerToTriBottom = sideLength * 0.5 * 1.732 - radius; // tan 60
  const offset = getStageDim(0.15);
  const line1Points = [-offset, centerToTriBottom, -offset, centerToTriBottom + strokeLength];
  const line2Points = [offset, centerToTriBottom, offset, centerToTriBottom + strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke1} lineCap="round" />
        <RegularPolygon ref={shapeRef3} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset - 10 - 5 * label1.length} y={centerToTriBottom + strokeLength * 0.4} text={label1} />}
        {label2 && <GraphLabel x={offset + 5} y={centerToTriBottom + strokeLength * 0.4} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const triangleCentertoBottom = sideLength * 0.5 * 1.732 - radius; // tan 60
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4.1)];
  const points = [0, -radius, 0, -radius - strokeLength];
  const borderBox = {
    x: bottomLeftPoint[0],
    y: -radius - strokeLength,
    width: bottomRightPoint[0] * 2,
    height: radius + strokeLength + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      shapeRef2.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(bottomLeftPoint[0], bottomLeftPoint[1] / 3, bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          ref={shapeRef2}
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(bottomRightPoint[0], bottomRightPoint[1] / 3, bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line ref={shapeRef3} points={points} stroke={stroke3} lineCap="round" />
        <RegularPolygon ref={shapeRef4} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 10 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 10 * label2.length} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 10 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 10 * label4.length} y={bottomRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={-radius - strokeLength * 0.5} text={label5} />}
        {label6 && <GraphLabel x={5} y={-radius - strokeLength * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCUNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const triangleCentertoBottom = sideLength * 0.5 * 1.732 - radius; // tan 60
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4.1)];
  const borderBox = {
    x: bottomLeftPoint[0],
    y: -radius,
    width: bottomRightPoint[0] * 2,
    height: radius + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      shapeRef2.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(bottomLeftPoint[0], bottomLeftPoint[1] / 3, bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          ref={shapeRef2}
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(bottomRightPoint[0], bottomRightPoint[1] / 3, bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <RegularPolygon ref={shapeRef3} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 10 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 10 * label2.length} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 10 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 10 * label4.length} y={bottomRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const triangleCentertoBottom = sideLength * 0.5 * 1.732 - radius; // tan 60
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4.1)];
  const line1points = [offset, -radius, offset, -radius - strokeLength];
  const line2points = [-offset, -radius, -offset, -radius - strokeLength];
  const borderBox = {
    x: -offset + bottomLeftPoint[0],
    y: -radius - strokeLength,
    width: (bottomRightPoint[0] + offset) * 2,
    height: radius + strokeLength + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      shapeRef2.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset - sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(-offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, -offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset - sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset + sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(-offset + bottomRightPoint[0], bottomRightPoint[1] / 3, -offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset + sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(offset + bottomRightPoint[0], bottomRightPoint[1] / 3, offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={line1points} stroke={stroke3} lineCap="round" />
        <Line points={line2points} stroke={stroke3} lineCap="round" />
        <RegularPolygon ref={shapeRef2} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 10 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 10 * label2.length} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 10 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 10 * label4.length} y={bottomRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-offset + -10 - 5 * label5.length} y={-radius - strokeLength * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 5} y={-radius - strokeLength * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCUNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const triangleCentertoBottom = sideLength * 0.5 * 1.732 - radius; // tan 60
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4.1)];
  const borderBox = {
    x: -offset + bottomLeftPoint[0],
    y: -radius,
    width: (bottomRightPoint[0] + offset) * 2,
    height: radius + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      shapeRef2.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset - sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(-offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, -offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset - sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset + sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(-offset + bottomRightPoint[0], bottomRightPoint[1] / 3, -offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset + sideLength * 0.5, triangleCentertoBottom);
            context.quadraticCurveTo(offset + bottomRightPoint[0], bottomRightPoint[1] / 3, offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <RegularPolygon ref={shapeRef2} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 10 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 10 * label2.length} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 10 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 10 * label4.length} y={bottomRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCUXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4.1)];
  const line1Points = [0, 0, bottomLeftPoint[0] * 0.1, bottomLeftPoint[1] * 0.25, bottomLeftPoint[0] * 0.85, bottomLeftPoint[1] * 0.6, bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2Points = [0, 0, bottomRightPoint[0] * 0.1, bottomRightPoint[1] * 0.25, bottomRightPoint[0] * 0.85, bottomRightPoint[1] * 0.6, bottomRightPoint[0], bottomRightPoint[1]];
  const line3Points = [0, -radius, 0, -radius - strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef2} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line3Points} stroke={stroke3} lineCap="round" />
        <RegularPolygon ref={shapeRef1} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 18 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] - 2} y={bottomRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={(strokeLength + radius) * -0.6} text={label5} />}
        {label6 && <GraphLabel x={7} y={(strokeLength + radius) * -0.6} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCUNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4.1)];
  const line1Points = [0, 0, bottomLeftPoint[0] * 0.1, bottomLeftPoint[1] * 0.25, bottomLeftPoint[0] * 0.85, bottomLeftPoint[1] * 0.6, bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2Points = [0, 0, bottomRightPoint[0] * 0.1, bottomRightPoint[1] * 0.25, bottomRightPoint[0] * 0.85, bottomRightPoint[1] * 0.6, bottomRightPoint[0], bottomRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <RegularPolygon ref={shapeRef3} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 18 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] - 2} y={bottomRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCUXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Line>(null);
  const shapeRef6 = useRef<Konva.Line>(null);
  const shapeRef7 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4.1)];
  const line1aPoints = [-offset, 0, -offset + bottomLeftPoint[0] * 0.2, bottomLeftPoint[1] * 0.25, -offset + bottomLeftPoint[0] * 0.85, bottomLeftPoint[1] * 0.6, -offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line1bPoints = [offset, 0, offset + bottomLeftPoint[0] * 0.2, bottomLeftPoint[1] * 0.25, offset + bottomLeftPoint[0] * 0.85, bottomLeftPoint[1] * 0.6, offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2aPoints = [-offset, 0, -offset + bottomRightPoint[0] * 0.2, bottomRightPoint[1] * 0.25, -offset + bottomRightPoint[0] * 0.85, bottomRightPoint[1] * 0.6, -offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line2bPoints = [offset, 0, offset + bottomRightPoint[0] * 0.2, bottomRightPoint[1] * 0.25, offset + bottomRightPoint[0] * 0.85, bottomRightPoint[1] * 0.6, offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line3aPoints = [-offset, -radius, -offset, -radius - strokeLength];
  const line3bPoints = [offset, -radius, offset, -radius - strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!, shapeRef6.current!, shapeRef7.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef5} points={line3aPoints} stroke={stroke3} lineCap="round" />
        <Line ref={shapeRef6} points={line3bPoints} stroke={stroke3} lineCap="round" />
        <RegularPolygon ref={shapeRef7} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 18 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] - 2} y={bottomRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-offset - 10 - 5 * label5.length} y={(strokeLength + radius) * -0.6} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={(strokeLength + radius) * -0.6} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCUNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4.1)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4.1)];
  const line1aPoints = [-offset, 0, -offset + bottomLeftPoint[0] * 0.2, bottomLeftPoint[1] * 0.25, -offset + bottomLeftPoint[0] * 0.85, bottomLeftPoint[1] * 0.6, -offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line1bPoints = [offset, 0, offset + bottomLeftPoint[0] * 0.2, bottomLeftPoint[1] * 0.25, offset + bottomLeftPoint[0] * 0.85, bottomLeftPoint[1] * 0.6, offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2aPoints = [-offset, 0, -offset + bottomRightPoint[0] * 0.2, bottomRightPoint[1] * 0.25, -offset + bottomRightPoint[0] * 0.85, bottomRightPoint[1] * 0.6, -offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line2bPoints = [offset, 0, offset + bottomRightPoint[0] * 0.2, bottomRightPoint[1] * 0.25, offset + bottomRightPoint[0] * 0.85, bottomRightPoint[1] * 0.6, offset + bottomRightPoint[0], bottomRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <RegularPolygon ref={shapeRef5} x={0} y={0} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 18 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] - 2} y={bottomRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCUXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const bottomLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(6.2)];
  const bottomRightPoint = [getStageDim(2) * widthFactor!, getStageDim(6.2)];
  const strokeTopPoint = [0, getStageDim(-6)];
  const triangleCenterPoint = [0, getStageDim(-1.8)];
  const line1Points = [0, triangleCenterPoint[1], bottomLeftPoint[0] * 0.2, 0, bottomLeftPoint[0] * 0.8, bottomLeftPoint[1] * 0.4, bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2Points = [0, triangleCenterPoint[1], bottomRightPoint[0] * 0.2, 0, bottomRightPoint[0] * 0.8, bottomRightPoint[1] * 0.4, bottomRightPoint[0], bottomRightPoint[1]];
  const line3Points = [0, triangleCenterPoint[1] - radius, 0, strokeTopPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef2} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line3Points} stroke={stroke3} lineCap="round" />
        <RegularPolygon ref={shapeRef1} x={triangleCenterPoint[0]} y={triangleCenterPoint[1]} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 10 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 10} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 13 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 10} y={bottomRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={(strokeTopPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={5} y={(strokeTopPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCUNXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const bottomLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(6.2)];
  const bottomRightPoint = [getStageDim(2) * widthFactor!, getStageDim(6.2)];
  const triangleCenterPoint = [0, getStageDim(-1.8)];
  const line1Points = [0, triangleCenterPoint[1], bottomLeftPoint[0] * 0.2, 0, bottomLeftPoint[0] * 0.8, bottomLeftPoint[1] * 0.4, bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2Points = [0, triangleCenterPoint[1], bottomRightPoint[0] * 0.2, 0, bottomRightPoint[0] * 0.8, bottomRightPoint[1] * 0.4, bottomRightPoint[0], bottomRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef2} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <RegularPolygon ref={shapeRef1} x={triangleCenterPoint[0]} y={triangleCenterPoint[1]} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 10 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 10} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 13 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 10} y={bottomRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCUXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Line>(null);
  const shapeRef6 = useRef<Konva.Line>(null);
  const shapeRef7 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const bottomLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(6.2)];
  const bottomRightPoint = [getStageDim(2) * widthFactor!, getStageDim(6.2)];
  const strokeTopPoint = [0, getStageDim(-6)];
  const triangleCenterPoint = [0, getStageDim(-1.8)];
  const line1aPoints = [-offset, triangleCenterPoint[1], -offset + bottomLeftPoint[0] * 0.2, 0, -offset + bottomLeftPoint[0] * 0.8, bottomLeftPoint[1] * 0.4, -offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line1bPoints = [offset, triangleCenterPoint[1], offset + bottomLeftPoint[0] * 0.2, 0, offset + bottomLeftPoint[0] * 0.8, bottomLeftPoint[1] * 0.4, offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2aPoints = [-offset, triangleCenterPoint[1], -offset + bottomRightPoint[0] * 0.2, 0, -offset + bottomRightPoint[0] * 0.8, bottomRightPoint[1] * 0.4, -offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line2bPoints = [offset, triangleCenterPoint[1], offset + bottomRightPoint[0] * 0.2, 0, offset + bottomRightPoint[0] * 0.8, bottomRightPoint[1] * 0.4, offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line3aPoints = [-offset, triangleCenterPoint[1] - radius, -offset, strokeTopPoint[1]];
  const line3bPoints = [offset, triangleCenterPoint[1] - radius, offset, strokeTopPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!, shapeRef6.current!, shapeRef7.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef5} points={line3aPoints} stroke={stroke3} lineCap="round" />
        <Line ref={shapeRef6} points={line3bPoints} stroke={stroke3} lineCap="round" />
        <RegularPolygon ref={shapeRef7} x={triangleCenterPoint[0]} y={triangleCenterPoint[1]} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 7 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-offset + -10 - 5 * label5.length} y={(strokeTopPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={(strokeTopPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCUNXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const bottomLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(6.2)];
  const bottomRightPoint = [getStageDim(2) * widthFactor!, getStageDim(6.2)];
  const triangleCenterPoint = [0, getStageDim(-1.8)];
  const line1aPoints = [-offset, triangleCenterPoint[1], -offset + bottomLeftPoint[0] * 0.2, 0, -offset + bottomLeftPoint[0] * 0.8, bottomLeftPoint[1] * 0.4, -offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line1bPoints = [offset, triangleCenterPoint[1], offset + bottomLeftPoint[0] * 0.2, 0, offset + bottomLeftPoint[0] * 0.8, bottomLeftPoint[1] * 0.4, offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2aPoints = [-offset, triangleCenterPoint[1], -offset + bottomRightPoint[0] * 0.2, 0, -offset + bottomRightPoint[0] * 0.8, bottomRightPoint[1] * 0.4, -offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line2bPoints = [offset, triangleCenterPoint[1], offset + bottomRightPoint[0] * 0.2, 0, offset + bottomRightPoint[0] * 0.8, bottomRightPoint[1] * 0.4, offset + bottomRightPoint[0], bottomRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <RegularPolygon ref={shapeRef5} x={triangleCenterPoint[0]} y={triangleCenterPoint[1]} fill={fill} sides={3} radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 7 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};
