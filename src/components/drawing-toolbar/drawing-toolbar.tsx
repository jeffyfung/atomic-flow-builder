import { Box, List, ListItem, ListItemButton, Menu } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import styled from "@emotion/styled";

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
  return (
    <StyledToolbarBox id="drawing-toolbar" sx={{ boxShadow: "3" }}>
      <List>
        <ListItem disableGutters>
          <StyledListItemButton>
            <InboxIcon sx={{ margin: "0 auto" }} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <StyledListItemButton>
            <InboxIcon sx={{ margin: "0 auto" }} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <StyledListItemButton>
            <InboxIcon sx={{ margin: "0 auto" }} />
          </StyledListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <StyledListItemButton>
            <InboxIcon sx={{ margin: "0 auto" }} />
          </StyledListItemButton>
        </ListItem>
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
