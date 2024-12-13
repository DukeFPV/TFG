'use client'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, LayoutDashboard, MessageCircle, MessagesSquare } from 'lucide-react'
import FeatureCard from '@/components/FeatureCard'
import ChatComponent from '@/components/ChatComponent'
import { useRouter } from 'next/navigation'
import LoadingBubble from '@/components/LoadingBubble'


interface Chat {
  id: number
  title?: string
  createdAt: string | Date
  pdfUrl?: string
  userId: string
}

interface Props {
  initialChats?: Chat[] // Make optional
  initialChatId?: number
}

type Screen = 'saved' | 'chat' | 'topics'

const MobileChat: React.FC<Props> = ({ initialChats = [], initialChatId }) => { // Add default empty array
  const [currentScreen, setCurrentScreen] = useState<Screen>('saved')
  const [activeCategory, setActiveCategory] = useState('todos')
  const [currentChatId, setCurrentChatId] = useState<number | null>(initialChatId || null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChatSelect = async (chatId: number) => {
    try {
      setIsLoading(true)
      setCurrentChatId(chatId)
      
      // Cargar el id del chat en la URL
      await router.push(`/sara-ia/${chatId}`, { scroll: false })
      
      // Esperar a que se cargue la pantalla
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Cambiar de pantalla cuando se haya cargado
      setCurrentScreen('chat')
    } catch (error) {
      console.error('Error selecting chat:', error)
    } finally {
      setIsLoading(false)
    }
  }

    // Añadir useEffect para manejar el chat inicial
    useEffect(() => {
      if (initialChatId) {
        setCurrentChatId(initialChatId)
        setCurrentScreen('chat')
      }
    }, [initialChatId])

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'salud', label: 'Salud' },
    { id: 'banca', label: 'Banca' }
  ]

  const renderHeader = () => (
    <header className='p-4 border-b'>
      <div className='flex flex-row align-middle justify-between'> 
        <div className='flex items-center'>
          <button onClick={() => setCurrentScreen('saved')} className='p-2'>
            <ArrowLeft size={24} />
          </button>
          <h1 className='text-lg font-semibold ml-4'>
            {currentScreen === 'saved' ? 'Chats guardados' : currentScreen === 'chat' ? 'Sara' : 'Temas'}
          </h1>
        </div>
        {currentScreen === 'saved' && (
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

  const renderSavedChats = () => (
    <div className="flex-1 overflow-y-auto h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p><LoadingBubble /></p>
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
              <button className="mt-2 text-purple-500">{'>'}</button>
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

  const createNewChat = async () => {
    try {
      const response = await fetch('/api/create-chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_key: '',
          file_name: 'New Chat'
        })
      })
      if (!response.ok) throw new Error('Failed to create chat')
      
      const data = await response.json()
      if (data.chat_id) {
        handleChatSelect(data.chat_id)
      }
    } catch (error) {
      console.error('Error creating chat:', error)
    }
  }

  const renderChat = () => (
    <div className="overflow-hidden h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))] flex flex-col">
      {isLoading ? (
        <div className="flex items-center justify-center flex-1">
          <p><LoadingBubble /></p>
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

  const renderTopics = () => (
      <div className="flex-1 overflow-hidden h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))] place-self-center p-4 mx-10">
          <div className="flex justify-around mb-10">
            {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full border transition-colors ${
                activeCategory === category.id ? 'bg-purple-800 text-white' : ''
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      <div className="grid grid-cols-2 gap-4 max-w-80">
        <FeatureCard backgroundColor="bg-cyan-50" icon="/icons/salud.svg" title="Salud digital" description="Te puedo guiar paso a paso como pedir la cita." />
        <FeatureCard backgroundColor="bg-yellow-50" icon="/icons/banca.svg" title="Banca digital" description="Aprender a usar la banca digital" />
        <FeatureCard backgroundColor="bg-green-50" icon="/icons/buscar.svg" title="Buscar en internet" description="Te puedo ayudar a buscar" />
        <FeatureCard backgroundColor="bg-purple-50" icon="/icons/any.svg" title="Cualquier pregunta" description="Pregúntame lo que quieras" />
      </div>
    </div>
  )

  const renderContent = () => {
    switch (currentScreen) {
      case 'saved':
        return renderSavedChats()
      case 'chat':
        return renderChat()
      case 'topics':
        return renderTopics()
    }
  }

  const renderFooter = () => (
    <footer className="flex justify-around p-4 border-t bg-purple-800 text-violet-400">
      <button onClick={() => setCurrentScreen('chat')} className={`p-2 ${currentScreen === 'chat' ? 'text-purple-50' : ''}`}>
        <span className='flex flex-row place-items-center'><MessageCircle className='mr-1' size={16} />Chat</span>  
      </button>
      <button onClick={() => setCurrentScreen('topics')} className={`p-2 pl-4 ml-4 mr-2 ${currentScreen === 'topics' ? 'text-purple-50' : ''}`}>
        <span className='flex flex-row place-items-center'><LayoutDashboard className='mr-1' size={16} />Temas</span>
      </button>
      <button onClick={() => setCurrentScreen('saved')} className={`p-2 ${currentScreen === 'saved' ? 'text-purple-50' : ''}`}>
      <span className='flex flex-row place-items-center'><MessagesSquare className='mr-1' size={16} />Guardados</span>
      </button>
    </footer>
  )

  return (
    <div className="flex flex-col overflow-hidden">
      {renderHeader()}
        <div className='flex-1 overflow-hidden h-[calc(100vh-var(--header-height)-var(--bottom-nav-height))]'>
          {renderContent()}
        </div>
      {renderFooter()}
      
    </div>
  )
}

export default MobileChat