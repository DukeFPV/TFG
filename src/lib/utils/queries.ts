//**Revisado */
/**
 * Guarda los mensajes del chat en la base de datos.
 *
 * @param params - El objeto de parámetros
 * @param params.id - El ID del chat
 * @param params.messages - Array de mensajes del chat a guardar
 * @param params.userId - El ID del usuario asociado al chat (actualmente comentado en la implementación)
 *
 * @throws {Error} Si hay un error al guardar los mensajes en la base de datos
 *
 * @example
 * await saveChat({
 *   id: 1,
 *   messages: [{content: 'Hola', role: 'user'}],
 *   userId: 'usuario123'
 * });
 */

import { db } from "@/lib/db"
import { chats, messages as messagesTable } from "@/lib/db/schema"
import { eq, or } from "drizzle-orm"

interface ChatMessage {
  content: string
  role: "user" | "system" | "assistant"
}

// --- Función para guardar un chat en la base de datos ---
export async function saveChat({
  id,
  messages,
  //userId,
}: {
  id: number
  messages: ChatMessage[]
  userId: string
}) {
  try {
    for (const message of messages) {
      await db.insert(messagesTable).values({
        chatId: id,
        content: message.content,
        role: message.role,
        createdAt: new Date(),
      })
    }
  } catch (error) {
    console.error("Error al guardar el chat en la base de datos:", error)
    throw error
  }
}

// --- Funcion para obtener los chats accesibles por un usuario ---
export async function getAccessibleChats(userId: string) {
  return await db
    .select()
    .from(chats)
    .where(or(eq(chats.userId, userId), eq(chats.isPublic, true)))
}
