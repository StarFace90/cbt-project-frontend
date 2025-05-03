import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useQuiz } from "../context/QuizContext";

function NavPanel() {
  const { questions, answers, questionRefs, darkMode } = useQuiz();

  const scrollToQuestion = (id) => {
    questionRefs.current[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (questions.length === 0) return null; // 문제가 없으면 렌더링하지 않음

  return (
    <Box
      sx={{
        position: "sticky",
        top: 80,
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        backgroundColor: darkMode ? "#2a2a2a" : "#f9f9f9",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        문제 번호
      </Typography>

      <Stack spacing={1}>
        {questions.map((q, idx) => (
          <Button
            key={q.id}
            size="small"
            variant={answers[q.id] !== undefined ? "contained" : "outlined"}
            color="primary"
            onClick={() => scrollToQuestion(q.id)}
          >
            {idx + 1}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

export default NavPanel;
