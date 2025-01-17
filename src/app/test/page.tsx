"use client"

import React, { useState, useEffect, useRef } from "react"

const TestTTS = () => {
  const [text, setText] = useState("")
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err))
    }
  }, [audioUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setAudioUrl(null)

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate speech")
      }

      const data = await response.json()
      setAudioUrl(data.url)
    } catch (err) {
      console.error("Error:", err)
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Test TTS</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Speech"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Hidden audio element for autoplay */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} hidden />}
    </div>
  )
}

export default TestTTS
