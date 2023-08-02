import { Box, List, ListItem, ListItemButton, Menu, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { Dispatch, DragEvent, MouseEvent, SetStateAction, useState } from "react";
import { addToPreview } from "../../features/canvas";
import { ShapeProperties, ShapeType, getShapeProperties } from "../../features/shape";
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
  handleDragStart: (event: DragEvent, shapeType: ShapeType) => void;
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

const LeafPaletteItem: React.FC<LeafPaletteItemProps> = ({ shapeType, handleDragStart, iconElement, setNestedMenu, setNestedMenuAnchorEl }) => {
  const dragStartHandler = (event: DragEvent) => {
    handleDragStart(event, shapeType);
    setTimeout(() => {
      setNestedMenu(null);
      setNestedMenuAnchorEl(null);
    }, 100);
  };

  return (
    <ListItem disableGutters style={{ justifyContent: "center" }}>
      <Box>
        <ListItemButton sx={{ padding: 0 }}>
          <div className={`shape ${shapeType}`} draggable onDragStart={dragStartHandler}>
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

  const handleDragStart = (event: DragEvent, shapeType: ShapeType) => {
    // disable the dragging image
    event.dataTransfer.setDragImage(placeholderImg, 0, 0);
    (event.target as Element).classList.add("hide");

    const payload = getShapeProperties(shapeType, event.nativeEvent.clientX, event.nativeEvent.clientY);
    dispatch(addToPreview(payload));
  };

  return (
    <StyledToolbarBox id="palette" sx={{ boxShadow: "3", zIndex: 1 }}>
      <List>
        {paletteItemSchema.map((i, idx) => {
          if (i.nested) {
            return <PaletteItem key={idx} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />;
          } else {
            return <LeafPaletteItem key={idx} handleDragStart={handleDragStart} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />;
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
            <LeafPaletteItem key={idx} handleDragStart={handleDragStart} setNestedMenu={setNestedMenu} setNestedMenuAnchorEl={setNestedMenuAnchorEl} {...i} />
          ))}
        </Menu>
      )}
    </StyledToolbarBox>
  );
};
