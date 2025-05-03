// src/components/QuizHeader.jsx
// 홈 버튼 전용 헤더
import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton, Typography, Divider } from "@mui/material";

function QuizHeader() {
  const navigate = useNavigate();

  return (
    <>
      <Box display="flex" alignItems="center" px={2} py={1}>
        <IconButton onClick={() => navigate("/")}>
          <HomeIcon fontSize="medium" color="primary" />
        </IconButton>
        <Typography variant="h6" ml={1}>
          문제 풀이
        </Typography>
      </Box>
      <Divider />
    </>
  );
}

export default QuizHeader;
