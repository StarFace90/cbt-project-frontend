// 문제 등록 폼 컴포넌트

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack, InputLabel } from "@mui/material";

function QuestionForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("PDF 파일을 선택해주세요.");
      return;
    }
    onSubmit({ title, pdf: pdfFile });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        문제 업로드
      </Typography>

      <TextField
        label="문제지 제목"
        fullWidth
        required
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <InputLabel sx={{ mt: 2 }}>PDF 파일 업로드</InputLabel>
      <input type="file" accept="application/pdf" required onChange={(e) => setPdfFile(e.target.files[0])} />

      <Box mt={3}>
        <Button variant="contained" color="primary" type="submit">
          문제 등록하기
        </Button>
      </Box>
    </Box>
  );
}

export default QuestionForm;
