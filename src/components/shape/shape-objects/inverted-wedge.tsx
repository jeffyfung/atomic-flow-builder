import { Group, Shape as KonvaShape, Line, RegularPolygon, Transformer } from "react-konva";
import { LatexColour } from "../../../features/shape";
import { ShapeProps } from "../shape";
import { useEffect, useRef } from "react";
import Konva from "konva";
import { GraphLabel } from "./graph-label";
import { getStageDim } from "../../canvas/gridline";
import { useAppDispatch } from "../../../hooks";
import { setSnappableVertices } from "../../../features/canvas";

// for both hollow and solid inverted wedge

export const WedgeAFWDN: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill } = shape;
  const shapeRef = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30

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
      <RegularPolygon
        ref={shapeRef} //
        x={x}
        y={y}
        fill={fill}
        sides={3}
        radius={radius}
        rotation={180}
        stroke={LatexColour.BLACK}
        strokeWidth={4}
        onClick={(event) => onClick(event, shapeId)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={(e) => handleDragEnd(e, shapeId)}
        hitStrokeWidth={4}
      />
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFWDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const points = [0, radius, 0, radius + strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x: x, y: y + radius + strokeLength }]));
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
        <RegularPolygon
          ref={shapeRef2} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={radius + strokeLength * 0.5} text={label1} />}
        {label2 && <GraphLabel x={5} y={radius + strokeLength * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFWWDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const offset = getStageDim(0.15);
  const line1Points = [-offset, radius, -offset, radius + strokeLength];
  const line2Points = [offset, radius, offset, radius + strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x: x, y: y + radius + strokeLength }]));
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
        <RegularPolygon
          ref={shapeRef3} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset - 10 - 5 * label1.length} y={radius + strokeLength * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + 5} y={radius + strokeLength * 0.5} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFADC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const centerToTriTop = sideLength * 0.5 * 1.732 - radius; // tan 60
  const points = [0, -centerToTriTop, 0, -centerToTriTop - strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x: x, y: y - centerToTriTop - strokeLength }]));
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
        <RegularPolygon
          ref={shapeRef2} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-10 - 5 * label1.length} y={-centerToTriTop - strokeLength * 0.4} text={label1} />}
        {label2 && <GraphLabel x={5} y={-centerToTriTop - strokeLength * 0.4} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFAADC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, label1, label2 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const centerToTriTop = sideLength * 0.5 * 1.732 - radius; // tan 60
  const offset = getStageDim(0.15);
  const line1Points = [-offset, -centerToTriTop, -offset, -centerToTriTop - strokeLength];
  const line2Points = [offset, -centerToTriTop, offset, -centerToTriTop - strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(setSnappableVertices([{ x: x, y: y - centerToTriTop - strokeLength }]));
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
        <RegularPolygon
          ref={shapeRef3} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset - 10 - 5 * label1.length} y={-centerToTriTop - strokeLength * 0.4} text={label1} />}
        {label2 && <GraphLabel x={offset + 5} y={-centerToTriTop - strokeLength * 0.4} text={label2} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const triangleCentertoTop = sideLength * 0.5 * 1.732 - radius; // tan 60
  const topLeftPoint = [getStageDim(-2), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2), getStageDim(-4.1)];
  const points = [0, radius, 0, radius + strokeLength];
  const borderBox = {
    x: topLeftPoint[0],
    y: topLeftPoint[1],
    width: topRightPoint[0] * 2,
    height: strokeLength + radius - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + radius + strokeLength },
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
            context.moveTo(-sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(topLeftPoint[0], topLeftPoint[1] / 3, topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(topRightPoint[0], topRightPoint[1] / 3, topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={points} stroke={stroke3} lineCap="round" />
        <RegularPolygon x={0} y={0} fill={fill} sides={3} radius={radius} rotation={180} stroke={LatexColour.BLACK} strokeWidth={4} />
        {label1 && <GraphLabel x={topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 10 * label2.length} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 13 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6 * label4.length} y={topRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={radius + strokeLength * 0.5} text={label5} />}
        {label6 && <GraphLabel x={7} y={radius + strokeLength * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCDNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const triangleCentertoTop = sideLength * 0.5 * 1.732 - radius; // tan 60
  const topLeftPoint = [getStageDim(-2), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2), getStageDim(-4.1)];
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
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(topLeftPoint[0], topLeftPoint[1] / 3, topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(topRightPoint[0], topRightPoint[1] / 3, topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <RegularPolygon
          x={0} //
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 10 * label2.length} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 13 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 6 * label4.length} y={topRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCDC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const triangleCentertoTop = sideLength * 0.5 * 1.732 - radius; // tan 60
  const topLeftPoint = [getStageDim(-2), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2), getStageDim(-4.1)];
  const line1points = [offset, radius, offset, radius + strokeLength];
  const line2points = [-offset, radius, -offset, radius + strokeLength];
  const borderBox = {
    x: topLeftPoint[0] - offset,
    y: topLeftPoint[1],
    width: (topRightPoint[0] + offset) * 2,
    height: strokeLength + radius - topLeftPoint[1],
  };

  useEffect(() => {
    if (selected) {
      shapeRef1.current!.getSelfRect = () => borderBox;
      transformerRef.current!.nodes([shapeRef1.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + radius + strokeLength },
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
            context.moveTo(-offset - sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(-offset + topLeftPoint[0], topLeftPoint[1] / 3, -offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset - sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(offset + topLeftPoint[0], topLeftPoint[1] / 3, offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset + sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(-offset + topRightPoint[0], topRightPoint[1] / 3, -offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset + sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(offset + topRightPoint[0], topRightPoint[1] / 3, offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <Line points={line1points} stroke={stroke3} lineCap="round" />
        <Line points={line2points} stroke={stroke3} lineCap="round" />
        <RegularPolygon
          x={0} //
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 10 * label2.length} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 13 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6 * label4.length} y={topRightPoint[1] * 0.6} text={label4} />}
        {label5 && <GraphLabel x={-offset + -10 - 5 * label5.length} y={radius + strokeLength * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={radius + strokeLength * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCDNC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4 } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const triangleCentertoTop = sideLength * 0.5 * 1.732 - radius; // tan 60
  const topLeftPoint = [getStageDim(-2), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2), getStageDim(-4.1)];
  const borderBox = {
    x: topLeftPoint[0] - offset,
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
        <KonvaShape
          ref={shapeRef1}
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset - sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(-offset + topLeftPoint[0], topLeftPoint[1] / 3, -offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke1}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset - sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(offset + topLeftPoint[0], topLeftPoint[1] / 3, offset + topLeftPoint[0], topLeftPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(-offset + sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(-offset + topRightPoint[0], topRightPoint[1] / 3, -offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <KonvaShape
          stroke={stroke2}
          sceneFunc={(context, shape) => {
            context.beginPath();
            context.moveTo(offset + sideLength * 0.5, -triangleCentertoTop);
            context.quadraticCurveTo(offset + topRightPoint[0], topRightPoint[1] / 3, offset + topRightPoint[0], topRightPoint[1]);
            context.fillStrokeShape(shape);
            context.closePath();
          }}
        />
        <RegularPolygon
          x={0} //
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.6} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 10 * label2.length} y={topLeftPoint[1] * 0.6} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 13 - 5 * label3.length} y={topRightPoint[1] * 0.6} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 6 * label4.length} y={topRightPoint[1] * 0.6} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCDXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4.1)];
  const line1Points = [0, 0, topLeftPoint[0] * 0.1, topLeftPoint[1] * 0.25, topLeftPoint[0] * 0.85, topLeftPoint[1] * 0.6, topLeftPoint[0], topLeftPoint[1]];
  const line2Points = [0, 0, topRightPoint[0] * 0.1, topRightPoint[1] * 0.25, topRightPoint[0] * 0.85, topRightPoint[1] * 0.6, topRightPoint[0], topRightPoint[1]];
  const line3Points = [0, radius, 0, radius + strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + radius + strokeLength },
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
        <Line ref={shapeRef2} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line3Points} stroke={stroke3} lineCap="round" />
        <RegularPolygon
          ref={shapeRef1} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={topLeftPoint[0] - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 18 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] - 2} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={(strokeLength + radius) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={7} y={(strokeLength + radius) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCDNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4.1)];
  const line1Points = [0, 0, topLeftPoint[0] * 0.1, topLeftPoint[1] * 0.25, topLeftPoint[0] * 0.85, topLeftPoint[1] * 0.6, topLeftPoint[0], topLeftPoint[1]];
  const line2Points = [0, 0, topRightPoint[0] * 0.1, topRightPoint[1] * 0.25, topRightPoint[0] * 0.85, topRightPoint[1] * 0.6, topRightPoint[0], topRightPoint[1]];

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
        <Line ref={shapeRef2} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <RegularPolygon
          ref={shapeRef1} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={topLeftPoint[0] - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 15} y={topLeftPoint[1] * 0.8} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 18 - 5 * label3.length} y={topRightPoint[1] * 0.8} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] - 2} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCDSXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Line>(null);
  const shapeRef6 = useRef<Konva.Line>(null);
  const shapeRef7 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const strokeLength = getStageDim(3.4);
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4.1)];
  const line1aPoints = [-offset, 0, -offset + topLeftPoint[0] * 0.1, topLeftPoint[1] * 0.25, -offset + topLeftPoint[0] * 0.85, topLeftPoint[1] * 0.6, -offset + topLeftPoint[0], topLeftPoint[1]];
  const line1bPoints = [offset, 0, offset + topLeftPoint[0] * 0.1, topLeftPoint[1] * 0.25, offset + topLeftPoint[0] * 0.85, topLeftPoint[1] * 0.6, offset + topLeftPoint[0], topLeftPoint[1]];
  const line2aPoints = [-offset, 0, -offset + topRightPoint[0] * 0.1, topRightPoint[1] * 0.25, -offset + topRightPoint[0] * 0.85, topRightPoint[1] * 0.6, -offset + topRightPoint[0], topRightPoint[1]];
  const line2bPoints = [offset, 0, offset + topRightPoint[0] * 0.1, topRightPoint[1] * 0.25, offset + topRightPoint[0] * 0.85, topRightPoint[1] * 0.6, offset + topRightPoint[0], topRightPoint[1]];
  const line3aPoints = [-offset, radius, -offset, radius + strokeLength];
  const line3bPoints = [offset, radius, offset, radius + strokeLength];

  useEffect(() => {
    if (selected) {
      transformerRef.current!.nodes([shapeRef1.current!, shapeRef2.current!, shapeRef3.current!, shapeRef4.current!, shapeRef5.current!, shapeRef6.current!, shapeRef7.current!]);
      transformerRef.current!.getLayer()!.batchDraw();
    }
  }, [selected]);

  useEffect(() => {
    dispatch(
      setSnappableVertices([
        { x, y: y + radius + strokeLength },
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
        <RegularPolygon
          ref={shapeRef7} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 18} y={topLeftPoint[1] * 0.85} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 20 - 5 * label3.length} y={topRightPoint[1] * 0.85} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] - 2} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-offset - 10 - 5 * label5.length} y={(strokeLength + radius) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 7} y={(strokeLength + radius) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCDNXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.Line>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.RegularPolygon>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const topLeftPoint = [getStageDim(-2 * widthFactor!), getStageDim(-4.1)];
  const topRightPoint = [getStageDim(2 * widthFactor!), getStageDim(-4.1)];
  const line1aPoints = [-offset, 0, -offset + topLeftPoint[0] * 0.1, topLeftPoint[1] * 0.25, -offset + topLeftPoint[0] * 0.85, topLeftPoint[1] * 0.6, -offset + topLeftPoint[0], topLeftPoint[1]];
  const line1bPoints = [offset, 0, offset + topLeftPoint[0] * 0.1, topLeftPoint[1] * 0.25, offset + topLeftPoint[0] * 0.85, topLeftPoint[1] * 0.6, offset + topLeftPoint[0], topLeftPoint[1]];
  const line2aPoints = [-offset, 0, -offset + topRightPoint[0] * 0.1, topRightPoint[1] * 0.25, -offset + topRightPoint[0] * 0.85, topRightPoint[1] * 0.6, -offset + topRightPoint[0], topRightPoint[1]];
  const line2bPoints = [offset, 0, offset + topRightPoint[0] * 0.1, topRightPoint[1] * 0.25, offset + topRightPoint[0] * 0.85, topRightPoint[1] * 0.6, offset + topRightPoint[0], topRightPoint[1]];

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
        <RegularPolygon
          ref={shapeRef5} //
          x={0}
          y={0}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 18} y={topLeftPoint[1] * 0.85} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 20 - 5 * label3.length} y={topRightPoint[1] * 0.85} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] - 2} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCDXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const topLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(-6.1)];
  const topRightPoint = [getStageDim(2) * widthFactor!, getStageDim(-6.1)];
  const strokeBottomPoint = [0, getStageDim(6)];
  const triangleCenterPoint = [0, getStageDim(2)];
  const line1Points = [0, triangleCenterPoint[1], topLeftPoint[0] * 0.2, 0, topLeftPoint[0] * 0.8, topLeftPoint[1] * 0.4, topLeftPoint[0], topLeftPoint[1]];
  const line2Points = [0, triangleCenterPoint[1], topRightPoint[0] * 0.2, 0, topRightPoint[0] * 0.8, topRightPoint[1] * 0.4, topRightPoint[0], topRightPoint[1]];
  const line3Points = [0, triangleCenterPoint[1] + radius, 0, strokeBottomPoint[1]];

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
        <Line ref={shapeRef2} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line3Points} stroke={stroke3} lineCap="round" />
        <RegularPolygon
          ref={shapeRef1} //
          x={triangleCenterPoint[0]}
          y={triangleCenterPoint[1]}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 16} y={topLeftPoint[1] * 0.7} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 16 - 5 * label3.length} y={topRightPoint[1] * 0.7} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 7} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-10 - 5 * label5.length} y={(strokeBottomPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={5} y={(strokeBottomPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCDNXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const topLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(-6.1)];
  const topRightPoint = [getStageDim(2) * widthFactor!, getStageDim(-6.1)];
  const triangleCenterPoint = [0, getStageDim(2)];
  const line1Points = [0, triangleCenterPoint[1], topLeftPoint[0] * 0.2, 0, topLeftPoint[0] * 0.8, topLeftPoint[1] * 0.4, topLeftPoint[0], topLeftPoint[1]];
  const line2Points = [0, triangleCenterPoint[1], topRightPoint[0] * 0.2, 0, topRightPoint[0] * 0.8, topRightPoint[1] * 0.4, topRightPoint[0], topRightPoint[1]];

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
        <Line ref={shapeRef2} points={line1Points} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line2Points} stroke={stroke2} lineCap="round" tension={0.5} />
        <RegularPolygon
          ref={shapeRef1} //
          x={triangleCenterPoint[0]}
          y={triangleCenterPoint[1]}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={topLeftPoint[0] + 16} y={topLeftPoint[1] * 0.7} text={label2} />}
        {label3 && <GraphLabel x={topRightPoint[0] - 16 - 5 * label3.length} y={topRightPoint[1] * 0.7} text={label3} />}
        {label4 && <GraphLabel x={topRightPoint[0] + 7} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCDXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, stroke3, label1, label2, label3, label4, label5, label6, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Line>(null);
  const shapeRef6 = useRef<Konva.Line>(null);
  const shapeRef7 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const topLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(-6.1)];
  const topRightPoint = [getStageDim(2) * widthFactor!, getStageDim(-6.1)];
  const strokeBottomPoint = [0, getStageDim(6)];
  const triangleCenterPoint = [0, getStageDim(2)];
  const line1aPoints = [-offset, triangleCenterPoint[1], -offset + topLeftPoint[0] * 0.2, 0, -offset + topLeftPoint[0] * 0.8, topLeftPoint[1] * 0.4, -offset + topLeftPoint[0], topLeftPoint[1]];
  const line1bPoints = [offset, triangleCenterPoint[1], offset + topLeftPoint[0] * 0.2, 0, offset + topLeftPoint[0] * 0.8, topLeftPoint[1] * 0.4, offset + topLeftPoint[0], topLeftPoint[1]];
  const line2aPoints = [-offset, triangleCenterPoint[1], -offset + topRightPoint[0] * 0.2, 0, -offset + topRightPoint[0] * 0.8, topRightPoint[1] * 0.4, -offset + topRightPoint[0], topRightPoint[1]];
  const line2bPoints = [offset, triangleCenterPoint[1], offset + topRightPoint[0] * 0.2, 0, offset + topRightPoint[0] * 0.8, topRightPoint[1] * 0.4, offset + topRightPoint[0], topRightPoint[1]];
  const line3aPoints = [-offset, triangleCenterPoint[1] + radius, -offset, strokeBottomPoint[1]];
  const line3bPoints = [offset, triangleCenterPoint[1] + radius, offset, strokeBottomPoint[1]];

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
        <Line ref={shapeRef2} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef5} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef6} points={line3aPoints} stroke={stroke3} lineCap="round" />
        <Line ref={shapeRef7} points={line3bPoints} stroke={stroke3} lineCap="round" />
        <RegularPolygon
          ref={shapeRef1} //
          x={triangleCenterPoint[0]}
          y={triangleCenterPoint[1]}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 16} y={topLeftPoint[1] * 0.7} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 16 - 5 * label3.length} y={topRightPoint[1] * 0.7} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 7} y={topRightPoint[1] * 0.5} text={label4} />}
        {label5 && <GraphLabel x={-offset - 10 - 5 * label5.length} y={(strokeBottomPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label5} />}
        {label6 && <GraphLabel x={offset + 5} y={(strokeBottomPoint[1] + (triangleCenterPoint[1] - radius)) * 0.5} text={label6} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};

export const WedgeAFCCDNXXC: React.FC<ShapeProps> = ({ selected, shape, shapeId, onClick, handleMouseEnter, handleMouseLeave, handleMouseOver, handleDragStart, handleDragEnd }) => {
  const { x, y, fill, stroke1, stroke2, label1, label2, label3, label4, widthFactor } = shape;
  const shapeRef1 = useRef<Konva.RegularPolygon>(null);
  const shapeRef2 = useRef<Konva.Line>(null);
  const shapeRef3 = useRef<Konva.Line>(null);
  const shapeRef4 = useRef<Konva.Line>(null);
  const shapeRef5 = useRef<Konva.Line>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dispatch = useAppDispatch();

  const offset = getStageDim(0.15);
  const sideLength = getStageDim(1.6);
  const radius = (sideLength * 0.5) / 0.866; // cos 30
  const topLeftPoint = [getStageDim(-2) * widthFactor!, getStageDim(-6.1)];
  const topRightPoint = [getStageDim(2) * widthFactor!, getStageDim(-6.1)];
  const triangleCenterPoint = [0, getStageDim(2)];
  const line1aPoints = [-offset, triangleCenterPoint[1], -offset + topLeftPoint[0] * 0.2, 0, -offset + topLeftPoint[0] * 0.8, topLeftPoint[1] * 0.4, -offset + topLeftPoint[0], topLeftPoint[1]];
  const line1bPoints = [offset, triangleCenterPoint[1], offset + topLeftPoint[0] * 0.2, 0, offset + topLeftPoint[0] * 0.8, topLeftPoint[1] * 0.4, offset + topLeftPoint[0], topLeftPoint[1]];
  const line2aPoints = [-offset, triangleCenterPoint[1], -offset + topRightPoint[0] * 0.2, 0, -offset + topRightPoint[0] * 0.8, topRightPoint[1] * 0.4, -offset + topRightPoint[0], topRightPoint[1]];
  const line2bPoints = [offset, triangleCenterPoint[1], offset + topRightPoint[0] * 0.2, 0, offset + topRightPoint[0] * 0.8, topRightPoint[1] * 0.4, offset + topRightPoint[0], topRightPoint[1]];

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
        <Line ref={shapeRef2} points={line1aPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef3} points={line1bPoints} stroke={stroke1} lineCap="round" tension={0.5} />
        <Line ref={shapeRef4} points={line2aPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <Line ref={shapeRef5} points={line2bPoints} stroke={stroke2} lineCap="round" tension={0.5} />
        <RegularPolygon
          ref={shapeRef1} //
          x={triangleCenterPoint[0]}
          y={triangleCenterPoint[1]}
          fill={fill}
          sides={3}
          radius={radius}
          rotation={180}
          stroke={LatexColour.BLACK}
          strokeWidth={4}
        />
        {label1 && <GraphLabel x={-offset + topLeftPoint[0] - 10 - 5 * label1.length} y={topLeftPoint[1] * 0.5} text={label1} />}
        {label2 && <GraphLabel x={offset + topLeftPoint[0] + 16} y={topLeftPoint[1] * 0.7} text={label2} />}
        {label3 && <GraphLabel x={-offset + topRightPoint[0] - 16 - 5 * label3.length} y={topRightPoint[1] * 0.7} text={label3} />}
        {label4 && <GraphLabel x={offset + topRightPoint[0] + 7} y={topRightPoint[1] * 0.5} text={label4} />}
      </Group>
      {selected && <Transformer ref={transformerRef} resizeEnabled={false} rotateEnabled={false} borderDash={[2, 2]} />}
    </>
  );
};
