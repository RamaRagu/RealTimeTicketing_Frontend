import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";

// Styled Paper Component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  border: "2px solid #d3e5ff",
  borderRadius: "12px",
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#003366",
  boxShadow: "0px 4px 10px rgba(0, 51, 102, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 8px 20px rgba(0, 51, 102, 0.2)",
  },
}));

const FrontPage = () => {
  const [logFile, setLogFile] = useState(null);
  const [logContent, setLogContent] = useState("");
  const [configValues, setConfigValues] = useState({
    totalTickets: 0,
    purchasedTickets: 0,
    remainingTickets: 0,
    simulationStatus: "Running",
  });

  useEffect(() => {
    // Fetch the configuration from localStorage
    const savedConfig = JSON.parse(localStorage.getItem("ticketConfig"));
    if (savedConfig) {
      const { totalTickets } = savedConfig;
      const purchasedTickets = totalTickets - 20;
      const remainingTickets = totalTickets - purchasedTickets;
      setConfigValues({
        ...savedConfig,
        purchasedTickets,
        remainingTickets,
      });
    }
  }, []);

  // Handle log file upload
  const handleLogUpload = (event) => {
    const file = event.target.files[0];
    setLogFile(file?.name || null);

    if (file && file.name.endsWith(".log")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogContent(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a .log file.");
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{
        background: "linear-gradient(to bottom, #FFFFFF, #99CCFF)",
        padding: 3,
        height: "100vh",
      }}
    >
      {/* Heading */}
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "center", color: "#003366" }}
        >
          Real-Time Ticketing System Result
        </Typography>
      </Grid>

      {/* Config Inputs (1st Grid) */}
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Configuration Values
          </Typography>
          <input
            type="number"
            name="totalTickets"
            placeholder="Enter Total Tickets"
            onChange={(e) => {
              const newTotalTickets = parseInt(e.target.value);
              const purchasedTickets = newTotalTickets - 20;
              const remainingTickets = newTotalTickets - purchasedTickets;
              setConfigValues({
                ...configValues,
                totalTickets: newTotalTickets,
                purchasedTickets,
                remainingTickets,
              });
            }}
            value={configValues.totalTickets}
            style={{
              margin: "10px 0",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #d3e5ff",
            }}
          />
          <Typography variant="body1">
            Total Tickets: {configValues.totalTickets}
          </Typography>
          <Typography variant="body1">
            Purchased Tickets: {configValues.purchasedTickets}
          </Typography>
          <Typography variant="body1">
            Remaining Tickets: {configValues.remainingTickets}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            Simulation Status: {configValues.simulationStatus}
          </Typography>
        </Item>
      </Grid>

      {/* Graph (2nd Grid) */}
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Ticket Distribution
          </Typography>
          <div style={{ marginTop: "20px", height: "250px" }}>
            <BarChart
              series={[
                {
                  data: [configValues.totalTickets],
                  color: "#0066CC",
                  name: "Released",
                },
                {
                  data: [configValues.purchasedTickets],
                  color: "#3399FF",
                  name: "Purchased",
                },
                {
                  data: [configValues.remainingTickets],
                  color: "#99CCFF",
                  name: "Remaining",
                },
              ]}
              height={230}
              xAxis={[{ data: ["Tickets"], scaleType: "band" }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </Item>
      </Grid>

      {/* Log File (3rd Grid) */}
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Log File
          </Typography>
          <input type="file" onChange={handleLogUpload} accept=".log" />
          {logFile && (
            <>
              <Typography sx={{ marginTop: 2 }}>Log file: {logFile}</Typography>
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "scroll",
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d3e5ff",
                  marginTop: "15px",
                }}
              >
                {logContent.split("\n").map((line, index) => (
                  <Typography key={index} variant="body2">
                    {line}
                  </Typography>
                ))}
              </div>
            </>
          )}
        </Item>
      </Grid>

      {/* Simulation Running (4th Grid) */}
      <Grid item xs={12} sm={6} md={3}>
        <Item>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Simulation Running
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            The simulation is currently {configValues.simulationStatus}.
          </Typography>
          <div
            style={{
              marginTop: "20px",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f8ff",
              borderRadius: "8px",
              border: "1px solid #d3e5ff",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Running...
            </Typography>
          </div>
        </Item>
      </Grid>
    </Grid>
  );
};

export default FrontPage;
