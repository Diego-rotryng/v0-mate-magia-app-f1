"use client"

import { useState } from "react"
import Level1Games from "@/components/levels/level1-games"
import Level2Games from "@/components/levels/level2-games"
import Level3Games from "@/components/levels/level3-games"
import Level4Games from "@/components/levels/level4-games"
import Level5Games from "@/components/levels/level5-games"
import Level6Games from "@/components/levels/level6-games"
import Level7Games from "@/components/levels/level7-games"
import Level8Games from "@/components/levels/level8-games"
import Level9Games from "@/components/levels/level9-games"
import Level10Games from "@/components/levels/level10-games"
import Level11Games from "@/components/levels/level11-games"
import Level12Games from "@/components/levels/level12-games"
import Level13Games from "@/components/levels/level13-games"
import Level14Games from "@/components/levels/level14-games"
import Level15Games from "@/components/levels/level15-games"

interface GameScreenProps {
  level: number
  game: number
  onComplete: (level: number, stars: number) => void
  onNextGame: (nextGame: number) => void
}

export default function GameScreen({ level, game, onComplete, onNextGame }: GameScreenProps) {
  const [gameCompleted, setGameCompleted] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleGameComplete = (isCorrect: boolean) => {
    setGameCompleted(true)

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      setShowCelebration(true)

      // Feedback positivo
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance("¡Muy bien! ¡Excelente!")
        utterance.lang = "es-ES"
        speechSynthesis.speak(utterance)
      }

      // Vibración suave de éxito
      if ("navigator" in window && "vibrate" in navigator) {
        navigator.vibrate([100, 50, 100])
      }
    } else {
      // Feedback negativo amigable
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance("¡Inténtalo de nuevo!")
        utterance.lang = "es-ES"
        speechSynthesis.speak(utterance)
      }

      // Vibración suave de error
      if ("navigator" in window && "vibrate" in navigator) {
        navigator.vibrate([200])
      }
    }

    // Continuar al siguiente juego después de 2 segundos
    setTimeout(() => {
      setShowCelebration(false)
      if (game < 5) {
        onNextGame(game + 1)
        setGameCompleted(false)
      } else {
        // Completar nivel
        const stars = Math.max(1, Math.min(3, correctAnswers))
        onComplete(level, stars)
      }
    }, 2000)
  }

  const renderGame = () => {
    const gameProps = {
      gameNumber: game,
      onComplete: handleGameComplete,
    }

    switch (level) {
      case 1:
        return <Level1Games {...gameProps} />
      case 2:
        return <Level2Games {...gameProps} />
      case 3:
        return <Level3Games {...gameProps} />
      case 4:
        return <Level4Games {...gameProps} />
      case 5:
        return <Level5Games {...gameProps} />
      case 6:
        return <Level6Games {...gameProps} />
      case 7:
        return <Level7Games {...gameProps} />
      case 8:
        return <Level8Games {...gameProps} />
      case 9:
        return <Level9Games {...gameProps} />
      case 10:
        return <Level10Games {...gameProps} />
      case 11:
        return <Level11Games {...gameProps} />
      case 12:
        return <Level12Games {...gameProps} />
      case 13:
        return <Level13Games {...gameProps} />
      case 14:
        return <Level14Games {...gameProps} />
      case 15:
        return <Level15Games {...gameProps} />
      default:
        return <div>Nivel no encontrado</div>
    }
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Indicador de progreso */}
        <div className="text-center mb-6">
          <div className="text-white text-lg font-semibold mb-2">
            Nivel {level} - Juego {game} de 5
          </div>
          <div className="flex justify-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full ${i < game ? "bg-yellow-400" : "bg-white/30"}`} />
            ))}
          </div>
        </div>

        {/* Juego actual */}
        <div className="relative">
          {renderGame()}

          {/* Celebración */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div className="text-center text-white">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <div className="text-2xl font-bold">¡Excelente!</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
