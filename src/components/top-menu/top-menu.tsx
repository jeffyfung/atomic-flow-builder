import { AppBar, Box, Button, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { StatusBar } from "../status-bar/status-bar";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { MouseEvent, useState } from "react";
import { useAppSelector } from "../../hooks";
import { selectCanvas } from "../../features/canvas";
import { convertGraphToLatex } from "../../features/latex-converter";

const StyledAppTitle = styled(Typography)({
  textAlign: "center",
  minHeight: "2vh",
});

interface TopMenuProps {
  openActionMenu: (event: MouseEvent) => void;
}

// TODO: deal with the status/exporetdLatex bar
// TODO: add toggle for compact mode
export const TopMenu: React.FC<TopMenuProps> = ({ openActionMenu }) => {
  const appTitle = "Atomic Flow Builder";

  const { shapes } = useAppSelector(selectCanvas);

  const [exportedLatex, setExportedLatex] = useState<string>("");

  const handleClick = () => {
    const latex = convertGraphToLatex(Object.values(shapes));
    setExportedLatex(latex);
  };

  return (
    <Box id="top-menu" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <IconButton size="large" edge="start" color="warning" onClick={openActionMenu} sx={{ mr: 0.5 }}>
            <TipsAndUpdatesIcon fontSize="large" />
          </IconButton>
          <StyledAppTitle variant="h6">{appTitle}</StyledAppTitle>
          <StatusBar val={exportedLatex} />
          <Button variant="contained" size="small" color="secondary" sx={{ mx: 0.5 }}>
            Save
          </Button>
          <Button variant="contained" size="small" color="secondary" onClick={handleClick} sx={{ mx: 0.5 }}>
            Export
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
