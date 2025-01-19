//**Revisado */
/**
 * Un componente de página que maneja la funcionalidad del chat.
 *
 * @component
 * @async
 *
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.params - Parámetros de la URL
 * @param {string[]} [props.params.chatId] - ID del chat opcional desde la URL
 *
 * @returns {Promise<JSX.Element|Response>} Retorna:
 * - Redirección a la página de inicio de sesión si el usuario no está autenticado
 * - Redirección a un nuevo chat si el usuario no tiene chats
 * - Redirección al primer chat si no se proporciona chatId
 * - Redirección al primer chat si el chatId proporcionado no es válido
 * - Interfaz de chat con barras laterales y componente de chat si el chatId es válido
 *
 * @description
 * Este componente maneja la funcionalidad principal de la página de chat incluyendo:
 * - Navegación dinámica a través de los chats del usuario [[...chatId]]
 * - Verificación de autenticación del usuario
 * - Creación de chat para nuevos usuarios
 * - Navegación y enrutamiento del chat
 * - Renderizado de la interfaz de chat con diseño responsivo
 * - Visualización de barra lateral izquierda (lista de chats), área principal de chat y barra lateral derecha
 */

import React from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import ChatSideBarR from "@/components/ChatSideBarR"
import ChatSideBarLeft from "@/components/ChatSideBarLeft"
import ChatComponent from "@/components/ChatComponent"
import ResponsiveChatWrapper from "@/components/ResponsiveChatWrapper"
import QueryProvider from "@/components/Provider"
import ChatProviderWrapper from "@/components/ChatProviderWrapper"

// Modificación de los Props para que sean una promesa por la actualización de Next.js v15
type Params = Promise<{ chatId: string }>

const ChatPage = async (props: { params: Params }) => {
  const params = await props.params
  const chatIdStr = params.chatId ? params.chatId[0] : null
  const { userId } = await auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const userChats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId))

  // Crear un nuevo chat si el usuario no tiene chats
  if (!userChats || userChats.length === 0) {
    const [newChat] = await db
      .insert(chats)
      .values({
        userId,
        pdfName: "New Chat",
        pdfUrl: "",
        fileKey: "",
        isPublic: false,
        createdAt: new Date(),
      })
      .returning({ id: chats.id })

    return redirect(`/sara-ia/${newChat.id}`)
  }

  // Manejar la redirección si no se proporciona un chatId
  if (!chatIdStr) {
    return redirect(`/sara-ia/${userChats[0].id}`)
  }

  // Obtener el chat actual
  const chatId = parseInt(chatIdStr, 10)
  const currentChat = userChats.find((chat) => chat.id === chatId)

  if (!currentChat) {
    return redirect(`/sara-ia/${userChats[0].id}`)
  }

  return (
    <QueryProvider>
      <ChatProviderWrapper chatId={currentChat.id}>
        <ResponsiveChatWrapper
          chats={userChats}
          currentChatId={currentChat?.id}
        >
          <main
            className="flex h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] overflow-hidden"
            id="chat-main"
          >
            <div className="hidden sm:block sm:max-w-xs h-full">
              <ChatSideBarLeft chats={userChats} chatId={currentChat?.id} />
            </div>

            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {currentChat ? (
                <ChatComponent chatId={currentChat.id} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Por favor selecciona un chat desde la barra lateral.</p>
                </div>
              )}
            </div>

            <div className="sm:flex-[1] sm:max-w-xs h-full">
              <ChatSideBarR chatId={currentChat.id} />
            </div>
          </main>
        </ResponsiveChatWrapper>
      </ChatProviderWrapper>
    </QueryProvider>
  )
}

export default ChatPage
