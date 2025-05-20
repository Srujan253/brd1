import React, { useEffect, useState } from "react";
import "../Wishes.css";

function Wishes() {
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishes");
    if (stored) setWishes(JSON.parse(stored));
  }, []);

  // Remove all wishes with passkey
  const handleClearAll = () => {
    const key = prompt("Enter passkey to remove all wishes:");
    if (key === "27@80888762") {
      localStorage.removeItem("wishes");
      setWishes([]);
    } else if (key !== null) {
      alert("Incorrect passkey!");
    }
  };

  // Remove a single wish with passkey
  const handleRemoveWish = (idx) => {
    const key = prompt("Enter passkey to remove this wish:");
    if (key === "27@80888762") {
      const updated = wishes.filter((_, i) => i !== idx);
      setWishes(updated);
      localStorage.setItem("wishes", JSON.stringify(updated));
    } else if (key !== null) {
      alert("Incorrect passkey!");
    }
  };

  return (
    <section className="py-10 px-4 bg-[#22223b] w-full min-h-[70vh]" id="wishes">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Wishes</h2>
        <button
          onClick={handleClearAll}
          className="mb-6 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 block mx-auto"
        >
          Clear All Wishes
        </button>
        {wishes.length === 0 ? (
          <p className="text-center text-white">No wishes yet. Be the first to wish!</p>
        ) : (
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            {wishes.map((wish, idx) => (
              <div key={idx} className="wish-card relative">
                <button
                  onClick={() => handleRemoveWish(idx)}
                  className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  title="Remove this wish"
                >
                  Remove
                </button>
                <div className="font-semibold text-white">{wish.name}</div>
                <div className="text-white">{wish.wish}</div>
                <div className="text-xs text-yellow-100 mt-2">{wish.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Wishes;