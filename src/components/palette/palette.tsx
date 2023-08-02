import { Box, List, ListItem, ListItemButton, Menu, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { addToPreview, toggleDragging } from "../../features/canvas";
import { ShapeType, getShapeProperties } from "../../features/shape";
import { useAppDispatch } from "../../hooks";
import { LeafPaletteItemSchema, PaletteItemSchema, paletteItemSchema } from "./constant";

const StyledToolbarBox = styled(Box)({
  position: "absolute",
  width: "40px",
  left: "5px",
  backgroundColor: "white",
});

interface PaletteItemProps extends PaletteItemSchema {
  setNestedMenu: Dispatch<SetStateAction<LeafPaletteItemSchema[] | null>>;
  setNestedMenuAnchorEl: Dispatch<SetStateAction<Element | null>>;
}

interface LeafPaletteItemProps extends LeafPaletteItemSchema {
  setNestedMenu: Dispatch<SetStateAction<LeafPaletteItemSchema[] | null>>;
  setNestedMenuAnchorEl: Dispatch<SetStateAction<Element | null>>;
  handleClick: (event: MouseEvent<HTMLElement>, shapeType: ShapeType) => void;
}

const PaletteItem: React.FC<PaletteItemProps> = ({ children, iconElement, setNestedMenu, setNestedMenuAnchorEl }) => {
  const onClick = (event: MouseEvent) => {
    setNestedMenu(children);
    setNestedMenuAnchorEl(event.currentTarget);
  };

  return (
    <ListItem disableGutters style={{ justifyContent: "center" }}>
      <Box>
        <ListItemButton sx={{ padding: 0 }}>
          <div onClick={onClick} onDragStart={(e) => e.preventDefault()}>
            {iconElement}
          </div>
        </ListItemButton>
      </Box>
    </ListItem>
  );
};

const LeafPaletteItem: React.FC<LeafPaletteItemProps> = ({ shapeType, handleClick, iconElement, setNestedMenu, setNestedMenuAnchorEl }) => {
  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    handleClick(event, shapeType);
    setTimeout(() => {
      setNestedMenu(null);
      setNestedMenuAnchorEl(null);
    }, 100);
  };

  return (
    <ListItem disableGutters style={{ justifyContent: "center" }}>
      <Box>
        <ListItemButton sx={{ padding: 0 }}>
          <div className={`shape ${shapeType}`} onClick={clickHandler} onDragStart={(e) => e.preventDefault()}>
            {iconElement}
          </div>
        </ListItemButton>
      </Box>
    </ListItem>
  );
};

// TODO: may need to do a multi-column selection
export const Palette: React.FC<{}> = () => {
  const placeholderImg = new Image();
  placeholderImg.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  const dispatch = useAppDispatch();

  const [nestedMenu, setNestedMenu] = useState<LeafPaletteItemSchema[] | null>(null);
  const [nestedMenuAnchorEl, setNestedMenuAnchorEl] = useState<Element | null>(null);

  const handleNestedMenuClose = () => {
    setNestedMenu(null);
    setNestedMenuAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLElement>, shapeType: ShapeType) => {
    const payload = getShapeProperties(shapeType, event.nativeEvent.clientX, event.nativeEvent.clientY);
    dispatch(addToPreview(payload));
    dispatch(toggleDragging(true));
  };

  return (
    <StyledToolbarBox id="palette" sx={{ boxShadow: "3", zIndex: 1 }}>
      <List>
        {paletteItemSchema.map((i, idx) => {
          if (i.nested) {
            return <PaletteItem key={idx} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />;
          } else {
            return <LeafPaletteItem key={idx} handleClick={handleClick} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />;
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
          sx={{ width: "100px", marginLeft: "10px" }}
          PaperProps={{ sx: { width: "40px", boxShadow: 2 } }}
        >
          {nestedMenu.map((i, idx) => (
            <LeafPaletteItem key={idx} handleClick={handleClick} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />
          ))}
        </Menu>
      )}
    </StyledToolbarBox>
  );
};
