import React from "react";
import { Switch, Typography, Box } from "@mui/material";
import { useQuiz } from "../context/QuizContext";

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useQuiz();

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2">🌙</Typography>
      <Switch checked={darkMode} onChange={() => setDarkMode((prev) => !prev)} />
    </Box>
  );
}

export default DarkModeToggle;
