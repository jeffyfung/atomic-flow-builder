import { useCallback, useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import { Shape } from "../shape/shape";
import { addToCanvas, selectCanvas, updatePreview, updateShape } from "../../features/canvas";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";
import { Inspector } from "../inspector/inspector";

// TODO: make the canvas fit the layout/window perfectly
// add camera / viewport for canvas
// snappable grid (optional)

export const Canvas: React.FC<{}> = () => {
  //   const gridlineSpacing = 10;
  //   const [canvasWidth, setCanvasWidth] = useState(300);
  //   const [canvasHeight, setCanvasHeight] = useState(300);

  //   const drawGridlines = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, gridSize: number) => {
  //     const canvasWidth = canvas.width;
  //     const canvasHeight = canvas.height;
  //     context.strokeStyle = "#ccc"; // TODO: update color
  //     context.lineWidth = 0.2; // 0.1

  //     for (let x = 0; x <= canvasWidth; x += gridSize) {
  //       context.beginPath();
  //       context.moveTo(x, 0);
  //       context.lineTo(x, canvasHeight);
  //       context.stroke();
  //     }

  //     for (let y = 0; y <= canvasHeight; y += gridSize) {
  //       context.beginPath();
  //       context.moveTo(0, y);
  //       context.lineTo(canvasWidth, y);
  //       context.stroke();
  //     }
  //   };

  const { shapes, previewShape } = useAppSelector(selectCanvas);
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inspectorDisplay, setInspectorDisplay] = useState<boolean>(true);

  const stageRef = useRef<Konva.Stage>(null);

  const handleDrop = useCallback((event: React.DragEvent) => {
    // const draggedData = event.nativeEvent.dataTransfer?.getData("dragPayload");

    // if (draggedData) {
    // const data = JSON.parse(draggedData);
    // stageRef.current!.setPointersPositions(event);
    // const coords = stageRef.current!.getPointerPosition()!;
    // const shape = getShapeProperties({ ...data, coordX: coords.x, coordY: coords.y });
    // }
    const shape = store.getState().canvas.previewShape;
    if (shape !== null) {
      dispatch(addToCanvas(shape));
    }

    (event.target as Element).classList.remove("hide");
  }, []);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();

    const stage = stageRef.current!;
    stage.setPointersPositions(event);
    // const scale = stage.scaleX();
    const coords = stage.getPointerPosition()!;

    dispatch(
      updatePreview({
        x: coords.x,
        y: coords.y,
      })
    );
  };

  const handleClick = (_event: Konva.KonvaEventObject<MouseEvent>, id: string) => {
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
    container.style.cursor = "default";
  };

  // const clearSelection = () => {
  //   dispatch(selectShape(null));
  // };

  const handleSelectedShapeDragEnd = (event: Konva.KonvaEventObject<DragEvent>, id: string) => {
    const { x, y } = event.target!.absolutePosition();
    dispatch(
      updateShape({
        id,
        properties: {
          x,
          y,
        },
      })
    );
  };

  return (
    <>
      <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
        <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {Object.entries(shapes).map(([shapeId, shape]) => {
              return (
                <Shape
                  selected={selectedId === shapeId} //
                  key={shapeId}
                  shapeId={shapeId}
                  shape={{ ...shape, id: shapeId }}
                  onClick={handleClick}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleDragEnd={handleSelectedShapeDragEnd}
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
              />
            </Layer>
          )}
        </Stage>
      </main>
      {selectedId && inspectorDisplay && <Inspector key={selectedId} shapeId={selectedId} shape={shapes[selectedId]} handleCloseInspector={handleCloseInspector} />}
    </>
  );
};
