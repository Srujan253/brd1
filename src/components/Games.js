import React, { useState } from "react";

const questions = [
  { question: "What is the Favorite color of srushti?", options: ["yellow", "black", "violet", "red"], answer: "violet" },
  { question: "what is her favorite food?", options: ["pizza", "chicken", "fish", "crab"], answer: "crab" },
  { question: "what's her father name?", options: ["manjunath", "mahesh", "mahadev", "harish"], answer: "manjunath" },
];

function Games() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore(score + 1);
    if (current < questions.length - 1) setCurrent(current + 1);
    else setShowScore(true);
  };

  // Detect dark mode
  const isDark = document.documentElement.classList.contains("dark");
  const bgClass = isDark ? "bg-[#22223b]" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-800";

  const percentage = (score / questions.length) * 100;
  let message = "";
  if (showScore) {
    if (score === questions.length) message = "You know her very well! 🎉😍";
    else if (percentage >= 80) message = "Close enough! 😊";
  }

  return (
    <div className={`flex flex-col items-center py-8 bg-[#22223b]`} id="games">
      <h2 className="text-2xl font-bold mb-4 text-white">Quiz Game</h2>
      {showScore ? (
       <div className={`text-xl font-semibold text-white flex flex-col items-center gap-2 ${textClass}`}>
     <div>
    Your Score: {score} / {questions.length}
    </div>


          {message && <div className="text-amber-400">{message}</div>}
        </div>
      ) : (
        <div className={`w-full max-w-md ${bgClass} rounded shadow p-6`}>
          <div className={`mb-4 font-medium ${textClass}`}>{questions[current].question}</div>
          <div className="flex flex-col gap-2">
            {questions[current].options.map((option) => (
              <button
                key={option}
                className="bg-amber-300 hover:bg-amber-400 px-4 py-2 rounded transition font-bold"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;