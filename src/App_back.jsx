import React, { useEffect, useRef, useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Box,
  Paper,
  Grid,
  Collapse,
  Fade,
  Switch,
  Slide,
} from "@mui/material";

function CBTApp() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const questionRefs = useRef({});

  const theme = useMemo(() => getTheme(darkMode ? "dark" : "light"), [darkMode]);

  useEffect(() => {
    const expanded = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `문제 ${i + 1}번 질문입니다.`,
      choices: ["선택지 A", "선택지 B", "선택지 C", "선택지 D"],
    }));
    setQuestions(expanded);
    const refs = {};
    expanded.forEach((q) => {
      refs[q.id] = React.createRef();
    });
    questionRefs.current = refs;
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, submitted]);

  const handleSelect = (questionId, choiceIndex) => {
    setAnswers((prev) => {
      const prevAnswer = prev[questionId];
      if (prevAnswer === choiceIndex) {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      } else {
        return { ...prev, [questionId]: choiceIndex };
      }
    });
  };

  const handleSubmit = () => {
    fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setSubmitted(true);
        setTimeout(() => setShowResults(true), 300);
      });
  };

  const reset = () => {
    setAnswers({});
    setResults(null);
    setSubmitted(false);
    setShowResults(false);
    setStartTime(Date.now());
  };

  const scrollToQuestion = (id) => {
    questionRefs.current[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            CBT 문제 응시 시스템
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">⏱ 경과: {elapsed}s</Typography>
            <Typography>🌙</Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode((prev) => !prev)} />
          </Box>
        </Grid>

        <Typography color="text.secondary" gutterBottom>
          자동 채점 및 복습 지원
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* 문제 영역 */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mx: "auto", maxWidth: 800 }}>
              <Collapse in={!submitted}>
                <Box>
                  {questions.map((q, idx) => (
                    <Slide key={q.id} direction="up" in={!submitted} timeout={300 + idx * 50}>
                      <Card ref={questionRefs.current[q.id]} variant="outlined" sx={{ mb: 4 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            {idx + 1}. {q.question}
                          </Typography>
                          <Stack spacing={1}>
                            {q.choices.map((choice, i) => (
                              <Button
                                key={i}
                                variant={answers[q.id] === i ? "contained" : "outlined"}
                                color={answers[q.id] === i ? "primary" : "inherit"}
                                onClick={() => handleSelect(q.id, i)}
                                sx={{ justifyContent: "flex-start" }}
                              >
                                {String.fromCharCode(65 + i)}. {choice}
                              </Button>
                            ))}
                          </Stack>
                        </CardContent>
                      </Card>
                    </Slide>
                  ))}
                  <Box textAlign="center">
                    <Button variant="contained" size="large" color="primary" onClick={handleSubmit}>
                      📤 답안 제출
                    </Button>
                  </Box>
                </Box>
              </Collapse>

              {/* 채점 결과 */}
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
                        <Button variant="outlined" color="secondary" onClick={reset}>
                          전체 문제 다시 풀기
                        </Button>
                      </Box>
                    </Paper>
                  )}
                </Box>
              </Fade>
            </Box>
          </Grid>

          {/* 우측 네비게이션 */}
          <Grid item xs={12} md={3}>
            {!submitted && questions.length > 0 && (
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
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CBTApp;
