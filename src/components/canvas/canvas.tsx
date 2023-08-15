import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Konva from "konva";
import { Shape } from "../shape/shape";
import { addToCanvas, selectCanvas, toggleDragging, toggleDrawing, updatePreview, updateShape } from "../../features/canvas";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";
import { Inspector } from "../inspector/inspector";
import { Gridline, computeNearestSnap, getGridCoordinate } from "./gridline";
import { Coordinates, DrawableShapeType, ShapeProperties } from "../../features/shape";
import { computeDimension } from "../shape/shape-objects/drawable-shapes";

export const SNAP_GRID_THRESHOLD = 0.4;

// TODO: make the canvas fit the layout/window perfectly (by fixing the stage area? inresponsive to viewport size?)
export const Canvas: React.FC<{}> = () => {
  const { shapes, previewShape, dragging, drawing } = useAppSelector(selectCanvas);
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectorDisplay, setInspectorDisplay] = useState<boolean>(true);
  const [stageObj, setStageObj] = useState<Konva.Stage | null>(null);
  const [nearestSnap, setNearestSnap] = useState<{ x: number; y: number; gridX: number; gridY: number } | null>(null);
  const [drawingAnchorPoint, setDrawingAnchorPoint] = useState<Coordinates | null>(null);

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    setStageObj(stageRef.current);
  }, []);

  const handleClick = (_event: React.MouseEvent<HTMLElement>) => {
    if (dragging || drawing) {
      const shape = store.getState().canvas.previewShape;
      if (shape !== null) {
        if (dragging) {
          handleClickDragging(shape);
        } else {
          handleClickDrawing(shape);
        }
      }
      if (nearestSnap) {
        setNearestSnap(null);
      }
    }
  };

  const handleClickDragging = (shape: ShapeProperties) => {
    dispatch(addToCanvas(nearestSnap ? { ...shape, ...nearestSnap } : shape));
    dispatch(toggleDragging(false));
  };

  const handleClickDrawing = (shape: ShapeProperties) => {
    const _shape = nearestSnap ? { ...shape, ...nearestSnap } : shape;
    const { x, y, gridX, gridY } = _shape;
    if (!drawingAnchorPoint) return setDrawingAnchorPoint({ x, y, gridX, gridY });

    // there is at least 1 existing drawing point
    switch (shape.draw!.type) {
      case DrawableShapeType.TWO_VERTEX:
        const updatedProperties = computeDimension["2v"](_shape, { x, y, gridX, gridY }, drawingAnchorPoint);
        dispatch(addToCanvas({ ...shape, ...updatedProperties }));
        dispatch(toggleDrawing(false));
        setDrawingAnchorPoint(null);
        break;
      case DrawableShapeType.ARC:
        // TODO:
        break;
      default:
        throw new Error("Invalid drawable shape type");
    }
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (dragging || drawing) {
      const stage = stageRef.current!;
      stage.setPointersPositions(event);
      const { x, y } = stage.getPointerPosition()!;
      const { gridX, gridY } = getGridCoordinate(x, y);

      if (dragging) {
        handleMouseOverDragging({ x, y, gridX, gridY });
      } else {
        handleMouseOverDrawing({ x, y, gridX, gridY });
      }
      setInspectorDisplay(false);
      setNearestSnap(computeNearestSnap(gridX, gridY));
    }
  };

  const handleMouseOverDragging = (coor: Coordinates) => {
    dispatch(updatePreview(coor));
  };

  const handleMouseOverDrawing = (coor: Coordinates) => {
    if (drawingAnchorPoint === null) return dispatch(updatePreview(coor));

    const shape = store.getState().canvas.previewShape!;
    // TODO: can potentially be combined into 1 function if the arguments are the same
    switch (shape.draw!.type) {
      case DrawableShapeType.TWO_VERTEX:
        const updatedProperties = computeDimension["2v"](shape, coor, drawingAnchorPoint);
        dispatch(updatePreview(updatedProperties));
        break;
      case DrawableShapeType.ARC:
        break;
    }
  };

  const handleClickShape = (_event: Konva.KonvaEventObject<MouseEvent>, id: string) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
    setInspectorDisplay(true);
  };

  const handleCloseInspector = () => {
    setInspectorDisplay(false);
  };

  const handleMouseEnter = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const container = event.target.getStage()!.container();
    container.style.cursor = "grab";
  };

  const handleMouseLeave = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const container = event.target.getStage()!.container();
    container.style.cursor = "crosshair";
  };

  const clearSelection = () => {
    setSelectedId(null);
  };

  const handleSelectedShapeDragStart = (event: Konva.KonvaEventObject<DragEvent>) => {
    setInspectorDisplay(false);
  };

  const handleSelectedShapeDragEnd = (event: Konva.KonvaEventObject<DragEvent>, id: string) => {
    const { x, y } = event.target!.absolutePosition();
    const { gridX, gridY } = getGridCoordinate(x, y);
    dispatch(
      updateShape({
        id,
        properties: {
          x,
          y,
          gridX,
          gridY,
        },
      })
    );
  };

  const handleAnchorDragMove = (shapeId: string, payload: Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">) => {
    setInspectorDisplay(false);
    dispatch(
      updateShape({
        id: shapeId,
        properties: payload,
      })
    );
  };

  const handleAnchorDragEnd = (shapeId: string, payload: Partial<Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">>) => {
    if (Object.keys(payload).length > 0) {
      dispatch(
        updateShape({
          id: shapeId,
          properties: payload,
        })
      );
    }
  };

  return (
    <>
      <main className="canvas" onMouseMove={handleMouseOver} onClick={handleClick} style={{ backgroundColor: "#fffffd", cursor: "crosshair" }}>
        <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
          <Gridline stage={stageObj} />
          <Layer>
            {Object.entries(shapes).map(([shapeId, shape]) => {
              return (
                <Shape
                  selected={selectedId === shapeId} //
                  key={shapeId}
                  shapeId={shapeId}
                  shape={{ ...shape, id: shapeId }}
                  onClick={handleClickShape}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleDragEnd={handleSelectedShapeDragEnd}
                  handleDragStart={handleSelectedShapeDragStart}
                  handleAnchorDragMove={handleAnchorDragMove}
                  handleAnchorDragEnd={handleAnchorDragEnd}
                />
              );
            })}
          </Layer>
          {previewShape && (dragging || previewShape.draw?.preview) && (
            <Layer>
              <Shape
                selected={false}
                key={"drag-preview"}
                shapeId={"drag-preview"} //
                shape={{ ...previewShape, id: "drag-preview" }}
                onClick={() => {}}
                handleMouseEnter={() => {}}
                handleMouseLeave={() => {}}
                handleDragEnd={() => {}}
                handleDragStart={() => {}}
                handleAnchorDragMove={() => {}}
                handleAnchorDragEnd={() => {}}
              />
            </Layer>
          )}
          {nearestSnap && (
            <Layer>
              <Circle x={nearestSnap.x} y={nearestSnap.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />
            </Layer>
          )}
        </Stage>
      </main>
      {selectedId && inspectorDisplay && <Inspector key={selectedId} shapeId={selectedId} shape={shapes[selectedId]} handleCloseInspector={handleCloseInspector} clearSelection={clearSelection} />}
    </>
  );
};
