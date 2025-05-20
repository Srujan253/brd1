import React from "react";

function Navbar({ name = "Someone Special", onToggleDark }) {
  const isDark = document.documentElement.classList.contains("dark");
  return (
    <nav className="flex justify-between items-center bg-amber-400 dark:bg-gray-900 px-8 py-4 font-sans shadow-lg animate-navbar-slide-in">
      <div className="font-bold text-2xl text-gray-900 dark:text-white transition-colors duration-300">
        Wish for {name}
      </div>
      <ul className="flex list-none gap-8 m-0 p-0">
        <li>
          <a href="#gallery" className="nav-link">Gallery</a>
        </li>
        <li>
          <a href="#games" className="nav-link">Games</a>
        </li>
        <li>
          <a href="#wishes" className="nav-link">Wishes</a>
        </li>
      </ul>
      {/* <button
        onClick={onToggleDark}
        className="ml-4 px-3 py-1 rounded bg-gray-800 text-white dark:bg-amber-400 dark:text-gray-900 transition-colors duration-300"
      >
        {document.documentElement.classList.contains("dark") ? "Light Mode" : "Dark Mode"}
      </button> */}
    </nav>
  );
}

export default Navbar;