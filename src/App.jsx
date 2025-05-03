// src/App.jsx

import React from "react";
// React Router 관련 컴포넌트 import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 페이지 컴포넌트 import
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import UploadPage from "./pages/UploadPage";

// Context Provider import
import { QuizProvider } from "./context/QuizContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // AuthProvider: 로그인 상태 관리
    <AuthProvider>
      {/* QuizProvider: 퀴즈 상태 관리(Context) */}
      <QuizProvider>
        {/* Router: 라우팅 설정 */}
        <Router>
          <Routes>
            {/* 시작 페이지 ("/") */}
            <Route path="/" element={<StartPage />} />
            {/* 퀴즈 페이지 ("/quiz") */}
            <Route path="/quiz" element={<QuizPage />} />
            {/* 문제 업로드 페이지 ("/upload") */}
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
