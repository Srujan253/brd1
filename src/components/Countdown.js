import React, { useEffect, useState } from "react";

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showWishBox, setShowWishBox] = useState(false);
  const [wish, setWish] = useState("");
  const [name, setName] = useState("");
  const [wished, setWished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isTimeUp =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && wish.trim()) {
      // Save wish to localStorage
      const wishes = JSON.parse(localStorage.getItem("wishes") || "[]");
      wishes.push({
        name,
        wish,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("wishes", JSON.stringify(wishes));
      setWished(true);
      setShowWishBox(false);
      setName("");
      setWish("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4 text-lg font-semibold justify-center">
        <div className="dark:text-white">
          <span className="text-2xl">{timeLeft.days}</span> days
        </div>
        <div className="dark:text-white">
          <span className="text-2xl">{timeLeft.hours}</span> hrs
        </div>
        <div className="dark:text-white">
          <span className="text-2xl">{timeLeft.minutes}</span> min
        </div>
        <div className="dark:text-white">
          <span className="text-2xl">{timeLeft.seconds}</span> sec
        </div>
      </div>
      <button
        className={`mt-4 px-6 py-2 rounded font-bold text-white transition bg-amber-500 hover:bg-amber-600 ${
          isTimeUp ? "" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!isTimeUp}
        onClick={() => setShowWishBox(true)}
      >
        Wish Her
      </button>
      {showWishBox && (
        <form
          onSubmit={handleWishSubmit}
          className="flex flex-col gap-3 max-w-xs w-full bg-white p-4 rounded shadow mt-2"
        >
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
      )}
      {wished && (
        <div className="text-green-600 font-semibold mt-2">Wish submitted! 🎉</div>
      )}
    </div>
  );
}

export default Countdown;