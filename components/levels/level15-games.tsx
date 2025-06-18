"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Level15GamesProps {
  gameNumber: number
  onComplete: (isCorrect: boolean) => void
}

export default function Level15Games({ gameNumber, onComplete }: Level15GamesProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const games = [
    {
      title: "¡Reino Mágico Final!",
      instruction: "¿Cuántas estrellas mágicas brillan en el reino final?",
      items: [
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
        "✨",
      ],
      correctAnswer: 30,
      options: [29, 30, 31],
    },
    {
      title: "Criaturas Mágicas",
      instruction: "¡Encuentra la criatura que no es mágica!",
      items: ["🦄", "🐉", "🐄", "🧚"],
      correctAnswer: 2,
      options: [0, 1, 2, 3],
    },
    {
      title: "Objetos Encantados",
      instruction: "¡Toca el objeto que no tiene magia!",
      items: ["🪄", "🪄", "🔧", "🪄"],
      correctAnswer: 2,
      options: [0, 1, 2, 3],
    },
    {
      title: "Suma de Unicornios",
      instruction: "¿Cuántos unicornios galopan por el reino mágico?",
      items: [
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
        "🦄",
      ],
      correctAnswer: 31,
      options: [30, 31, 32],
    },
    {
      title: "¡SUPERJUEGO FINAL!",
      instruction: "¡Felicitaciones! ¿Qué completa la magia de MateMagia?",
      items: ["🧙‍♂️", "✨", "🧙‍♂️", "✨", "🧙‍♂️", "?"],
      correctAnswer: 1,
      options: [0, 1, 2],
    },
  ]

  const currentGame = games[gameNumber - 1]

  useEffect(() => {
    const speak = (text: string) => {
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = "es-ES"
        utterance.rate = 0.8
        speechSynthesis.speak(utterance)
      }
    }

    const timer = setTimeout(() => {
      if (gameNumber === 5) {
        speak("¡Felicitaciones pequeño mago! Has llegado al superjuego final. ¿Qué completa la magia de MateMagia?")
      } else {
        speak(`Mate el Maguito dice: ${currentGame.instruction}`)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [currentGame.instruction, gameNumber])

  const handleAnswer = (answer: number) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }

    setSelectedAnswer(answer)
    const isCorrect = answer === currentGame.correctAnswer

    setTimeout(() => {
      onComplete(isCorrect)
      setSelectedAnswer(null)
    }, 1000)
  }

  const renderGameContent = () => {
    switch (gameNumber) {
      case 1:
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-center gap-1 text-lg flex-wrap">
              {currentGame.items.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {currentGame.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`h-16 text-2xl font-bold ${
                    selectedAnswer === option
                      ? option === currentGame.correctAnswer
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )

      case 2:
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-center gap-4 text-6xl">
              {currentGame.items.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`h-20 w-20 text-4xl ${
                    selectedAnswer === index
                      ? index === currentGame.correctAnswer
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      : "bg-white hover:bg-gray-100 text-black"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            {/* Superjuego final con animación especial */}
            <div className="bg-gradient-to-r from-purple-200 to-pink-200 p-6 rounded-xl border-4 border-purple-400">
              <div className="text-4xl font-bold text-purple-600 mb-4 animate-pulse">🎉 ¡SUPERJUEGO FINAL! 🎉</div>
              <div className="flex justify-center gap-2 text-6xl flex-wrap mb-6">
                {currentGame.items.map((item, index) => (
                  <span key={index} className="mx-1 animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                    {item === "?" ? "❓" : item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["🧙‍♂️", "✨", "💖"].map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`h-20 text-4xl font-bold transform hover:scale-105 transition-all duration-200 ${
                    selectedAnswer === index
                      ? index === currentGame.correctAnswer
                        ? "bg-green-500 hover:bg-green-600 animate-pulse"
                        : "bg-red-500 hover:bg-red-600"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full bg-white/90 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <h2
            className={`text-3xl font-bold mb-4 ${gameNumber === 5 ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse" : "text-purple-600"}`}
          >
            {currentGame.title}
          </h2>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-200">
            <div className="flex items-center gap-3 justify-center">
              <span className="text-3xl">🧙‍♂️</span>
              <span className="text-2xl">😊</span>
            </div>
            <p className="text-purple-600 font-semibold mt-2">Mate el Maguito dice:</p>
            <p className="text-gray-700 text-lg">{currentGame.instruction}</p>
          </div>

          {renderGameContent()}
        </div>
      </CardContent>
    </Card>
  )
}
