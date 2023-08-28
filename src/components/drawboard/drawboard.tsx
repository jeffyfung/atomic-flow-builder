import { MouseEvent, useState } from "react";
import { TopMenu } from "../top-menu/top-menu";
import { Palette } from "../palette/palette";
import { Canvas } from "../canvas/canvas";
import { Box } from "@mui/material";
import { FileUploader } from "../file-uploader/file-uploader";
import { About } from "../about/about";

export const Drawboard: React.FC<{}> = () => {
  const [openAbout, setAbout] = useState<boolean>(false);
  const [openUploader, setOpenUploader] = useState<boolean>(false);

  const handleAbout = () => {
    setAbout(true);
  };

  const handleOpenUploader = () => {
    setOpenUploader(true);
  };

  return (
    <Box className="layout">
      <TopMenu handleAbout={handleAbout} handleOpenUploader={handleOpenUploader} />
      <Box id="drawboard-main" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Canvas />
        <Palette />
      </Box>
      <FileUploader open={openUploader} toggleOpen={setOpenUploader} />
      <About open={openAbout} toggleOpen={setAbout} />
    </Box>
  );
};
