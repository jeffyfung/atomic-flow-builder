import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../hooks";
import { updateShape } from "../../../features/canvas";
import { ShapeProperties } from "../../../features/shape";

export const FormTextField: React.FC<{
  shapeId: string;
  shape: ShapeProperties;
  fieldName: keyof ShapeProperties;
}> = ({ shapeId, shape, fieldName }) => {
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
    <TextField
      variant="outlined" //
      size="small"
      value={shape[fieldName]}
      placeholder="text"
      onChange={handleChange}
      sx={{ width: "87%" }}
      inputProps={{ style: { fontSize: "0.85rem", padding: "8px 12px" } }}
      InputLabelProps={{ style: { fontSize: "0.85rem" } }}
    />
  );
};
