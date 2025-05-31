"use client";

import { useState, useEffect, useRef } from "react";

const words = [
  { text: "Cyberpunk", size: "text-2xl", glow: false },
  { text: "Neon", size: "text-xl", glow: false },
  { text: "Retro", size: "text-lg", glow: false },
  { text: "Future", size: "text-xl", glow: false },
  { text: "Digital", size: "text-lg", glow: false },
  { text: "Synth", size: "text-3xl", glow: false },
  { text: "Glow", size: "text-lg", glow: false },
  { text: "Electric", size: "text-xl", glow: false },
  { text: "Cyber", size: "text-lg", glow: false },
  { text: "Virtual", size: "text-xl", glow: false },
  { text: "Dystopia", size: "text-2xl", glow: false },
  { text: "Hacker", size: "text-lg", glow: false },
  { text: "Techno", size: "text-4xl", glow: true },
  { text: "Hologram", size: "text-lg", glow: false },
];

// for each word, you want to know about its
// location on the page
// content of the word
// size of the word
// if the word is glowing or not
interface WordPosition {
  x: number;
  y: number;
  text: string;
  size: number;
  glow: boolean;
}

export default function WordCloud() {
  // first set up the random positions of all the other words
  useEffect(() => {
    const updatePositions = () => {
      const wordCloudContainer = document.getElementById(
        "word-cloud-container",
      );
      // get the dimensions of the bounding box first
      const containerHeight = wordCloudContainer?.clientWidth;
      const containerWidth = wordCloudContainer?.clientHeight;

      console.log(containerHeight, containerWidth);
    };

    updatePositions();
  }, []);

  return (
    <div className="bg-gray-500" id="word-cloud-container">
      this is a wortd cloud
    </div>
  );
}
