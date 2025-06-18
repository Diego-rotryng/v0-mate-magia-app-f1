"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface GraduationScreenProps {
  onRestart: () => void
}

export default function GraduationScreen({ onRestart }: GraduationScreenProps) {
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
      speak("¡Felicitaciones! Te has graduado de MateMagia. Eres un verdadero mago de las matemáticas.")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Diploma */}
          <div className="text-8xl animate-pulse">🎓</div>

          <div>
            <h1 className="text-3xl font-bold text-purple-600 mb-2">¡Felicitaciones!</h1>
            <h2 className="text-xl text-gray-700 mb-4">Graduado de MateMagia</h2>
          </div>

          {/* Mensaje de graduación */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-2 border-yellow-300">
            <p className="text-lg text-orange-700 font-bold mb-2">🌟 ¡Eres un Mago de las Matemáticas! 🌟</p>
            <p className="text-sm text-gray-600">Has completado todos los niveles con éxito</p>
          </div>

          {/* Dedicatoria */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
            <p className="text-sm text-purple-700 font-medium italic">Creado por Diego Rotryng</p>
            <p className="text-lg text-pink-600 font-bold mt-1">💖 Dedicado a Mica 💖</p>
          </div>

          {/* Estadísticas finales */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-xs text-gray-600">Niveles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">75</div>
              <div className="text-xs text-gray-600">Juegos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">⭐</div>
              <div className="text-xs text-gray-600">Graduado</div>
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
          >
            🎮 ¡Jugar de Nuevo!
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
