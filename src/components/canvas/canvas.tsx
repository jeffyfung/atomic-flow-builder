import { useCallback, useRef, DragEvent, useState, MouseEvent } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import { Shape } from "../shape/shape";
import { addToCanvas, selectCanvas, updatePreview } from "../../features/canvas";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { store } from "../../store";

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

  //     console.log(canvasWidth, canvasHeight);
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

  const stageRef = useRef<Konva.Stage>(null);

  const handleDrop = useCallback((event: DragEvent) => {
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

  const handleDragOver = (event: DragEvent) => {
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

  const clearSelection = () => {};

  return (
    <main className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
      <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} onClick={clearSelection}>
        <Layer>
          {Object.entries(shapes).map(([key, shape]) => (
            <Shape key={key} shape={{ ...shape, id: key }} />
          ))}
        </Layer>
        {previewShape && (
          <Layer>
            <Shape key={"drag-preview"} shape={{ ...previewShape, id: "drag-preview" }} />
          </Layer>
        )}
      </Stage>
    </main>
  );
};
