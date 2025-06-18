"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  useEffect(() => {
    // Audio de bienvenida
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
      speak("¡Hola pequeño mago! Soy Mate y te voy a enseñar matemáticas con magia. ¿Estás listo para la aventura?")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleStart = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
    onStart()
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Personaje Mate el Maguito */}
          <div className="text-8xl animate-bounce">🧙‍♂️</div>

          {/* Título */}
          <div>
            <h1 className="text-4xl font-bold text-purple-600 mb-2">MateMagia</h1>
            <p className="text-lg text-gray-600 mb-4">¡Aprende matemáticas con magia!</p>
          </div>

          {/* Dedicatoria destacada */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
            <p className="text-sm text-purple-700 font-medium italic">
              Creado por Diego Rotryng para que aprender sea jugar ✨
            </p>
            <p className="text-lg text-pink-600 font-bold mt-2">💖 Dedicado a Mica 💖</p>
          </div>

          {/* Botón principal */}
          <Button
            onClick={handleStart}
            className="w-full py-6 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            ▶️ ¡Comenzar Aventura!
          </Button>

          {/* Características */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <span>🧒</span>
              <span>Para niños de 5 a 7 años</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🎯</span>
              <span>15 niveles de diversión</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🌟</span>
              <span>Sin necesidad de saber leer</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
