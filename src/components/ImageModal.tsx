"use client"

import React, { FC } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  src: string
  alt: string
  width: number
  height: number
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
}

const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src,
  alt,
  width,
  height,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose} // Cerrar modal al hacer clic en el backdrop
        >
          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro del modal
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={cn(
                "rounded-md cursor-pointer",
                "max-w-full max-h-screen",
              )}
              onClick={onClose} // Cerrar modal al hacer clic en la imagen
            />
            {/* Botón de cerrar (opcional) */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageModal
