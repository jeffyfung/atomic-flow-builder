import { MenuItem, TextField } from "@mui/material";
import { LatexColour, ShapeProperties } from "../../../features/shape";
import { useAppDispatch } from "../../../hooks";
import { ChangeEvent, FormEvent } from "react";
import { updateShape } from "../../../features/canvas";

export const FormDropDown: React.FC<{
  shapeId: string;
  shape: ShapeProperties;
  fieldName: keyof ShapeProperties;
  options: any[];
}> = ({ shapeId, shape, fieldName, options }) => {
  const dispatch = useAppDispatch();
  const value = shape[fieldName];

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    dispatch(
      updateShape({
        id: shapeId,
        properties: { [fieldName]: event.target!.value },
      })
    );
  };

  return (
    <TextField variant="outlined" size="small" label="Colour" select value={shape[fieldName]} onChange={handleChange} sx={{ width: "87%" }}>
      {options.map((val) => (
        <MenuItem value={val}>{val}</MenuItem>
      ))}
    </TextField>
  );
};
