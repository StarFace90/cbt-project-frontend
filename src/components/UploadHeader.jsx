import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"; // npm install @mui/icons-material
import { Box, IconButton, Typography, Divider } from "@mui/material";

function UploadHeader() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <IconButton onClick={() => navigate("/")}>
        <HomeIcon />
      </IconButton>
      <Typography variant="h6" sx={{ ml: 1 }}>
        문제 업로드
      </Typography>
    </Box>
  );
}

export default UploadHeader;
