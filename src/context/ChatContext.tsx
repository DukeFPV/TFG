"use client"

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react"
import { CustomMessage } from "@/types/interfaceTypes"
import toast from "react-hot-toast"
import { useClerkUserData } from "@/components/hooks/useClerkUser"
import { parseMarkdownIntoBlocks } from "@/lib/utils/markdownUtils" // Importar la función para dar formato a Markdown
import { v4 as uuidv4 } from "uuid"

// Definir el type para el perfil del usuario
type UserProfile = {
  clerkUserId: string
  currentStep: number
}

//Se exportan todas las funciones que se necesitan utilizan en otros componentes
type ChatContextType = {
  submitExternalMessage: (
    text: string,
    shouldAdvanceStep?: boolean,
  ) => Promise<string | undefined>
  cancelRequest: () => void
  isSubmitting: boolean
  audioPlay: boolean
  error: string | null
  isLoading: boolean
  messages: CustomMessage[]
  addMessage: (msg: CustomMessage) => void
  advanceStep: () => Promise<void>
  goBackStep: () => Promise<void>
  exitStepByStep: () => void
  isAtFirstStep: boolean
  currentStep: number
  handleSTText: (text: string) => void
  isStepByStep: boolean
  reiniciarStep: () => Promise<void>
  startConversation: () => Promise<void>
  endConversation: () => Promise<void>
  isAudioPlaying: boolean
  playAudio: (url: string) => void
  pauseAudio: () => void
  stopAudio: () => void
}

// Se crea el contexto
const ChatContext = createContext<ChatContextType | undefined>(undefined)

interface ChatProviderProps {
  children: ReactNode
  chatId: number
}

export const ChatProvider = ({ children, chatId }: ChatProviderProps) => {
  // Estados para manejar la carga y envío de mensajes
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<CustomMessage[]>([])
  const [abortController, setAbortController] =
    useState<AbortController | null>(null)

  // Estados para el modo paso a paso
  const [isStepByStep, setIsStepByStep] = useState(false)
  const [isAtFirstStep, setIsAtFirstStep] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(1)

  // Estado para controlar el audio
  const [audioPlay, setAudioPlay] = useState(false)
  const [isProcessingChunk, setIsProcessingChunk] = useState(false)
  const CHUNK_SIZE = 100 // characters intentando bajar la latencia
  const [audioQueue, setAudioQueue] = useState<string[]>([])

  // Obtener datos de Clerk
  const { user, isLoaded, isSignedIn } = useClerkUserData()
  const userId = isLoaded && isSignedIn ? user?.id : null

  // Mantén la referencia al objeto Audio
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // --- Funciones para controlar el audio ---
  const playAudio = useCallback((url: string) => {
    // Si ya hay un audio reproduciéndose, lo paramos
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }

    audioRef.current = new Audio(url)

    // Registramos eventos si quieres controlar el estado
    audioRef.current.addEventListener("play", () => setIsAudioPlaying(true))
    audioRef.current.addEventListener("pause", () => setIsAudioPlaying(false))
    audioRef.current.addEventListener("ended", () => setIsAudioPlaying(false))

    // Reproducir
    audioRef.current.play().catch((err) => {
      console.error("Autoplay bloqueado:", err)
    })
  }, [])
  // --- Pausar el audio ---
  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return
    if (!audioRef.current.paused) {
      // Está reproduciendo, lo pausamos
      audioRef.current.pause()
      setIsAudioPlaying(false)
    } else {
      // Estaba en pausa, reanudamos
      audioRef.current.play().catch((err) => console.error(err))
      setIsAudioPlaying(true)
    }
  }, [])
  // --- Detener el audio --- Snipet de: https://codetogo.io/how-to-stop-video-in-javascript/
  const stopAudio = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setIsAudioPlaying(false)
  }, [])

  // --- Función para manejar TTS ---
  const handleTTS = useCallback(
    async (message: string): Promise<string | null> => {
      // Validar mensaje
      if (!message || message.trim() === "") {
        console.error("Mensaje vacío recibido en handleTTS")
        return null
      }

      try {
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message.trim(),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error("Error de la API de TTS:", errorData)
          throw new Error(
            `Fallo al generar el habla: ${errorData.error || response.statusText}`,
          )
        }
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        return audioUrl
      } catch (error) {
        console.error("Error generando TTS:", error)
        return null
      }
    },
    [],
  )

  // Procesar TTS en streaming para bajar la latencia en mensajes largos
  const processStreamingTTS = useCallback(
    async (textChunk: string) => {
      if (!audioPlay || isProcessingChunk || textChunk.length < CHUNK_SIZE)
        return

      setIsProcessingChunk(true)
      try {
        const audioUrl = await handleTTS(textChunk)
        if (audioUrl) {
          setAudioQueue((prev) => [...prev, audioUrl])
        }
      } finally {
        setIsProcessingChunk(false)
      }
    },
    [audioPlay, isProcessingChunk, CHUNK_SIZE, handleTTS],
  )

  // Función para agregar mensajes al estado
  const addMessage = useCallback((msg: CustomMessage) => {
    setMessages((prev) => [...prev, msg])
  }, [])

  // Obtener mensajes iniciales y el perfil del usuario
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

      if (Array.isArray(messagesData.messages)) {
        const formattedMessages: CustomMessage[] = messagesData.messages.map(
          (msg: {
            id: number | string
            role: string
            content: string
            image: string | null
            buttons?: any[]
          }) => ({
            id: msg.id.toString(),
            role: msg.role,
            content: msg.content,
            image: msg.image,
            buttons: msg.buttons || undefined,
            markdownBlocks: parseMarkdownIntoBlocks(msg.content),
          }),
        )
        setMessages(formattedMessages)
      } else {
        setMessages([])
      }

      // Obtener el perfil
      const profileResponse = await fetch(`/api/get-profile`)
      if (!profileResponse.ok)
        throw new Error("Error al obtener el perfil del usuario")
      const profileData = await profileResponse.json()
      const userProfile: UserProfile = profileData.user

      // Ajustar estado con info del perfil
      setIsAtFirstStep(userProfile.currentStep <= 1)
      setCurrentStep(userProfile.currentStep)

      setIsLoading(false)
    } catch (error) {
      console.error("Error al obtener mensajes o perfil:", error)
      toast.error(
        "No se pudieron cargar los mensajes o el perfil. Por favor, inténtalo de nuevo.",
      )
      setIsLoading(false)
    }
  }, [chatId, userId])

  useEffect(() => {
    fetchMessagesAndProfile()
  }, [fetchMessagesAndProfile])

  // --- Funciones Step By Step (advance, back, exit) ---
  const advanceStep = useCallback(async () => {
    setIsStepByStep(true)
    try {
      if (!userId) {
        toast.error("Usuario no identificado.")
        return
      }

      console.log("Llamando a /api/advance-step con chatId:", chatId)

      const response = await fetch("/api/advance-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al avanzar el paso")
      }

      const data = await response.json()
      toast.success(data.message)

      setIsAtFirstStep(data.currentStep <= 1)
      setCurrentStep(data.currentStep)

      if (data.step) {
        const { text, image, buttons } = data.step
        const newMessage: CustomMessage = {
          id: uuidv4(),
          role: "assistant",
          content: text,
          image: image || null,
          buttons: buttons || [],
          markdownBlocks: parseMarkdownIntoBlocks(text),
        }
        addMessage(newMessage)
      }

      if (data.finalMessage) {
        const { content, image, buttons } = data.finalMessage
        const finalMessage: CustomMessage = {
          id: uuidv4(),
          role: "assistant",
          content,
          image: image || null,
          buttons: buttons || [],
          markdownBlocks: parseMarkdownIntoBlocks(content),
        }
        addMessage(finalMessage)
      }
    } catch (err: any) {
      console.error("Error al avanzar paso:", err)
      toast.error("Ocurrió un error al avanzar el paso.")
    }
  }, [chatId, addMessage, userId])
  // --- Retroceder un paso ---
  const goBackStep = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("Usuario no identificado.")
        return
      }
      const response = await fetch("/api/advance-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          action: "back",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al retroceder el paso")
      }

      const data = await response.json()
      toast.success(data.message)

      setIsAtFirstStep(data.currentStep <= 1)
      setCurrentStep(data.currentStep)

      if (data.step) {
        const { text, image, buttons } = data.step
        const newMessage: CustomMessage = {
          id: uuidv4(),
          role: "assistant",
          content: text,
          image: image || null,
          buttons: buttons || [],
          markdownBlocks: parseMarkdownIntoBlocks(text),
        }
        addMessage(newMessage)
      }
    } catch (err: any) {
      console.error("Error al retroceder paso:", err)
      toast.error("Ocurrió un error al retroceder al paso anterior.")
    }
  }, [chatId, addMessage, userId])

  // --- Reiniciar los pasos ---
  const reiniciarStep = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("Usuario no identificado.")
        return
      }

      console.log(
        "Llamando a /api/advance-step con chatId:",
        chatId,
        "acción: reset",
      )

      const response = await fetch("/api/advance-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, action: "reset" }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al reiniciar el paso")
      }

      const data = await response.json()
      toast.success(data.message)

      setIsAtFirstStep(data.currentStep <= 1)
      setCurrentStep(data.currentStep)

      if (data.reiniciarMessage) {
        const { content, image, buttons } = data.reiniciarMessage
        const reiniciarMsg: CustomMessage = {
          id: uuidv4(),
          role: "assistant",
          content: content,
          image: image || null,
          buttons: buttons || [],
          markdownBlocks: parseMarkdownIntoBlocks(content),
        }
        addMessage(reiniciarMsg)
      }
    } catch (err: any) {
      console.error("Error al reiniciar paso:", err)
      toast.error("Ocurrió un error al reiniciar la guía paso a paso.")
    }
  }, [chatId, addMessage, userId])

  // --- Función para enviar mensajes externos del usuario ---
  const submitExternalMessage = useCallback(
    async (text: string, shouldAdvanceStep: boolean = false) => {
      if (!text.trim()) {
        console.error("El mensaje no puede estar vacío.")
        toast.error("El mensaje no puede estar vacío.")
        return
      }

      try {
        setIsSubmitting(true)
        setError(null)

        // Si debe iniciar paso a paso, establecer el estado y llamar a advanceStep
        if (shouldAdvanceStep) {
          setIsStepByStep(true)
          await advanceStep()
          return
        }

        // Si ya estás en modo paso a paso, manejar los comandos
        if (isStepByStep) {
          const stepByStepKeywords = ["siguiente", "atrás", "atras", "salir"]
          if (
            stepByStepKeywords.some((kw) => text.toLowerCase().includes(kw))
          ) {
            if (text.toLowerCase().includes("salir")) {
              // Enviar acción 'exit' a la API
              const response = await fetch("/api/advance-step", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chatId,
                  action: "exit",
                }),
              })

              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(
                  errorData.error || "Error al salir de paso a paso",
                )
              }

              const data = await response.json()

              if (data.exitMessage) {
                const exitMsg: CustomMessage = {
                  id: uuidv4(),
                  role: "assistant",
                  content: data.exitMessage.content,
                  image: data.exitMessage.image,
                  buttons: data.exitMessage.buttons,
                  markdownBlocks: parseMarkdownIntoBlocks(
                    data.exitMessage.content,
                  ),
                }
                addMessage(exitMsg)
              }

              toast.success("Has salido del modo de guía paso a paso.")
              setIsStepByStep(false)
              return
            } else if (text.toLowerCase().includes("siguiente")) {
              await advanceStep()
              return
            } else if (
              text.toLowerCase().includes("atrás") ||
              text.toLowerCase().includes("atras")
            ) {
              await goBackStep()
              return
            }
          }
        }

        const controller = new AbortController()
        setAbortController(controller)

        // Añadir mensaje del usuario
        const userMessage: CustomMessage = {
          id: uuidv4(), // Generar ID único
          role: "user",
          content: text,
          image: null,
          markdownBlocks: parseMarkdownIntoBlocks(text), // Parsear Markdown si aún lo necesitas
        }

        addMessage(userMessage)

        // Llamada a /api/chat para insertar mensaje
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

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No se pudo obtener la respuesta")

        const assistantId = uuidv4() // Generar ID único para el asistente
        // Añadir mensaje vacío para mostrar indicador de escritura
        const initialAssistantMessage: CustomMessage = {
          id: assistantId,
          role: "assistant",
          content: "",
          image: null,
          markdownBlocks: [],
        }
        addMessage(initialAssistantMessage)

        // Acumular contenido de los chunks
        let accumulatedContent = ""

        let lastProcessedLength = 0

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split("\n")

          lines.forEach((line) => {
            if (line.startsWith('0:"')) {
              const match = line.match(/^0:"(.*)"$/)
              if (match && match[1]) {
                let textChunk = match[1]
                textChunk = textChunk.replace(/\\n/g, `\n`)
                accumulatedContent += textChunk

                // Process TTS for new content when enough has accumulated
                const newContent = accumulatedContent.slice(lastProcessedLength)
                if (newContent.length >= CHUNK_SIZE) {
                  processStreamingTTS(newContent)
                  lastProcessedLength = accumulatedContent.length
                }

                setMessages((prevMessages) =>
                  prevMessages.map((msg) =>
                    msg.id === assistantId
                      ? {
                          ...msg,
                          content: accumulatedContent,
                        }
                      : msg,
                  ),
                )
              }
            }
          })
        }

        // Process any remaining content
        if (accumulatedContent.slice(lastProcessedLength)) {
          processStreamingTTS(accumulatedContent.slice(lastProcessedLength))
        }

        // After streaming completes, process TTS
        if (audioPlay && accumulatedContent) {
          console.log(
            "Processing TTS for accumulated content:",
            accumulatedContent,
          )
          const audioUrl = await handleTTS(accumulatedContent)
          if (audioUrl) {
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === assistantId
                  ? {
                      ...msg,
                      audioUrl,
                    }
                  : msg,
              ),
            )
          }
          console.log("TTS audio URL:", audioUrl)
        }

        return accumulatedContent
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Solicitud abortada")
          toast.error("La solicitud fue cancelada.")
        } else {
          console.error("Error al enviar mensaje:", err)
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
      addMessage,
      advanceStep,
      goBackStep,
      isStepByStep,
      audioPlay,
      handleTTS,
      processStreamingTTS,
    ],
  )
  // --- Función para salir del modo paso a paso ---
  const exitStepByStep = useCallback(async () => {
    try {
      if (!userId) {
        toast.error("Usuario no identificado.")
        return
      }
      // Al salir, enviamos el mensaje de salida a través de submitExternalMessage
      await submitExternalMessage("salir")
    } catch (err: any) {
      console.error("Error al salir paso a paso:", err)
      toast.error("Ocurrió un error al salir de la guía paso a paso.")
    }
  }, [userId, submitExternalMessage])
  // --- Función para cancelar la solicitud ---
  const cancelRequest = useCallback(() => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
      setIsSubmitting(false)
      toast.error("Solicitud cancelada por el usuario.")
    }
  }, [abortController])
  // --- Función para iniciar la conversación hablada ---
  const startConversation = useCallback(async () => {
    try {
      setAudioPlay(true)
      const initialMessage = {
        chatId,
        content:
          "A partir de ahora y hasta que hagas click en finalizar, te daré las respuestas habladas.",
        role: "assistant" as const,
      }

      // Save message via API
      const response = await fetch("/api/tts-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialMessage),
      })

      if (!response.ok) throw new Error("Failed to save message")

      // Add to local state
      const messageWithId: CustomMessage = {
        id: uuidv4(),
        ...initialMessage,
        image: null,
        markdownBlocks: [],
      }
      addMessage(messageWithId)
    } catch (error) {
      console.error("Error starting conversation:", error)
      toast.error("Error al iniciar conversación por voz")
      setAudioPlay(false)
    }
  }, [chatId, addMessage])
  // --- Función para finalizar la conversación hablada ---
  const endConversation = useCallback(async () => {
    try {
      setAudioPlay(false)
      const endMessage = {
        chatId,
        content:
          "Has finalizado la conversación hablada. Puedes seguir chateando normalmente.",
        role: "assistant" as const,
      }

      // Save message via API
      const response = await fetch("/api/tts-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endMessage),
      })

      if (!response.ok) throw new Error("Failed to save message")

      // Add to local state
      const messageWithId: CustomMessage = {
        id: uuidv4(),
        ...endMessage,
        image: null,
        markdownBlocks: [],
      }
      addMessage(messageWithId)
    } catch (error) {
      console.error("Error ending conversation:", error)
      toast.error("Error al finalizar conversación por voz")
    }
  }, [chatId, addMessage])

  /**
   * handleSTTText:
   * si el usuario STT produce texto, lo mandamos a GPT para obtener respuesta
   */
  const handleSTText = useCallback(
    (text: string) => {
      submitExternalMessage(text)
    },
    [submitExternalMessage],
  )

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
        handleSTText,
        isStepByStep,
        reiniciarStep,
        startConversation,
        endConversation,
        audioPlay,
        isAudioPlaying,
        playAudio,
        pauseAudio,
        stopAudio,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error("useChatContext debe ser usado dentro de ChatProvider")
  }
  return ctx
}
