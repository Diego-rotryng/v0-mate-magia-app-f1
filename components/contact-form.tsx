"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface ContactFormProps {
  onClose: () => void
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setSending(true)

    try {
      // Simular envío de email
      const emailBody = encodeURIComponent(`Comentario desde MateMagia:\n\n${message}`)
      const emailSubject = encodeURIComponent("Comentario MateMagia App")
      const emailTo = "diego.rotryng.trad@gmail.com"

      // Abrir cliente de email
      window.location.href = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`

      setSent(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Error enviando mensaje:", error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Comentarios</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-green-600 font-semibold">¡Mensaje enviado!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Escribe tu comentario sobre MateMagia..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <Button type="submit" disabled={sending || !message.trim()} className="w-full">
                {sending ? "Enviando..." : "Enviar Comentario"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
