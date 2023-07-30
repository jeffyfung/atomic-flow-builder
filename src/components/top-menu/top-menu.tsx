import { AppBar, Box, Button, IconButton, Toolbar, Typography, styled } from "@mui/material";
import { StatusBar } from "../status-bar/status-bar";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { MouseEvent, useState } from "react";
import { useAppSelector } from "../../hooks";
import { selectCanvas } from "../../features/canvas";
import { latexConverter } from "../../features/latex-converter";

const StyledAppTitle = styled(Typography)({
  textAlign: "center",
  minHeight: "2vh",
});

interface TopMenuProps {
  openActionMenu: (event: MouseEvent) => void;
}

// TODO: deal with the status/exporetdLatex bar
export const TopMenu: React.FC<TopMenuProps> = ({ openActionMenu }) => {
  const status = "Latex: af{(0,8)*{afcd a{}{}a{}{}};(0,0)*{afcu a{}{}a{}{}}}";
  const appTitle = "Atomic Flow Builder";

  const { shapes } = useAppSelector(selectCanvas);

  const [exportedLatex, setExportedLatex] = useState<string>("");

  const handleClick = () => {
    const latex = latexConverter(Object.values(shapes));
    console.log("latex", latex);
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
          <StatusBar status={status} />
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
