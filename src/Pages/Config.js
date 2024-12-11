import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../api/axios"; // Import Axios API module

// Styled Paper Component with reduced size
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency
  border: "2px solid #d3e5ff",
  borderRadius: "16px",
  padding: theme.spacing(3),
  textAlign: "center",
  color: "#003366",
  boxShadow: "0px 4px 15px rgba(0, 51, 102, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 25px rgba(0, 51, 102, 0.2)",
  },
  width: 500,
  height: 450,
  margin: "auto",
}));

// Validation Schema
const validationSchema = Yup.object().shape({
  totalTickets: Yup.number()
    .positive("Total Tickets must be a positive number")
    .required("Total Tickets are required"),
  releaseRate: Yup.number()
    .positive("Release Rate must be a positive number")
    .required("Release Rate is required"),
  retrievalRate: Yup.number()
    .positive("Retrieval Rate must be a positive number")
    .required("Retrieval Rate is required"),
  maxCapacity: Yup.number()
    .positive("Max Capacity must be a positive number")
    .required("Max Capacity is required"),
});

const Config = () => {
  const [setLogs] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submit = (data) => {
    try {
      // Save the configuration to localStorage
      api.post("/addConfig", data);

      alert("Configuration saved successfully!");

      navigate("/FrontPage");
    } catch (error) {
      setLogs((prev) => prev + "Failed to save configuration\n");
      alert("Failed to save configuration. Please try again.");
    }
  };

  const handleStart = () =>
    setLogs((prev) => prev + "Configuration started...\n");

  const handleStop = () =>
    setLogs((prev) => prev + "Configuration stopped...\n");

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Video Background */}
      <video
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        autoPlay
        loop
        muted
      >
        <source
          src="https://www.pexels.com/download/video/3141210/"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: -1,
        }}
      ></div>

      {/* Config Form */}
      <Item>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#003366" }}>
          Ticket Configuration
        </Typography>

        {/* Buttons */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{
            mt: 2,
            "& button": { transition: "background-color 0.3s ease" },
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              "&:hover": { backgroundColor: "#388e3c" },
              width: "120px",
              height: "40px",
            }}
            onClick={handleStart}
          >
            Start
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#F44336",
              color: "#fff",
              "&:hover": { backgroundColor: "#c62828" },
              width: "120px",
              height: "40px",
            }}
            onClick={handleStop}
          >
            Stop
          </Button>
        </Stack>

        <form onSubmit={handleSubmit(submit)}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Total Tickets"
              type="number"
              {...register("totalTickets")}
              error={!!errors.totalTickets}
              helperText={errors.totalTickets?.message}
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              label="Ticket Release Rate"
              type="number"
              {...register("releaseRate")}
              error={!!errors.releaseRate}
              helperText={errors.releaseRate?.message}
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              label="Customer Retrieval Rate"
              type="number"
              {...register("retrievalRate")}
              error={!!errors.retrievalRate}
              helperText={errors.retrievalRate?.message}
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              label="Max Ticket Capacity"
              type="number"
              {...register("maxCapacity")}
              error={!!errors.maxCapacity}
              helperText={errors.maxCapacity?.message}
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: "#fff" }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#003366",
                color: "#fff",
                "&:hover": { backgroundColor: "#00214d" },
              }}
              type="submit"
              fullWidth
            >
              Save Configuration
            </Button>
          </Stack>
        </form>
      </Item>
    </div>
  );
};

export default Config;
