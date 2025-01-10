// src/context/ChatContext.tsx

"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from "react"
import { CustomMessage } from "@/types/location"
import toast from "react-hot-toast"
import { useClerkUserData } from "@/components/hooks/useClerkUser"
import stepsSergas from "@/data/stepMedicoSergas"
import { set } from "zod"

// Definir el tipo para el perfil del usuario
type UserProfile = {
  clerkUserId: string
  currentStep: number
  // Agrega otros campos del perfil si es necesario
}

type ChatContextType = {
  submitExternalMessage: (text: string) => Promise<void>
  cancelRequest: () => void
  isSubmitting: boolean
  error: string | null
  isLoading: boolean
  messages: CustomMessage[]
  addMessage: (msg: CustomMessage) => void
  advanceStep: () => Promise<void>
  goBackStep: () => Promise<void>
  exitStepByStep: () => void
  isAtFirstStep: boolean
  currentStep: number
}

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
  const [messages, setMessages] = useState<CustomMessage[]>([])
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)
  const [isAtFirstStep, setIsAtFirstStep] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)

  // Obtener los datos del usuario
  const { user, isLoaded, isSignedIn } = useClerkUserData()
  const userId = isLoaded && isSignedIn ? user?.id : null

  // Función para agregar mensajes
  const addMessage = useCallback(
    (msg: CustomMessage) => {
      setMessages((prev) => [...prev, msg])
    },
    [setMessages],
  )

  // Función para obtener mensajes iniciales y el perfil del usuario
  const fetchMessagesAndProfile = useCallback(async () => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    try {
      console.log(`Fetching messages for chatId: ${chatId}`)
      const messagesResponse = await fetch(`/api/messages?chatId=${chatId}`)
      if (!messagesResponse.ok) throw new Error("Error al obtener mensajes")
      const messagesData = await messagesResponse.json()

      // Asegurarse de que 'messagesData.messages' es un array
      if (Array.isArray(messagesData.messages)) {
        // Mapear los mensajes para que coincidan con CustomMessage
        const formattedMessages: CustomMessage[] = messagesData.messages.map(
          (msg: {
            id: number | string
            role: string
            content: string
            image: string | null
            buttons?: any[]
          }) => ({
            id: msg.id.toString(), // Convertir id a string si es necesario
            role: msg.role,
            content: msg.content,
            image: msg.image,
            buttons: msg.buttons || undefined, // Añadir buttons si existen
          }),
        )
        setMessages(formattedMessages)
      } else {
        setMessages([])
      }

      // Obtener el perfil del usuario
      const profileResponse = await fetch(`/api/get-profile`)
      if (!profileResponse.ok)
        throw new Error("Error al obtener el perfil del usuario")
      const profileData = await profileResponse.json()
      const userProfile: UserProfile = profileData.user

      // Determinar si estamos en el primer paso
      setCurrentStep(userProfile.currentStep)
      setIsAtFirstStep(userProfile.currentStep <= 1)

      setIsLoading(false) // Mensajes y perfil cargados
    } catch (error) {
      console.error("Error al obtener mensajes o perfil:", error)
      toast.error(
        "No se pudieron cargar los mensajes o el perfil. Por favor, inténtalo de nuevo.",
      )
      setIsLoading(false) // Terminar carga incluso en error
    }
  }, [chatId, userId])

  // Función para avanzar al siguiente paso
  const advanceStep = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("Usuario no identificado.")
        return
      }

      console.log("Llamando a /api/advance-step con chatId:", chatId)

      const response = await fetch("/api/advance-step", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
        }),
      })

      console.log("Respuesta de /api/advance-step:", response)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error en /api/advance-step:", errorData)
        throw new Error(errorData.error || "Error al avanzar el paso")
      }

      const data = await response.json()
      console.log("Datos recibidos de /api/advance-step:", data)
      toast.success(data.message)

      setIsAtFirstStep(data.currentStep <= 1)

      // Agregar el nuevo mensaje del asistente con botones
      if (data.step) {
        const { text, image, buttons } = data.step
        const newMessage: CustomMessage = {
          id: Date.now().toString(),
          role: "assistant",
          content: text,
          image: image || null,
          buttons: buttons || [],
        }
        addMessage(newMessage)
      }

      if (data.finalMessage) {
        const { content, image, buttons } = data.finalMessage
        const finalMessage: CustomMessage = {
          id: Date.now().toString(),
          role: "assistant",
          content,
          image: image || null,
          buttons: buttons || [],
        }
        addMessage(finalMessage)
      }
    } catch (error: any) {
      console.error("Error al avanzar al siguiente paso:", error)
      toast.error("Ocurrió un error al avanzar al siguiente paso.")
    }
  }, [chatId, addMessage, userId])

  // Función para retroceder al paso anterior
  const goBackStep = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("Usuario no identificado.")
        return
      }

      console.log(
        "Llamando a /api/advance-step para retroceder con chatId:",
        chatId,
      )

      const response = await fetch("/api/advance-step", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          action: "back",
        }),
      })

      console.log("Respuesta de /api/advance-step (retroceso):", response)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error en /api/advance-step (retroceso):", errorData)
        throw new Error(errorData.error || "Error al retroceder el paso")
      }

      const data = await response.json()
      console.log("Datos recibidos de /api/advance-step (retroceso):", data)
      toast.success(data.message)

      setIsAtFirstStep(data.currentStep <= 1)
      setCurrentStep(data.currentStep)

      // Agregar el nuevo mensaje del asistente con botones
      if (data.step) {
        const { text, image, buttons } = data.step
        const newMessage: CustomMessage = {
          id: Date.now().toString(),
          role: "assistant",
          content: text,
          image: image || null,
          buttons: buttons || [],
        }
        addMessage(newMessage)
      }
    } catch (error: any) {
      console.error("Error al retroceder al paso anterior:", error)
      toast.error("Ocurrió un error al retroceder al paso anterior.")
    }
  }, [chatId, addMessage, userId])

  // Función para salir del modo paso a paso
  const exitStepByStep = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("Usuario no identificado.")
        return
      }

      // Obtener el paso actual
      const paso = currentStep

      // Crear el mensaje de salida
      const exitMessage: CustomMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Has salido de la guia paso a paso, te has quedado en el paso ${paso}. Si quieres continuar desde donde lo dejaste vuelve a pulsar en el botón **Salud Digital**.`,
        image: null, // No imagen
        buttons: [], // Sin botones
      }

      // Añadir el mensaje al chat
      addMessage(exitMessage)

      toast.success("Has salido del modo de guía paso a paso.")

      // Opcional: Puedes actualizar el estado si es necesario
      // Por ejemplo, podrías establecer un estado para indicar que no estás en la guía
      // setIsAtStepByStep(false)
    } catch (error: any) {
      console.error("Error al salir de la guía paso a paso:", error)
      toast.error("Ocurrió un error al salir de la guía paso a paso.")
    }
  }, [currentStep, addMessage, userId])

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

        const userMessage: CustomMessage = {
          id: Date.now().toString(),
          role: "user",
          content: text,
          image: null, // Asegúrate de que 'image' es parte de CustomMessage
        }

        // Añadir el mensaje del usuario al estado
        addMessage(userMessage)

        // Verificar si el mensaje es una solicitud de guía paso a paso
        const stepByStepKeywords = [
          "paso a paso",
          "cómo puedo",
          "como puedo",
          "cómo puedo",
        ]
        const isStepByStepRequest = stepByStepKeywords.some((keyword) =>
          text.toLowerCase().includes(keyword),
        )

        if (isStepByStepRequest) {
          console.log("Detectado comando para iniciar guía paso a paso.")
          await advanceStep()
          return // Detener el flujo
        }

        console.log("Enviando mensaje a /api/chat:", userMessage)

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

        console.log("Respuesta de /api/chat:", response)

        if (!response.ok) {
          const errorData = await response.json()
          console.error("Error en /api/chat:", errorData)
          throw new Error(errorData.error || "Error al enviar el mensaje")
        }

        // Manejo de la respuesta en streaming
        const reader = response.body?.getReader()
        if (!reader) throw new Error("No se pudo obtener la respuesta")

        let assistantMessage: CustomMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          image: null,
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
                  addMessage({
                    ...assistantMessage,
                    content: assistantMessage.content,
                  })
                }
              } catch (e) {
                console.error("Error al convertir el fragmento:", e)
              }
            }
          }
        }

        // Añadir el mensaje del asistente si tiene contenido
        if (assistantMessage.content) {
          addMessage(assistantMessage)
        }

        // Actualizar mensajes desde el servidor
        await fetchMessagesAndProfile()
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
    [
      messages,
      chatId,
      fetchMessagesAndProfile,
      addMessage,
      advanceStep,
      // goBackStep,
      // exitStepByStep,
    ],
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

  // Obtener mensajes y perfil al montar el componente
  useEffect(() => {
    fetchMessagesAndProfile()
  }, [fetchMessagesAndProfile])

  return (
    <ChatContext.Provider
      value={{
        submitExternalMessage,
        cancelRequest,
        isSubmitting,
        error,
        isLoading,
        messages,
        addMessage,
        advanceStep,
        goBackStep,
        exitStepByStep,
        isAtFirstStep,
        currentStep,
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
