import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Konva from "konva";
import { Shape } from "../shape/shape";
import { addToCanvas, selectCanvas, selectOrderedShapeEntries, toggleDragging, toggleDrawing, updatePreview, updateShape } from "../../features/canvas";
import { useAppDispatch, useAppSelector, useForceUpdate } from "../../hooks";
import { store } from "../../store";
import { Inspector } from "../inspector/inspector";
import { Gridline, computeNearestSnap, getGridCoordinate, getStageCoordinate } from "./gridline/gridline";
import { Coordinates, DrawableShapeType, ShapeProperties } from "../../features/shape";
import { computeDimension2V, computeDimensionArc, computeDimensionRect } from "../shape/shape-objects/drawable-shapes";
import "./canvas.css";
import { ContextMenu } from "./context-menu/context-menu";

export interface SnapPointForVertice {
  onShape?: Coordinates & { gridOffsetX: number; gridOffsetY: number };
  onGrid?: Coordinates & { gridOffsetX: number; gridOffsetY: number };
}

/**
 * This component renders the canvas and acts as the base for other componenents.
 *
 * The component does not take any props.
 
 * @category Component
 */
export const Canvas: React.FC<{}> = () => {
  const { shapes, previewShape, dragging, drawing, snappableVertices } = useAppSelector(selectCanvas);
  const orderedShapeList = useAppSelector(selectOrderedShapeEntries);
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectorDisplay, setInspectorDisplay] = useState<boolean>(true);
  const [stageObj, setStageObj] = useState<Konva.Stage | null>(null);
  const [nearestSnaps, setNearestSnaps] = useState<SnapPointForVertice[]>([]);
  const [drawingAnchorPoint, setDrawingAnchorPoint] = useState<Coordinates | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ top: number; left: number } | null>(null);

  const stageRef = useRef<Konva.Stage>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    setStageObj(stageRef.current);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (dragging || drawing) {
      const shape = store.getState().canvas.previewShape!;
      const stage = stageRef.current!;
      stage.setPointersPositions(event);
      const { x, y } = stage.getRelativePointerPosition()!;
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
      const { x, y } = stage.getRelativePointerPosition()!;
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

  const handleClickShape = (event: Konva.KonvaEventObject<MouseEvent>, id: string) => {
    if (selectedId === id) {
      if (event.evt.button === 2) {
        setContextMenuPosition({ left: event.evt.clientX, top: event.evt.clientY });
      } else {
        setSelectedId(null);
      }
    } else {
      setSelectedId(id);
      if (event.evt.button === 2) {
        setInspectorDisplay(false);
        setContextMenuPosition({ left: event.evt.clientX, top: event.evt.clientY });
      } else {
        setInspectorDisplay(true);
      }
    }
  };

  const handleCloseInspector = () => {
    setInspectorDisplay(false);
  };

  const handleShapeMouseEnter = (_event: Konva.KonvaEventObject<MouseEvent>) => {};

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
      const { x, y } = stageRef.current!.getRelativePointerPosition()!;
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
    event.cancelBubble = true;
    setInspectorDisplay(false);
  };

  const handleSelectedShapeDragEnd = (event: Konva.KonvaEventObject<DragEvent>, id: string) => {
    event.cancelBubble = true;
    const { x, y } = stageRef.current!.getRelativePointerPosition();
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

  const handleAnchorDragMove = (shapeId: string, data: { drawableShapeType: DrawableShapeType; existingVertex: Coordinates | Record<string, Coordinates>; selectedVName?: string }) => {
    setInspectorDisplay(false);
    const { drawableShapeType, existingVertex, selectedVName } = data;
    const { x, y } = stageRef.current!.getRelativePointerPosition()!;
    const { gridX, gridY } = getGridCoordinate(x, y);
    setNearestSnaps(() => {
      const nearestSnap = computeNearestSnap(gridX, gridY);
      return nearestSnap ? [{ onGrid: nearestSnap }] : [];
    });

    let properties: Partial<ShapeProperties>;
    switch (drawableShapeType) {
      case DrawableShapeType.TWO_VERTEX:
        properties = computeDimension2V(shapes[shapeId], { x, y, gridX, gridY }, existingVertex as Coordinates);
        break;
      case DrawableShapeType.ARC:
        properties = computeDimensionArc([selectedVName!, { x, y, gridX, gridY }], existingVertex as Record<string, Coordinates>);
        break;
      case DrawableShapeType.RECT:
        properties = computeDimensionRect([selectedVName!, { x, y, gridX, gridY }], existingVertex as Record<string, Coordinates>);
        break;
    }
    dispatch(
      updateShape({
        id: shapeId,
        properties,
      })
    );
  };

  const handleAnchorDragEnd = (shapeId: string, data: { drawableShapeType: DrawableShapeType; existingVertex: Coordinates | Record<string, Coordinates>; selectedVName?: string }) => {
    const { drawableShapeType, existingVertex, selectedVName } = data;
    if (nearestSnaps.length) {
      let properties: Partial<ShapeProperties>;
      switch (drawableShapeType) {
        case DrawableShapeType.TWO_VERTEX:
          properties = computeDimension2V(shapes[shapeId], nearestSnaps[0].onGrid!, existingVertex as Coordinates);
          break;
        case DrawableShapeType.ARC:
          properties = computeDimensionArc([selectedVName!, nearestSnaps[0].onGrid!], existingVertex as Record<string, Coordinates>);
          break;
        case DrawableShapeType.RECT:
          properties = computeDimensionRect([selectedVName!, nearestSnaps[0].onGrid!], existingVertex as Record<string, Coordinates>);
          break;
      }
      dispatch(
        updateShape({
          id: shapeId,
          properties,
        })
      );
    }
    setNearestSnaps([]);
  };

  // drawable shapes only have 1 snapping vertex but can have onShape (beta) and onGrid snap
  const snaps = nearestSnaps
    .filter((nearestSnap) => nearestSnap.onShape || nearestSnap.onGrid)
    .sort((a, b) => {
      const snapA = (a.onShape || a.onGrid)!;
      const snapB = (b.onShape || b.onGrid)!;
      return snapA.gridOffsetX ** 2 + snapA.gridOffsetY ** 2 - (snapB.gridOffsetX ** 2 + snapB.gridOffsetY ** 2);
    });

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (contextMenuPosition) {
      setContextMenuPosition(null);
    }
  };

  return (
    <>
      <main className="canvas-main" onMouseMove={handleMouseOver} onClick={handleClick} onContextMenu={handleContextMenu}>
        <Stage className="canvas-stage" ref={stageRef} width={window.innerWidth} height={window.innerHeight} draggable onDragEnd={forceUpdate}>
          <Gridline stage={stageObj} />
          <Layer>
            {orderedShapeList.map(([shapeId, shape]) => {
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
      {!previewShape && selectedId && inspectorDisplay && <Inspector key={selectedId} shapeId={selectedId} shape={shapes[selectedId]} handleCloseInspector={handleCloseInspector} clearSelection={clearSelection} />}
      {contextMenuPosition && <ContextMenu position={contextMenuPosition} setContextMenuPosition={setContextMenuPosition} selectedId={selectedId} clearSelection={clearSelection} />}
    </>
  );
};
