import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

const Dashboard = () => {
  const [selectedContact, setSelectedContact] = useState("John Doe");

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
