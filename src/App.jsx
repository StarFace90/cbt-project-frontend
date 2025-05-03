import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import { QuizProvider } from "./context/QuizContext"; // ✅ 이 부분 추가

function CBTApp() {
  return (
    <QuizProvider>
      {" "}
      {/* ✅ 전체 라우팅을 Context로 감쌈 */}
      <Router>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default CBTApp;
