import { AppBar, Box, IconButton, Stack, Toolbar, Typography, styled } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { MouseEvent } from "react";
import { useAppSelector } from "../../hooks";
import { selectCanvas } from "../../features/canvas";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { APP_TITLE, DOWNLOAD_BUTTON_HINT, UPLOAD_BUTTON_HINT } from "../../res/texts/top-menu";
import { DataButton } from "./data-button";
import { LatexButton } from "./latex-button";

const StyledAppTitle = styled(Typography)({
  textAlign: "center",
  minHeight: "2vh",
});

interface TopMenuProps {
  openActionMenu: (event: MouseEvent) => void;
}

export const TopMenu: React.FC<TopMenuProps> = ({ openActionMenu }) => {
  const { shapes } = useAppSelector(selectCanvas);

  return (
    <Box id="top-menu" sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar variant="dense">
          <IconButton size="large" edge="start" color="warning" onClick={openActionMenu} sx={{ mr: 0.5 }}>
            <TipsAndUpdatesIcon fontSize="large" />
          </IconButton>
          <StyledAppTitle variant="h5">{APP_TITLE}</StyledAppTitle>
          <Stack direction="row" spacing={2.5} useFlexGap sx={{ position: "absolute", right: "10px" }}>
            <DataButton hint={DOWNLOAD_BUTTON_HINT} iconComponent={<CloudDownloadIcon sx={{ fontSize: "38px" }} />} color={"warning"} />
            <DataButton hint={UPLOAD_BUTTON_HINT} iconComponent={<CloudUploadIcon sx={{ fontSize: "38px" }} fontSize="large" />} color={"warning"} />
            <LatexButton shapes={shapes} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
