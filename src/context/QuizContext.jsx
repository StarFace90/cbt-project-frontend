import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// Context 객체 생성
const QuizContext = createContext();

// Context Provider 컴포넌트
export const QuizProvider = ({ children }) => {
  // 문제 목록
  const [questions, setQuestions] = useState([]);
  // 사용자가 고른 답안들 { [questionId]: choiceIndex }
  const [answers, setAnswers] = useState({});
  // 제출 여부
  const [submitted, setSubmitted] = useState(false);
  // 서버에서 돌아온 채점 결과
  const [results, setResults] = useState(null);
  // 타이머 시작 시각
  const [startTime, setStartTime] = useState(null);
  // 경과 시간(초)
  const [elapsed, setElapsed] = useState(0);
  // 다크모드 플래그
  const [darkMode, setDarkMode] = useState(false);
  // 결과 화면 보이기 플래그
  const [showResults, setShowResults] = useState(false);
  // 문제 카드 ref 집합 (스크롤 이동용)
  const questionRefs = useRef({});

  // — 1) 컴포넌트 마운트 시 서버에서 문제 불러오기
  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        // 각 문제에 대한 ref를 생성해 둡니다
        const refs = {};
        data.forEach((q) => {
          refs[q.id] = React.createRef();
        });
        questionRefs.current = refs;
        // 타이머 시작
        setStartTime(Date.now());
      })
      .catch((err) => {
        console.error("문제 로드 실패:", err);
      });
  }, []);

  // — 2) 제출 전에는 1초마다 경과 시간 갱신
  useEffect(() => {
    if (!submitted && startTime) {
      const timerId = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [startTime, submitted]);

  // — 3) 답안 선택 / 취소
  const selectAnswer = (questionId, choiceIndex) => {
    setAnswers((prev) => {
      const prevAns = prev[questionId];
      // 같은 선택지를 다시 누르면 취소
      if (prevAns === choiceIndex) {
        const copy = { ...prev };
        delete copy[questionId];
        return copy;
      }
      return { ...prev, [questionId]: choiceIndex };
    });
  };

  // — 4) 답안 제출 → 서버로 보내고 채점 결과 받아오기
  const submitAnswers = () => {
    fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setSubmitted(true);
        // 0.3초 뒤에 결과 페이드인
        setTimeout(() => setShowResults(true), 300);
      })
      .catch((err) => console.error("제출 실패:", err));
  };

  // — 5) 초기화 (다시 풀기)
  const resetQuiz = () => {
    setAnswers({});
    setResults(null);
    setSubmitted(false);
    setShowResults(false);
    setStartTime(Date.now());
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        answers,
        submitted,
        results,
        elapsed,
        darkMode,
        showResults,
        setDarkMode,
        selectAnswer,
        submitAnswers,
        resetQuiz,
        questionRefs,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Context 사용을 위한 Hook
export const useQuiz = () => useContext(QuizContext);
