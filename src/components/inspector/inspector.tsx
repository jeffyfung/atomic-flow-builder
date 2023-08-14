import { Box, Fab, Grid, Typography, styled } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { validator } from "../../features/form";
import { FormTextFieldAndSlider } from "./inpector-forms/form-text-field-and-slider";
import { LabelPlacement, ShapeProperties } from "../../features/shape";
import { MouseEvent, ReactNode } from "react";
import { deleteShape } from "../../features/canvas";
import { useAppDispatch } from "../../hooks";
import { FormTextField } from "./inpector-forms/form-text-field";
import { convertShapeToLatex } from "../../features/latex-converter";
import { ColourPicker } from "./inpector-forms/colour-picker";
import { FormDropDown } from "./inpector-forms/form-drop-down";
import { isShapePropertiesKey } from "../../features/type-util";

const StyledBoxContainer = styled(Box)({
  position: "absolute",
  width: "340px",
  top: "15%",
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
    const components: React.ReactNode[] = [];
    for (let field of shape.variables) {
      if (field === "widthFactor") {
        components.push(
          <NestedGridContainer key={field} container direction="row" spacing={0}>
            <Grid item xs={3}>
              <Typography fontSize="0.85rem">Width Factor</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormTextFieldAndSlider shapeId={shapeId} shape={shape} fieldName={field} validator={validator.positiveNumberOnly} />
            </Grid>
          </NestedGridContainer>
        );
      } else if (field === "stroke1") {
        const strokeNames = shape.variables.filter((v) => v.startsWith("stroke")) as (keyof ShapeProperties)[];
        components.push(
          <NestedGridContainer key={field} container direction="row" spacing={0}>
            <Grid item xs={3}>
              <Typography fontSize="0.85rem">Stroke Colours</Typography>
            </Grid>
            <Grid item xs={9}>
              <ColourPicker shapeId={shapeId} strokeNames={strokeNames} shape={shape} />
            </Grid>
          </NestedGridContainer>
        );
      } else if (/^label[0-9]$/.test(field)) {
        if (!isShapePropertiesKey(field)) throw new Error("Incorrect Type");
        components.push(
          <NestedGridContainer key={field} container direction="row" spacing={0}>
            <Grid item xs={3}>
              <Typography fontSize="0.85rem">{`Label ${field.slice(5)}`}</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormTextField shapeId={shapeId} shape={shape} fieldName={field} />
            </Grid>
          </NestedGridContainer>
        );
      } else if (field === "labelPlacement") {
        components.push(
          <NestedGridContainer key={field} container direction="row" spacing={0}>
            <Grid item xs={3}>
              <Typography fontSize="0.85rem">Label Placement</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormDropDown shapeId={shapeId} shape={shape} fieldName={field} label="Position" options={Object.values(LabelPlacement)} />
            </Grid>
          </NestedGridContainer>
        );
      }
    }
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
            <NestedGridContainer key={"component-latex"} container direction="row" spacing={0}>
              <Grid item xs={3}>
                <Typography fontSize="0.85rem">LaTex</Typography>
                <Typography fontSize="0.7rem" color="grey" fontStyle="italic">
                  (Read Only)
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextareaAutosize
                  disabled //
                  maxRows={5}
                  value={convertShapeToLatex(shape)}
                />
              </Grid>
            </NestedGridContainer>
          </StyledGridItem>
        </StyledGridContainer>
      </StyledBoxContainer>
    </>
  );
};
