"use client"
import React from "react"
import { Settings, Mic, History } from "lucide-react"
import FeatureCard from "./FeatureCard" // Assuming FeatureCard is a local component
import Image from "next/image" // Assuming using Next.js for <Image> component
import Link from "next/link"
import { ConvAI } from "./ConvAI"
import { useEffect, useState } from "react"
import { Message } from "ai/react"
import LoadingBubble from "./LoadingBubble"
import MessageList from "./MessageList"

const cardsConfig = [
  {
    backgroundColor: "bg-cyan-50",
    icon: "/icons/salud.svg",
    title: "Salud digital",
    description: "Te puedo guiar paso a paso como pedir la cita.",
    text: "¿Como me puedes ayudar en temas de salud?",
  },
  {
    backgroundColor: "bg-yellow-50",
    icon: "/icons/banca.svg",
    title: "Banca digital",
    description: "Aprender a usar la banca digital",
    text: "¿Como me puedes ayudar para utilizar mi banco?",
  },
  {
    backgroundColor: "bg-green-50",
    icon: "/icons/buscar.svg",
    title: "Buscar en internet",
    description: "Te puedo ayudar a buscar",
    text: "Necesito que busques en internet algo para mi",
  },
  {
    backgroundColor: "bg-purple-50",
    icon: "/icons/any.svg",
    title: "Cualquier pregunta",
    description: "Pregúntame lo que quieras",
    text: "Quiero saber en que cosas puedes asistirme",
  },
]

interface ChatSideBarRProps {
  initialChatId: string
}

const ChatSideBarR: React.FC<ChatSideBarRProps> = ({ initialChatId }) => {
  const [chatId, setChatId] = useState<string>(initialChatId)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    setChatId(initialChatId)
  }, [initialChatId])

  const handleCardClick = async (text: string) => {
    if (!chatId) return

    try {
      setIsLoading(true)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              content: text,
              role: "user",
            },
          ],
          chatId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      const reader = response.body?.getReader()
      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = new TextDecoder().decode(value)
        const data = JSON.parse(text)

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            content: data.text,
            role: "assistant",
          },
        ])
      }
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] overflow-hidden w-full md:w-auto">
      <aside className="h-full bg-gray-50 p-4 md:p-6 lg:w-80 md:w-60 sm:w-40 overflow-y-auto">
        {/* Feature Cards Grid */}
        <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-3">
          {cardsConfig.map((card, index) => (
            <FeatureCard
              key={index}
              {...card}
              onClick={() => handleCardClick(card.text)}
              isLoading={isLoading}
            />
          ))}
        </div>
        {isLoading && <LoadingBubble />}
        <MessageList messages={messages} />
        {/* Avatar Section */}
        <div className="hidden sm:block sm:text-center sm:mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">SARA</h2>
          {/* <Image 
          src="/icons/sara-avatar.png" 
          alt="SARA" 
          width={150} 
          height={150} 
          className="mx-auto w-[80px] h-[80px] md:w-[150px] md:h-[150px]"
        /> */}
        </div>

        {/* Buttons Section */}
        <div className="hidden sm:space-y-2 sm:flex sm:flex-col sm:items-center">
          <button className="w-full max-w-[208px] h-10 bg-transparent border-2 border-purple-500 hover:bg-purple-200 hover:border-0 text-gray-800 font-semibold py-2 px-4 rounded-3xl flex items-center justify-center">
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

        {/* Mic Button */}
        <div className="hidden sm:block sm:mt-4 md:mt-6 sm:text-center">
          {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto">
          <Mic size={36} className="md:w-12 md:h-12" />
        </button> */}
          <ConvAI />
          <p className="mt-2 text-sm text-gray-600">Pulsa aquí para hablar</p>
        </div>
      </aside>
    </div>
  )
}
export default ChatSideBarR

{
  /* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribeme lo que necesites..."
          className="flex-grow border rounded-full py-2 px-4 mr-2"
        />
        <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
          <Send size={20} />
        </button>
      </div> */
}
{
  /* <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <p>Copyright © 2024 J.Carlos Lorenzo | Todos los derechos reservados</p>
        <div className="flex space-x-4">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/">Inicio</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
      </div> 
    </div>
  </div> */
}
