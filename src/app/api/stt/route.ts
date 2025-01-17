import { NextRequest } from "next/server"
import { SpeechClient } from "@google-cloud/speech"
import { PassThrough } from "stream"

// Para usar las APIs de Node y gRPC:
export const runtime = "nodejs"

const client = new SpeechClient()

export async function POST(req: NextRequest) {
  try {
    // Verificamos form-data
    const contentType = req.headers.get("content-type") || ""
    if (!contentType.includes("multipart/form-data")) {
      return new Response("Must be multipart form data", { status: 400 })
    }

    const formData = await req.formData()
    const audioFile = formData.get("file") as File | null
    if (!audioFile) {
      return new Response("No file", { status: 400 })
    }

    // Convertimos File a Buffer
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Configuración del reconocimiento streaming
    const sttConfig = {
      config: {
        encoding: "WEBM_OPUS" as const, // Ajusta si tu audio está en opus
        sampleRateHertz: 48000,
        languageCode: "es-ES",
      },
      interimResults: false,
    }

    // Retornamos una Promesa para poder “esperar” a que .on('end') finalice
    return await new Promise<Response>((resolve, reject) => {
      let transcript = ""

      // Creamos el stream Duplex
      const sttStream = client
        .streamingRecognize(sttConfig)
        .on("data", (data) => {
          // data.results: array de resultados (cada uno con alternatives)
          data.results.forEach((result: any) => {
            if (result.alternatives && result.alternatives[0]) {
              transcript += result.alternatives[0].transcript + " "
            }
          })
        })
        .on("error", (err: Error) => {
          console.error("STT route error:", err)
          reject(
            new Response(`Error: ${err.message}`, {
              status: 500,
            }),
          )
        })
        .on("end", () => {
          // Cuando finaliza el stream, devolvemos la transcripción
          resolve(
            new Response(JSON.stringify({ text: transcript }), {
              headers: { "Content-Type": "application/json" },
            }),
          )
        })

      // Pasamos el buffer de audio “todo de golpe”
      sttStream.write(buffer)
      sttStream.end()
    })
  } catch (err: any) {
    console.error("STT route error:", err)
    return new Response(`Error: ${err.message}`, { status: 500 })
  }
}
