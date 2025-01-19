// archivo del repositorio de 11labs
"use client"

import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useRef } from "react"
import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useChatContext } from "@/context/ChatContext"
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
    isAudioPlaying,
  } = useChatContext()

  // Estados para el componente
  const [isConnected, setIsConnected] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const handlePause = () => {
    pauseAudio()
    setIsPaused(!isPaused)
  }

  const handleStop = () => {
    stopAudio()
    setIsPaused(false)
  }

  const handleStart = useCallback(async () => {
    setIsConnected(true)
    await startConversation()
  }, [startConversation])

  const handleEnd = useCallback(async () => {
    setIsConnected(false)
    await endConversation()
  }, [endConversation])

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
              />
            </div>

            <div className="flex justify-center gap-4">
              {!isConnected ? (
                <Button
                  variant="outline"
                  className="rounded-full hover:bg-teal-100"
                  size="lg"
                  onClick={handleStart}
                  aria-label="Empezar conversación"
                >
                  Empezar conversación
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-cyan-600 hover:bg-teal-100 hover:border-cyan-700"
                    size="lg"
                    onClick={handlePause}
                    aria-label={isPaused ? "Reanudar audio" : "Pausar audio"}
                  >
                    {isPaused ? <Play /> : <Pause />}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-rose-500 hover:bg-rose-100 hover:border-rose-600"
                    size="lg"
                    onClick={handleStop}
                    aria-label="Detener audio"
                  >
                    <Square />
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              className="rounded-full bg-rose-200 border-rose-300 
                         text-red-950 hover:bg-rose-400 hover:border-rose-400"
              size="lg"
              onClick={handleEnd}
              disabled={!isConnected}
              aria-disabled={!isConnected}
              aria-label="Finalizar conversación"
            >
              Finalizar conversación
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
