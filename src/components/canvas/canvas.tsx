import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Konva from "konva";
import { Shape } from "../shape/shape";
import { addToCanvas, selectCanvas, toggleDragging, toggleDrawing, updatePreview, updateShape } from "../../features/canvas";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";
import { Inspector } from "../inspector/inspector";
import { Gridline, getGridCoordinate, getGridDim, getStageCoordinate } from "./gridline";
import { ShapeProperties } from "../../features/shape";

interface DrawingAnchorPoint {
  x: number;
  y: number;
}

export const SNAP_GRID_THRESHOLD = 0.4;

// TODO: make the canvas fit the layout/window perfectly
export const Canvas: React.FC<{}> = () => {
  const { shapes, previewShape, dragging, drawing } = useAppSelector(selectCanvas);
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectorDisplay, setInspectorDisplay] = useState<boolean>(true);
  const [stageObj, setStageObj] = useState<Konva.Stage | null>(null);
  const [nearestSnap, setNearestSnap] = useState<{ x: number; y: number; gridX: number; gridY: number } | null>(null);
  const [drawingAnchorPoint, setDrawingAnchorPoint] = useState<DrawingAnchorPoint | null>(null);

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    setStageObj(stageRef.current);
  }, []);

  const handleClick = (_event: React.MouseEvent<HTMLElement>) => {
    if (dragging || drawing) {
      const shape = store.getState().canvas.previewShape;
      if (shape !== null) {
        if (dragging) {
          dispatch(addToCanvas(nearestSnap ? { ...shape, ...nearestSnap } : shape));
          dispatch(toggleDragging(false));
        } else {
          const { x, y, gridX, gridY } = nearestSnap ? { ...shape, ...nearestSnap } : shape;
          if (!drawingAnchorPoint) {
            setDrawingAnchorPoint({ x, y });
          } else {
            const shape = store.getState().canvas.previewShape!;
            const finalX = shape.variables.includes("width") ? (drawingAnchorPoint.x + x) / 2 : drawingAnchorPoint.x;
            const finalY = shape.variables.includes("length") ? (drawingAnchorPoint.y + y) / 2 : drawingAnchorPoint.y;
            const { gridX: finalGridX, gridY: finalGridY } = getGridCoordinate(finalX, finalY);
            const { gridX: anchorGridX, gridY: anchorGridY } = getGridCoordinate(drawingAnchorPoint.x, drawingAnchorPoint.y);
            const draw = {
              start: { ...drawingAnchorPoint, gridX: anchorGridX, gridY: anchorGridY },
              end: {
                x: shape.variables.includes("width") ? x : drawingAnchorPoint.x,
                y: shape.variables.includes("length") ? y : drawingAnchorPoint.y,
                gridX: shape.variables.includes("width") ? gridX : anchorGridX,
                gridY: shape.variables.includes("length") ? gridY : anchorGridY,
              },
            };
            dispatch(addToCanvas({ ...shape, x: finalX, y: finalY, gridX: finalGridX, gridY: finalGridY, draw }));
            dispatch(toggleDrawing(false));
            setDrawingAnchorPoint(null);
          }
        }
      }
      if (nearestSnap) {
        setNearestSnap(null);
      }
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
        dispatch(updatePreview({ x, y, gridX, gridY }));
      } else {
        // drawing
        if (drawingAnchorPoint === null) {
          dispatch(updatePreview({ x, y, gridX, gridY }));
        } else {
          const shape = store.getState().canvas.previewShape!;
          const previewX = shape.variables.includes("width") ? (drawingAnchorPoint.x + x) / 2 : drawingAnchorPoint.x;
          const previewY = shape.variables.includes("length") ? (drawingAnchorPoint.y + y) / 2 : drawingAnchorPoint.y;
          const { gridX: previewGridX, gridY: previewGridY } = getGridCoordinate(previewX, previewY);
          const { gridX: anchorGridX, gridY: anchorGridY } = getGridCoordinate(drawingAnchorPoint.x, drawingAnchorPoint.y);
          const draw = {
            start: { ...drawingAnchorPoint, gridX: anchorGridX, gridY: anchorGridY },
            end: {
              x: shape.variables.includes("width") ? x : drawingAnchorPoint.x,
              y: shape.variables.includes("length") ? y : drawingAnchorPoint.y,
              gridX: shape.variables.includes("width") ? gridX : anchorGridX,
              gridY: shape.variables.includes("length") ? gridY : anchorGridY,
            },
          };
          console.log({ x, y, previewGridX, previewGridY, draw });
          dispatch(updatePreview({ x: previewX, y: previewY, gridX: previewGridX, gridY: previewGridY, draw }));
        }
      }

      setInspectorDisplay(false);
      const nearestSnapGridX = Math.round(gridX);
      const nearestSnapGridY = Math.round(gridY);
      if (Math.abs(nearestSnapGridX - gridX) < SNAP_GRID_THRESHOLD && Math.abs(nearestSnapGridY - gridY) < SNAP_GRID_THRESHOLD) {
        const { stageX, stageY } = getStageCoordinate(nearestSnapGridX, nearestSnapGridY);
        setNearestSnap({ x: stageX, y: stageY, gridX: nearestSnapGridX, gridY: nearestSnapGridY });
      } else {
        setNearestSnap(null);
      }
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
    // TODO: morph into other shapes (if it is no longer vertical)
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
          {previewShape && (dragging || previewShape.draw?.start) && (
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
