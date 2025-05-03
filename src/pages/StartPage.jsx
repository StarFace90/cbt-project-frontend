// src/pages/StartPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function StartPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        🧪 CBT 문제 풀이 시스템
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        회원가입 없이 문제 풀이 가능 · 로그인 시 문제 등록 가능
      </Typography>

      <Stack spacing={2} mt={4} direction="column" alignItems="center">
        {/* 문제 풀이 시작 버튼 */}
        <Button variant="contained" color="primary" size="large" onClick={() => navigate("/quiz")}>
          문제 풀기 시작
        </Button>

        {/* ✅ 로그인된 사용자만 "문제 등록" 버튼 표시 */}
        {isLoggedIn && (
          <Button variant="outlined" color="secondary" onClick={() => navigate("/upload")}>
            📤 문제 등록하기
          </Button>
        )}
      </Stack>
    </Container>
  );
}

export default StartPage;
