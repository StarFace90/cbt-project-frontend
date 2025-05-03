import React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Grid,
  Box,
  Collapse,
  Fade,
  Button,
  Paper,
} from "@mui/material";
import { getTheme } from "../theme";
import { useQuiz } from "../context/QuizContext";
import QuizHeader from "../components/QuizHeader";
import QuestionCard from "../components/QuestionCard";
import NavPanel from "../components/NavPanel";

function QuizPage() {
  const { questions, submitted, showResults, results, darkMode, submitAnswers, resetQuiz } = useQuiz();
  const theme = getTheme(darkMode ? "dark" : "light");

  // 문제 로딩 중 안내
  if (questions.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ textAlign: "center", mt: 10 }}>
          <Typography variant="h6">문제를 불러오는 중입니다…</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* 상단 헤더 */}
        <QuizHeader />

        {/* 설명 텍스트 */}
        <Typography color="text.secondary" gutterBottom>
          객관식 문제를 클릭하여 답안을 선택하세요.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* — 문제 카드 영역 */}
          <Grid item xs={12} md={9}>
            <Collapse in={!submitted}>
              {questions.map((q, idx) => (
                <QuestionCard key={q.id} question={q} index={idx} visible={!submitted} />
              ))}

              <Box textAlign="center" mt={2}>
                <Button variant="contained" size="large" onClick={submitAnswers}>
                  📤 답안 제출
                </Button>
              </Box>
            </Collapse>

            {/* — 채점 결과 */}
            <Fade in={showResults} timeout={500}>
              <Box>
                {results && (
                  <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                      채점 결과
                    </Typography>
                    <Typography gutterBottom>
                      총 점수:
                      <strong>
                        {" "}
                        {results.score} / {results.total}
                      </strong>
                    </Typography>
                    <ul style={{ paddingLeft: "1.2rem" }}>
                      {results.results.map((r) => (
                        <li key={r.questionId}>
                          문제 {r.questionId}: {r.isCorrect ? "✅ 정답" : "❌ 오답"}
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
          </Grid>

          {/* — 오른쪽 네비게이션 */}
          <Grid item xs={12} md={3}>
            <NavPanel />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default QuizPage;
