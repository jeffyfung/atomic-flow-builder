import { useState, MouseEvent } from "react";
import { ShapeProperties } from "../../features/shape";
import { convertGraphToLatex } from "../../features/latex-converter";
import { Button, ButtonGroup, FormControl, FormControlLabel, Popover, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { COMPACT_MODE_HINT, COPY_BUTTON_HINT } from "../../res/texts/top-menu";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export const LatexButton: React.FC<{ shapes: Record<string, ShapeProperties> }> = ({ shapes }) => {
  const [compactMode, setCompactMode] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [buttonText, setButtonText] = useState<string>(COPY_BUTTON_HINT);
  const open = Boolean(anchorEl);

  const handleClick = async () => {
    const latex = convertGraphToLatex(Object.values(shapes), compactMode);
    await navigator.clipboard.writeText(latex);
    setButtonText("Copied to clipboard!");
    setTimeout(() => setButtonText(COPY_BUTTON_HINT), 3000);
  };

  const handleSplitClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickSwitch = () => {
    setCompactMode((prevState) => !prevState);
  };

  return (
    <>
      <ButtonGroup variant="contained" color="info" sx={{ my: "8px", mx: "10px" }}>
        <Tooltip title={buttonText} leaveDelay={100} arrow>
          <Button size="small" startIcon={<FileCopyIcon />} onClick={handleClick} sx={{ px: "16px" }}>
            <Typography fontSize="15px" fontStyle="italic" textTransform="none">
              LaTeX
            </Typography>
          </Button>
        </Tooltip>
        <Button size="small" onClick={handleSplitClick}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        color="info"
        sx={{
          "& .MuiPaper-root": {
            p: "4px",
            pl: "12px",
          },
        }}
      >
        <FormControl>
          <FormControlLabel
            control={<Switch color="info" checked={compactMode} onChange={handleClickSwitch} />} //
            label={
              <Stack direction="row" spacing={0.5}>
                <Typography fontSize="15px">Compact Mode</Typography>
                <Tooltip title={COMPACT_MODE_HINT} leaveDelay={100} arrow>
                  <InfoIcon fontSize="small" sx={{ position: "relative", top: "1px" }} />
                </Tooltip>
              </Stack>
            }
          />
        </FormControl>
      </Popover>
    </>
  );
};
