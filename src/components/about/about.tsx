import { Backdrop, Box, Divider, Fade, Modal, Stack, Typography } from "@mui/material";
import packageJson from "../../../package.json";

interface AboutProps {
  open: boolean;
  toggleOpen: (value: React.SetStateAction<boolean>) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // width: "40vh"  ,
  // height: "40vw",
  backgroundColor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  padding: "12px",
};

export const About: React.FC<AboutProps> = ({ open, toggleOpen }) => {
  const handleModalClose = () => toggleOpen(false);

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
        <Box sx={style}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" fontWeight="500" textAlign="center" textTransform="uppercase">
              About App
            </Typography>
            <Typography>
              Read about{" "}
              <a href="http://alessio.guglielmi.name" target="_blank" rel="noopener noreferrer">
                Atomic Flow
              </a>
            </Typography>
            <Typography>
              Github Repo:{" "}
              <a href="https://github.com/jeffyfung/atomic-flow-builder" target="_blank" rel="noopener noreferrer">
                icon
              </a>
            </Typography>
            <Typography>Release: {packageJson.version}</Typography>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};
