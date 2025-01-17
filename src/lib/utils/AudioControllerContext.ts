"use client"

import React, { createContext, useContext, useRef, useState } from 'react'

interface AudioControllerContextType {
  isPlaying: boolean
  isPaused: boolean
  handlePause: () => void
  handleStop: () => void
  setCurrentAudio: (audio: HTMLAudioElement) => void
}

const AudioControllerContext = createContext<AudioControllerContextType | undefined>(undefined)

export function AudioControllerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const setCurrentAudio = (audio: HTMLAudioElement) => {
    audioRef.current = audio
    
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setIsPaused(false)
    })
  }

  const handlePause = () => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
      setIsPaused(!isPaused)
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
      setIsPlaying(false)
      setIsPaused(false)
    }
  }

  return (
    <AudioControllerContext.Provider 
      value={{
        isPlaying,
        isPaused,
        handlePause,
        handleStop,
        setCurrentAudio
      }}
    >
      {children}
    </AudioControllerContext.Provider>
  )
}

export function useAudioController() {
  const context = useContext(AudioControllerContext)
  if (!context) {
    throw new Error('useAudioController must be used within AudioControllerProvider')
  }
  return context
}