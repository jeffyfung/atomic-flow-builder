import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ShapeProperties, ShapeType } from "./shape";
import { nanoid } from "nanoid";

export interface CanvasState {
  shapes: Record<string, ShapeProperties>;
  previewShape: ShapeProperties | null;
}

// export interface DragPoint {
//   type: ShapeType;
//   clientX: number;
//   clientY: number;
// offsetX: number;
// offsetY: number;
// screenX: number;
// screenY: number;
// }

// export interface DropPoint extends DragPoint {
//   coordX?: number;
//   coordY?: number;
// }

const initialState: CanvasState = {
  shapes: {},
  previewShape: null,
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addToCanvas: (state, action: PayloadAction<ShapeProperties>) => {
      state.shapes[nanoid()] = action.payload;
      state.previewShape = null;
    },
    addToPreview: (state, action: PayloadAction<ShapeProperties>) => {
      state.previewShape = action.payload;
    },
    updatePreview: (state, action: PayloadAction<Pick<ShapeProperties, "x" | "y">>) => {
      state.previewShape = {
        ...state.previewShape!,
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    clear: (state) => {
      state.shapes = {};
    },
  },
});

export const { addToCanvas, addToPreview, updatePreview, clear } = canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export default canvasSlice.reducer;
