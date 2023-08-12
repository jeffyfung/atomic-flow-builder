import { TextField, Tooltip, styled } from "@mui/material";
import { MouseEvent, useState } from "react";

interface StatusBarProps {
  val: string;
}

const StyledTextField = styled(TextField)({
  flexGrow: 1,
  padding: "0.5vh 5vh",
  input: {
    color: "grey",
    fontStyle: "italic",
    cursor: "grab",
  },
});

export const StatusBar: React.FC<StatusBarProps> = ({ val }) => {
  const tooltipResetTime = 2500;
  const [hint, setHint] = useState("Click to Copy");

  const handleClick = async (_e: MouseEvent) => {
    let msg: string = "";
    try {
      await navigator.clipboard.writeText(val);
      msg = "Copied to clipboard!";
    } catch (error: any) {
      msg = "Failed to copy to clipboard!";
      console.error(error);
    } finally {
      setHint(msg);
      setTimeout(() => setHint("Click to Copy"), tooltipResetTime);
    }
  };

  return (
    <Tooltip title={hint} leaveDelay={300} arrow>
      <StyledTextField
        id="status-display"
        variant="outlined"
        size="small"
        value={val}
        placeholder="Exported Latex to be displayed"
        InputProps={{
          readOnly: true,
          color: "info",
          onClick: handleClick,
        }}
      />
    </Tooltip>
  );
};
