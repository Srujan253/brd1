import React, { useEffect, useState } from "react";
import "./Game1.css";

const CARD_VALUES = ["🍰", "🎂", "🎉", "🎈", "🎁", "🍦", "🍫", "🍩"];
const CARDS = [...CARD_VALUES, ...CARD_VALUES];

function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTopScores() {
  const scores = JSON.parse(localStorage.getItem("memoryGameScores") || "[]");
  return scores.sort((a, b) => a.moves - b.moves).slice(0, 3);
}

function Game1() {
  const [cards, setCards] = useState(shuffle(CARDS));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [finished, setFinished] = useState(false);
  const [topScores, setTopScores] = useState(getTopScores());

  useEffect(() => {
    if (matched.length === cards.length) {
      setFinished(true);
      // Save score
      const name = prompt("You finished! Enter your name for the leaderboard:");
      if (name) {
        const scores = JSON.parse(localStorage.getItem("memoryGameScores") || "[]");
        scores.push({ name, moves });
        localStorage.setItem("memoryGameScores", JSON.stringify(scores));
        setTopScores(getTopScores());
      }
    }
    // eslint-disable-next-line
  }, [matched]);

  const handleFlip = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [i, j] = newFlipped;
      if (cards[i] === cards[j]) {
        setTimeout(() => {
          setMatched(m => [...m, i, j]);
          setFlipped([]);
        }, 600);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const handleRestart = () => {
    setCards(shuffle(CARDS));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setFinished(false);
  };

  return (
    <section className="py-10 px-4 bg-[#22223b] min-h-[70vh]" id="memory-game">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-white">Memory Game</h2>
        <div className="text-white mb-4">
          <strong>Instructions:</strong> Flip two cards at a time to find all matching pairs. Try to finish in as few moves as possible!
        </div>
        <div className="mb-4 text-yellow-200 font-semibold">Moves: {moves}</div>
        <div className="game-board">
          {cards.map((val, idx) => (
            <div
              key={idx}
              className={`game-card ${flipped.includes(idx) || matched.includes(idx) ? "flipped" : ""}`}
              onClick={() => handleFlip(idx)}
            >
              <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back">{val}</div>
              </div>
            </div>
          ))}
        </div>
        {finished && (
          <div className="text-green-400 font-bold mt-4">
            🎉 Congratulations! You finished in {moves} moves.
            <button className="ml-4 px-3 py-1 bg-amber-500 text-white rounded" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-2">Top Scorers</h3>
          <ol className="text-white">
            {topScores.length === 0 && <li>No scores yet.</li>}
            {topScores.map((score, i) => (
              <li key={i} className={i === 0 ? "text-yellow-300" : i === 1 ? "text-gray-300" : "text-amber-700"}>
                {i + 1}. {score.name} - {score.moves} moves
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Game1;