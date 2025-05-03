import React from "react";
import { Card, CardContent, Typography, Stack, Button, Slide } from "@mui/material";
import { useQuiz } from "../context/QuizContext";

function QuestionCard({ question, index, visible }) {
  const { answers, selectAnswer, submitted, questionRefs } = useQuiz();

  return (
    <Slide direction="up" in={visible} timeout={300 + index * 50}>
      <Card ref={questionRefs.current[question.id]} variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {index + 1}. {question.question}
          </Typography>
          <Stack spacing={1}>
            {question.choices.map((choice, i) => (
              <Button
                key={i}
                variant={answers[question.id] === i ? "contained" : "outlined"}
                color={answers[question.id] === i ? "primary" : "inherit"}
                onClick={() => selectAnswer(question.id, i)}
                disabled={submitted}
                sx={{ justifyContent: "flex-start" }}
              >
                {String.fromCharCode(65 + i)}. {choice}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Slide>
  );
}

export default QuestionCard;
