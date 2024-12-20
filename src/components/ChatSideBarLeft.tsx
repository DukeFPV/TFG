'use client'

import { useState } from "react"
import React from "react"
import { SelectChat } from "@/lib/db/schema"
import Link from "next/link"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { MessageCircle, PlusCircle, SidebarCloseIcon, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils/date"
import { useUser } from "@clerk/nextjs" 
import FileUpload from "./FileUpload" // Importamos el componente FileUpload

type Props = {
  chats: SelectChat[],
  chatId: number
}

const ADMIN_ID = 'user_2ooPGvdai0IRYfKUmWh7T5y3rxp'

const ChatSideBarLeft = ({chats, chatId}: Props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [showFileUpload, setShowFileUpload] = useState(false)

  const { user } = useUser()
  const isAdmin = user?.id === ADMIN_ID

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  
  const createNewChat = async (): Promise<number | null> => {
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
      if (!response.ok) {
        throw new Error('Failed to create chat')
      }
  
      const data = await response.json()
      if (data.chat_id) {
        return data.chat_id
      }

      return null
    } catch (error) {
      console.error('Error creating chat:', error)
      return null
    }
  }

  const openFileUploadModal = () => {
    setShowFileUpload(true)
  }

  const closeFileUploadModal = () => {
    setShowFileUpload(false)
  }

  const deleteChat = async (idToDelete: number) => {
    try {
      const res = await fetch(`/api/delete-chat?chat_id=${idToDelete}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Failed to delete chat')
      }

      // Una vez borrado, necesitamos seleccionar el chat anterior:
      // Encontrar el índice del chat borrado en 'chats'
      const index = chats.findIndex(c => c.id === idToDelete)
      let newChatIdToSelect: number | null = null

      if (index > 0) {
        // Hay un chat anterior
        newChatIdToSelect = chats[index - 1].id
      } else {
        // No hay chat anterior, creamos uno nuevo
        newChatIdToSelect = await createNewChat()
      }

      if (newChatIdToSelect) {
        router.push(`/sara-ia/${newChatIdToSelect}`)
      } else {
        // Si por alguna razón no se creó el nuevo chat, refrescar simplemente
        // (aunque no debería pasar)
      }

      router.refresh()
    } catch (error) {
      console.error('Error deleting chat:', error)
    }
  }

  return (
    <aside className={cn(
      'transition-all duration-300 ease-in-out text-purple-300 bg-purple-900 flex flex-col h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] overflow-hidden rounded-s-3xl',
      {
        'w-full p-4': isOpen,
        'w-16 p-2': !isOpen
      }
    )}>

      {showFileUpload && (
        // Modal overlay para FileUpload
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-md w-full">
            <button
              onClick={closeFileUploadModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4 text-black">Subir Archivo</h2>
            <FileUpload
              onUploadSuccess={(newChatId) => {
                closeFileUploadModal()
                if (newChatId) {
                  router.push(`/sara-ia/${newChatId}`)
                }
                router.refresh()
              }}
            />
          </div>
        </div>
      )}

      <div className={cn(
        'flex flex-col mt-5 gap-4',
        { 'items-center': !isOpen }
      )}>
        
        <SidebarCloseIcon 
          className={cn(
            "w-6 h-6 cursor-pointer transition-transform duration-300 self-end",
            { 'rotate-180': !isOpen }
          )}
          onClick={toggleSidebar}
        />

        {isOpen && (
          <Button 
            onClick={async () => {
              const newId = await createNewChat()
              if (newId) {
                router.push(`/sara-ia/${newId}`)
                router.refresh()
              }
            }}
            className="w-full bg-purple-100 hover:bg-purple-300 hover:font-semibold text-purple-900 border-dashed border-white border"
          >
            <PlusCircle className="mr-2 w-4 h-4" />
            Nuevo Chat
          </Button>
        )}

        {isOpen && isAdmin && (
          <Button 
            onClick={openFileUploadModal}
            className="w-full bg-green-100 hover:bg-green-300 hover:font-semibold text-green-900 border-green border" 
          >
            <PlusCircle className="mr-2 w-4 h-4" />
            Añadir contenido
          </Button>
        )}  

      </div>

      <div className={cn(
        "flex flex-col gap-2 mt-10 flex-1 overflow-y-auto",
        { 'mx-5': isOpen }
      )}>
        {isOpen && chats.map(chat =>{
          const isUploadedChat = chat.pdfName && chat.pdfName !== 'New Chat'
          const isSelected = chat.id === chatId
          return (
            <div key={chat.id} className="flex items-center gap-2">
              {/* Botón para borrar el chat (solo admin) */}
              {isAdmin && (
                <button onClick={() => deleteChat(chat.id)}>
                  <Trash2 className="w-4 h-4 text-red-600 hover:text-red-400" />
                </button>
              )}
              
              <Link href={`/sara-ia/${chat.id}`} className={cn('rounded-lg p-3 flex-1 flex items-center', {
                // Chats subidos (verde)
                'bg-green-300 text-black': isUploadedChat && isSelected,
                'bg-purple-900 border-2 border-green-300 text-green-100 hover:text-green-50': isUploadedChat && !isSelected,

                // Chats normales (morado)
                'bg-purple-300 text-black': !isUploadedChat && isSelected,
                'border-2 border-purple-300 hover:text-purple-50': !isUploadedChat && !isSelected,
              })}>
                <MessageCircle className="mr-2 w-4 h-4" />
                <p className="w-full overflow-hidden truncate text-sm whitespace-nowrap text-ellipsis">
                  {isUploadedChat ? chat.pdfName : formatDate(chat.createdAt)}
                </p>
              </Link>
            </div>
          )
        })}
      </div>

      {isOpen && (
        <div className='mt-4'>
          <div className='flex items-center gap-2 text-xs text-slate-500 flex-wrap'>
            <Link href='/'>Inicio</Link>
            <Link href='/'>Fuentes</Link>
          </div>
        </div>
      )}
    </aside>
  )
}

export default ChatSideBarLeft
