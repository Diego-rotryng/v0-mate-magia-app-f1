"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface LevelSelectorProps {
  completedLevels: number[]
  totalStars: number
  onSelectLevel: (level: number) => void
}

const levelThemes = [
  { name: "Granja", emoji: "🐄", color: "from-green-400 to-emerald-500" },
  { name: "Bosque", emoji: "🌳", color: "from-emerald-400 to-green-600" },
  { name: "Océano", emoji: "🐠", color: "from-blue-400 to-cyan-500" },
  { name: "Montaña", emoji: "⛰️", color: "from-gray-400 to-slate-600" },
  { name: "Desierto", emoji: "🐪", color: "from-yellow-400 to-orange-500" },
  { name: "Ciudad", emoji: "🏙️", color: "from-indigo-400 to-purple-500" },
  { name: "Playa", emoji: "🏖️", color: "from-cyan-400 to-blue-500" },
  { name: "Selva", emoji: "🦜", color: "from-green-500 to-emerald-600" },
  { name: "Polo", emoji: "🐧", color: "from-blue-300 to-cyan-400" },
  { name: "Volcán", emoji: "🌋", color: "from-red-400 to-orange-600" },
  { name: "Espacio", emoji: "🚀", color: "from-purple-500 to-indigo-600" },
  { name: "Pirámide", emoji: "🏺", color: "from-yellow-500 to-amber-600" },
  { name: "Castillo", emoji: "🏰", color: "from-purple-400 to-pink-500" },
  { name: "Laboratorio", emoji: "🧪", color: "from-teal-400 to-cyan-500" },
  { name: "Reino Mágico", emoji: "✨", color: "from-pink-400 to-purple-600" },
]

export default function LevelSelector({ completedLevels, totalStars, onSelectLevel }: LevelSelectorProps) {
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
      speak("¡Elige tu aventura! Toca el nivel que quieras jugar.")
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleLevelClick = (level: number) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }

    // Solo permitir jugar niveles desbloqueados
    if (level === 1 || completedLevels.includes(level - 1)) {
      onSelectLevel(level)
    }
  }

  const isLevelUnlocked = (level: number) => {
    return level === 1 || completedLevels.includes(level - 1)
  }

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Título y progreso */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">¡Elige tu aventura!</h1>
          <div className="flex items-center justify-center gap-2 text-white/90">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-semibold">{totalStars} estrellas conseguidas</span>
          </div>
        </div>

        {/* Grid de niveles */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 15 }, (_, i) => {
            const level = i + 1
            const theme = levelThemes[i]
            const isCompleted = completedLevels.includes(level)
            const isUnlocked = isLevelUnlocked(level)

            return (
              <Card
                key={level}
                className={`cursor-pointer transform transition-all duration-200 ${
                  isUnlocked ? "hover:scale-105 hover:shadow-xl" : "opacity-50 cursor-not-allowed"
                } ${isCompleted ? "ring-4 ring-yellow-400" : ""}`}
                onClick={() => handleLevelClick(level)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl">{theme.emoji}</div>
                  <div className="text-2xl font-bold">{level}</div>
                  <div className="text-sm font-medium text-gray-600">{theme.name}</div>

                  {isCompleted && (
                    <div className="flex justify-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-yellow-400">⭐</span>
                    </div>
                  )}

                  {isCompleted && <div className="text-xs text-green-600 font-semibold">¡Completado!</div>}

                  {!isUnlocked && <div className="text-xs text-gray-500">🔒 Bloqueado</div>}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
