import React from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import ChatSideBarRight from "@/components/ChatSideBarR"
import ChatSideBarLeft from "@/components/ChatSideBarLeft"
// TODO Visible en el componente de chat mitad para cada uno import PDFViewer from '@/components/PDFViewer';
import ChatComponent from "@/components/ChatComponent"
import ResponsiveChatWrapper from "@/components/ResponsiveChatWrapper"
import LoadingBubble from "@/components/LoadingBubble"
import PromtCards from "@/components/PromtCards"

// Modificacion de los Props para que sean una promesa por la actulización de Next.js v15
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

  if (!userChats || userChats.length === 0) {
    return redirect("/")
  }

  let currentChat

  if (!chatIdStr) {
    const mostRecentChat = userChats[0]
    return redirect(`/sara-ia/${mostRecentChat.id}`)
  } else {
    const chatId = parseInt(chatIdStr, 10)
    currentChat = userChats.find((chat) => chat.id === chatId)

    if (!currentChat) {
      return redirect("/")
    }
  }

  return (
    <ResponsiveChatWrapper chats={userChats} currentChatId={currentChat?.id}>
      <div className="flex h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] overflow-hidden">
        <div className="hidden sm:block sm:max-w-xs h-full">
          <ChatSideBarLeft chats={userChats} chatId={currentChat?.id} />
        </div>

        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {currentChat ? (
            <ChatComponent chatId={currentChat.id} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Por favor seleccione un chat desde la barra lateral.</p>
            </div>
          )}
        </div>

        <div className="sm:flex-[1] sm:max-w-xs h-full">
          <ChatSideBarRight />
        </div>
      </div>
    </ResponsiveChatWrapper>
  )
}

export default ChatPage
