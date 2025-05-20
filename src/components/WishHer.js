import React, { useState } from "react";

function WishHer({ onWish }) {
  const [wish, setWish] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wish.trim() && name.trim()) {
      onWish({ name, wish, date: new Date().toLocaleString() });
      setWish("");
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto mt-6 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Your Name"
        className="border rounded px-3 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your wish..."
        className="border rounded px-3 py-2"
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-amber-400 text-white font-bold py-2 rounded hover:bg-amber-500 transition"
      >
        Submit Wish
      </button>
    </form>
  );
}

export default WishHer;