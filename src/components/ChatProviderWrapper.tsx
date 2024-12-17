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
