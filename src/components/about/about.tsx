import { Backdrop, Box, Button, Divider, Fade, Modal, Typography } from "@mui/material";
import packageJson from "../../../package.json";
import GitHubIcon from "@mui/icons-material/GitHub";

interface AboutProps {
  open: boolean;
  toggleOpen: (value: React.SetStateAction<boolean>) => void;
}

const styles = {
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "35vw",
    backgroundColor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    padding: "12px",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    border: "#9ba3e0 2px dashed",
    gap: "12px",
    padding: "12px",
  },
  contentContainer: {
    width: "100%",
    marginLeft: "20px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  divider: {
    border: "1px darkgrey solid",
    width: "100%",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
  },
  githubButton: {
    backgroundColor: "#575353",
    color: "white",
  },
};

export const About: React.FC<AboutProps> = ({ open, toggleOpen }) => {
  const handleModalClose = () => toggleOpen(false);

  const handleDeepInferenceClick = () => {
    window.open("http://alessio.guglielmi.name/res/cos/index.html", "_blank");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/jeffyfung/atomic-flow-builder", "_blank");
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
            <Typography variant="h5" fontWeight="600" textAlign="center">
              About
            </Typography>
            <Divider sx={styles.divider} />
            <Box sx={styles.contentContainer}>
              <Typography>Version: {packageJson.version}</Typography>
              <Typography>Created By: Jeffrey Fung</Typography>
              <Typography>Inspired By: Alessio Guglielmi</Typography>
            </Box>
            <Box sx={styles.buttonsContainer}>
              <Button color="info" variant="contained" onClick={handleDeepInferenceClick}>
                Read About Deep Inference
              </Button>
              <Button sx={styles.githubButton} variant="contained" endIcon={<GitHubIcon />} onClick={handleGitHubClick}>
                GitHub
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
