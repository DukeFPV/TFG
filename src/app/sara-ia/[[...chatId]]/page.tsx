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
// import LoadingBubble from "@/components/LoadingBubble"
// import PromtCards from "@/components/PromtCards"
import QueryProvider from "@/components/Provider" // Importar el Provider existente
import ChatProviderWrapper from "@/components/ChatProviderWrapper" // Importar el ChatProviderWrapper
import { revalidatePath } from "next/cache"

// Modificación de los Props para que sean una promesa por la actualización de Next.js v15
type Params = Promise<{ chatId: string }>

/* type Props = {
  params: {
    chatId?: string[];
  };
}; */

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

  // Handle missing chatId
  if (!chatIdStr) {
    return redirect(`/sara-ia/${userChats[0].id}`)
  }

  // Get current chat
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
          <div className="flex h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] overflow-hidden">
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
          </div>
        </ResponsiveChatWrapper>
      </ChatProviderWrapper>
    </QueryProvider>
  )
}

export default ChatPage
