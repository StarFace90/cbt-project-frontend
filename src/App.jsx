// App.jsx
// 메인 라우팅 컴포넌트: 각 페이지 라우트를 정의하며 Context들을 Wrapping

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 로그인 상태를 관리하는 컨텍스트
import { AuthProvider } from "./context/AuthContext";

// 문제 풀이 관련 상태를 공유하는 컨텍스트
import { QuizProvider } from "./context/QuizContext";

// 각 페이지 컴포넌트
import StartPage from "./pages/StartPage"; // 시작 화면
import QuizPage from "./pages/QuizPage"; // 문제 풀이 화면
import UploadPage from "./pages/UploadPage"; // 문제 업로드 화면

function CBTApp() {
  return (
    <Router>
      {/* 로그인 상태를 전역에서 사용 가능하게 설정 */}
      <AuthProvider>
        {/* 퀴즈 데이터, 정답 상태 등 공유 */}
        <QuizProvider>
          <Routes>
            {/* 메인 진입점 - 문제 풀기 시작 버튼 */}
            <Route path="/" element={<StartPage />} />

            {/* 실제 문제 풀이 페이지 */}
            <Route path="/quiz" element={<QuizPage />} />

            {/* 관리자/로그인 사용자만 접근 가능한 문제 등록 페이지 */}
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}

export default CBTApp;
