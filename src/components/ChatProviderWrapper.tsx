//**Revisado */
/**
 * Un componente contenedor que proporciona el contexto del chat a sus componentes hijos usando ChatProvider.
 *
 * @component
 * @param props - Las propiedades del componente
 * @param props.chatId - El identificador único para la sesión del chat
 * @param props.children - Los componentes hijos que serán envueltos por ChatProvider
 * @returns Un componente ChatProvider con el chatId y los children especificados
 */

"use client"

import React from "react"
import { ChatProvider } from "@/context/ChatContext"

type ChatProviderWrapperProps = {
  chatId: number
  children: React.ReactNode
}

const ChatProviderWrapper = ({
  chatId,
  children,
}: ChatProviderWrapperProps) => {
  return <ChatProvider chatId={chatId}>{children}</ChatProvider>
}

export default ChatProviderWrapper
