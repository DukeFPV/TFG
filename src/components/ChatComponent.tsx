'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useChat, Message } from 'ai/react'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import MessageList from './MessageList'

type Props = {chatId: number}

const ChatComponent = ({ chatId }: Props) => {
  const [initialMessages, setInitialMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const { input, handleInputChange, handleSubmit, messages, setMessages } = useChat({
    api: '/api/chat',
    body: {
      chatId
    },
    initialMessages,
    onError: (error) => {
      console.error('Chat error:', error);
    }
  })

  useEffect(() => {
    const loadMessages = async () => {
      if (!chatId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/messages?chatId=${chatId}`)
        if (!response.ok) {
          throw new Error('Failed to load messages')
        }
        const data = await response.json()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedMessages: Message[] = data.map((msg: any) => ({
          id: msg.id.toString(),
          content: msg.content,
          role: msg.role,
          createdAt: new Date(msg.createdAt)
        }))

        setInitialMessages(formattedMessages)
        setMessages(formattedMessages)
      } catch (error) {
        console.error('Error loading messages:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMessages()
  }, [chatId, setMessages])

  useEffect(() => {
    const messageContainer = document.getElementById('message-container')
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  if (loading) {
    return <div>Cargando...</div>
  }
//! h-[calc(100vh-10vh)] comparar con h-full
  return (
    <div className='flex flex-col h-full max-h-screen overflow-hidden w-full transition-all duration-300'>
      <div 
        id='message-container' 
        className='flex-1 overflow-y-auto px-4'
      >        
          <MessageList messages={messages}/>        
      </div>
      <div className='sticky bottom-0 left-0 right-0 bg-white border-t p-4'>
        <form onSubmit={handleSubmit}>
          <div className='flex'>
            <Input 
              value={input} 
              onChange={handleInputChange} 
              placeholder='Pregunta lo que necesites...'
              className="w-full p-4 pr-24 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"  
            />
            <Button className='bg-purple-600 ml-2'>
              <Send className='w-4 h-4' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatComponent