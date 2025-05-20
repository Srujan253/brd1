import React from "react";
import Countdown from "./Countdown";
import childhood from "../photo/childhood.jpg";
import "./About.css";

function About() {
  const targetDate = "2025-07-27";

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] bg-[#22223b] py-10 px-4" id="about">
      <div className="md:w-1/2 flex justify-center mb-6 md:mb-0 slide-in-left">
        <div className="tilt-container">
          <img
            src={childhood}
            alt="Birthday Candidate"
            className="tilt-img w-64 h-64 object-cover"
            style={{ transform: "rotate(-6deg)" }}
          />
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col items-center md:items-start slide-in-right">
        <h1 className="text-3xl font-bold mb-4 text-white">About the Birthday Star  </h1>
        <div className="mb-4 text-white max-w-md border-l-4 border-yellow-200 pl-4">
          <span className="font-semibold">Name:</span>Srushti (Tokke)<br />
          <span className="font-semibold">Hobbies:</span> Yelling,talkig,Screaming<br />
          <span className="font-semibold">Fun Fact:</span> Hates someone without a reason 
        </div>
        <div className="mb-2 text-yellow-200 font-medium">Countdown to the Big Day:</div>
        <Countdown targetDate={targetDate} />
      </div>
    </section>
  );
}

export default About;