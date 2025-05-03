import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// Context 객체 생성
const QuizContext = createContext();

// Context Provider 컴포넌트
export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const questionRefs = useRef({});

  // 문제 로딩
  useEffect(() => {
    const qList = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      question: `문제 ${i + 1}번 질문입니다.`,
      choices: ["선택지 A", "선택지 B", "선택지 C", "선택지 D"],
    }));
    setQuestions(qList);

    const refs = {};
    qList.forEach((q) => {
      refs[q.id] = React.createRef();
    });
    questionRefs.current = refs;

    setStartTime(Date.now());
  }, []);

  // 타이머 업데이트
  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, submitted]);

  // 정답 선택
  const selectAnswer = (questionId, choiceIndex) => {
    setAnswers((prev) => {
      const prevAnswer = prev[questionId];
      if (prevAnswer === choiceIndex) {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      } else {
        return { ...prev, [questionId]: choiceIndex };
      }
    });
  };

  // 답안 제출
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
        setTimeout(() => setShowResults(true), 300);
      });
  };

  // 초기화
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

// Context 사용 Hook
export const useQuiz = () => useContext(QuizContext);
