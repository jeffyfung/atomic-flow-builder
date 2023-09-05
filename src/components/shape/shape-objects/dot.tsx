import { useEffect, useRef } from "react";
import { ShapeProps } from "../shape";
import Konva from "konva";
import { getStageDim } from "../../canvas/gridline/gridline";
import { Circle, Group, Line, Transformer, Shape as KonvaShape } from "react-konva";
import { LatexColour } from "../../../features/shape";
import { GraphLabel } from "./graph-label";
import { useAppDispatch } from "../../../hooks";
import { setSnappableVertices } from "../../../features/canvas";

// TODO: add snapping vertices
export const DotAFD: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y } = shape;
  const shapeRef = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x, y }]));
  }, [x, y]);

  return (
    <>
      <Circle
        ref={shapeRef} //
        x={x}
        y={y}
        fill="black"
        radius={radius}
        stroke={LatexColour.BLACK}
        strokeWidth={4}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={0}
      />
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFDDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, label1, label2, stroke1 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const strokeBottomPoint = [0, getStageDim(4)];
  const points = [0, radius, 0, strokeBottomPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x, y: y + strokeBottomPoint[1] }]));
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={points} stroke={stroke1} lineCap="round" />
        <Circle
          ref={shapeRef2} //
          x={0}
          y={0}
          fill="black"
          radius={radius}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={radius + (strokeBottomPoint[1] - radius) * 0.5} text={label1} />}
        {label2 && <GraphLabel x={5} y={radius + (strokeBottomPoint[1] - radius) * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_DDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, label1, label2, stroke1 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const strokeBottomPoint = [0, getStageDim(4)];
  const line1Points = [-offset, radius, -offset, strokeBottomPoint[1]];
  const line2Points = [offset, radius, offset, strokeBottomPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x, y: y + strokeBottomPoint[1] }]));
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke1} lineCap="round" />
        <Circle
          ref={shapeRef3} //
          x={0}
          y={0}
          fill="black"
          radius={radius}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset - 10 - 5 * label1.length} y={radius + (strokeBottomPoint[1] - radius) * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + 5} y={radius + (strokeBottomPoint[1] - radius) * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFDUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, label1, label2, stroke1 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const strokeTopPoint = [0, getStageDim(-4)];
  const points = [0, -radius, 0, strokeTopPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x, y: y + strokeTopPoint[1] }]));
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={points} stroke={stroke1} lineCap="round" />
        <Circle
          ref={shapeRef2} //
          x={0}
          y={0}
          fill="black"
          radius={radius}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={radius + (strokeTopPoint[1] - radius) * 0.5} text={label1} />}
        {label2 && <GraphLabel x={5} y={radius + (strokeTopPoint[1] - radius) * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_DUC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, label1, label2, stroke1 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const strokeTopPoint = [0, getStageDim(-4)];
  const line1Points = [-offset, radius, -offset, strokeTopPoint[1]];
  const line2Points = [offset, radius, offset, strokeTopPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x, y: y + strokeTopPoint[1] }]));
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke1} lineCap="round" />
        <Circle
          ref={shapeRef3} //
          x={0}
          y={0}
          fill="black"
          radius={radius}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset - 10 - 5 * label1.length} y={radius + (strokeTopPoint[1] - radius) * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + 5} y={radius + (strokeTopPoint[1] - radius) * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCDDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2), getStageDim(-4)];
  const topRightPoint = [getStageDim(2), getStageDim(-4)];
  const strokeBottomPoint = [0, getStageDim(4)];
  const points = [0, radius, 0, strokeBottomPoint[1]];
  const borderBox = {
    x: topLeftPoint[0],
    y: topLeftPoint[1],
    width: topRightPoint[0] * 2,
    height: strokeBottomPoint[1] - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeBottomPoint[1] },
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topLeftPoint[0], topLeftPoint[1] / 3, topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topRightPoint[0], topRightPoint[1] / 3, topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 12} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 14 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6} y={topRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={strokeBottomPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={5} y={strokeBottomPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCDDNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2), getStageDim(-4)];
  const topRightPoint = [getStageDim(2), getStageDim(-4)];
  const borderBox = {
    x: topLeftPoint[0],
    y: topLeftPoint[1],
    width: topRightPoint[0] * 2,
    height: -topLeftPoint[1] + radius,
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topLeftPoint[0], topLeftPoint[1] / 3, topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topRightPoint[0], topRightPoint[1] / 3, topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 12} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 14 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6} y={topRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CDDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2), getStageDim(-4)];
  const topRightPoint = [getStageDim(2), getStageDim(-4)];
  const strokeBottomPoint = [0, getStageDim(4)];
  const line1Points = [-offset, radius, -offset, strokeBottomPoint[1]];
  const line2Points = [offset, radius, offset, strokeBottomPoint[1]];
  const borderBox = {
    x: -offset + topLeftPoint[0],
    y: topLeftPoint[1],
    width: (topRightPoint[0] + offset) * 2,
    height: strokeBottomPoint[1] - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeBottomPoint[1] },
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topLeftPoint[0], topLeftPoint[1] / 3, -offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topLeftPoint[0], topLeftPoint[1] / 3, offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topRightPoint[0], topRightPoint[1] / 3, -offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topRightPoint[0], topRightPoint[1] / 3, offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={line1Points} stroke={stroke3} lineCap="round" />
        <Line points={line2Points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 12} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 14 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6} y={topRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-offset - 10 - 5 * label5.length} y={strokeBottomPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={strokeBottomPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CDDNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2), getStageDim(-4)];
  const topRightPoint = [getStageDim(2), getStageDim(-4)];
  const borderBox = {
    x: -offset + topLeftPoint[0],
    y: topLeftPoint[1],
    width: (topRightPoint[0] + offset) * 2,
    height: radius - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topLeftPoint[0], topLeftPoint[1] / 3, -offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topLeftPoint[0], topLeftPoint[1] / 3, offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topRightPoint[0], topRightPoint[1] / 3, -offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topRightPoint[0], topRightPoint[1] / 3, offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 12} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 14 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6} y={topRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCUDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4)];
  const strokeTopPoint = [0, getStageDim(-4)];
  const points = [0, radius, 0, strokeTopPoint[1]];
  const borderBox = {
    x: bottomLeftPoint[0],
    y: strokeTopPoint[1],
    width: bottomRightPoint[0] * 2,
    height: bottomRightPoint[1] - strokeTopPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeTopPoint[1] },
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomLeftPoint[0], bottomLeftPoint[1] / 3, bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomRightPoint[0], bottomRightPoint[1] / 3, bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 12} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 14 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={strokeTopPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={5} y={strokeTopPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCUDNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4)];
  const borderBox = {
    x: bottomLeftPoint[0],
    y: -radius,
    width: bottomRightPoint[0] * 2,
    height: bottomRightPoint[1] + radius,
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomLeftPoint[0], bottomLeftPoint[1] / 3, bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomRightPoint[0], bottomRightPoint[1] / 3, bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 12} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 14 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CUDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4)];
  const strokeTopPoint = [0, getStageDim(-4)];
  const line1Points = [-offset, radius, -offset, strokeTopPoint[1]];
  const line2Points = [offset, radius, offset, strokeTopPoint[1]];
  const borderBox = {
    x: -offset + bottomLeftPoint[0],
    y: strokeTopPoint[1],
    width: (bottomRightPoint[0] + offset) * 2,
    height: bottomRightPoint[1] - strokeTopPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeTopPoint[1] },
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, -offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomRightPoint[0], bottomRightPoint[1] / 3, -offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomRightPoint[0], bottomRightPoint[1] / 3, offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={line1Points} stroke={stroke3} lineCap="round" />
        <Line points={line2Points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 12} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 14 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-offset - 10 - 5 * label5.length} y={strokeTopPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={strokeTopPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CUDNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2), getStageDim(4)];
  const borderBox = {
    x: -offset + bottomLeftPoint[0],
    y: -radius,
    width: (bottomRightPoint[0] + offset) * 2,
    height: bottomRightPoint[1] + radius,
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, -offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomRightPoint[0], bottomRightPoint[1] / 3, -offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomRightPoint[0], bottomRightPoint[1] / 3, offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 12} y={bottomLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 14 - 5 * label3.length} y={bottomRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCDDXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4)];
  const strokeBottomPoint = [0, getStageDim(4)];
  const points = [0, radius, 0, strokeBottomPoint[1]];
  const borderBox = {
    x: topLeftPoint[0],
    y: topLeftPoint[1],
    width: topRightPoint[0] * 2,
    height: strokeBottomPoint[1] - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeBottomPoint[1] },
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topLeftPoint[0], topLeftPoint[1] / 3, topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topRightPoint[0], topRightPoint[1] / 3, topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={strokeBottomPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={7} y={strokeBottomPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCDDNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4)];
  const borderBox = {
    x: topLeftPoint[0],
    y: topLeftPoint[1],
    width: topRightPoint[0] * 2,
    height: radius - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topLeftPoint[0], topLeftPoint[1] / 3, topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(topRightPoint[0], topRightPoint[1] / 3, topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CDDXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4)];
  const strokeBottomPoint = [0, getStageDim(4)];
  const line1Points = [-offset, radius, -offset, strokeBottomPoint[1]];
  const line2Points = [offset, radius, offset, strokeBottomPoint[1]];
  const borderBox = {
    x: -offset + topLeftPoint[0],
    y: topLeftPoint[1],
    width: (topRightPoint[0] + offset) * 2,
    height: strokeBottomPoint[1] - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeBottomPoint[1] },
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topLeftPoint[0], topLeftPoint[1] / 3, -offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topLeftPoint[0], topLeftPoint[1] / 3, offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topRightPoint[0], topRightPoint[1] / 3, -offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topRightPoint[0], topRightPoint[1] / 3, offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={line1Points} stroke={stroke3} lineCap="round" />
        <Line points={line2Points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-offset + -10 - 5 * label5.length} y={strokeBottomPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={strokeBottomPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CDDNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4)];
  const borderBox = {
    x: -offset + topLeftPoint[0],
    y: topLeftPoint[1],
    width: (topRightPoint[0] + offset) * 2,
    height: radius - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topLeftPoint[0], topLeftPoint[1] / 3, -offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topLeftPoint[0], topLeftPoint[1] / 3, offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + topRightPoint[0], topRightPoint[1] / 3, -offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + topRightPoint[0], topRightPoint[1] / 3, offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCUDXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4)];
  const strokeTopPoint = [0, getStageDim(-4)];
  const points = [0, radius, 0, strokeTopPoint[1]];
  const borderBox = {
    x: bottomLeftPoint[0],
    y: strokeTopPoint[1],
    width: bottomRightPoint[0] * 2,
    height: -strokeTopPoint[1] + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeTopPoint[1] },
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomLeftPoint[0], bottomLeftPoint[1] / 3, bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomRightPoint[0], bottomRightPoint[1] / 3, bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={strokeTopPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={7} y={strokeTopPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCUDNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4)];
  const borderBox = {
    x: bottomLeftPoint[0],
    y: -radius,
    width: bottomRightPoint[0] * 2,
    height: radius + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomLeftPoint[0], bottomLeftPoint[1] / 3, bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.quadraticCurveTo(bottomRightPoint[0], bottomRightPoint[1] / 3, bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CUDXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4)];
  const strokeTopPoint = [0, getStageDim(-4)];
  const line1Points = [-offset, radius, -offset, strokeTopPoint[1]];
  const line2Points = [offset, radius, offset, strokeTopPoint[1]];
  const borderBox = {
    x: -offset + bottomLeftPoint[0],
    y: strokeTopPoint[1],
    width: (bottomRightPoint[0] + offset) * 2,
    height: -strokeTopPoint[1] + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeTopPoint[1] },
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, -offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomRightPoint[0], bottomRightPoint[1] / 3, -offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomRightPoint[0], bottomRightPoint[1] / 3, offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={line1Points} stroke={stroke3} lineCap="round" />
        <Line points={line2Points} stroke={stroke3} lineCap="round" />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-offset + -10 - 5 * label5.length} y={strokeTopPoint[1] * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={strokeTopPoint[1] * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CUDNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(4)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(4)];
  const borderBox = {
    x: -offset + bottomLeftPoint[0],
    y: -radius,
    width: (bottomRightPoint[0] + offset) * 2,
    height: radius + bottomLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected, borderBox]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, -offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomLeftPoint[0], bottomLeftPoint[1] / 3, offset + bottomLeftPoint[0], bottomLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset, 0);
            context.quadraticCurveTo(-offset + bottomRightPoint[0], bottomRightPoint[1] / 3, -offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset, 0);
            context.quadraticCurveTo(offset + bottomRightPoint[0], bottomRightPoint[1] / 3, offset + bottomRightPoint[0], bottomRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Circle x={0} y={0} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCDD_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-6)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-6)];
  const strokeBottomPoint = [0, getStageDim(6)];
  const circleCenterPoint = [0, getStageDim(2)];
  const line1Points = [0, circleCenterPoint[1], topLeftPoint[0] * 0.2, (topLeftPoint[1] - circleCenterPoint[1]) * 0.1, topLeftPoint[0] * 0.8, (topLeftPoint[1] - circleCenterPoint[1]) * 0.4, topLeftPoint[0], topLeftPoint[1]];
  const line2Points = [0, circleCenterPoint[1], topRightPoint[0] * 0.2, (topRightPoint[1] - circleCenterPoint[1]) * 0.1, topRightPoint[0] * 0.8, (topRightPoint[1] - circleCenterPoint[1]) * 0.4, topRightPoint[0], topRightPoint[1]];
  const line3Points = [0, circleCenterPoint[1] + radius, 0, strokeBottomPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeBottomPoint[1] },
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line3Points} stroke={stroke3} lineCap="round" />
        <Circle ref={shapeRef4} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={(strokeBottomPoint[1] + circleCenterPoint[1]) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={7} y={(strokeBottomPoint[1] + circleCenterPoint[1]) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCDDN_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-6)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-6)];
  const circleCenterPoint = [0, getStageDim(2)];
  const line1Points = [0, circleCenterPoint[1], topLeftPoint[0] * 0.2, (topLeftPoint[1] - circleCenterPoint[1]) * 0.1, topLeftPoint[0] * 0.8, (topLeftPoint[1] - circleCenterPoint[1]) * 0.4, topLeftPoint[0], topLeftPoint[1]];
  const line2Points = [0, circleCenterPoint[1], topRightPoint[0] * 0.2, (topRightPoint[1] - circleCenterPoint[1]) * 0.1, topRightPoint[0] * 0.8, (topRightPoint[1] - circleCenterPoint[1]) * 0.4, topRightPoint[0], topRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Circle ref={shapeRef3} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CDD_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Line>(null);
  const shapeRef6 = useRef<Konva.Line>(null);
  const shapeRef7 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-6)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-6)];
  const strokeBottomPoint = [0, getStageDim(6)];
  const circleCenterPoint = [0, getStageDim(2)];
  const line1aPoints = [-offset, circleCenterPoint[1], -offset + topLeftPoint[0] * 0.2, (topLeftPoint[1] - circleCenterPoint[1]) * 0.1, -offset + topLeftPoint[0] * 0.8, (topLeftPoint[1] - circleCenterPoint[1]) * 0.4, -offset + topLeftPoint[0], topLeftPoint[1]];
  const line1bPoints = [offset, circleCenterPoint[1], offset + topLeftPoint[0] * 0.2, (topLeftPoint[1] - circleCenterPoint[1]) * 0.1, offset + topLeftPoint[0] * 0.8, (topLeftPoint[1] - circleCenterPoint[1]) * 0.4, offset + topLeftPoint[0], topLeftPoint[1]];
  const line2aPoints = [-offset, circleCenterPoint[1], -offset + topRightPoint[0] * 0.2, (topRightPoint[1] - circleCenterPoint[1]) * 0.1, -offset + topRightPoint[0] * 0.8, (topRightPoint[1] - circleCenterPoint[1]) * 0.4, -offset + topRightPoint[0], topRightPoint[1]];
  const line2bPoints = [offset, circleCenterPoint[1], offset + topRightPoint[0] * 0.2, (topRightPoint[1] - circleCenterPoint[1]) * 0.1, offset + topRightPoint[0] * 0.8, (topRightPoint[1] - circleCenterPoint[1]) * 0.4, offset + topRightPoint[0], topRightPoint[1]];
  const line3aPoints = [-offset, circleCenterPoint[1] + radius, -offset, strokeBottomPoint[1]];
  const line3bPoints = [offset, circleCenterPoint[1] + radius, offset, strokeBottomPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!, shapeRef6.current!, shapeRef7.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeBottomPoint[1] },
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef5} points={line3aPoints} stroke={stroke3} lineCap="round" />
        <Line ref={shapeRef6} points={line3bPoints} stroke={stroke3} lineCap="round" />
        <Circle ref={shapeRef7} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-offset + -10 - 5 * label5.length} y={(strokeBottomPoint[1] + circleCenterPoint[1]) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={(strokeBottomPoint[1] + circleCenterPoint[1]) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CDDN_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-6)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-6)];
  const circleCenterPoint = [0, getStageDim(2)];
  const line1aPoints = [-offset, circleCenterPoint[1], -offset + topLeftPoint[0] * 0.2, (topLeftPoint[1] - circleCenterPoint[1]) * 0.1, -offset + topLeftPoint[0] * 0.8, (topLeftPoint[1] - circleCenterPoint[1]) * 0.4, -offset + topLeftPoint[0], topLeftPoint[1]];
  const line1bPoints = [offset, circleCenterPoint[1], offset + topLeftPoint[0] * 0.2, (topLeftPoint[1] - circleCenterPoint[1]) * 0.1, offset + topLeftPoint[0] * 0.8, (topLeftPoint[1] - circleCenterPoint[1]) * 0.4, offset + topLeftPoint[0], topLeftPoint[1]];
  const line2aPoints = [-offset, circleCenterPoint[1], -offset + topRightPoint[0] * 0.2, (topRightPoint[1] - circleCenterPoint[1]) * 0.1, -offset + topRightPoint[0] * 0.8, (topRightPoint[1] - circleCenterPoint[1]) * 0.4, -offset + topRightPoint[0], topRightPoint[1]];
  const line2bPoints = [offset, circleCenterPoint[1], offset + topRightPoint[0] * 0.2, (topRightPoint[1] - circleCenterPoint[1]) * 0.1, offset + topRightPoint[0] * 0.8, (topRightPoint[1] - circleCenterPoint[1]) * 0.4, offset + topRightPoint[0], topRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + topLeftPoint[0], y: y + topLeftPoint[1] },
        { x: x + topRightPoint[0], y: y + topRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Circle ref={shapeRef5} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 8 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 17 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCUD_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(6)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(6)];
  const strokeTopPoint = [0, getStageDim(-6)];
  const circleCenterPoint = [0, getStageDim(-2)];
  const line1Points = [0, circleCenterPoint[1], bottomLeftPoint[0] * 0.2, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.1, bottomLeftPoint[0] * 0.8, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.4, bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2Points = [0, circleCenterPoint[1], bottomRightPoint[0] * 0.2, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.1, bottomRightPoint[0] * 0.8, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.4, bottomRightPoint[0], bottomRightPoint[1]];
  const line3Points = [0, circleCenterPoint[1] - radius, 0, strokeTopPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeTopPoint[1] },
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line3Points} stroke={stroke3} lineCap="round" />
        <Circle ref={shapeRef4} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={(strokeTopPoint[1] + circleCenterPoint[1]) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={7} y={(strokeTopPoint[1] + circleCenterPoint[1]) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAFCUDN_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(6)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(6)];
  const circleCenterPoint = [0, getStageDim(-2)];
  const line1Points = [0, circleCenterPoint[1], bottomLeftPoint[0] * 0.2, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.1, bottomLeftPoint[0] * 0.8, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.4, bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2Points = [0, circleCenterPoint[1], bottomRightPoint[0] * 0.2, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.1, bottomRightPoint[0] * 0.8, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.4, bottomRightPoint[0], bottomRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Circle ref={shapeRef3} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CUD_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Line>(null);
  const shapeRef6 = useRef<Konva.Line>(null);
  const shapeRef7 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(6)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(6)];
  const strokeTopPoint = [0, getStageDim(-6)];
  const circleCenterPoint = [0, getStageDim(-2)];
  const line1aPoints = [-offset, circleCenterPoint[1], -offset + bottomLeftPoint[0] * 0.2, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.1, -offset + bottomLeftPoint[0] * 0.8, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.4, -offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line1bPoints = [offset, circleCenterPoint[1], offset + bottomLeftPoint[0] * 0.2, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.1, offset + bottomLeftPoint[0] * 0.8, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.4, offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2aPoints = [-offset, circleCenterPoint[1], -offset + bottomRightPoint[0] * 0.2, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.1, -offset + bottomRightPoint[0] * 0.8, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.4, -offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line2bPoints = [offset, circleCenterPoint[1], offset + bottomRightPoint[0] * 0.2, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.1, offset + bottomRightPoint[0] * 0.8, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.4, offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line3aPoints = [-offset, circleCenterPoint[1] - radius, -offset, strokeTopPoint[1]];
  const line3bPoints = [offset, circleCenterPoint[1] - radius, offset, strokeTopPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!, shapeRef6.current!, shapeRef7.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + strokeTopPoint[1] },
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef5} points={line3aPoints} stroke={stroke3} lineCap="round" />
        <Line ref={shapeRef6} points={line3bPoints} stroke={stroke3} lineCap="round" />
        <Circle ref={shapeRef7} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-offset - 10 - 5 * label5.length} y={(strokeTopPoint[1] + circleCenterPoint[1]) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={(strokeTopPoint[1] + circleCenterPoint[1]) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const DotAF_CUDN_XC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const radius = getStageDim(0.5);
  const bottomLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(6)];
  const bottomRightPoint = [getStageDim(2 * widthFactor!), getStageDim(6)];
  const circleCenterPoint = [0, getStageDim(-2)];
  const line1aPoints = [-offset, circleCenterPoint[1], -offset + bottomLeftPoint[0] * 0.2, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.1, -offset + bottomLeftPoint[0] * 0.8, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.4, -offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line1bPoints = [offset, circleCenterPoint[1], offset + bottomLeftPoint[0] * 0.2, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.1, offset + bottomLeftPoint[0] * 0.8, (bottomLeftPoint[1] - circleCenterPoint[1]) * 0.4, offset + bottomLeftPoint[0], bottomLeftPoint[1]];
  const line2aPoints = [-offset, circleCenterPoint[1], -offset + bottomRightPoint[0] * 0.2, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.1, -offset + bottomRightPoint[0] * 0.8, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.4, -offset + bottomRightPoint[0], bottomRightPoint[1]];
  const line2bPoints = [offset, circleCenterPoint[1], offset + bottomRightPoint[0] * 0.2, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.1, offset + bottomRightPoint[0] * 0.8, (bottomRightPoint[1] - circleCenterPoint[1]) * 0.4, offset + bottomRightPoint[0], bottomRightPoint[1]];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x: x + bottomLeftPoint[0], y: y + bottomLeftPoint[1] },
        { x: x + bottomRightPoint[0], y: y + bottomRightPoint[1] },
      ])
    );
  }, [x, y]);

  return (
    <>
      <Group
        x={x} //
        y={y}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      >
        <Line ref={shapeRef1} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef2} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Circle ref={shapeRef5} x={circleCenterPoint[0]} y={circleCenterPoint[1]} fill="black" radius={radius} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={-offset + bottomLeftPoint[0] - 8 - 5 * label1.length} y={bottomLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + bottomLeftPoint[0] + 15} y={bottomLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={-offset + bottomRightPoint[0] - 17 - 5 * label3.length} y={bottomRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={offset + bottomRightPoint[0] + 6} y={bottomRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};
