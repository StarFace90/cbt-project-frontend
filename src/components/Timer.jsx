import React from "react";
import { Typography } from "@mui/material";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { elapsed } = useQuiz();

  return (
    <Typography variant="body2" color="text.secondary">
      ⏱ 경과: {elapsed}s
    </Typography>
  );
}

export default Timer;
