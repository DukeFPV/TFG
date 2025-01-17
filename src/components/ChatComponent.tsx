//**Revisado */
"use client"

import React, { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Send, CircleStop } from "lucide-react" // Importar CircleStop
import MessageList from "./MessageList"
import LoadingBubble from "./LoadingBubble"
import { useChatContext } from "@/context/ChatContext"
import toast from "react-hot-toast" // Asegúrate de importar toast

type Props = { chatId: number }

/**
 * Componente de chat que muestra mensajes y maneja la entrada del usuario (inputs).
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.chatId - Identificador único para la instancia del chat
 *
 * @remarks
 * Este componente proporciona:
 * - Visualización de mensajes con desplazamiento automático
 * - Manejo de entrada para nuevos mensajes
 * - Estados de carga y manejo de errores
 * - Funcionalidad de envío de mensajes
 * - Capacidad de cancelación de solicitudes
 *
 * El componente utiliza varios hooks y contexto:
 * - useState para gestión de entrada
 * - useEffect para desplazamiento automático
 * - useChatContext para funcionalidad del chat
 *
 * Características:
 * - Desplazamiento automático al último mensaje
 * - Muestra estados de carga
 * - Muestra mensajes de error
 * - Evita el envío de mensajes vacíos
 * - Permite cancelar solicitudes pendientes
 */

const ChatComponent = ({ chatId }: Props) => {
  const [input, setInput] = useState("") // Estado para el campo de entrada

  const {
    isSubmitting,
    error,
    isLoading,
    messages,
    submitExternalMessage,
    cancelRequest,
  } = useChatContext()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
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

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden w-full transition-all duration-300">
      {/* Contenedor de mensajes */}
      <div id="message-container" className="flex-1 overflow-y-auto px-4">
        {isLoading ? (
          <LoadingBubble />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <MessageList messages={messages ?? []} />
        )}
      </div>

      {/* Formulario de entrada de mensajes */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Pregunta lo que necesites..."
              className="w-full p-4 pr-24 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
              disabled={isSubmitting} // Deshabilitar el input mientras espera respuesta
            />
            <Button
              type="submit"
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
          </div>
        </form>
        {isSubmitting && <LoadingBubble />} {/* Indicador de envío */}
      </div>
    </div>
  )
}

export default ChatComponent
