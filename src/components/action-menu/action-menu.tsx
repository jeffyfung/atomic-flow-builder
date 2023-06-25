import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

interface ActionMenuProps {
  open: boolean;
  anchorEl: Element | null;
  onClose: () => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ open, anchorEl, onClose }) => {
  return (
    <Menu
      id="action-menu"
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={onClose}
      PaperProps={{ sx: { width: "130px" } }}
    >
      <MenuItem>
        <ListItemIcon>
          <DriveFolderUploadIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} onClick={onClose}>
          Load
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <DriveFileMoveIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} onClick={onClose}>
          Import
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <FormatPaintIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} onClick={onClose}>
          Format
        </ListItemText>
        {/* <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }}>Format</ListItemText> */}
      </MenuItem>
    </Menu>
  );
};
