import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

function StartPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        📝 CBT 문제 응시 시스템
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        본 시험은 자동 채점 및 복습 기능을 지원합니다.
      </Typography>

      <Box mt={4}>
        <Button variant="contained" color="primary" size="large" onClick={() => navigate("/quiz")}>
          문제 풀기 시작
        </Button>
      </Box>
    </Container>
  );
}

export default StartPage;
