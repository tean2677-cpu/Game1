import { useEffect, useState } from "react";
import { useBedroomGame } from "@/lib/stores/useBedroomGame";

export function GameOverScreen() {
  const gameState = useBedroomGame((state) => state.gameState);
  const resetGame = useBedroomGame((state) => state.resetGame);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (gameState !== "playing") {
      setTimeout(() => setFadeIn(true), 100);
    } else {
      setFadeIn(false);
    }
  }, [gameState]);

  if (gameState === "playing") return null;

  const getMessage = () => {
    switch (gameState) {
      case "won":
        return "You Survived!";
      case "lostDehydration":
        return "You died from dehydration";
      case "lostFear":
        return "You Lost";
      default:
        return "";
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center transition-opacity duration-1000 pointer-events-auto ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="text-center">
        <h1 className="text-white text-6xl font-bold mb-8">{getMessage()}</h1>
        <button
          onClick={resetGame}
          className="bg-white text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
