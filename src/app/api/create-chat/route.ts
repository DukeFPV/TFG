// /api/create-chat
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone"
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const {userId} = await auth()
  if (!userId) {
    return NextResponse.json({ error: "No se ha autenticado el usuario" }, { status: 401 })
  }

  const isAdmin = userId === 'user_2ooPGvdai0IRYfKUmWh7T5y3rxp';

  // Si quieres que solo el admin pueda subir archivos, comprueba esto:
  if (!isAdmin) {
    return NextResponse.json({ error: "No tienes permiso para esta acción" }, { status: 403 })
  }

  try {
    const body = await req.json()
    const file_key = body?.file_key || ''
    const file_name = body?.file_name || 'New Chat'

    console.log('debug new-chat route api', file_key, file_name)
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
      isPublic: isAdmin,
    })
    .returning({
      insertedId: chats.id
    })
    
    return NextResponse.json({
      chat_id: chat_id[0].insertedId
    },{
      status: 200
    })

  } catch (error) {

    console.error(error)
    return NextResponse.json(
      { error: "Error al crear el chat" }, 
      { status: 500 }
    )
  }
  
}
