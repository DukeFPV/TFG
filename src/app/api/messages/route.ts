//**Revisado */
/**
 * Maneja las solicitudes POST para la creación de mensajes.
 *
 * @async
 * @param {Request} req - El objeto de solicitud HTTP entrante
 * @returns {Promise<NextResponse>} Respuesta JSON con:
 * - En éxito: El objeto mensaje creado conteniendo id, content, role, createdAt e image
 * - En error de autenticación: estado 401 con mensaje de error
 * - En error de validación: estado 400 con detalles de validación
 * - En otros errores: estado 500 con mensaje de error
 *
 * @throws {ZodError} Cuando el cuerpo de la solicitud falla en la validación del esquema
 *
 * La función:
 * 1. Autentica al usuario
 * 2. Valida el cuerpo de la solicitud contra MessageSchema
 * 3. Inserta el mensaje en la base de datos con imagen opcional
 * 4. Devuelve el mensaje creado o una respuesta de error apropiada
 */

import { db } from "@/lib/db"
import { messages } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { eq, asc } from "drizzle-orm"
import { z } from "zod"

// Definir el esquema de validación con zod
const MessageSchema = z.object({
  chatId: z.number(),
  content: z.string(),
  role: z.enum(["user", "assistant", "system"]),
  image: z.string().nullable(),
})

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = MessageSchema.parse(body) // Validar los datos

    // Extraer los campos requeridos del cuerpo de la solicitud
    const { chatId, content, role, image } = parsed

    // Insertar el mensaje en la base de datos
    const message = await db
      .insert(messages)
      .values({
        chatId,
        content,
        role,
        image: image || null, // Asignar null si no hay imagen
      })
      .returning({
        id: messages.id,
        content: messages.content,
        role: messages.role,
        createdAt: messages.createdAt,
        image: messages.image, // Asegurar que 'image' sea retornado
      })

    return NextResponse.json(message[0])
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Datos inválidos", details: error.errors },
        { status: 400 },
      )
    }
    return NextResponse.json({ error: "Error saving message" }, { status: 500 })
  }
}

// Peticiones GET para obtener mensajes
export async function GET(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const chatId = url.searchParams.get("chatId")

  if (!chatId) {
    return NextResponse.json({ error: "Chat ID requerido" }, { status: 400 })
  }

  try {
    // Asegurarse de que el chatId es un número
    const numericChatId = parseInt(chatId)
    if (isNaN(numericChatId)) {
      return NextResponse.json({ error: "Chat Id incorrecto" }, { status: 400 })
    }

    const savedMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, numericChatId))
      .orderBy(asc(messages.createdAt))
      .execute()

    // Retornar los mensajes dentro de un objeto con la propiedad 'messages'
    return NextResponse.json({ messages: savedMessages })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error obteniendo mensajes" },
      { status: 500 },
    )
  }
}
