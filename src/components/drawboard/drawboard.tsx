import { MouseEvent, useState } from "react";
import { TopMenu } from "../top-menu/top-menu";
import { ActionMenu } from "../action-menu/action-menu";
import { DrawingToolbar } from "../drawing-toolbar/drawing-toolbar";
import { Canvas } from "../canvas/canvas";

export const Drawboard: React.FC<{}> = () => {
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
      <div id="drawboard-main" style={{ position: "relative" }}>
        <Canvas />
        <DrawingToolbar />
        {/* <Inspector /> */}
      </div>
    </div>
  );
};

// 3 components
// Canvas
// Palette
