"use client";

import { useEffect, useState, useRef } from "react";

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
  { text: "Matrix", size: "text-xl", glow: false },
  { text: "Glitch", size: "text-lg", glow: false },
  { text: "Arcade", size: "text-xl", glow: false },
  { text: "Laser", size: "text-2xl", glow: false },
  { text: "Pixel", size: "text-lg", glow: false },
  { text: "Vaporwave", size: "text-xl", glow: false },
  { text: "Neural", size: "text-lg", glow: false },
  { text: "Chrome", size: "text-lg", glow: false },
  { text: "Binary", size: "text-lg", glow: false },
  { text: "Code", size: "text-xl", glow: false },
];

interface WordPosition {
  text: string;
  size: string;
  glow: boolean;
  x: number;
  y: number;
}

export default function Component() {
  const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const originalPositionsRef = useRef<WordPosition[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      const getWordDimensions = (word: (typeof words)[0]) => {
        const baseCharWidth = containerWidth < 768 ? 8 : 12;
        let fontSize = containerWidth < 768 ? 12 : 16;

        if (word.size === "text-lg") fontSize = containerWidth < 768 ? 14 : 18;
        else if (word.size === "text-xl")
          fontSize = containerWidth < 768 ? 16 : 20;
        else if (word.size === "text-2xl")
          fontSize = containerWidth < 768 ? 18 : 24;
        else if (word.size === "text-3xl")
          fontSize = containerWidth < 768 ? 22 : 30;
        else if (word.size === "text-4xl")
          fontSize = containerWidth < 768 ? 26 : 36;

        const width = word.text.length * (baseCharWidth * (fontSize / 16));
        const height = fontSize * 1.5;

        return { width, height };
      };

      const checkOverlap = (
        newWord: { x: number; y: number; width: number; height: number },
        existingWords: {
          x: number;
          y: number;
          width: number;
          height: number;
        }[],
      ) => {
        const padding = containerWidth < 768 ? 15 : 30;

        for (const existing of existingWords) {
          if (
            newWord.x < existing.x + existing.width + padding &&
            newWord.x + newWord.width + padding > existing.x &&
            newWord.y < existing.y + existing.height + padding &&
            newWord.y + newWord.height + padding > existing.y
          ) {
            return true;
          }
        }
        return false;
      };

      const positions: WordPosition[] = [];
      const placedBoxes: {
        x: number;
        y: number;
        width: number;
        height: number;
      }[] = [];

      const sortedWords = [...words].sort((a, b) => {
        const sizeOrder = {
          "text-4xl": 5,
          "text-3xl": 4,
          "text-2xl": 3,
          "text-xl": 2,
          "text-lg": 1,
        };
        return (
          (sizeOrder[b.size as keyof typeof sizeOrder] || 0) -
          (sizeOrder[a.size as keyof typeof sizeOrder] || 0)
        );
      });

      sortedWords.forEach((word) => {
        const dimensions = getWordDimensions(word);
        let attempts = 0;
        let position: WordPosition | null = null;

        const margin = containerWidth < 768 ? 20 : 50;
        const maxAttempts = containerWidth < 768 ? 150 : 100;

        while (attempts < maxAttempts && !position) {
          const x =
            Math.random() * (containerWidth - dimensions.width - margin * 2) +
            margin;
          const y =
            Math.random() * (containerHeight - dimensions.height - margin * 2) +
            margin;

          const box = {
            x,
            y,
            width: dimensions.width,
            height: dimensions.height,
          };

          if (!checkOverlap(box, placedBoxes)) {
            const xPercent = (x / containerWidth) * 100;
            const yPercent = (y / containerHeight) * 100;

            position = {
              ...word,
              x: xPercent,
              y: yPercent,
            };
            placedBoxes.push(box);
          }
          attempts++;
        }

        if (!position) {
          const xPercent = Math.random() * 80 + 10;
          const yPercent = Math.random() * 80 + 10;

          position = {
            ...word,
            x: xPercent,
            y: yPercent,
          };
        }

        positions.push(position);
      });

      // Store original positions
      originalPositionsRef.current = [...positions];
      setWordPositions(positions);
    };

    updatePositions();

    const handleResize = () => {
      setTimeout(updatePositions, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to handle repulsion when hovering
  useEffect(() => {
    if (!originalPositionsRef.current.length) return;

    if (hoveredIndex === null) {
      // Return all words to their original positions
      setWordPositions([...originalPositionsRef.current]);
      return;
    }

    // Apply repulsion effect
    const hoveredWord = originalPositionsRef.current[hoveredIndex];
    if (!hoveredWord) return;

    const newPositions = originalPositionsRef.current.map((word, index) => {
      if (index === hoveredIndex) return word; // Don't move the hovered word

      // Calculate distance between words (using percentage coordinates)
      const dx = word.x - hoveredWord.x;
      const dy = word.y - hoveredWord.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only affect nearby words (within 30% of screen)
      const repulsionRadius = window.innerWidth < 768 ? 20 : 30;
      if (distance > repulsionRadius) return word;

      // Calculate repulsion force (stronger for closer words)
      const repulsionStrength = window.innerWidth < 768 ? 5 : 8;
      const force = (repulsionRadius - distance) / repulsionRadius;
      const repulsion = force * repulsionStrength;

      // Calculate new position with repulsion
      const angle = Math.atan2(dy, dx);
      const newX = word.x + Math.cos(angle) * repulsion;
      const newY = word.y + Math.sin(angle) * repulsion;

      // Ensure words stay within bounds
      const boundedX = Math.max(5, Math.min(95, newX));
      const boundedY = Math.max(5, Math.min(95, newY));

      return {
        ...word,
        x: boundedX,
        y: boundedY,
      };
    });

    setWordPositions(newPositions);
  }, [hoveredIndex]); // Only depend on hoveredIndex, not wordPositions

  return (
    <div className="relative min-h-screen w-full touch-pan-y overflow-hidden bg-gray-500">
      {/* Animated background gradient */}
      <div className="absolute inset-0" />

      {wordPositions.map((word, index) => (
        <div
          key={index}
          className={`absolute cursor-pointer font-mono font-bold transition-all duration-300 select-none ${word.size} ${
            word.glow || index === hoveredIndex
              ? "text-pink-400"
              : "text-gray-300 hover:text-pink-300"
          }`}
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            textShadow:
              word.glow || index === hoveredIndex
                ? "0 0 8px #ec4899, 0 0 16px #ec4899, 0 0 24px #ec4899, 0 0 32px #ec4899"
                : "0 0 4px rgba(255,255,255,0.3)",
            animation: word.glow
              ? "neonPulse 2s ease-in-out infinite alternate"
              : undefined,
            transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            transform: index === hoveredIndex ? "scale(1.15)" : "scale(1)",
            zIndex: index === hoveredIndex ? 10 : 1,
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={() => setHoveredIndex(index)}
          onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 1000)}
        >
          {word.text}
        </div>
      ))}

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({
          length:
            typeof window !== "undefined" && window.innerWidth < 768 ? 10 : 20,
        }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 animate-ping rounded-full bg-pink-400 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes neonPulse {
          0% {
            text-shadow:
              0 0 10px #ec4899,
              0 0 20px #ec4899,
              0 0 30px #ec4899,
              0 0 40px #ec4899;
          }
          100% {
            text-shadow:
              0 0 5px #ec4899,
              0 0 10px #ec4899,
              0 0 15px #ec4899,
              0 0 20px #ec4899,
              0 0 35px #ec4899,
              0 0 40px #ec4899;
          }
        }
      `}</style>
    </div>
  );
}
