import { Drawer } from "@mui/material";
import { MouseEvent, useState } from "react";
import { TopMenu } from "../top-menu/top-menu";
import { OperationDrawer } from "../operation-drawer/operation-drawer";
import { ActionMenu } from "../action-menu/action-menu";

interface Props {}

// TODO: consider a floating action button for IO actions e.g. import
export const Drawboard: React.FC<Props> = (props: Props) => {
  //   const [showGraphCompSideBar, setShowGraphCompSideBar] = useState(false);

  const [showActionMenu, setShowActionMenu] = useState(false);
  const [actionMenuAnchor, setActionMenuAnchor] = useState<Element | null>(null);

  const openActionMenu = (event: MouseEvent) => {
    setShowActionMenu(true);
    setActionMenuAnchor(event.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setShowActionMenu(false);
    setActionMenuAnchor(null);
  };

  return (
    <div className="layout">
      <TopMenu openActionMenu={openActionMenu} />
      <ActionMenu anchorEl={actionMenuAnchor} open={showActionMenu} onClose={handleCloseActionMenu} />
    </div>
  );
};
