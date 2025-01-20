//**Revisado */
/**
 * Un componente envoltorio responsivo que alterna entre vistas de chat móvil y escritorio
 * según el ancho de la pantalla.
 *
 * @component
 * @param props - Los props del componente
 * @param {React.ReactNode} props.children - Los elementos hijos a renderizar en vista de escritorio
 * @param {Chat[]} props.chats - Array de objetos chat para pasar a la vista móvil
 * @param {string} props.currentChatId - ID del chat actualmente activo
 * @returns {JSX.Element} La vista de chat móvil o los hijos envueltos en un fragmento
 */

"use client"
import { useEffect, useState, ReactNode } from "react"
import MobileChat from "@/app/sara-ia/[[...chatId]]/mobile-chat"
import { is } from "drizzle-orm"

interface Chat {
  id: number
  title?: string
  createdAt: string | Date
  pdfUrl?: string
  userId: string
}

interface ResponsiveChatWrapperProps {
  children: ReactNode
  chats: Chat[]
  currentChatId?: number
}

const ResponsiveChatWrapper = ({
  children,
  chats,
  currentChatId,
}: ResponsiveChatWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div aria-live="polite">
      {isMobile ? (
        <MobileChat
          initialChats={chats}
          initialChatId={currentChatId}
          aria-label="Vista de versión móvil"
        />
      ) : (
        <main role="main">{children}</main>
      )}
    </div>
  )
}

export default ResponsiveChatWrapper
