//**Revisado */
/**
 * Maneja las solicitudes POST para crear un nuevo chat.
 *
 * @async
 * @param {Request} req - El objeto de solicitud HTTP entrante
 * @returns {Promise<NextResponse>} Una respuesta JSON que contiene:
 *   - En caso de éxito: chat_id del chat recién creado con estado 200
 *   - En error de autenticación: mensaje de error con estado 401
 *   - En otros errores: mensaje de error con estado 500
 *
 * @throws Lanzará un error si:
 *   - Las operaciones de base de datos fallan
 *   - Las operaciones S3 fallan durante la carga del archivo
 *
 * @description Este endpoint:
 *   1. Verifica la autenticación del usuario
 *   2. Extrae file_key y file_name del cuerpo de la solicitud
 *   3. Carga el archivo en Pinecone si existe file_key
 *   4. Crea una nueva entrada de chat en la base de datos
 *   5. Devuelve el chat_id creado
 */

import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { loadS3IntoPinecone } from "@/lib/pinecone"
import { getS3Url } from "@/lib/s3"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: "No se ha autenticado el usuario" },
      { status: 401 },
    )
  }

  try {
    const body = await req.json()
    const file_key = body?.file_key || ""
    const file_name = body?.file_name || "New Chat"

    //console.log('debug new-chat route api', file_key, file_name)
    if (file_key) {
      await loadS3IntoPinecone(file_key)
    }

    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId: userId,
        isPublic: false, // Ajustar a falso si el archivo es privado
      })
      .returning({
        insertedId: chats.id,
      })

    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al crear el chat" },
      { status: 500 },
    )
  }
}
