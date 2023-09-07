import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../../hooks";
import { updateShape } from "../../../features/canvas";
import { ShapeProperties } from "../../../features/shape";

/**
 * Renders a text field for user input and a slider. Must be linked to a shape on canvas.
 *
 * ```
 * export const FormTextField: React.FC<{
 *  shapeId: string;
 *  shape: ShapeProperties;
 *  fieldName: keyof ShapeProperties;
 * }> = ({ shapeId, shape, fieldName }) => {
 *  // ...
 * }
 * ```
 *
 * @category Component
 */
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
      inputProps={{ style: { fontSize: "0.95rem", padding: "8px 12px" } }}
      InputLabelProps={{ style: { fontSize: "0.95rem" } }}
    />
  );
};
