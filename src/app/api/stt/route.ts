//TODO Implementar la API para el reconocimiento de voz

import { NextRequest } from "next/server"
import { SpeechClient } from "@google-cloud/speech"
import { PassThrough } from "stream"

// Para usar las APIs de Node y gRPC:
export const runtime = "nodejs"

const client = new SpeechClient()

export async function POST(req: NextRequest) {
  // Extraer el audio del cuerpo de la solicitud
}
