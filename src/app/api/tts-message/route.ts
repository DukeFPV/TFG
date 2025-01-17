//**Revisado */

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { messages } from "@/lib/db/schema"

/**
 * Maneja las solicitudes POST para los mensajes que se envían de forma manual para iniciar o finalizar la conversación.
 *
 * @param req - El objeto de solicitud entrante.
 * @returns Una respuesta JSON que indica éxito o un error.
 * @throws {401} No autorizado si el usuario no está autenticado.
 * @throws {500} Error del servidor si hay un problema al guardar el mensaje.
 */
export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { chatId, content, role } = await req.json()

    // Guarda el mensaje en la base de datos
    await db
      .insert(messages)
      .values({
        chatId,
        content,
        role,
        createdAt: new Date(),
      })
      .execute()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
