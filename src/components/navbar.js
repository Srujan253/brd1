import React, { useState } from "react";

function Navbar({ name = "Someone Special", onToggleDark }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-amber-500 dark:bg-gray-900 px-4 py-3 shadow-lg font-sans relative">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="font-bold text-xl text-gray-900 dark:text-white">
          Wish for {name}
        </div>
        {/* Hamburger */}
        <button
          className="md:hidden text-gray-900 dark:text-white focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center font-semibold text-base">
          <li>
            <a href="#gallery" className="nav-link block px-4 py-2 text-gray-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400">Gallery</a>
          </li>
          <li>
            <a href="#games" className="nav-link block px-4 py-2 text-gray-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400">Games</a>
          </li>
          <li>
            <a href="#wishes" className="nav-link block px-4 py-2 text-gray-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400">Wishes</a>
          </li>
        </ul>
      </div>
      {/* Mobile Menu */}
      <div
        className={`
          md:hidden absolute left-0 right-0 top-full z-50
          transition-all duration-300 ease-in-out
          ${open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"}
        `}
      >
        <ul className="flex flex-col gap-2 bg-amber-500 dark:bg-gray-900 py-4 shadow-lg font-semibold text-base">
          <li>
            <a href="#gallery" className="nav-link block px-4 py-2 text-gray-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400" onClick={() => setOpen(false)}>Gallery</a>
          </li>
          <li>
            <a href="#games" className="nav-link block px-4 py-2 text-gray-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400" onClick={() => setOpen(false)}>Games</a>
          </li>
          <li>
            <a href="#wishes" className="nav-link block px-4 py-2 text-gray-900 dark:text-white hover:text-amber-700 dark:hover:text-amber-400" onClick={() => setOpen(false)}>Wishes</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;