"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Level4GamesProps {
  gameNumber: number
  onComplete: (isCorrect: boolean) => void
}

export default function Level4Games({ gameNumber, onComplete }: Level4GamesProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const games = [
    {
      title: "¡Montañas Altas!",
      instruction: "¿Cuántas montañas puedes contar?",
      items: ["⛰️", "⛰️", "⛰️", "⛰️", "⛰️", "⛰️", "⛰️", "⛰️"],
      correctAnswer: 8,
      options: [7, 8, 9],
    },
    {
      title: "Animales de Montaña",
      instruction: "¡Encuentra el animal que no vive en las montañas!",
      items: ["🐐", "🦅", "🐧", "🐻"],
      correctAnswer: 2,
      options: [0, 1, 2, 3],
    },
    {
      title: "Rocas Especiales",
      instruction: "¡Toca la roca diferente!",
      items: ["🪨", "🪨", "💎", "🪨"],
      correctAnswer: 2,
      options: [0, 1, 2, 3],
    },
    {
      title: "Suma de Águilas",
      instruction: "¿Cuántas águilas vuelan por las montañas?",
      items: ["🦅", "🦅", "🦅", "🦅", "🦅", "🦅", "🦅", "🦅", "🦅"],
      correctAnswer: 9,
      options: [8, 9, 10],
    },
    {
      title: "Sendero de Montaña",
      instruction: "¿Qué sigue en el camino?",
      items: ["⛰️", "🐐", "⛰️", "🐐", "⛰️", "?"],
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
      speak(`Mate el Maguito dice: ${currentGame.instruction}`)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentGame.instruction])

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
            <div className="flex justify-center gap-2 text-4xl flex-wrap">
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
                      : "bg-gray-500 hover:bg-gray-600"
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
            <div className="flex justify-center gap-2 text-5xl flex-wrap">
              {currentGame.items.map((item, index) => (
                <span key={index} className="mx-1">
                  {item === "?" ? "❓" : item}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["⛰️", "🐐", "🦅"].map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`h-16 text-3xl ${
                    selectedAnswer === index
                      ? index === currentGame.correctAnswer
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      : "bg-gray-500 hover:bg-gray-600"
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
          <h2 className="text-3xl font-bold text-gray-600 mb-4">{currentGame.title}</h2>

          <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-200">
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
