//**Revisado */
/**
 * Componente MobileChat - Interfaz de chat adaptada para dispositivos móviles.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array} [props.initialChats=[]] - Array de objetos de chat iniciales a mostrar
 *
 * @remarks
 * Este componente maneja la interfaz de chat móvil con tres pantallas principales:
 * - Lista de chats guardados
 * - Chat activo
 * - Temas/Funcionalidades
 *
 * El componente gestiona la navegación entre pantallas, la selección de chats, el envío
 * de mensajes y la creación de nuevos chats. Incluye una cabecera con controles de
 * navegación y un pie con pestañas de selección de pantalla.
 *
 * @states
 * - currentScreen: Gestiona qué pantalla se muestra actualmente ("saved"|"chat"|"topics")
 * - activeCategory: Controla la categoría seleccionada en la vista de temas
 * - currentChatId: Almacena el ID del chat activo
 * - isLoading: Indica estados de carga durante las operaciones
 *
 * @features
 * - Navegación y selección de chats
 * - Creación de nuevos chats
 * - Filtrado por categorías
 * - Tarjetas de funcionalidades predefinidas para acciones rápidas
 * - Actualizaciones de chat en tiempo real
 * - Enrutamiento basado en URL
 *
 * @returns Componente React con interfaz de chat móvil
 */

"use client"

import React, { useEffect, useState } from "react"
import {
  ArrowLeft,
  LayoutDashboard,
  MessageCircle,
  MessagesSquare,
} from "lucide-react"
import FeatureCard from "@/components/FeatureCard"
import ChatComponent from "@/components/ChatComponent"
import { useRouter, useParams } from "next/navigation"
import LoadingBubble from "@/components/LoadingBubble"
import { toast } from "react-hot-toast"
import { useChatContext } from "@/context/ChatContext"

interface Chat {
  id: number
  title?: string
  createdAt: string | Date
  pdfUrl?: string
  userId: string
}

interface Props {
  initialChats?: Chat[] // Hacer opcional
  initialChatId?: number // Requerido por ResponsiveChatWrapper
}

type Screen = "saved" | "chat" | "topics"

const MobileChat: React.FC<Props> = ({ initialChats = [] }) => {
  // Eliminar initialChatId
  const params = useParams()
  const chatIdFromRoute = params?.chatId ? Number(params.chatId) : null // Obtener chatId desde la URL
  const [currentScreen, setCurrentScreen] = useState<Screen>("saved")
  const [activeCategory, setActiveCategory] = useState("todos")
  const [currentChatId, setCurrentChatId] = useState<number | null>(
    chatIdFromRoute,
  )
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { submitExternalMessage, isSubmitting, error } = useChatContext()

  // useEffect para manejar cambios en chatId desde la URL
  useEffect(() => {
    if (chatIdFromRoute) {
      setCurrentChatId(chatIdFromRoute)
      setCurrentScreen("chat")
    }
  }, [chatIdFromRoute])

  const handleChatSelect = async (chatId: number) => {
    console.log("Selecting chat with ID:", chatId)
    try {
      setIsLoading(true)
      setCurrentChatId(chatId)

      // Navegar a la nueva ruta con chatId
      await router.push(`/sara-ia/${chatId}`, { scroll: false })

      // Esperar a que se cargue la pantalla
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (error) {
      console.error("Error selecting chat:", error)
      toast.error(
        "Error al seleccionar el chat. Por favor, intenta nuevamente.",
      ) // Mostrar toast de error
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    { id: "todos", label: "Todos" },
    { id: "salud", label: "Salud" },
    { id: "banca", label: "Banca" },
  ]

  // Función para manejar el click en una FeatureCard
  const handleFeatureClick = async (
    text: string,
    shouldAdvanceStep: boolean,
  ) => {
    //console.log("FeatureCard clicked with text:", text)
    try {
      setIsLoading(true)

      // Cambiar la pantalla a 'chat' inmediatamente
      setCurrentScreen("chat")

      // Verificar si hay un chat activo, si no, crear uno nuevo
      if (!currentChatId) {
        // Crear un nuevo chat
        const response = await fetch("/api/create-chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_key: "",
            file_name: "Nuevo Chat",
          }),
        })
        if (!response.ok) throw new Error("Fallo al crear un nuevo chat")

        const data = await response.json()
        if (data.chat_id) {
          await handleChatSelect(data.chat_id) // Seleccionar el nuevo chat
        } else {
          throw new Error("No se recibió el ID del chat")
        }
      }

      // Enviar el mensaje predefinido
      await submitExternalMessage(text, shouldAdvanceStep)
      toast.success("Mensaje enviado correctamente")
    } catch (error) {
      console.error("Error al enviar el mensaje externo:", error)
      toast.error("Error al enviar el mensaje. Por favor, intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const screensCycleMap = {
    chat: "saved",
    saved: "topics",
    topics: "chat",
  } as const

  function handleArrowLeftClick() {
    const nextScreen = screensCycleMap[currentScreen]
    setCurrentScreen(nextScreen)
  }

  // Función para renderizar la parte superior de la versión mobile de la aplicación
  const renderHeader = () => (
    <header className="p-4 border-b">
      <div className="flex flex-row align-middle justify-between">
        <div className="flex items-center">
          <button
            onClick={handleArrowLeftClick}
            className="p-2"
            aria-label="Volver a lista de chats guardados"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold ml-24">
            {currentScreen === "saved"
              ? "Chats guardados"
              : currentScreen === "chat"
                ? "Sara"
                : "Temas"}
          </h1>
        </div>
        {currentScreen === "saved" && (
          <button
            onClick={createNewChat}
            className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm"
          >
            Nuevo Chat
          </button>
        )}
      </div>
    </header>
  )

  // --- Función para renderizar los chats guardados --- //TODO: en la versión de escritorio
  const renderSavedChats = () => (
    <div className="flex-1 overflow-y-auto h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingBubble />
        </div>
      ) : initialChats && initialChats.length > 0 ? (
        initialChats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 border-b cursor-pointer"
            onClick={() => handleChatSelect(chat.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold">
                  {chat.title || `Chat ${chat.id}`}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
              </div>
              <button className="mt-2 text-purple-500">{">"}</button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No hay chats guardados</p>
        </div>
      )}
    </div>
  )

  // Función para crear un nuevo chat
  const createNewChat = async () => {
    try {
      const response = await fetch("/api/create-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_key: "",
          file_name: "Nuevo Chat",
        }),
      })
      if (!response.ok) throw new Error("Failed to create chat")

      const data = await response.json()
      if (data.chat_id) {
        await handleChatSelect(data.chat_id)
      }
    } catch (error) {
      console.error("Error creating chat:", error)
      toast.error(
        "Error al crear un nuevo chat. Por favor, intenta nuevamente.",
      ) // Mostrar toast de error
    }
  }

  // Función para renderizar el chat
  const renderChat = () => (
    <div className="overflow-hidden h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))] flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <LoadingBubble />
        </div>
      ) : currentChatId ? (
        <div className="flex-1 overflow-hidden">
          <ChatComponent chatId={currentChatId} />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <p>Seleccione un chat para comenzar</p>
        </div>
      )}
    </div>
  )

  // Configuración de las tarjetas de funcionalidades //TODO Implementar en un componente separado de utils
  const cardsConfig = [
    {
      backgroundColor: "bg-cyan-50",
      icon: "/icons/salud.svg",
      title: "Salud digital",
      description: "Te puedo guiar paso a paso como pedir la cita.",
      text: "¿Cómo puedo pedir cita en mi centro de salud paso a paso?",
      shouldAdvanceStep: true, // Solo esta tarjeta inicia paso a paso //TODO Únicamente integrado el SERGAS
    },
    {
      backgroundColor: "bg-yellow-50",
      icon: "/icons/banca.svg",
      title: "Banca digital",
      description: "Aprender a usar la banca digital",
      text: "¿Cómo me puedes ayudar para utilizar mi banco?",
      shouldAdvanceStep: false,
    },
    {
      backgroundColor: "bg-green-50",
      icon: "/icons/buscar.svg",
      title: "Buscar en internet",
      description: "Te puedo ayudar a buscar",
      text: "Necesito que busques en internet algo para mí",
      shouldAdvanceStep: false,
    },
    {
      backgroundColor: "bg-purple-50",
      icon: "/icons/any.svg",
      title: "Cualquier pregunta",
      description: "Pregúntame lo que quieras",
      text: "Quiero saber en qué cosas puedes asistirme",
      shouldAdvanceStep: false,
    },
  ]

  // Función para renderizar las FeatureCards
  const renderTopics = () => (
    <div className="flex-1 overflow-hidden h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))] place-self-center p-4 mx-10">
      <div className="flex justify-around mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeCategory === category.id ? "bg-purple-800 text-white" : ""
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-80">
        {cardsConfig.map((card, index) => (
          <FeatureCard
            key={index}
            {...card}
            onClick={() =>
              handleFeatureClick(card.text, card.shouldAdvanceStep)
            }
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )

  // --- Función para renderizar el contenido de la pantalla actual ---
  const renderContent = () => {
    switch (currentScreen) {
      case "saved":
        return renderSavedChats()
      case "chat":
        return renderChat()
      case "topics":
        return renderTopics()
      default:
        return null
    }
  }

  // --- Función para renderizar el footer/Nav de la aplicación ---
  const renderFooter = () => (
    <footer className="flex justify-around p-4 border-t bg-purple-800 text-white/50">
      <button
        onClick={() => setCurrentScreen("chat")}
        className={`p-2 ${currentScreen === "chat" ? "text-purple-50" : ""}`}
      >
        <span className="flex flex-row items-center">
          <MessageCircle className="mr-1" size={16} />
          Chat
        </span>
      </button>
      <button
        onClick={() => setCurrentScreen("topics")}
        className={`p-2 pl-4 ml-4 mr-2 ${
          currentScreen === "topics" ? "text-purple-50" : ""
        }`}
      >
        <span className="flex flex-row items-center">
          <LayoutDashboard className="mr-1" size={16} />
          Temas
        </span>
      </button>
      <button
        onClick={() => setCurrentScreen("saved")}
        className={`p-2 ${currentScreen === "saved" ? "text-purple-50" : ""}`}
      >
        <span className="flex flex-row items-center">
          <MessagesSquare className="mr-1" size={16} />
          Guardados
        </span>
      </button>
    </footer>
  )

  return (
    <div className="flex flex-col overflow-hidden">
      {renderHeader()}
      <main
        className="flex-1 overflow-hidden h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))]"
        id="mobile-main"
      >
        {renderContent()}
      </main>
      {renderFooter()}
    </div>
  )
}

export default MobileChat
