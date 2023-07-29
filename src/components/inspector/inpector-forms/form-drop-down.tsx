import { MenuItem, TextField } from "@mui/material";
import { ShapeProperties } from "../../../features/shape";
import { useAppDispatch } from "../../../hooks";
import { ChangeEvent } from "react";
import { updateShape } from "../../../features/canvas";

export const FormDropDown: React.FC<{
  shapeId: string;
  shape: ShapeProperties;
  fieldName: keyof ShapeProperties;
  options: any[];
}> = ({ shapeId, shape, fieldName, options }) => {
  const dispatch = useAppDispatch();

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
        <MenuItem key={val} value={val}>
          {val}
        </MenuItem>
      ))}
    </TextField>
  );
};
