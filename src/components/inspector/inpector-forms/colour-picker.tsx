import { MouseEvent, useState } from "react";
import { LatexColour, ShapeProperties } from "../../../features/shape";
import { Button, Grid, ListItem, Menu, Paper, styled } from "@mui/material";
import { useAppDispatch } from "../../../hooks";
import { updateShape } from "../../../features/canvas";
import eyedropperIcon from "../../../res/cursors/eyedropper.png";

export interface ColourPickerProps {
  shapeId: string;
  shape: ShapeProperties;
  strokeNames: (keyof ShapeProperties)[];
}

const ColourButton = styled(Button)({
  height: "30px",
  minWidth: "60px",
  maxWidth: "60px",
  padding: 0,
});

export const ColourPicker: React.FC<ColourPickerProps> = ({ shapeId, shape, strokeNames }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const menuNumCols = 4;
  const menuNumRows = 5;

  return (
    <>
      <Grid container direction="row" spacing={0}>
        {strokeNames.map((strokeName) => {
          return (
            <Grid key={strokeName} item xs={12 / strokeNames.length}>
              <ColourButton id={strokeName} variant="contained" onClick={handleButtonClick} sx={{ backgroundColor: shape[strokeName] as string }} />
            </Grid>
          );
        })}
      </Grid>
      <Menu
        open={open} //
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#ffffff00",
          },
          "& .MuiPaper-root:hover": {
            cursor: `url(/eyedropper.png) 0 24, grab`,
          },
          "& .MuiList-root": {
            display: "grid",
            gridTemplateColumns: `repeat(${menuNumCols}, 40px)`,
            gridTemplateRows: `repeat(${menuNumRows}, 40px)`,
            gridAutoFlow: "column",
            gridColumnGap: "0px",
            padding: "0px",
            backgroundColor: "#ffffff00",
          },
        }}
      >
        {anchorEl &&
          Object.values(LatexColour).map((colour) => {
            const handleClick = (_event: MouseEvent<HTMLElement>) => {
              dispatch(
                updateShape({
                  id: shapeId,
                  properties: { [anchorEl.id]: colour },
                })
              );
              setAnchorEl(null);
            };
            return (
              <ListItem
                className="colour-options-list-item"
                key={colour}
                onClick={handleClick}
                sx={{
                  backgroundColor: colour,
                  padding: 0,
                  ":hover": {
                    border: "2px solid blue",
                  },
                }}
              >
                <Paper />
              </ListItem>
            );
          })}
      </Menu>
    </>
  );
};
