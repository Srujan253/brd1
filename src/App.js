import React, { useState } from "react";
import Navbar from "./components/navbar";
import Gallery from "./components/Gallery";
import Games from "./components/Games";
import Footer from "./components/Footer";
import About from "./components/About";
import Wishes from "./components/Wishes";
import "./App.css";
import Game1 from "./components/Game1"; 
import { Analytics } from "@vercel/analytics/next"
function App() {
  const [dark, setDark] = useState(false);

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar name="Someone Special" onToggleDark={() => setDark((d) => !d)} />
      <About />
      <main className="flex-1">
        <Gallery />
        <Games />
        <Game1/>
        <Wishes />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;