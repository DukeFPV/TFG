//**REVISADO */
/**
 * Maneja solicitudes POST para generar una corriente de audio a partir del texto proporcionado utilizando ElevenLabs TTS.
 *
 * @param req - El objeto NextRequest que contiene la carga JSON con el texto a convertir.
 * @returns Un NextResponse que contiene el audio generado en formato MPEG con cabeceras apropiadas,
 *          o una respuesta de error JSON si falta el texto o falla la generación de TTS.
 *
 * @throws Retornará un error 400 si el campo `text` no se proporciona en el cuerpo de la solicitud.
 * @throws Retornará un error 500 si hay un problema durante el proceso de generación de TTS.
 * @ignore Se ha eliminado la importación de las funciones de utilidad de S3.
 */

import { NextRequest, NextResponse } from "next/server"
import { ElevenLabsClient } from "elevenlabs"
// import {
//   uploadAudioStreamToS3,
//   generatePresignedUrl,
// } from "@/lib/utils/uploadToS3"
import dotenv from "dotenv"

dotenv.config()

const XI_API_KEY = process.env.XI_API_KEY

if (!XI_API_KEY) {
  throw new Error("Missing XI_API_KEY in environment variables")
}

const client = new ElevenLabsClient({
  apiKey: XI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 })
  }

  try {
    // Generar un stream de audio a partir del texto proporcionado
    const audioStream = await client.generate({
      voice: "gD1IexrzCvsXPHUuT0s3", // Voz de SARA en español reemplazar por otra de ElevenLabs
      model_id: "eleven_flash_v2_5",
      voice_settings: { similarity_boost: 0.5, stability: 0.5 },
      text,
    })

    const chunks: Buffer[] = []
    for await (const chunk of audioStream) {
      chunks.push(chunk)
    }
    const audioBuffer = Buffer.concat(chunks)
    //console.log("API Generated audio buffer:", audioBuffer)

    // Retorna el audio de buffer
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
      },
    })

    // // Upload audio to S3
    // const s3Path = await uploadAudioStreamToS3(audioBuffer)

    // // Generate a presigned URL for the uploaded audio
    // const presignedUrl = await generatePresignedUrl(s3Path)

    // return NextResponse.json({ url: presignedUrl }, { status: 200 })
  } catch (error) {
    console.error("Error generating TTS:", error)
    return NextResponse.json({ error: "Error generating TTS" }, { status: 500 })
  }
}
