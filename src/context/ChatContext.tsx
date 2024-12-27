"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from "react"
import { Message } from "ai/react"
import toast from "react-hot-toast"

// Definir los tipos
type ChatContextType = {
  submitExternalMessage: (text: string) => Promise<void>
  cancelRequest: () => void
  isSubmitting: boolean
  error: string | null
  isLoading: boolean
  messages: Message[]
}

/**
 * Contexto para manejar el estado y la lógica del chat en la aplicación.
 * @type {React.Context<ChatContextType | undefined>}
 * @remarks Este contexto se crea con un valor inicial undefined y espera un tipo ChatContextType
 * @see ChatContextType
 */
const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({
  children,
  chatId,
}: {
  children: ReactNode
  chatId: number
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  // Función para obtener mensajes iniciales
  const fetchMessages = useCallback(async () => {
    try {
      console.log(`Fetching messages for chatId: ${chatId}`)
      const response = await fetch(`/api/messages?chatId=${chatId}`)
      if (!response.ok) throw new Error("Error al obtener mensajes")
      const data: Message[] = await response.json()
      console.log("Messages fetched:", data)
      setMessages(data)
      setIsLoading(false) // Mensajes cargados
    } catch (error) {
      console.error("Error al obtener mensajes:", error)
      toast.error(
        "No se pudieron cargar los mensajes. Por favor, intentalo de nuevo.",
      )
      setIsLoading(false) // Terminar carga incluso en error
    }
  }, [chatId])

  // Función para enviar mensajes
  const submitExternalMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        console.error("El mensaje no puede estar vacío.")
        toast.error("El mensaje no puede estar vacío.")
        return
      }

      try {
        setIsSubmitting(true)
        setError(null)

        // Crear un AbortController para esta solicitud
        const controller = new AbortController()
        setAbortController(controller)

        const userMessage: Message = {
          id: Date.now().toString(),
          role: "user",
          content: text,
        }

        // Añadir el mensaje del usuario al estado
        setMessages((prev) => [...prev, userMessage])

        // Llamada a la API para enviar el mensaje con el signal
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            chatId,
          }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al enviar el mensaje")
        }

        // Manejo de la respuesta en streaming
        const reader = response.body?.getReader()
        if (!reader) throw new Error("No se pudo obtener la respuesta")

        let assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
        }

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split("\n").filter((line) => line.trim())

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6) // Eliminar "data: "
              if (data === "[DONE]") continue

              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  assistantMessage.content += parsed.content
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessage.id ? assistantMessage : msg,
                    ),
                  )
                }
              } catch (e) {
                console.error("Error al pasar el fragmento:", e)
              }
            }
          }
        }

        // Añadir el mensaje del asistente si tiene contenido
        if (assistantMessage.content) {
          setMessages((prev) => [...prev, assistantMessage])
        }

        // Actualizar mensajes desde el servidor
        await fetchMessages()
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Solicitud abortada")
          toast.error("La solicitud fue cancelada.")
        } else {
          console.error("Error al enviar el mensaje:", error)
          toast.error(
            "Error al enviar el mensaje. Por favor, intenta nuevamente.",
          )
        }
      } finally {
        setIsSubmitting(false)
        setAbortController(null)
      }
    },
    [messages, chatId, fetchMessages],
  )

  // Función para cancelar la solicitud actual
  const cancelRequest = useCallback(() => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
      setIsSubmitting(false)
      toast.error("Solicitud cancelada por el usuario.")
    }
  }, [abortController])

  // Obtener mensajes al montar el componente
  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  return (
    <ChatContext.Provider
      value={{
        submitExternalMessage,
        cancelRequest,
        isSubmitting,
        error,
        isLoading,
        messages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

/**
 * Hook personalizado para acceder al ChatContext.
 * @returns El valor del ChatContext.
 * @throws {Error} Si se usa fuera de un componente ChatProvider.
 */

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChatContext debe ser usado dentro de ChatProvider")
  }
  return context
}
