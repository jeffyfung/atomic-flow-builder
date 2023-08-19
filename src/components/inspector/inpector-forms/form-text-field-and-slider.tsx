import { FormEvent, useState } from "react";
import { ValidatorType } from "../../../features/form";
import { Slider, TextField } from "@mui/material";
import { useAppDispatch } from "../../../hooks";
import { updateShape } from "../../../features/canvas";
import { ShapeProperties } from "../../../features/shape";

export interface SliderProps {
  valueLabelDisplay: "auto" | "on" | "off";
  step: number;
  min: number;
  max: number;
  marks: boolean;
}

export const FormTextFieldAndSlider: React.FC<{
  shapeId: string;
  shape: ShapeProperties;
  fieldName: keyof ShapeProperties;
  validator: ValidatorType;
  label?: string;
  sliderProps?: SliderProps;
}> = ({ shapeId, shape, fieldName, validator, label, sliderProps }) => {
  if (!sliderProps) {
    sliderProps = {
      valueLabelDisplay: "auto",
      step: 1,
      min: 1,
      max: 8,
      marks: true,
    };
  }

  const { valueLabelDisplay, step, min, max, marks } = sliderProps;
  const dispatch = useAppDispatch();
  const value = Number(shape[fieldName]);

  const [error, setError] = useState<string | null>(null);
  const [textDisplayValue, setTextDisplayValue] = useState<number | string>(value); //

  const handleInputChange = (event: FormEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const val = event.currentTarget!.value;
    const result = validator.func(val);
    if (result === true) {
      dispatch(
        updateShape({
          id: shapeId,
          properties: { [fieldName]: Number(val) },
        })
      );
      setError(null);
    } else {
      setError(result);
    }
    setTextDisplayValue(val);
  };

  const handleSliderChange = (_event: Event, val: any): void => {
    dispatch(
      updateShape({
        id: shapeId,
        properties: { [fieldName]: Number(val) },
      })
    );
    setError(null);
    setTextDisplayValue(val);
  };

  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        label={label}
        value={textDisplayValue}
        onChange={handleInputChange}
        error={!!error}
        helperText={error}
        sx={{ width: "30%", mr: 2 }} //
        inputProps={{ style: { fontSize: "0.95rem", padding: "8px 12px" } }}
        InputLabelProps={{ style: { fontSize: "0.95rem" } }}
      />
      <Slider color="secondary" sx={{ width: "50%" }} valueLabelDisplay={valueLabelDisplay} step={step} min={min} max={max} marks={marks} value={value} onChange={handleSliderChange} />
    </>
  );
};
