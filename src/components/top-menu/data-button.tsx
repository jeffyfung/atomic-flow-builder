import { IconButton, Tooltip } from "@mui/material";

export const DataButton: React.FC<{ hint: string; iconComponent: React.ReactNode; color: any }> = ({ hint, iconComponent, color }) => {
  return (
    <Tooltip title={hint} leaveDelay={100} arrow>
      <IconButton size="large" color={color} sx={{ padding: "8px" }}>
        {iconComponent}
      </IconButton>
    </Tooltip>
  );
};
