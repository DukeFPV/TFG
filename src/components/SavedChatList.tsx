//**Revisado */
/**
 * Un componente que renderiza la lista de chats guardados.
 *
 * @component
 * @param {Object} props - Las propiedades del componente
 * @param {Array<{
 *   id: number,
 *   title?: string,
 *   createdAt: string | Date
 * }>} props.chats - Array de objetos chat para mostrar
 *
 * @remarks
 * El componente muestra una lista desplazable de chats guardados. Cada chat está representado por un botón
 * que muestra el título del chat (o "Chat {id}" si no existe título) y la fecha de creación.
 * Cuando se selecciona un chat, navega a la página de ese chat.
 *
 * Características:
 * - Estado de carga con indicador accesible
 * - Mensaje de estado vacío cuando no existen chats
 * - Etiquetas de botón accesibles para lectores de pantalla
 * - Efectos hover para mejor interactividad
 *
 * @returns {JSX.Element} La lista de chats guardados
 */

"use client"

import { useRouter } from "next/navigation"
import LoadingBubble from "./LoadingBubble"
import { useState } from "react"

interface Chat {
  id: number
  title?: string
  createdAt: string | Date
  userId: string
}

interface SavedChatsListProps {
  chats: Chat[]
}

export function SavedChatsList({ chats }: SavedChatsListProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChatSelect = async (chatId: number) => {
    try {
      setIsLoading(true)
      router.push(`/sara-ia/${chatId}`)
    } catch (error) {
      console.error("Error selecting chat:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full overflow-y-auto rounded-md">
      {isLoading ? (
        <div
          className="flex items-center justify-center h-40"
          role="status"
          aria-live="polite"
        >
          <LoadingBubble />
          {/* Para los lectores de pantalla en accesibilidad */}
          <span className="sr-only">Cargando...</span>
        </div>
      ) : chats && chats.length > 0 ? (
        chats.map((chat) => (
          <button
            key={chat.id}
            className="p-4 border-b cursor-pointer w-full hover:bg-purple-300 bg-purple-50/50 mb-2 flex justify-between items-start"
            onClick={() => handleChatSelect(chat.id)}
            aria-label={`Seleccionar chat ${chat.title || `Chat ${chat.id}`}`}
          >
            <div>
              <h2 className="font-semibold">
                {chat.title || `Chat ${chat.id}`}
              </h2>
              <p
                className="text-sm text-slate-600"
                aria-label="Fecha de creación del chat"
              >
                {new Date(chat.createdAt).toLocaleString()}
              </p>
            </div>
            <span aria-hidden="true" className="mt-2 text-purple-700">
              {">"}
            </span>
          </button>
        ))
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500">No hay chats guardados</p>
        </div>
      )}
    </div>
  )
}
