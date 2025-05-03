// src/components/NavPanel.jsx

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useQuiz } from "../context/QuizContext";

function NavPanel() {
  const { questions, answers, questionRefs, darkMode } = useQuiz();

  // 클릭한 문제로 부드럽게 스크롤 이동
  const scrollToQuestion = (id) => {
    questionRefs.current[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 문제 목록이 없으면 렌더링 안 함
  if (questions.length === 0) return null;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 80,
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        backgroundColor: darkMode ? "#2a2a2a" : "#f9f9f9",
        // 최대 높이 지정 후 스크롤 가능하도록
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        문제 번호
      </Typography>

      {/* 5열 그리드로 병렬 정렬 */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 1,
        }}
      >
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
      </Box>
    </Box>
  );
}

export default NavPanel;
