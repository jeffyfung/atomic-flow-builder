import { MouseEvent, useState } from "react";
import { TopMenu } from "../top-menu/top-menu";
import { ActionMenu } from "../action-menu/action-menu";
import { Palette } from "../palette/palette";
import { Canvas } from "../canvas/canvas";
import { Box } from "@mui/material";

export const Drawboard: React.FC<{}> = () => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<Element | null>(null);

  const openActionMenu = (event: MouseEvent) => {
    // TODO: open About
    // setShowActionMenu(true);
    // setActionMenuAnchor(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setShowActionMenu(false);
    setActionMenuAnchor(null);
  };

  return (
    <Box className="layout">
      <TopMenu openActionMenu={openActionMenu} />
      <ActionMenu anchorEl={actionMenuAnchor} open={showActionMenu} onClose={handleCloseActionMenu} />
      <Box id="drawboard-main" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Canvas />
        <Palette />
      </Box>
    </Box>
  );
};
