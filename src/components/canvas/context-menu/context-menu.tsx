import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { deleteShape, setBack, setFront } from "../../../features/canvas";
import { useAppDispatch } from "../../../hooks";

/**
 * The props type for {@link ContextMenu}.
 */
export interface ContextMenuProps {
  /** Anchor position for context menu */
  position: { top: number; left: number };
  setContextMenuPosition: (
    value: React.SetStateAction<{
      top: number;
      left: number;
    } | null>
  ) => void;
  /** Unique ID of the shape clicked on */
  selectedId: string | null;
  clearSelection: () => void;
}

const MenuContainer = styled.ul<{ $position: { top: number; left: number } }>`
  top: ${({ $position }) => (window.innerHeight - $position.top > 250 ? $position.top : undefined)}px;
  bottom: ${({ $position }) => (window.innerHeight - $position.top > 250 ? undefined : window.innerHeight - $position.top)}px;
  left: ${({ $position }) => (window.innerWidth - $position.left > 230 ? $position.left : undefined)}px;
  right: ${({ $position }) => (window.innerWidth - $position.left > 230 ? undefined : window.innerWidth - $position.left)}px;
  position: absolute;
  min-width: 210px;
  background-color: #fefefe;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  padding: 4px 0;
  cursor: pointer;
`;

const MenuRow = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 6px;
  gap: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ItemText = styled.div`
  text-align: start;
  flex: 0 1 150px;
  text-align: start;
  font-family: Roboto, Helvetica, Arial, "sans-serif";
`;

const MenuDivider = styled.hr`
  background-color: inherit;
  margin: 4px 10px;
`;

/**
 *  Renders a context menu when user right clicks on a shape.
 *
 * The props type is defined as a separate interface.
 * ```
 * export const ContextMenu: React.FC<ContextMenuProps> = ({ position, setContextMenuPosition, selectedId, clearSelection }) => {
 *  // ...
 * }
 * ```
 *
 * @category Component
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({ position, setContextMenuPosition, selectedId, clearSelection }) => {
  const dispatch = useAppDispatch();

  const handleBringForward = () => {
    if (!selectedId) throw new Error("selectedId should not be null");
    dispatch(setFront(selectedId));
    closeMenu();
  };

  const handlePutBack = () => {
    if (!selectedId) throw new Error("selectedId should not be null");
    dispatch(setBack(selectedId));
    closeMenu();
  };

  const handleDelete = () => {
    if (!selectedId) throw new Error("selectedId should not be null");
    closeMenu();
    dispatch(deleteShape(selectedId));
    clearSelection();
  };

  const closeMenu = () => setContextMenuPosition(null);

  // TODO: touch ripple animation
  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <MenuContainer $position={position}>
        <MenuRow onClick={handleBringForward}>
          <ArrowForwardIcon style={{ flex: "0 0 50px", color: "grey", fontSize: "30px" }} />
          <ItemText>Bring Forward</ItemText>
        </MenuRow>
        <MenuRow onClick={handlePutBack}>
          <ArrowBackIcon style={{ flex: "0 0 50px", color: "grey", fontSize: "30px" }} />
          <ItemText>Put To The Back</ItemText>
        </MenuRow>
        <MenuDivider />
        <MenuRow onClick={handleDelete}>
          <DeleteForeverIcon style={{ flex: "0 0 50px", color: "grey", fontSize: "30px" }} />
          <ItemText>Delete Shape</ItemText>
        </MenuRow>
      </MenuContainer>
    </ClickAwayListener>
  );
};
