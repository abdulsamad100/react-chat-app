import React, { useContext, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { AuthContext } from "../context/AuthContext"; // Adjust the import based on your file structure

const Dashboard = () => {
  const [selectedContact, setSelectedContact] = useState("John Doe");
  const { isLoading } = useContext(AuthContext); // Get loading state from context

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    ); // Show loading spinner
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        height: "70vh",
      }}
    >
      <Box sx={{ borderRight: "1px solid #ddd" }}>
        <Sidebar onContactClick={setSelectedContact} />
      </Box>
      <Box>
        <ChatWindow selectedContact={selectedContact} />
      </Box>
    </Box>
  );
};

export default Dashboard;
