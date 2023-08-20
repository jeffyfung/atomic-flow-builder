import { IconButton, Tooltip } from "@mui/material";
import { MouseEvent } from "react";

interface DataButtonProps {
  hint: string;
  iconComponent: React.ReactNode;
  color: any;
  handleClick: (event: MouseEvent<HTMLElement>) => void;
}

export const DataButton: React.FC<DataButtonProps> = ({ hint, iconComponent, color, handleClick }) => {
  return (
    <Tooltip title={hint} leaveDelay={100} arrow>
      <IconButton size="large" color={color} onClick={handleClick} sx={{ padding: "8px" }}>
        {iconComponent}
      </IconButton>
    </Tooltip>
  );
};
