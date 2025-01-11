"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CustomMessage } from "@/types/interfaceTypes" // Importa el tipo personalizado
import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Image from "next/image"
import { useChatContext } from "@/context/ChatContext" // Importa el contexto
import ImageModal from "./ImageModal"

type Props = {
  messages: CustomMessage[]
}

const MessageList = ({ messages }: Props) => {
  const { advanceStep, goBackStep, exitStepByStep } = useChatContext()

  // Estados para el modal de imagen
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageSrc, setModalImageSrc] = useState<string>("")
  const [modalImageAlt, setModalImageAlt] = useState<string>("")
  const [modalImageWidth, setModalImageWidth] = useState<number>(600) // Ajusta según necesidad
  const [modalImageHeight, setModalImageHeight] = useState<number>(400) // Ajusta según necesidad

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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={cn("prose max-w-none text-sm", {
                  "text-white": message.role === "user",
                  "prose-neutral": message.role === "assistant",
                })}
                components={{
                  ul: ({ children }) => (
                    <ul className="list-disc ml-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-4">{children}</ol>
                  ),
                  li: ({ children }) => <li className="my-1">{children}</li>,
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong
                      className={cn({
                        "text-white": message.role === "user",
                        "text-black": message.role === "assistant",
                      })}
                    >
                      {children}
                    </strong>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
              {/* Renderizar la imagen si existe */}
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
              {/* Renderizar botones si existen */}
              {message.buttons && message.buttons.length > 0 && (
                <div className="mt-2 flex gap-2 justify-center">
                  {message.buttons.map((button, index) => {
                    let onClick: () => void = () => {}
                    switch (button.action) {
                      case "back":
                        onClick = goBackStep
                        break
                      case "advance":
                        onClick = advanceStep
                        break
                      case "exit":
                        onClick = exitStepByStep
                        break
                      default:
                        break
                    }
                    return (
                      <button
                        key={index}
                        onClick={onClick}
                        className={cn("px-4 py-2 sm:px-8 sm:py-2 border-2", {
                          "bg-purple-200 text-black rounded-md  hover:bg-purple-100 hover:border-purple-600 border-purple-200":
                            button.label === "Atrás",
                          "mx-5 bg-purple-600 text-white rounded-md hover:bg-purple-100 hover:text-black hover:border-purple-600 border-purple-600":
                            button.label === "Siguiente",
                          "bg-red-500 text-white rounded-md hover:bg-red-100 hover:text-black hover:border-red-600 border-red-500":
                            button.label === "Salir",
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
    </div>
  )
}

export default MessageList
