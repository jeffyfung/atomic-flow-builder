import { Box, List, ListItem, ListItemButton, Menu } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import styled from "@emotion/styled";
import { DragEvent } from "react";
import { DragPoint, addToPreview } from "../../features/canvas";
import { ShapeType, getShapeProperties } from "../../features/shape";
import { useAppDispatch } from "../../hooks";

const StyledToolbarBox = styled(Box)({
  position: "absolute",
  width: "50px",
  top: 0,
  margin: "auto 5px",
  backgroundColor: "white",
});

const StyledListItemButton = styled(ListItemButton)({
  padding: 0,
});

export const DrawingToolbar: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const handleDragStart = (event: DragEvent, shapeType: ShapeType) => {
    const payload: DragPoint = {
      type: shapeType,
      clientX: event.nativeEvent.clientX,
      clientY: event.nativeEvent.clientY,
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
    };
    event.dataTransfer.setData("dragPayload", JSON.stringify(payload));
    (event.target as Element).classList.add("hide");
    // event.dataTransfer.setDragImage(dragImage, 0, 0);
    // https://stackoverflow.com/questions/56053232/how-to-customize-a-drag-and-drop-image-with-react-js

    const shape = getShapeProperties({ ...payload, coordX: 0, coordY: 0 });
    dispatch(addToPreview(shape));
  };

  return (
    // TODO: rewrite to use schema to generate list
    <StyledToolbarBox id="drawing-toolbar" sx={{ boxShadow: "3" }}>
      <List>
        <ListItem disableGutters>
          <StyledListItemButton>
            <div className="shape rect" draggable onDragStart={(event) => handleDragStart(event, ShapeType.RECT)}>
              <InboxIcon sx={{ margin: "0 auto" }} />
            </div>
          </StyledListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <StyledListItemButton>
            <div className="shape circle" draggable onDragStart={(event) => handleDragStart(event, ShapeType.CIRCLE)}>
              <InboxIcon sx={{ margin: "0 auto" }} />
            </div>
          </StyledListItemButton>
        </ListItem>
        {/* <ListItem disableGutters>
          <StyledListItemButton>
            <div className="shape shape3" draggable onDragStart={(event) => handleDragStart(event, "shape3")}>
              <InboxIcon sx={{ margin: "0 auto" }} />
            </div>
          </StyledListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <StyledListItemButton>
            <div className="shape shape4" draggable onDragStart={(event) => handleDragStart(event, "shape4")}>
              <InboxIcon sx={{ margin: "0 auto" }} />
            </div>
          </StyledListItemButton>
        </ListItem> */}
      </List>
    </StyledToolbarBox>

    // <Menu
    //     id="drawing-toolbar"
    //     open={true}
    //     MenuListProps={{dense:true}}
    //     style={{
    //         position: "static"
    //         margin: ""
    //     }}
    // >

    // </Menu>
  );
};
