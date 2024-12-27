// /api/delete-chat/route.ts
import { db } from "@/lib/db"
import { chats, messages } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  const isAdmin = userId === "user_2ooPGvdai0IRYfKUmWh7T5y3rxp"
  if (!isAdmin) {
    return NextResponse.json(
      { error: "No tienes permiso para esta acción" },
      { status: 403 },
    )
  }

  const url = new URL(req.url)
  const chatId = url.searchParams.get("chat_id")
  if (!chatId) {
    return NextResponse.json(
      { error: "chat_id no proporcionado" },
      { status: 400 },
    )
  }

  const chat_id_number = parseInt(chatId, 10)
  if (isNaN(chat_id_number)) {
    return NextResponse.json({ error: "chat_id inválido" }, { status: 400 })
  }

  try {
    // Primero borrar todos los mensajes asociados a este chat
    await db.delete(messages).where(eq(messages.chatId, chat_id_number))

    // Luego borrar el chat en sí
    await db.delete(chats).where(eq(chats.id, chat_id_number))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error("Error al eliminar chat:", error)
    return NextResponse.json(
      { error: "Error interno al eliminar el chat" },
      { status: 500 },
    )
  }
}
