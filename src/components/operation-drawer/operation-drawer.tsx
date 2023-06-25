import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MouseEvent } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

interface OperationDrawerProps {
  showDrawer: boolean;
  toggleDrawer: (event: Event | MouseEvent) => void;
}

export const OperationDrawer: React.FC<OperationDrawerProps> = ({ showDrawer, toggleDrawer }) => {
  const schema: { icon: React.ReactNode; text: string }[] = [
    { icon: <DriveFolderUploadIcon fontSize="large" />, text: "Load" },
    { icon: <DriveFileMoveIcon fontSize="large" />, text: "Import" },
    { icon: <FormatPaintIcon fontSize="large" />, text: "Format" },
  ];

  const ListMenu = () => (
    <Box sx={{ width: 180, backgroundColor: "pink" }} role="presentation" onClick={toggleDrawer}>
      <List>
        {schema.map(({ icon, text }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
      {/* sx={{ flexShrink: 0, [`& .MuiDrawer-paper`]: { boxSizing: "border-box" } } */}
      <ListMenu />
    </Drawer>
  );
};
