import { Box, Fab, Grid, TextField, Typography, styled } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { validator } from "../../features/form";
import { FormTextFieldAndSlider } from "./inpector-forms/form-text-field-and-slider";
import { useAppDispatch, useAppSelector } from "../../hooks";
// import { selectInspectorStatus, selectSelectedId, toggleInspector } from "../../features/canvas";
import { ShapeProperties } from "../../features/shape";
import { MouseEvent } from "react";

const StyledBoxContainer = styled(Box)({
  position: "absolute",
  width: "350px",
  height: "90%",
  right: "7px",
  backgroundColor: "#fffffd",
  zIndex: 2,
});
const StyledGridContainer = styled(Grid)({
  padding: 3,
  justifyContent: "center",
  alignItems: "stretch",
});

const StyledGridItem = styled(Grid)({
  border: "2px solid grey",
  borderRadius: "10px",
  margin: "5px",
});

const StyledIconButton = styled(Fab)({
  position: "absolute",
  top: "-29px",
  right: "2px",
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
}

export const Inspector: React.FC<InspectorProps> = ({ shapeId, shape, handleCloseInspector }) => {
  // const dispatch = useAppDispatch();
  // const handleClick = () => dispatch(toggleInspector(false));

  // TODO: rewrite into schema
  return (
    <>
      <StyledBoxContainer>
        <StyledIconButton color="info" size="small" onClick={handleCloseInspector}>
          <RemoveIcon />
        </StyledIconButton>
        <StyledGridContainer id="inspector" width="100%" height="100%" container direction="row" spacing={2} sx={{ boxShadow: "3" }}>
          <StyledGridItem item xs={12}>
            <Typography fontSize="1.2rem" fontWeight="bold" sx={{ marginBottom: "12px" }}>
              Object Inspector
            </Typography>
            <NestedGridContainer container direction="row" spacing={2}>
              <Grid item xs={3}>
                Stroke 1
              </Grid>
              <Grid item xs={9}>
                <TextField variant="outlined" size="small" label="Colour"></TextField>
              </Grid>
            </NestedGridContainer>
            <NestedGridContainer container direction="row" spacing={2}>
              <Grid item xs={3}>
                Stroke 2
              </Grid>
              <Grid item xs={9}>
                <TextField variant="outlined" size="small" label="Colour"></TextField>
              </Grid>
            </NestedGridContainer>
            <NestedGridContainer container direction="row" spacing={2}>
              <Grid item xs={3}>
                Stroke 3
              </Grid>
              <Grid item xs={9}>
                <TextField variant="outlined" size="small" label="Colour"></TextField>
              </Grid>
            </NestedGridContainer>
            <NestedGridContainer container direction="row" spacing={2}>
              <Grid item xs={3}>
                Width Factor
              </Grid>
              <Grid item xs={9}>
                <FormTextFieldAndSlider shapeId={shapeId} shape={shape} fieldName="widthFactor" validator={validator.positiveNumberOnly} />
              </Grid>
            </NestedGridContainer>
            {/* <NestedGridContainer container direction="row" spacing={2}>
                <Grid item xs={3}>
                  Width
                </Grid>
                <Grid item xs={9}>
                  <FormTextFieldAndSlider defaultValue={1} validator={validator.positiveIntegerOnly} />
                </Grid>
              </NestedGridContainer>
              <NestedGridContainer container direction="row" spacing={2}>
                <Grid item xs={3}>
                  Height
                </Grid>
                <Grid item xs={9}>
                  <FormTextFieldAndSlider fieldName={"height"} validator={validator.positiveIntegerOnly} />
                </Grid>
              </NestedGridContainer> */}
          </StyledGridItem>
          <StyledGridItem item xs={12}>
            <Typography fontSize="1.2rem" fontWeight="bold" sx={{ marginBottom: "12px" }}>
              Metadata
            </Typography>
            <Typography>Some info... </Typography>
          </StyledGridItem>
        </StyledGridContainer>
      </StyledBoxContainer>
    </>
  );
};
