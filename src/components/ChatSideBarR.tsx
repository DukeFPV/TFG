//**Revisado */
/**
 * Componente de la barra lateral derecha para la interfaz de chat.
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.chatId - Identificador único para la sesión de chat
 *
 * @returns Una barra lateral que contiene tarjetas de funcionalidades, sección de avatar, botones de control y elementos de interacción por voz
 *
 * El componente incluye:
 * - Cuadrícula de tarjetas de funcionalidades con acciones configurables
 * - Sección de avatar mostrando "SARA"
 * - Botones de control para historial y ajustes
 * - Controles de interacción por voz usando ElevenLabs
 * - Sección de visualización de errores
 *
 * @example
 * ```tsx
 * <ChatSideBarR />
 * ```
 */

"use client"
import { Settings, History } from "lucide-react"
import FeatureCard from "./FeatureCard"
import Link from "next/link"
import { ConvAI } from "./ConvAI"
import { useState } from "react"
import { useChatContext } from "@/context/ChatContext"
import { useRouter } from "next/navigation"

// Configuración de las tarjetas de funcionalidades
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

type ChatSideBarRProps = {
  chatId: number
}

const ChatSideBarR = ({ chatId }: ChatSideBarRProps) => {
  const { submitExternalMessage, isSubmitting, error } = useChatContext()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCardClick = async (text: string, shouldAdvanceStep: boolean) => {
    if (submitExternalMessage && !isLoading) {
      setIsLoading(true)
      try {
        await submitExternalMessage(text, shouldAdvanceStep)
      } catch (error) {
        console.error("Error al enviar el mensaje externo:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] overflow-hidden w-full md:w-auto">
      <aside className="h-full bg-gray-50 p-4 md:p-6 lg:w-80 md:w-60 sm:w-40 overflow-y-auto">
        {/* Tarjetas cards de acceso rápido a llamadas */}
        <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-3">
          {cardsConfig.map((card, index) => (
            <FeatureCard
              key={index}
              {...card}
              onClick={() => handleCardClick(card.text, card.shouldAdvanceStep)}
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* Avatar Sección */}
        <div className="hidden sm:block sm:text-center sm:mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">SARA</h2>
        </div>

        {/* Sección de botones */}
        <div className="hidden sm:space-y-2 sm:flex sm:flex-col sm:items-center">
          <button
            className="w-full max-w-[208px] h-10 bg-transparent border-2 border-purple-500 hover:bg-purple-200 hover:border-0 text-gray-800 font-semibold py-2 px-4 rounded-3xl flex items-center justify-center"
            onClick={() => {
              router.push("/panel-control?tab=historial")
            }}
          >
            <p className="text-xs lg:text-sm font-semibold mr-1">
              Consulta el historial
            </p>
            <History className="md:ml-2 w-3 h-3 md:w-4 md:h-4" size={18} />
          </button>
          <button className="w-full max-w-[208px] h-10 bg-transparent border-2 border-purple-500 hover:bg-purple-200 hover:border-0 text-gray-800 font-semibold py-2 px-4 rounded-3xl flex items-center justify-center">
            <Link href="/panel-control">
              <p className="text-xs lg:text-sm font-semibold mr-1">Ajustes</p>
            </Link>
            <Settings className="md:mr-2 w-3 h-3 md:w-4 md:h-4" size={18} />
          </button>
        </div>

        {/* Manejo de voz con ElevenLabs */}
        <div className="hidden sm:block sm:mt-4 md:mt-6 sm:text-center">
          <ConvAI />
          <p className="mt-2 text-sm text-gray-600">Pulsa aquí para hablar</p>
        </div>

        {/* Mostrar error si existe */}
        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
      </aside>
    </div>
  )
}

export default ChatSideBarR
