import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ShapeProperties } from "./shape";
import { nanoid } from "nanoid";

export interface CanvasState {
  shapes: Record<string, ShapeProperties>;
  previewShape: ShapeProperties | null;
  dragging: boolean;
  drawing: boolean;
  snappableVertices: { x: number; y: number }[];
}

const initialState: CanvasState = {
  shapes: {},
  previewShape: null,
  dragging: false,
  drawing: false,
  snappableVertices: [],
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addToCanvas: (state, action: PayloadAction<ShapeProperties>) => {
      state.shapes[nanoid()] = action.payload;
      state.previewShape = null;
    },
    loadCanvas: (state, action: PayloadAction<Record<string, ShapeProperties>>) => {
      state.shapes = action.payload;
      state.previewShape = null;
      state.dragging = false;
      state.drawing = false;
      state.snappableVertices = [];
    },
    addToPreview: (state, action: PayloadAction<ShapeProperties>) => {
      state.previewShape = action.payload;
    },
    updatePreview: (state, action: PayloadAction<Pick<ShapeProperties, "x" | "y" | "gridX" | "gridY" | "draw">>) => {
      state.previewShape = {
        ...state.previewShape!,
        ...action.payload,
      };
    },
    clear: (state) => {
      state.shapes = {};
    },
    updateShape: (state, action: PayloadAction<{ id: string; properties: Partial<ShapeProperties> }>) => {
      state.shapes[action.payload.id] = {
        ...state.shapes[action.payload.id],
        ...action.payload.properties,
      };
    },
    deleteShape: (state, action: PayloadAction<string>) => {
      delete state.shapes[action.payload];
    },
    toggleDragging: (state, action: PayloadAction<boolean>) => {
      state.dragging = action.payload;
    },
    toggleDrawing: (state, action: PayloadAction<boolean>) => {
      state.drawing = action.payload;
    },
    setSnappableVertices: (state, action: PayloadAction<{ x: number; y: number }[]>) => {
      state.snappableVertices = action.payload;
    },
  },
});

export const { addToCanvas, loadCanvas, addToPreview, updatePreview, clear, updateShape, deleteShape, toggleDragging, toggleDrawing, setSnappableVertices } = canvasSlice.actions;

export const selectCanvas = (state: RootState) => state.canvas;

export default canvasSlice.reducer;
