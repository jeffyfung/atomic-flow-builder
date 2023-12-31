import { Box, List, ListItem, ListItemButton, Menu } from "@mui/material";
import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { addToPreview, toggleDragging, toggleDrawing } from "../../features/canvas";
import { ShapeType, getShapeProperties } from "../../features/shape";
import { useAppDispatch } from "../../hooks";
import { LeafPaletteItemSchema, PaletteItemSchema, paletteItemSchema } from "./constant";

const StyledToolbarBox = styled(Box)({
  position: "absolute",
  width: "46px",
  left: "7px",
  marginTop: "auto",
  marginBottom: "auto",
  backgroundColor: "white",
});

/**
 * The props type for {@link PaletteItems}.
 */
export interface PaletteItemProps extends PaletteItemSchema {
  setNestedMenu: Dispatch<SetStateAction<LeafPaletteItemSchema[] | null>>;
  setNestedMenuAnchorEl: Dispatch<SetStateAction<Element | null>>;
  handleMouseEnter: (event: MouseEvent<HTMLElement>) => void;
  handleMouseLeave: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * The props type for {@link LeafPaletteItems}.
 */
export interface LeafPaletteItemProps extends LeafPaletteItemSchema {
  setNestedMenu: Dispatch<SetStateAction<LeafPaletteItemSchema[] | null>>;
  setNestedMenuAnchorEl: Dispatch<SetStateAction<Element | null>>;
  handleClick: (event: MouseEvent<HTMLElement>, shapeType: ShapeType) => void;
  handleMouseEnter: (event: MouseEvent<HTMLElement>) => void;
  handleMouseLeave: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * Renders a menu item on the palette that represents a group of shapes in Virginia Lake.
 *
 * The props type is defined as a separate interface.
 *
 * ```
 * export const PaletteItem: React.FC<PaletteItemProps> = ({ children, iconElement, handleMouseEnter, handleMouseLeave, setNestedMenu, setNestedMenuAnchorEl }) => {
 *  // ...
 * }
 * ```
 *
 * @category Component
 */
export const PaletteItem: React.FC<PaletteItemProps> = ({ children, iconElement, handleMouseEnter, handleMouseLeave, setNestedMenu, setNestedMenuAnchorEl }) => {
  const onClick = (event: MouseEvent) => {
    setNestedMenu(children);
    setNestedMenuAnchorEl(event.currentTarget);
  };

  return (
    <ListItem disableGutters onClick={onClick} onDragStart={(e) => e.preventDefault()} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ justifyContent: "center" }}>
      <Box>
        <ListItemButton
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <div>{iconElement}</div>
        </ListItemButton>
      </Box>
    </ListItem>
  );
};

/**
 * Renders a menu item on the palette that represents a shape in Virginia Lake.
 *
 * The props type is defined as a separate interface.
 *
 * ```
 * export const LeafPaletteItem: React.FC<LeafPaletteItemProps> = ({ shapeType, handleClick, handleMouseEnter, handleMouseLeave, iconElement, setNestedMenu, setNestedMenuAnchorEl }) => {
 *  // ...
 * }
 * ```
 *
 * @category Component
 */
export const LeafPaletteItem: React.FC<LeafPaletteItemProps> = ({ shapeType, handleClick, handleMouseEnter, handleMouseLeave, iconElement, setNestedMenu, setNestedMenuAnchorEl }) => {
  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    handleClick(event, shapeType);
    setTimeout(() => {
      setNestedMenu(null);
      setNestedMenuAnchorEl(null);
    }, 100);
  };

  return (
    <ListItem
      disableGutters //
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={clickHandler}
      onDragStart={(e) => e.preventDefault()}
      sx={{
        justifyContent: "center",
        border: "1px solid #e6e6e6",
        padding: "0px 2px",
        minHeight: "4vh",
      }}
    >
      <Box>
        <ListItemButton
          sx={{
            padding: 0,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <div className={`shape ${shapeType}`}>{iconElement}</div>
        </ListItemButton>
      </Box>
    </ListItem>
  );
};

/**
 * Renders a palette that is a menu of palette shapes.
 *
 * This component does not contain any props.
 *
 * ```
 * export const Palette: React.FC<{}> = () => {
 *  // ...
 * }
 * ```
 *
 * @category Component
 */
export const Palette: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const [nestedMenu, setNestedMenu] = useState<LeafPaletteItemSchema[] | null>(null);
  const [nestedMenuAnchorEl, setNestedMenuAnchorEl] = useState<Element | null>(null);

  const handleNestedMenuClose = () => {
    setNestedMenu(null);
    setNestedMenuAnchorEl(null);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.backgroundColor = "#e9e9e9";
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.backgroundColor = "transparent";
  };

  const handleClick = (event: MouseEvent<HTMLElement>, shapeType: ShapeType) => {
    const payload = getShapeProperties(shapeType, event.nativeEvent.clientX, event.nativeEvent.clientY);
    dispatch(addToPreview(payload));
    if (payload.draw) {
      dispatch(toggleDrawing(true));
    } else {
      dispatch(toggleDragging(true));
    }
  };

  let numCols;
  let numRows;
  const itemsPerCol = 8;
  if (nestedMenu) {
    const numItems = nestedMenu.length;
    numCols = Math.ceil(numItems / itemsPerCol);
    numRows = numCols > 1 ? itemsPerCol : numItems;
  }

  return (
    <StyledToolbarBox id="palette" sx={{ boxShadow: "3", zIndex: 1 }}>
      <List>
        {paletteItemSchema.map((i, idx) => {
          if (i.nested) {
            return <PaletteItem key={idx} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />;
          } else {
            return <LeafPaletteItem key={idx} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} handleClick={handleClick} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />;
          }
        })}
      </List>
      {nestedMenu && (
        <Menu
          anchorEl={nestedMenuAnchorEl}
          open={!!nestedMenu}
          onClose={handleNestedMenuClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          sx={{
            marginLeft: "8px",
            "& .MuiList-root": {
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 50px)`,
              gridTemplateRows: `repeat(${numRows}, 50px)`,
              gridAutoFlow: "column",
              gridColumnGap: "0px",
              padding: "0px",
              overflow: "hidden",
            },
          }}
          PaperProps={{ sx: { boxShadow: 2 } }}
        >
          {nestedMenu.map((i, idx) => (
            <LeafPaletteItem key={idx} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} handleClick={handleClick} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />
          ))}
        </Menu>
      )}
    </StyledToolbarBox>
  );
};
