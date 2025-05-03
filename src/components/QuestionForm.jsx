import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function QuestionForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pdf) {
      alert("PDF 파일을 선택해주세요.");
      return;
    }
    onSubmit({ title, pdf });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 600 }}
    >
      <TextField label="문제집 제목" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
      <Button variant="contained" component="label">
        PDF 파일 선택
        <input type="file" hidden accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} />
      </Button>
      {pdf && <Typography>선택된 파일: {pdf.name}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        업로드
      </Button>
    </Box>
  );
}

export default QuestionForm;
