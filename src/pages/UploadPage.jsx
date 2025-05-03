import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadHeader from "../components/UploadHeader";
import QuestionForm from "../components/QuestionForm";

function UploadPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // 비로그인 시 홈으로 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능한 기능입니다.");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // 업로드 핸들러
  const handleSubmit = async ({ title, pdf }) => {
    const payload = new FormData();
    payload.append("title", title);
    payload.append("pdf", pdf);

    try {
      const res = await fetch("http://localhost:3000/questions/upload", {
        method: "POST",
        body: payload,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      alert(`✅ ${data.message}`);
      navigate("/quiz");
    } catch (err) {
      console.error("Upload failed:", err);
      alert(`❌ 등록 실패: ${err.message}`);
    }
  };

  return (
    <>
      <UploadHeader />
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1" gutterBottom>
          PDF 문제지 파일을 업로드하면 자동으로 문제가 등록됩니다.
        </Typography>
        <QuestionForm onSubmit={handleSubmit} />
      </Container>
    </>
  );
}

export default UploadPage;
