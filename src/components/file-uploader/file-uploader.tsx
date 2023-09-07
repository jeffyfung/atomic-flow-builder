import { CloudUpload } from "@mui/icons-material";
import { Backdrop, Box, CircularProgress, Fade, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { UPLOAD_HINT_TEXT } from "../../res/texts/file-uploader";
import { upload } from "../../features/file";

/**
 * The props type for {@link FileUploader}.
 */
export interface FileUploaderProps {
  open: boolean;
  toggleOpen: (value: React.SetStateAction<boolean>) => void;
}

// TODO: add validation; error throwing
const styles = {
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    padding: "12px",
  },
  innerContainer: {
    minWidth: "45vw",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    border: "#9ba3e0 2px dashed",
    gap: "12px",
    padding: "12px",
  },
};

/**
 *  Renders the file uploader interface. User can upload a file by dragging it to the interface.
 *
 * The props type is defined as a separate interface.
 *
 * ```
 * export const FileUploader: React.FC<FileUploaderProps> = ({ open, toggleOpen }) => {
 *  // ...
 * }
 * ```
 *
 * @category Component
 */
export const FileUploader: React.FC<FileUploaderProps> = ({ open, toggleOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleModalClose = () => toggleOpen(false);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.dataTransfer.files[0]) throw new Error("No file uploaded");
    uploadFile(event.dataTransfer.files[0]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) throw new Error("No file uploaded");
    uploadFile(event.target.files[0]);
  };

  const uploadFile = (file: File): void => {
    setLoading(true);
    upload(file, () => {
      setTimeout(() => {
        setLoading(false);
        toggleOpen(false);
      }, 400);
    });
  };

  return (
    <Modal
      open={open} //
      onClose={handleModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={styles.container}>
          <Box sx={styles.innerContainer}>
            <label onDragOver={handleDragOver} onDrop={handleDrop} style={{ display: "block", height: "100%" }} htmlFor="file-upload">
              <Box
                height="100%"
                sx={{
                  backgroundColor: "white",
                  "&:hover": { cursor: "grab" },
                }}
              >
                <Stack direction="column" justifyContent="center" alignItems="center" height="100%" width="100%">
                  <CloudUpload style={{ fontSize: "50px", color: "#2a53f0" }} />
                  <Typography>{UPLOAD_HINT_TEXT}</Typography>
                  {loading && <CircularProgress />}
                </Stack>
              </Box>
            </label>
            <input
              id="file-upload"
              onChange={handleInputChange} //
              accept="application/JSON"
              type="file"
              style={{ display: "none" }}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
