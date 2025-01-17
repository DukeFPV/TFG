// archivo del repositorio de 11labs
"use client"

import { Button } from "@/components/ui/button"
import { useCallback, useEffect } from "react"
import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Conversation } from "@11labs/client"
// import { useChatContext } from "@/context/ChatContext"
// import {cn} from "@/lib/utils";
import Image from "next/image"
import { useConversation } from "@11labs/react"
import { useChatContext } from "@/context/ChatContext"
import { set } from "zod"
//import { console } from "inspector"

// async function requestMicrophonePermission() {
//   try {
//     await navigator.mediaDevices.getUserMedia({ audio: true })
//     return true
//   } catch {
//     console.error("Permiso al microfono denegado")
//     return false
//   }
// }

// async function getSignedUrl(): Promise<string> {
//   const response = await fetch("/api/tts")
//   if (!response.ok) {
//     throw Error("Error al obtener signed-url")
//   }
//   const data = await response.json()
//   return data.signedUrl
// }

/**
 * Este componente:
 * - Inicia la sesión de ElevenLabs (STT),
 * - Detecta la voz del usuario y la transcribe.
 * - Pasa el texto transcrito al ChatContext => GPT => TTS.
 */
/**
 * Este componente:
 * - Inicia la conversación de TTS,
 * - Finaliza la conversación de TTS.
 */
export function ConvAI() {
  const { startConversation, endConversation, isProcessingChunk } =
    useChatContext()

  // Estados para el componente
  const [isConnected, setIsConnected] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    setIsSpeaking(isProcessingChunk)
  }, [isProcessingChunk])
  console.log("audioPlay ConvAI", isProcessingChunk)

  const handleStart = useCallback(async () => {
    setIsConnected(true)
    await startConversation()
  }, [startConversation])

  const handleEnd = useCallback(async () => {
    await endConversation()
  }, [endConversation])

  //const { handleSTTText } = useChatContext()

  // const {
  //   startSession,
  //   endSession,
  //   status,
  //   isSpeaking: isAiSpeaking,
  // } = useConversation({
  //   onMessage: ({ message, source }) => {
  //     // console.log("[ElevenLabs] desde convAI onMessage", source, message)
  //     // if (source === "user") {
  //     //   // Aquí llega la transcripción
  //     //   handleSTTText(message)
  //     // }
  //   },
  //   onConnect: () => {
  //     console.log("Conversación conectada (STT activo)")
  //     setIsConnected(true)
  //   },
  //   onDisconnect: () => {
  //     console.log("Conversación desconectada")
  //     setIsConnected(false)
  //     setIsSpeaking(false)
  //   },
  //   onModeChange: ({ mode }: { mode: "speaking" | "listening" }) => {
  //     // 'speaking' | 'listening'
  //     setIsSpeaking(mode === "speaking")
  //   },
  //   onError: (err) => {
  //     console.error("ElevenLabs error =>", err)
  //     alert("Error con ElevenLabs")
  //   },
  // })

  // const handleStart = useCallback(async () => {
  //   const hasPermission = await requestMicrophonePermission()
  //   if (!hasPermission) {
  //     alert("No hay permiso de micrófono")
  //     return
  //   }
  //   const url = await getSignedUrl()
  //   // Iniciamos la conversación
  //   await startSession({ signedUrl: url })
  // }, [startSession])

  // const handleEnd = useCallback(async () => {
  //   await endSession()
  // }, [endSession])

  return (
    <div className="flex justify-center items-center gap-x-4">
      <Card className="rounded-3xl">
        <CardContent>
          <CardHeader>
            <CardTitle className="text-center">
              {isConnected
                ? isSpeaking
                  ? "Sara está hablando"
                  : "Sara está escuchando"
                : "Desconectado"}
            </CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-y-4 text-center">
            <div className="rounded-3xl">
              <Image
                src="/icons/sara-avatar.png"
                alt="SARA"
                width={150}
                height={150}
                className="mx-auto w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-full"
              />
            </div>

            <Button
              variant="outline"
              className="rounded-full"
              size="lg"
              //disabled={status === "connected"}
              onClick={handleStart}
            >
              Empezar conversación
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              size="lg"
              // disabled={status === "disconnected"}
              onClick={handleEnd}
            >
              Finalizar conversación
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
