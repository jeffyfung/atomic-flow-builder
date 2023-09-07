import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useState } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useForceUpdate = (): (() => void) => {
  const [_, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};
