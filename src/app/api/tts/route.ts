import { NextRequest, NextResponse } from "next/server"
import { ElevenLabsClient } from "elevenlabs"
import {
  uploadAudioStreamToS3,
  generatePresignedUrl,
} from "@/lib/utils/uploadToS3"
import dotenv from "dotenv"

dotenv.config()

const XI_API_KEY = process.env.XI_API_KEY

if (!XI_API_KEY) {
  throw new Error("Missing XI_API_KEY in environment variables")
}

const client = new ElevenLabsClient({
  apiKey: XI_API_KEY,
})

/**
 * Handles POST requests to generate TTS audio, upload it to S3, and return a presigned URL.
 */
export async function POST(req: NextRequest) {
  const { text } = await req.json()

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 })
  }

  try {
    // Generate audio stream from text using ElevenLabs
    const audioStream = await client.generate({
      voice: "gD1IexrzCvsXPHUuT0s3", // Replace with your desired voice ID
      model_id: "eleven_flash_v2_5",
      voice_settings: { similarity_boost: 0.5, stability: 0.5 },
      text,
    })

    const chunks: Buffer[] = []
    for await (const chunk of audioStream) {
      chunks.push(chunk)
    }
    const audioBuffer = Buffer.concat(chunks)
    console.log("API 45 Generated audio buffer:", audioBuffer)

    // Upload audio to S3
    const s3Path = await uploadAudioStreamToS3(audioBuffer)

    // Generate a presigned URL for the uploaded audio
    const presignedUrl = await generatePresignedUrl(s3Path)

    return NextResponse.json({ url: presignedUrl }, { status: 200 })
  } catch (error) {
    console.error("Error generating TTS:", error)
    return NextResponse.json({ error: "Error generating TTS" }, { status: 500 })
  }
}
