import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { motion } from "framer-motion"; // Import framer-motion for transition
import api from "../api/axios"; // Import the Axios API module

const WelcomeBox = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: "20px",
  padding: theme.spacing(8),
  textAlign: "center",
  color: "#003366",
  boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.4)",
  maxWidth: "600px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledButton = styled(Button)(({ color }) => ({
  backgroundColor: color,
  color: "#fff",
  width: "100%",
  transition: "background-color 0.3s, transform 0.3s",
  "&:hover": {
    backgroundColor: color === "#003366" ? "#002244" : "#388E3C",
    transform: "scale(1.05)",
  },
}));

const Login = () => {
  const navigate = useNavigate();

  const handleLoginGUI = () => {
    navigate("/Config");
  };
  const handleLoginCLI = async () => {
    try {
      const response = await api.post("useType", { useType: "CLI" });
      console.log("useType Response:", response);
      alert("CLI mode activated");
    } catch (error) {
      console.error("Error during CLI login:", error);
      alert("Failed to activate CLI mode");
    }
  };

  return (
    <Grid
      container
      spacing={0}
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: 2,
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source
          src="https://www.pexels.com/download/video/3141210/"
          type="video/mp4"
        />
      </video>

      <Grid item xs={12} sm={8} md={6} lg={4}>
        <motion.div
          initial={{ opacity: 0, x: -100 }} // Start with zero opacity and off-screen
          animate={{ opacity: 1, x: 0 }} // End with full opacity and positioned correctly
          exit={{ opacity: 0, x: 100 }} // Exit by fading out and sliding to the right
          transition={{
            opacity: { duration: 1, ease: "easeOut" }, // Slow fade-in
            x: { duration: 1, ease: "easeOut" }, // Smooth slide-in
          }}
        >
          <WelcomeBox>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Welcome to the Ticketing System
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              Please choose your preferred login method to proceed.
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledButton color="#003366" onClick={handleLoginCLI}>
                  Login with CLI
                </StyledButton>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledButton color="#4CAF50" onClick={handleLoginGUI}>
                  Login with GUI
                </StyledButton>
              </Grid>
            </Grid>
          </WelcomeBox>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default Login;
