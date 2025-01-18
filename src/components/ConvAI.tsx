// archivo del repositorio de 11labs
"use client"

import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useRef } from "react"
import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Conversation } from "@11labs/client"
// import { useChatContext } from "@/context/ChatContext"
// import {cn} from "@/lib/utils";
import Image from "next/image"
import { useChatContext } from "@/context/ChatContext"
import { set } from "zod"
import { cn } from "@/lib/utils"
import { Pause, Play, Square } from "lucide-react"

/**
 * Este componente:
 * - Inicia la conversación de TTS,
 * - Finaliza la conversación de TTS.
 */
export function ConvAI() {
  const {
    startConversation,
    endConversation,
    audioPlay,
    pauseAudio,
    stopAudio,
  } = useChatContext()

  // Estados para el componente
  const [isConnected, setIsConnected] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const handlePause = () => {
    pauseAudio()
    setIsPaused(!isPaused)
  }

  const handleStop = () => {
    stopAudio()
    setIsPaused(false)
  }

  // Monitorea los cambios en audioPlay para cambiar el estado de la conversación
  useEffect(() => {
    const handleAudioStateChange = (event: CustomEvent) => {
      setIsAudioPlaying(event.detail.isPlaying)
    }
    window.addEventListener(
      "audioStateChange",
      handleAudioStateChange as EventListener,
    )
    return () => {
      window.removeEventListener(
        "audioStateChange",
        handleAudioStateChange as EventListener,
      )
    }
  }, [])

  const handleStart = useCallback(async () => {
    setIsConnected(true)
    await startConversation()
  }, [startConversation])

  const handleEnd = useCallback(async () => {
    setIsConnected(false)
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
              {!isConnected
                ? "Desconectada"
                : isAudioPlaying
                  ? "Sara está hablando"
                  : audioPlay
                    ? "Conectada"
                    : "Sara conectada en espera"}
            </CardTitle>
          </CardHeader>
          <div className="flex flex-col gap-y-4 text-center">
            <div className="rounded-3xl relative z-10">
              <Image
                src="/icons/sara-avatar.png"
                alt="SARA"
                width={150}
                height={150}
                className="mx-auto w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-full"
              />
              <div
                className={cn(
                  "absolute mx-auto w-[80px] h-[80px] md:w-[150px] md:h-[150px] -inset-1 rounded-full blur-md -z-20",
                  {
                    hidden: !isConnected,
                    "bg-gradient-to-br from-amber-500 via-red-500 to-yellow-500":
                      isAudioPlaying,
                    "bg-gradient-to-br from-teal-500 via-lime-500 to-green-500":
                      isConnected && !isAudioPlaying,
                  },
                )}
              ></div>
            </div>
            <div className="flex justify-center gap-4">
              {!isConnected ? (
                <Button
                  variant="outline"
                  className="rounded-full"
                  size="lg"
                  onClick={handleStart}
                >
                  Empezar conversación
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    size="lg"
                    onClick={handlePause}
                  >
                    {isPaused ? <Play /> : <Pause />}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    size="lg"
                    onClick={handleStop}
                  >
                    <Square />
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              className="rounded-full bg-pink-300 border-pink-300 text-red-900"
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
