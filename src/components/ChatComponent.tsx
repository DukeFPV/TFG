//**Revisado */
/**
 * Un componente de chat que proporciona una interfaz de mensajería con capacidades de texto y audio.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.chatId - Identificador único para la instancia del chat
 *
 * @remarks
 * Características:
 * - Campo de entrada de texto con textarea autoexpandible
 * - Visualización del historial de mensajes con auto-scroll
 * - Controles de audio para Text-to-Speech (TTS)
 * - Estados de carga y manejo de errores
 * - Envío y cancelación de mensajes
 *
 * Estados:
 * - input: Gestiona el valor del texto de entrada
 * - lineCount: Rastrea el número de líneas en el textarea
 *
 * Utiliza el contexto de useChatContext para:
 * - Gestión de mensajes
 * - Control de audio
 * - Estados de carga
 * - Manejo de errores
 *
 * @example
 * ```tsx
 * <ChatComponent chatId="chat-123" />
 * ```
 */

"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Send, CircleStop, Mic, MicOff, Square } from "lucide-react"
import MessageList from "./MessageList"
import LoadingBubble from "./LoadingBubble"
import { useChatContext } from "@/context/ChatContext"
import toast from "react-hot-toast"
import TextareaAutosize from "react-textarea-autosize"
import { cn } from "@/lib/utils"

type Props = { chatId: number }

const ChatComponent = ({ chatId }: Props) => {
  const [input, setInput] = useState("") // Estado para el campo de entrada
  const [lineCount, setLineCount] = useState(1) // Estado para contar las líneas
  const textareaRef = useRef<HTMLTextAreaElement>(null) // Referencia al TextareaAutosize

  const {
    isSubmitting,
    error,
    isLoading,
    messages,
    submitExternalMessage,
    cancelRequest,
    audioPlay,
    isAudioPlaying,
    startConversation,
    endConversation,
    stopAudio,
  } = useChatContext()

  // Manejar cambios en el campo de entrada TextAreaAutosize
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  /**
   * Maneja los cambios en la altura del textarea y actualiza el conteo de líneas en consecuencia.
   * @param height - La altura actual del textarea en píxeles
   * @returns void
   *
   * @remarks
   * Esta función calcula el número de líneas en el textarea basándose en su altura
   * y el estilo computado de line-height. Si no se encuentra line-height, usa 24px por defecto.
   * El conteo de líneas se actualiza a través de un setter de estado y no será menor que 1.
   *
   * Se llama cada vez que el <TextareaAutosize> {onHeightChange} cambia de altura.
   * 'height' es la altura total del textarea en px.
   * @autor https://github.com/Andarist/react-textarea-autosize
   */
  const handleHeightChange = (height: number) => {
    if (!textareaRef.current) return

    // Leer la line-height real desde estilos o usar un valor por defecto
    const style = window.getComputedStyle(textareaRef.current)
    const lineHeight = parseFloat(style.lineHeight) || 24

    // Se ajustan las líneas basadas en la altura del textarea
    const lines = Math.round(height / lineHeight)
    // Actualizar el estado de las líneas
    setLineCount(lines <= 0 ? 1 : lines)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const message = input.trim()

    if (!message) {
      toast.error(
        "Error el mensaje no puede estar vacio. Por favor, intenta nuevamente.",
      )
      return
    }

    setInput("") // Limpiar el campo de entrada inmediatamente
    setLineCount(1) // Restablecer el conteo de líneas

    try {
      await submitExternalMessage(message)
    } catch (err) {
      console.error("Error al enviar el mensaje:", err)
      toast.error("Error al enviar el mensaje. Por favor, intenta nuevamente.")
    }
  }

  // Auto-scroll al último mensaje en el contenedor de mensajes.
  useEffect(() => {
    const messageContainer = document.getElementById("message-container")
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  /**
   * Lógica para el botón de audio:
   * - if !audioPlay => mostrar micrófono (activar TTS)
   * - if audioPlay && !isAudioPlaying => conectado en espera, click => endConversation() desactiva TTS
   * - if audioPlay && isAudioPlaying => hablando, click => stopAudio()
   */
  // 1. Determinar el ícono
  const getTTSIcon = () => {
    if (!audioPlay) return <Mic className="w-4 h-4" />
    if (audioPlay && !isAudioPlaying) return <MicOff className="w-4 h-4" />
    // Si audioPlay && isAudioPlaying true
    return <Square className="w-4 h-4" />
  }

  // 2. Controlar la acción del botón
  const handleTTSControl = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!audioPlay) {
      // No activado -> iniciar conversación
      await startConversation()
    } else if (audioPlay && !isAudioPlaying) {
      // Activo en espera -> finalizar
      await endConversation()
    } else {
      // Activo y hablando -> detener
      await stopAudio()
    }
  }

  return (
    <div
      className="flex flex-col h-full max-h-screen overflow-hidden w-full transition-all duration-300"
      role="main"
      aria-label="Chat con Sara"
    >
      {/* Contenedor de mensajes */}
      <div
        id="message-container"
        className="flex-1 overflow-y-auto px-4"
        role="log"
        aria-live="polite"
        aria-label="Historial de mensajes"
      >
        {isLoading ? (
          <div role="status" aria-label="Cargando mensajes">
            <LoadingBubble />
          </div>
        ) : error ? (
          <div className="text-red-500" role="alert" aria-live="assertive">
            {error}
          </div>
        ) : (
          <MessageList messages={messages ?? []} />
        )}
      </div>

      {/* Formulario de entrada de mensajes */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <TextareaAutosize
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onHeightChange={handleHeightChange}
              ref={textareaRef}
              minRows={1}
              maxRows={4}
              placeholder="Escribe tu mensaje aquí"
              aria-label="Campo de mensaje"
              aria-required="true"
              aria-invalid={input.trim().length === 0}
              className={cn(
                "w-full p-2 px-3 ps-5 border border-gray-300 focus:outline-none focus:border-purple-500 resize-none max-h-32 transition-all duration-200",
                {
                  "rounded-full": lineCount < 3,
                  "rounded-md pb-5 ps-7": lineCount >= 3,
                },
              )}
            />
            <Button
              type="submit"
              aria-label={isSubmitting ? "Cancelar envío" : "Enviar mensaje"}
              className={`ml-2 ${
                isSubmitting ? "bg-red-600" : "bg-purple-600"
              }`}
              onClick={isSubmitting ? cancelRequest : undefined} // Asignar función de cancelación
              disabled={isSubmitting} // Deshabilitar mientras se está enviando
            >
              {isSubmitting ? (
                <CircleStop className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}{" "}
              {/* Cambiar ícono */}
            </Button>
            {/* Botón para controlar audio TTS */}
            <Button
              type="button"
              onClick={handleTTSControl}
              aria-label={
                !audioPlay
                  ? "Activar lectura por voz"
                  : audioPlay && !isAudioPlaying
                    ? "Desactivar lectura por voz"
                    : "Detener lectura actual"
              }
              className={cn(
                "sm:hidden ml-2 text-white rounded-full transition-colors",
                {
                  // Estado 1: desconectado
                  "bg-purple-600 hover:bg-purple-700": !audioPlay,
                  // Estado 2: conectado en espera
                  "bg-green-600 hover:bg-green-700":
                    audioPlay && !isAudioPlaying,
                  // Estado 3: hablando
                  "bg-pink-500 hover:bg-pink-600": audioPlay && isAudioPlaying,
                },
              )}
            >
              {getTTSIcon()}
            </Button>
          </div>
        </form>
        {/* Indicador de envío */}
        {isSubmitting && (
          <div role="status" aria-live="polite" className="mt-2">
            <LoadingBubble />
            <span className="sr-only">Enviando mensaje...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatComponent
