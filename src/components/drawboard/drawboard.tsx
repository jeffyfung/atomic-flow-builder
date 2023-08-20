import { MouseEvent, useState } from "react";
import { TopMenu } from "../top-menu/top-menu";
import { Palette } from "../palette/palette";
import { Canvas } from "../canvas/canvas";
import { Box } from "@mui/material";
import { FileUploader } from "../file-uploader/file-uploader";

export const Drawboard: React.FC<{}> = () => {
  // const [showActionMenu, setShowActionMenu] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<Element | null>(null);
  const [openUploader, setOpenUploader] = useState<boolean>(false);

  const openActionMenu = (event: MouseEvent) => {
    // TODO: open About
    // setShowActionMenu(true);
    // setActionMenuAnchor(event.currentTarget);
  };

  const handleOpenUploader = () => {
    setOpenUploader(true);
  };

  return (
    <Box className="layout">
      <TopMenu openActionMenu={openActionMenu} handleOpenUploader={handleOpenUploader} />
      <Box id="drawboard-main" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Canvas />
        <Palette />
      </Box>
      <FileUploader open={openUploader} toggleOpen={setOpenUploader} />
    </Box>
  );
};
