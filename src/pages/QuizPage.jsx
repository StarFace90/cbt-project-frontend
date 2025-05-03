// src/pages/QuizPage.jsx
import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Grid,
  Collapse,
  Fade,
  Button,
  Paper,
} from "@mui/material";
import { getTheme } from "../theme";
import { useQuiz } from "../context/QuizContext";
import QuizHeader from "../components/QuizHeader"; // ✅ 홈 버튼 포함된 헤더
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import DarkModeToggle from "../components/DarkModeToggle";
import NavPanel from "../components/NavPanel";

function QuizPage() {
  const { questions, submitted, showResults, results, darkMode, submitAnswers, resetQuiz } = useQuiz();

  const theme = getTheme(darkMode ? "dark" : "light");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* ✅ 홈 버튼 있는 퀴즈 헤더 */}
      <QuizHeader />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            CBT 문제 응시
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Timer />
            <DarkModeToggle />
          </Box>
        </Grid>

        <Typography color="text.secondary" gutterBottom>
          객관식 문제를 클릭하여 답안을 선택하세요.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* 메인 문제 영역 */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mx: "auto", maxWidth: 800 }}>
              <Collapse in={!submitted}>
                <Box>
                  {questions.map((q, idx) => (
                    <QuestionCard key={q.id} question={q} index={idx} visible={!submitted} />
                  ))}

                  <Box textAlign="center">
                    <Button variant="contained" size="large" color="primary" onClick={submitAnswers}>
                      📤 답안 제출
                    </Button>
                  </Box>
                </Box>
              </Collapse>

              {/* 결과 표시 */}
              <Fade in={showResults} timeout={500}>
                <Box>
                  {results && (
                    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                      <Typography variant="h5" gutterBottom>
                        채점 결과
                      </Typography>
                      <Typography gutterBottom>
                        총 점수:{" "}
                        <strong>
                          {results.score} / {results.total}
                        </strong>
                      </Typography>
                      <ul style={{ paddingLeft: "1.2rem" }}>
                        {results.results.map((r) => (
                          <li key={r.questionId}>
                            문제 {r.questionId}:{" "}
                            {r.isCorrect ? (
                              <span style={{ color: "green" }}>✅ 정답</span>
                            ) : (
                              <span style={{ color: "red" }}>❌ 오답</span>
                            )}
                          </li>
                        ))}
                      </ul>

                      <Box textAlign="center" mt={3}>
                        <Button variant="outlined" color="secondary" onClick={resetQuiz}>
                          전체 문제 다시 풀기
                        </Button>
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Fade>
            </Box>
          </Grid>

          {/* 우측 문제 번호 네비게이션 */}
          <Grid item xs={12} md={3}>
            <NavPanel />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default QuizPage;
