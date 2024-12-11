'use client'
import { useEffect, useState, ReactNode } from 'react'
import MobileChat from '@/app/sara-ia/[[...chatId]]/mobile-chat'

interface Chat {
  id: number
  title?: string
  createdAt: string | Date
  pdfUrl?: string
  userId: string
}

interface ResponsiveChatWrapperProps {
  children: ReactNode;
  chats: Chat[];
  currentChatId?: number;
}

const ResponsiveChatWrapper = ({ children, chats, currentChatId }: ResponsiveChatWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Para debug logging
  // useEffect(() => {
  //   console.log('ResponsiveChatWrapper chats:', chats)
  // }, [chats])

  if (isMobile) {
    return <MobileChat initialChats={chats} initialChatId={currentChatId} />
  }

  return <>{children}</>

}

export default ResponsiveChatWrapper