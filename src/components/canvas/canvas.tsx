import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";
import Konva from "konva";
import { Shape } from "../shape/shape";
import { addToCanvas, selectCanvas, toggleDragging, updatePreview, updateShape } from "../../features/canvas";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";
import { Inspector } from "../inspector/inspector";
import { Gridline, getGridCoordinate, getStageCoordinate } from "./gridline";

// TODO: make the canvas fit the layout/window perfectly
export const Canvas: React.FC<{}> = () => {
  const { shapes, previewShape, dragging } = useAppSelector(selectCanvas);
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectorDisplay, setInspectorDisplay] = useState<boolean>(true);
  const [stageObj, setStageObj] = useState<Konva.Stage | null>(null);
  const [nearestSnap, setNearestSnap] = useState<{ x: number; y: number; gridX: number; gridY: number } | null>(null);

  const snapGridDistanceThreshold = 0.4;
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    setStageObj(stageRef.current);
  }, []);

  const handleClick = (_event: React.MouseEvent<HTMLElement>) => {
    if (dragging) {
      const shape = store.getState().canvas.previewShape;
      if (shape !== null) {
        dispatch(addToCanvas(nearestSnap ? { ...shape, ...nearestSnap } : shape));
      }
      if (nearestSnap) {
        setNearestSnap(null);
      }
      dispatch(toggleDragging(false));
    }
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (dragging) {
      const stage = stageRef.current!;
      stage.setPointersPositions(event);
      const { x, y } = stage.getPointerPosition()!;
      const { gridX, gridY } = getGridCoordinate(x, y);

      dispatch(
        updatePreview({
          x,
          y,
          gridX,
          gridY,
        })
      );

      setInspectorDisplay(false);
      const nearestSnapGridX = Math.round(gridX);
      const nearestSnapGridY = Math.round(gridY);
      if (Math.abs(nearestSnapGridX - gridX) < snapGridDistanceThreshold && Math.abs(nearestSnapGridY - gridY) < snapGridDistanceThreshold) {
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
                />
              );
            })}
          </Layer>
          {previewShape && (
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
              />
            </Layer>
          )}
          {nearestSnap && (
            <Layer>
              <Circle x={nearestSnap.x} y={nearestSnap.y} radius={5} stroke="black" strokeWidth={0.5} fill="white" />
            </Layer>
          )}
        </Stage>
      </main>
      {selectedId && inspectorDisplay && <Inspector key={selectedId} shapeId={selectedId} shape={shapes[selectedId]} handleCloseInspector={handleCloseInspector} clearSelection={clearSelection} />}
    </>
  );
};
