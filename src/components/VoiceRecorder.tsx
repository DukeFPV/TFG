//TODO: Implementar un componente VoiceRecorder que permita grabar audio y enviarlo al servidor para ser transcrito a texto.

"use client"

import React, { useRef, useState } from "react"
import { useChatContext } from "@/context/ChatContext"

export function VoiceRecorder() {
  const { handleSTText } = useChatContext()
  const [recording, setRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      })
      chunksRef.current = []
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const formData = new FormData()
        formData.append("file", blob, "audio.webm")

        try {
          const res = await fetch("/api/stt", {
            method: "POST",
            body: formData,
          })
          if (!res.ok) throw new Error("STT fetch fail")
          const data = await res.json()
          handleSTText(data.text) // inyectar al chat el texto transcrito
        } catch (error) {
          console.error("Error STT request:", error)
        }
      }

      mediaRecorder.start()
      setRecording(true)
    } catch (err) {
      console.error("Error userMedia:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
    }
  }

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>Detener</button>
      ) : (
        <button onClick={startRecording}>Grabar</button>
      )}
    </div>
  )
}
