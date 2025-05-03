import React, { useEffect } from "react";
import { Typography, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UploadHeader from "../components/UploadHeader";
import QuestionForm from "../components/QuestionForm";

function UploadPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // ❗ 로그인 안 된 사용자는 홈으로 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인 후 이용 가능한 기능입니다.");
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("pdf", formData.pdf);

    fetch("http://localhost:3000/questions", {
      method: "POST",
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then(() => alert("✅ 문제 등록 완료!"))
      .catch(() => alert("❌ 등록 실패"));
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
