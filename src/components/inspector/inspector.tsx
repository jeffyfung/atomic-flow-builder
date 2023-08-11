import { Box, Fab, Grid, TextField, Typography, styled } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { validator } from "../../features/form";
import { FormTextFieldAndSlider } from "./inpector-forms/form-text-field-and-slider";
import { LatexColour, ShapeProperties } from "../../features/shape";
import { MouseEvent, ReactNode } from "react";
import { FormDropDown } from "./inpector-forms/form-drop-down";
import { deleteShape } from "../../features/canvas";
import { useAppDispatch } from "../../hooks";
import { FormTextField } from "./inpector-forms/form-text-field";

const StyledBoxContainer = styled(Box)({
  position: "absolute",
  width: "340px",
  top: "12%",
  right: "7px",
  zIndex: 2,
});
const StyledGridContainer = styled(Grid)({
  padding: 3,
  justifyContent: "center",
  alignItems: "stretch",
  backgroundColor: "#fffffd",
});

const StyledGridItem = styled(Grid)({
  border: "2px solid grey",
  borderRadius: "10px",
  margin: "5px",
  paddingBottom: "12px",
});

const NestedGridContainer = styled(Grid)({
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "15px",
});

export interface InspectorProps {
  shapeId: string;
  shape: ShapeProperties;
  handleCloseInspector: (event: MouseEvent<HTMLElement>) => void;
  clearSelection: () => void;
}

export const Inspector: React.FC<InspectorProps> = ({ shapeId, shape, handleCloseInspector, clearSelection }) => {
  const dispatch = useAppDispatch();

  const getForm = (shape: ShapeProperties): ReactNode[] => {
    const components = shape.variables.map((field) => {
      if (field === "widthFactor") {
        return (
          <NestedGridContainer key={field} container direction="row" spacing={0}>
            <Grid item xs={3}>
              <Typography fontSize="0.85rem">Width Factor</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormTextFieldAndSlider shapeId={shapeId} shape={shape} fieldName={field} validator={validator.positiveNumberOnly} />
            </Grid>
          </NestedGridContainer>
        );
      } else if (field.startsWith("stroke")) {
        return (
          <NestedGridContainer key={field} container direction="row" spacing={0}>
            <Grid item xs={3}>
              <Typography fontSize="0.85rem">{`Stroke ${field.slice(6)}`}</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormDropDown shapeId={shapeId} shape={shape} fieldName={field} options={Object.values(LatexColour)} />
            </Grid>
          </NestedGridContainer>
        );
      } else if (field.startsWith("label")) {
        return (
          <NestedGridContainer key={field} container direction="row" spacing={0}>
            <Grid item xs={3}>
              <Typography fontSize="0.85rem">{`Label ${field.slice(5)}`}</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormTextField shapeId={shapeId} shape={shape} fieldName={field} />
            </Grid>
          </NestedGridContainer>
        );
      }
    });
    return components;
  };

  const handleDeleteShape = () => {
    dispatch(deleteShape(shapeId));
    clearSelection();
  };

  return (
    <>
      <StyledBoxContainer>
        <Fab color="info" size="small" onClick={handleCloseInspector} sx={{ position: "absolute", top: "-29px", right: "2px" }}>
          <RemoveIcon />
        </Fab>
        <Fab color="error" size="small" onClick={handleDeleteShape} sx={{ position: "absolute", top: "-29px", right: "50px" }}>
          <DeleteForeverIcon />
        </Fab>
        <StyledGridContainer id="inspector" width="100%" height="100%" container direction="row" spacing={2} sx={{ boxShadow: "3" }}>
          <StyledGridItem item xs={12}>
            <Typography fontSize="1rem" fontWeight="bold" sx={{ marginBottom: "0.5vh" }}>
              Object Inspector
            </Typography>
            {getForm(shape)}
          </StyledGridItem>
          <StyledGridItem item xs={12}>
            <Typography fontSize="1rem" fontWeight="bold" sx={{ marginBottom: "0.5vh" }}>
              Metadata
            </Typography>
            <Typography>Some info... </Typography>
          </StyledGridItem>
        </StyledGridContainer>
      </StyledBoxContainer>
    </>
  );
};
