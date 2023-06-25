import { useEffect, useRef, useState } from "react";

// TODO: make the canvas fit the layout/window perfectly
// add camera / viewport for canvas

export const Canvas: React.FC<{}> = () => {
  const gridlineSpacing = 10;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainer = useRef<HTMLDivElement>(null);
  //   const [canvasWidth, setCanvasWidth] = useState(300);
  //   const [canvasHeight, setCanvasHeight] = useState(300);

  const drawGridlines = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, gridSize: number) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    context.strokeStyle = "#ccc"; // TODO: update color
    context.lineWidth = 0.2; // 0.1

    console.log(canvasWidth, canvasHeight);
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvasHeight);
      context.stroke();
    }

    for (let y = 0; y <= canvasHeight; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvasWidth, y);
      context.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d");

    if (context !== null) {
      drawGridlines(canvas, context, gridlineSpacing);
    }
  });

  //   useEffect(() => {
  //     console.log(window.getComputedStyle(canvasContainer.current!).width);
  //     console.log(window.getComputedStyle(canvasContainer.current!).height);
  //     const width = window.getComputedStyle(canvasContainer.current!).width;
  //     const height = window.getComputedStyle(canvasContainer.current!).height;
  //     setCanvasWidth(parseInt(width.split("px")[0]));
  //     setCanvasHeight(parseInt(height.split("px")[0]));
  //   }, []);

  return (
    <div ref={canvasContainer} className="canvas">
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
      {/* <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas> */}
    </div>
  );
};
