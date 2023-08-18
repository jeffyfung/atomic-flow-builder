import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Konva from "konva";
import { Shape } from "../shape/shape";
import { addToCanvas, selectCanvas, toggleDragging, toggleDrawing, updatePreview, updateShape } from "../../features/canvas";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";
import { Inspector } from "../inspector/inspector";
import { Gridline, computeNearestSnap, getGridCoordinate, getStageCoordinate } from "./gridline";
import { Coordinates, DrawableShapeType, ShapeProperties } from "../../features/shape";
import { computeDimension2V } from "../shape/shape-objects/drawable-shapes";

export interface SnapPointForVertice {
  onShape?: Coordinates & { gridOffsetX: number; gridOffsetY: number };
  onGrid?: Coordinates & { gridOffsetX: number; gridOffsetY: number };
}

// TODO: make the canvas fit the layout/window perfectly (by fixing the stage area? inresponsive to viewport size?)
export const Canvas: React.FC<{}> = () => {
  const { shapes, previewShape, dragging, drawing, snappableVertices } = useAppSelector(selectCanvas);
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectorDisplay, setInspectorDisplay] = useState<boolean>(true);
  const [stageObj, setStageObj] = useState<Konva.Stage | null>(null);
  const [nearestSnaps, setNearestSnaps] = useState<SnapPointForVertice[]>([]);
  const [drawingAnchorPoint, setDrawingAnchorPoint] = useState<Coordinates | null>(null);

  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    setStageObj(stageRef.current);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (dragging || drawing) {
      const shape = store.getState().canvas.previewShape!;
      const stage = stageRef.current!;
      stage.setPointersPositions(event);
      const { x, y } = stage.getPointerPosition()!;
      const { gridX, gridY } = getGridCoordinate(x, y);
      const _shape = { ...shape, x, y, gridX, gridY };
      if (shape !== null) {
        if (dragging) {
          handleClickDragging(_shape);
        } else {
          handleClickDrawing(_shape);
        }
      }
      setNearestSnaps([]);
    }
  };

  const handleClickDragging = (shape: ShapeProperties) => {
    let _shape: ShapeProperties;
    if (snaps.length) {
      const { gridX, gridY } = shape;
      const adjustedGridX = gridX + snaps[0].onGrid!.gridOffsetX;
      const adjustedGridY = gridY + snaps[0].onGrid!.gridOffsetY;
      const { stageX, stageY } = getStageCoordinate(adjustedGridX, adjustedGridY);
      _shape = { ...shape, x: stageX, y: stageY, gridX: adjustedGridX, gridY: adjustedGridY };
    } else {
      _shape = shape;
    }
    dispatch(addToCanvas(_shape));
    dispatch(toggleDragging(false));
  };

  const handleClickDrawing = (shape: ShapeProperties) => {
    const _shape = snaps.length ? { ...shape, ...(snaps[0].onShape || snaps[0].onGrid) } : shape;
    const { x, y, gridX, gridY } = _shape;
    if (!drawingAnchorPoint) return setDrawingAnchorPoint({ x, y, gridX, gridY });

    // there is at least 1 existing drawing point
    let updatedProperties: Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">;
    switch (shape.draw!.type) {
      case DrawableShapeType.TWO_VERTEX:
        updatedProperties = computeDimension2V(_shape, { x, y, gridX, gridY }, drawingAnchorPoint);
        break;
      case DrawableShapeType.ARC:
        updatedProperties = {
          x: drawingAnchorPoint.x,
          y: (drawingAnchorPoint.y + y) / 2,
          gridX: drawingAnchorPoint.gridX,
          gridY: (drawingAnchorPoint.gridY + gridY) / 2,
          draw: {
            type: DrawableShapeType.ARC,
            preview: true,
            top: drawingAnchorPoint,
            bottom: { x: drawingAnchorPoint.x, y, gridX: drawingAnchorPoint.gridX, gridY },
            middle: { x, y: (drawingAnchorPoint.y + y) / 2, gridX, gridY: (drawingAnchorPoint.gridY + gridY) / 2 },
          },
        };
        break;
      case DrawableShapeType.RECT:
        updatedProperties = {
          x: (drawingAnchorPoint.x + x) / 2,
          y: (drawingAnchorPoint.y + y) / 2,
          gridX: (drawingAnchorPoint.gridX + gridX) / 2,
          gridY: (drawingAnchorPoint.gridY + gridY) / 2,
          draw: {
            type: DrawableShapeType.RECT,
            preview: true,
            p1: drawingAnchorPoint,
            p2: { x, y: drawingAnchorPoint.y, gridX, gridY: drawingAnchorPoint.gridY },
            p3: { x: drawingAnchorPoint.x, y, gridX: drawingAnchorPoint.gridX, gridY },
            p4: { x, y, gridX, gridY },
          },
        };
        break;
      default:
        throw new Error("Invalid drawable shape type");
    }
    dispatch(addToCanvas({ ..._shape, ...updatedProperties }));
    dispatch(toggleDrawing(false));
    setDrawingAnchorPoint(null);
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
    }
  };

  const handleMouseOverDragging = (coor: Coordinates) => {
    dispatch(updatePreview(coor));
    setNearestSnaps(
      snappableVertices.map((v) => {
        const { gridX, gridY } = getGridCoordinate(v.x, v.y);
        return { onGrid: computeNearestSnap(gridX, gridY) };
      })
    );
  };

  const handleMouseOverDrawing = (coor: Coordinates) => {
    const shape = store.getState().canvas.previewShape!;
    const { x, y, gridX, gridY } = coor;
    setNearestSnaps((snaps) => [{ ...snaps[0], onGrid: computeNearestSnap(gridX, gridY) }]);

    if (drawingAnchorPoint === null) return dispatch(updatePreview(coor));

    let updatedProperties: Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">;
    switch (shape.draw!.type) {
      case DrawableShapeType.TWO_VERTEX:
        updatedProperties = computeDimension2V(shape, coor, drawingAnchorPoint);
        break;
      case DrawableShapeType.ARC:
        updatedProperties = {
          x: drawingAnchorPoint.x,
          y: (drawingAnchorPoint.y + y) / 2,
          gridX: drawingAnchorPoint.gridX,
          gridY: (drawingAnchorPoint.gridY + gridY) / 2,
          draw: {
            type: DrawableShapeType.ARC,
            preview: true,
            top: drawingAnchorPoint,
            bottom: { x: drawingAnchorPoint.x, y, gridX: drawingAnchorPoint.gridX, gridY },
            middle: { x, y: (drawingAnchorPoint.y + y) / 2, gridX, gridY: (drawingAnchorPoint.gridY + gridY) / 2 },
          },
        };
        break;
      case DrawableShapeType.RECT:
        updatedProperties = {
          x: (drawingAnchorPoint.x + x) / 2,
          y: (drawingAnchorPoint.y + y) / 2,
          gridX: (drawingAnchorPoint.gridX + gridX) / 2,
          gridY: (drawingAnchorPoint.gridY + gridY) / 2,
          draw: {
            type: DrawableShapeType.RECT,
            preview: true,
            p1: drawingAnchorPoint,
            p2: { x, y: drawingAnchorPoint.y, gridX, gridY: drawingAnchorPoint.gridY },
            p3: { x: drawingAnchorPoint.x, y, gridX: drawingAnchorPoint.gridX, gridY },
            p4: { x, y, gridX, gridY },
          },
        };
        break;
    }
    dispatch(updatePreview(updatedProperties));
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

  const handleShapeMouseEnter = (event: Konva.KonvaEventObject<MouseEvent>) => {
    // const container = event.target.getStage()!.container();
    // if (dragging || drawing) {
    //   container.style.cursor = "none";
    // } else {
    //   container.style.cursor = "grab";
    // }
  };

  const handleShapeMouseLeave = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const container = event.target.getStage()!.container();
    container.style.cursor = "crosshair";
    if ((dragging || drawing) && nearestSnaps[0].onShape) {
      setNearestSnaps([{ onGrid: nearestSnaps[0].onGrid }]);
    }
  };

  // TODO: need to account for the dragging for connection lines (custom drag over evts)
  // TODO: add handleMouseOver to all shapes (but it does not work for draggable shapes)
  // consider switching back to using enter and leave for changing cursor style to grab
  const handleShapeMouseOver = (_event: Konva.KonvaEventObject<MouseEvent>) => {
    const container = stageRef.current!.container();
    if (dragging || drawing) {
      container.style.cursor = "none";
      const { x, y } = stageRef.current!.getPointerPosition()!;
      const { gridX, gridY } = getGridCoordinate(x, y);
      setNearestSnaps((nearestSnaps) => [{ ...nearestSnaps[0], onShape: { x, y, gridX, gridY, gridOffsetX: 0, gridOffsetY: 0 } }]);
    } else {
      container.style.cursor = "grab";
    }
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

  // drawable shapes only have 1 snapping vertex but can have onShape and onGrid snap
  const snaps = nearestSnaps
    .filter((nearestSnap) => nearestSnap.onShape || nearestSnap.onGrid)
    .sort((a, b) => {
      const snapA = (a.onShape || a.onGrid)!;
      const snapB = (a.onShape || a.onGrid)!;
      return snapA.gridOffsetX ** 2 + snapA.gridOffsetY ** 2 - (snapB.gridOffsetX ** 2 + snapB.gridOffsetY ** 2);
    });

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
                  handleMouseEnter={handleShapeMouseEnter}
                  handleMouseLeave={handleShapeMouseLeave}
                  handleMouseOver={handleShapeMouseOver}
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
                handleMouseOver={() => {}}
                handleDragEnd={() => {}}
                handleDragStart={() => {}}
                handleAnchorDragMove={() => {}}
                handleAnchorDragEnd={() => {}}
              />
            </Layer>
          )}
          <Layer>
            {snaps.map((nearestSnap, i) => {
              const snap = (nearestSnap.onShape || nearestSnap.onGrid)!;
              return <Circle key={`snap-point-${i}`} x={snap.x} y={snap.y} radius={5} stroke="grey" strokeWidth={1} fill="#fcf5ca" />;
            })}
          </Layer>
        </Stage>
      </main>
      {selectedId && inspectorDisplay && <Inspector key={selectedId} shapeId={selectedId} shape={shapes[selectedId]} handleCloseInspector={handleCloseInspector} clearSelection={clearSelection} />}
    </>
  );
};
