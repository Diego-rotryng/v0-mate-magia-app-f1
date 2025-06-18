"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, RotateCcw, MessageCircle } from "lucide-react"
import WelcomeScreen from "@/components/welcome-screen"
import LevelSelector from "@/components/level-selector"
import GameScreen from "@/components/game-screen"
import GraduationScreen from "@/components/graduation-screen"
import ContactForm from "@/components/contact-form"

export default function MateMagiaApp() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "levels" | "game" | "graduation" | "contact">(
    "welcome",
  )
  const [currentLevel, setCurrentLevel] = useState(1)
  const [currentGame, setCurrentGame] = useState(1)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [totalStars, setTotalStars] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)

  // Cargar progreso del localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("matemagia-progress")
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setCompletedLevels(progress.completedLevels || [])
      setTotalStars(progress.totalStars || 0)
    }
  }, [])

  // Guardar progreso
  const saveProgress = (newCompletedLevels: number[], newTotalStars: number) => {
    const progress = {
      completedLevels: newCompletedLevels,
      totalStars: newTotalStars,
    }
    localStorage.setItem("matemagia-progress", JSON.stringify(progress))
    setCompletedLevels(newCompletedLevels)
    setTotalStars(newTotalStars)
  }

  const startGame = () => {
    setCurrentScreen("levels")
  }

  const selectLevel = (level: number) => {
    setCurrentLevel(level)
    setCurrentGame(1)
    setCurrentScreen("game")
  }

  const completeLevel = (level: number, stars: number) => {
    const newCompletedLevels = [...completedLevels]
    if (!newCompletedLevels.includes(level)) {
      newCompletedLevels.push(level)
    }
    const newTotalStars = totalStars + stars
    saveProgress(newCompletedLevels, newTotalStars)

    if (level === 15) {
      setCurrentScreen("graduation")
    } else {
      setCurrentScreen("levels")
    }
  }

  const goHome = () => {
    setCurrentScreen("levels")
  }

  const resetProgress = () => {
    localStorage.removeItem("matemagia-progress")
    setCompletedLevels([])
    setTotalStars(0)
    setCurrentScreen("welcome")
  }

  const openContactForm = () => {
    setShowContactForm(true)
  }

  const closeContactForm = () => {
    setShowContactForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 relative overflow-hidden">
      {/* Botón secreto para adultos */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 opacity-30 hover:opacity-60"
        onClick={openContactForm}
      >
        <MessageCircle className="w-4 h-4" />
      </Button>

      {/* Botones de navegación */}
      {currentScreen !== "welcome" && currentScreen !== "contact" && (
        <div className="absolute top-4 left-4 z-40 flex gap-2">
          <Button variant="secondary" size="sm" onClick={goHome} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Inicio
          </Button>
          <Button variant="destructive" size="sm" onClick={resetProgress} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        </div>
      )}

      {/* Pantallas principales */}
      {currentScreen === "welcome" && <WelcomeScreen onStart={startGame} />}

      {currentScreen === "levels" && (
        <LevelSelector completedLevels={completedLevels} totalStars={totalStars} onSelectLevel={selectLevel} />
      )}

      {currentScreen === "game" && (
        <GameScreen
          level={currentLevel}
          game={currentGame}
          onComplete={completeLevel}
          onNextGame={(nextGame) => setCurrentGame(nextGame)}
        />
      )}

      {currentScreen === "graduation" && <GraduationScreen onRestart={() => setCurrentScreen("welcome")} />}

      {/* Formulario de contacto */}
      {showContactForm && <ContactForm onClose={closeContactForm} />}
    </div>
  )
}
