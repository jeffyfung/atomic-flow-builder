import { AppBar, Box, Button, Divider, IconButton, Stack, Toolbar, Tooltip, Typography, styled } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { MouseEvent } from "react";
import { useAppSelector } from "../../hooks";
import { selectCanvas } from "../../features/canvas";
import { convertGraphToLatex } from "../../features/latex-converter";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { APP_TITLE, COPY_BUTTON_HINT, DOWNLOAD_BUTTON_HINT, UPLOAD_BUTTON_HINT } from "../../res/texts/top-menu";
import { ShapeProperties } from "../../features/shape";

const StyledAppTitle = styled(Typography)({
  textAlign: "center",
  minHeight: "2vh",
});

interface TopMenuProps {
  openActionMenu: (event: MouseEvent) => void;
}

const LatexButton: React.FC<{ shapes: Record<string, ShapeProperties> }> = ({ shapes }) => {
  const handleClick = async () => {
    const latex = convertGraphToLatex(Object.values(shapes));
    await navigator.clipboard.writeText(latex);
  };

  return (
    <>
      <Tooltip title={COPY_BUTTON_HINT} leaveDelay={100} arrow>
        <Button
          variant="contained" //
          size="small"
          startIcon={<FileCopyIcon />}
          color="info"
          onClick={handleClick}
          sx={{
            my: "8px",
            ml: "10px",
            // mr: "5px",
            px: "12px",
          }}
        >
          <Typography fontSize="15px" fontStyle="italic" textTransform="none">
            LaTeX
            {/* <Divider /> */}
          </Typography>
        </Button>
      </Tooltip>

      {/* <Button
        variant="contained" //
        size="small"
        color="info"
        onClick={() => {}}
        sx={{
          my: "8px",
        }} */}
      {/* >
        {"<"}
      </Button> */}
    </>
  );
};

const DataButton: React.FC<{ hint: string; iconComponent: React.ReactNode; color: any }> = ({ hint, iconComponent, color }) => {
  return (
    <Tooltip title={hint} leaveDelay={100} arrow>
      <IconButton size="large" color={color} sx={{ padding: "8px" }}>
        {iconComponent}
      </IconButton>
    </Tooltip>
  );
};

export const TopMenu: React.FC<TopMenuProps> = ({ openActionMenu }) => {
  const { shapes } = useAppSelector(selectCanvas);

  return (
    <Box id="top-menu" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <IconButton size="large" edge="start" color="warning" onClick={openActionMenu} sx={{ mr: 0.5 }}>
            <TipsAndUpdatesIcon fontSize="large" />
          </IconButton>
          <StyledAppTitle variant="h6">{APP_TITLE}</StyledAppTitle>
          <Stack direction="row" spacing={1} useFlexGap sx={{ position: "absolute", right: "10px" }}>
            <DataButton hint={DOWNLOAD_BUTTON_HINT} iconComponent={<CloudDownloadIcon fontSize="large" />} color={"warning"} />
            <DataButton hint={UPLOAD_BUTTON_HINT} iconComponent={<CloudUploadIcon fontSize="large" />} color={"warning"} />
            <LatexButton shapes={shapes} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
