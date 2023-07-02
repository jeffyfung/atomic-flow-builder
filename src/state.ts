export {};
// import { createStore } from "@halka/state";
// import { nanoid } from "nanoid";
// import produce from "immer";

// TODO: to confirm
// type BaseState = {
//   selected: string[];
//   shapes: Record<string, ShapeProperties>;
// };

// const baseState: BaseState = {
//   selected: [],
//   shapes: {},
// };

// export const useShapes = createStore(baseState);
// const setState = (fn: (draftState: BaseState) => void) => useShapes.set(produce<BaseState>(fn));

// // TODO: build schema for enum / const
// export const createRectangle = ({ x, y }: { x: number; y: number }) => {
//   setState((state) => {
//     state.shapes[nanoid()] = {
//       type: "rect",
//       width: 150,
//       height: 100,
//       fill: "#ffffff",
//       stroke: "#000000",
//       rotation: 0,
//       x,
//       y,
//     };
//   });
// };

// export const createCircle = ({ x, y }: { x: number; y: number }) => {
//   setState((state) => {
//     state.shapes[nanoid()] = {
//       type: "circle",
//       radius: 50,
//       fill: "white",
//       stroke: "black",
//       x,
//       y,
//     };
//   });
// };

// export const selectShape = (id: string) => {
//   setState((state) => {
//     state.selected.push(id);
//   });
// };

// export const clearSelection = () => {
//   setState((state) => {
//     state.selected = [];
//   });
// };

// export const moveShape = (id: string, event: any) => {
//   setState((state) => {
//     const shape = state.shapes[id];

//     if (shape) {
//       shape.x = event.target.x(); //?
//       shape.y = event.target.y(); //?
//     }
//   });
// };
