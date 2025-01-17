//**Revisado */

"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { CustomMessage } from "@/types/interfaceTypes" // Importa el tipo personalizado
import React from "react"
import Image from "next/image"
import { useChatContext } from "@/context/ChatContext" // Importa el contexto
import ImageModal from "./ImageModal"
import MemoizedMarkdown from "./Memo-Markdown"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

/**
 * El componente `MessageList` renderiza una lista de mensajes con varias características interactivas.
 *
 * @param props - El objeto de propiedades.
 * @param props.messages - Un array de objetos de mensaje que se mostrarán en la lista.
 *
 * Características:
 * - Muestra mensajes tanto del usuario como del asistente con estilos distintos.
 * - Reproduce audio automáticamente para mensajes que incluyen un `audioUrl`, asegurando que cada audio se reproduzca solo una vez.
 * - Renderiza imágenes dentro de los mensajes y permite a los usuarios verlas en un modal con dimensiones ajustables.
 * - Proporciona botones interactivos dentro de los mensajes para navegar a través de pasos, incluyendo acciones como avanzar, retroceder, salir y reiniciar.
 * - Gestiona el estado para modales de imagen y diálogos de confirmación para reiniciar pasos.
 *
 * Dependencias:
 * - Utiliza `useChatContext` para gestionar acciones y estado relacionados con el chat.
 * - Usa `MemoizedMarkdown` para renderizar el contenido del mensaje en Markdown.
 * - Incorpora los componentes `ImageModal` y `AlertDialog` para interacciones de usuario mejoradas.
 *
 * Gestión de Estado:
 * - Mantiene el estado para la visibilidad del modal, la fuente y dimensiones de la imagen, y la visibilidad del diálogo de confirmación.
 * - Rastrea los mensajes reproducidos para evitar la reproducción repetida de audio.
 *
 */

type Props = {
  messages: CustomMessage[]
}

const MessageList = ({ messages }: Props) => {
  const {
    advanceStep,
    goBackStep,
    exitStepByStep,
    isStepByStep,
    isAtFirstStep,
    reiniciarStep,
  } = useChatContext()

  // Estados para el modal de imagen
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageSrc, setModalImageSrc] = useState<string>("")
  const [modalImageAlt, setModalImageAlt] = useState<string>("")
  const [modalImageWidth, setModalImageWidth] = useState<number>(600)
  const [modalImageHeight, setModalImageHeight] = useState<number>(400)

  // Añana un estado para rastrear si se está reproduciendo un audio
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Estados para el AlertDialog de reiniciar
  const [isReiniciarDialogOpen, setIsReiniciarDialogOpen] = useState(false)
  const [reiniciarMessageId, setReiniciarMessageId] = useState<string | null>(
    null,
  )

  // Función para abrir el modal con la imagen seleccionada
  const openModal = (
    src: string,
    alt: string,
    width: number,
    height: number,
  ) => {
    setModalImageSrc(src)
    setModalImageAlt(alt)
    setModalImageWidth(width)
    setModalImageHeight(height)
    setIsModalOpen(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Función para manejar clic en "Reiniciar"
  const handleReiniciarClick = (messageId: string) => {
    setReiniciarMessageId(messageId)
    setIsReiniciarDialogOpen(true)
  }

  // Función para confirmar reinicio desde chatContext
  const confirmReiniciar = () => {
    if (reiniciarMessageId) {
      reiniciarStep()
    }
    setIsReiniciarDialogOpen(false)
    setReiniciarMessageId(null)
  }

  // Mantener un registro de los mensajes cuyos audios ya se han reproducido
  const playedMessages = useRef<Set<string>>(new Set())
  console.log("playedMessages 115 MessagesList", playedMessages)

  // Reproducir audio automáticamente para mensajes con `audioUrl`
  const { playAudio } = useChatContext()

  useEffect(() => {
    messages.forEach((message) => {
      if (message.audioUrl && !playedMessages.current.has(message.id)) {
        playAudio(message.audioUrl)
        playedMessages.current.add(message.id)
      }
    })
  }, [messages, playAudio])

  return (
    <div className="flex flex-col gap-2 px-4 pb-3">
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end pl-10": message.role === "user",
              "justify-start pr-10": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "px-3 text-sm py-3 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-purple-800 text-white rounded-t-lg rounded-bl-lg":
                    message.role === "user",
                  "bg-purple-50/50 text-gray-800 rounded-t-lg rounded-br-lg":
                    message.role === "assistant",
                },
              )}
            >
              <MemoizedMarkdown id={message.id} content={message.content} />
              {/* Renderizar la imagen si existe y abre el modal con la imagen ampliada si lo permite*/}
              {message.image && (
                <div className="mt-2">
                  <Image
                    src={`/docs/${message.image}`} // Ruta corregida
                    alt={`Imagen para el mensaje ${message.id}`}
                    width={600} // Ajusta el tamaño según tus necesidades
                    height={400}
                    className="rounded-md max-w-full h-auto"
                    onClick={() =>
                      openModal(
                        `/docs/${message.image}`,
                        `Imagen para el mensaje ${message.id}`,
                        1200, // Nuevo width al ampliar
                        800, // Nuevo height al ampliar
                      )
                    }
                  />
                </div>
              )}
              {/* Renderizar botones si existen dentro de los mensajes para facilitar la interacción*/}
              {isStepByStep &&
                message.buttons &&
                message.buttons.length > 0 && (
                  <div className="mt-2 flex gap-2 justify-center">
                    {message.buttons.map((button, index) => {
                      let onClick: () => void = () => {}
                      let isDisabled = false

                      switch (button.action) {
                        case "back":
                          onClick = goBackStep
                          isDisabled = isAtFirstStep // Deshabilita el botón si es el primer paso para evitar ir atrás
                          break
                        case "advance":
                          onClick = advanceStep
                          break
                        case "exit":
                          onClick = exitStepByStep
                          break
                        case "reset":
                          onClick = () => handleReiniciarClick(message.id)
                        default:
                          break
                      }
                      return (
                        <button
                          key={index}
                          onClick={onClick}
                          disabled={isDisabled}
                          className={cn("px-4 py-2 sm:px-8 sm:py-2 border-2", {
                            "bg-purple-200 text-black rounded-md  hover:bg-purple-100 hover:border-purple-600 border-purple-200":
                              button.label === "Atrás" && !isDisabled,
                            "mx-5 bg-purple-600 text-white rounded-md hover:bg-purple-100 hover:text-black hover:border-purple-600 border-purple-600":
                              button.label === "Siguiente",
                            "bg-red-500 text-white rounded-md hover:bg-red-100 hover:text-black hover:border-red-600 border-red-500":
                              button.label === "Salir",
                            "bg-yellow-500 text-white rounded-md hover:bg-yellow-100 hover:text-black hover:border-yellow-600 border-yellow-500":
                              button.label === "Reiniciar",
                          })}
                        >
                          {button.label}
                        </button>
                      )
                    })}
                  </div>
                )}
            </div>
          </div>
        )
      })}
      {/* Componente Modal para la Imagen */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        src={modalImageSrc}
        alt={modalImageAlt}
        width={modalImageWidth}
        height={modalImageHeight}
      />

      {/* AlertDialog para Confirmar Reinicio */}
      <AlertDialog open={isReiniciarDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de que deseas reiniciar?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esto reiniciará todo el proceso de la guía paso a paso. ¿Deseas
              continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReiniciar}>
              Reiniciar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default MessageList
