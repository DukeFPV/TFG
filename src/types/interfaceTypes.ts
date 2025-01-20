//**Revisado */
// Declara las interfaces y tipos de datos que se utilizan

import { Message as AIMessage } from "ai/react"

export interface LocationOption {
  value: number | string
  label: string
}

// Interfaz para los datos de los centros de salud
export interface SelectHealthCenter {
  id: number
  name: string
  region: string
  province: string
  municipality: string
  locality: string
  address: string
  postalCode: string
  phone: string
  healthZone: string
  healthArea: string
  managementType: string
  managementDependency: string
  centerType: string
  teachingAccreditation: boolean
}

// Interfaz para los mensajes personalizados
export interface CustomMessage extends AIMessage {
  image?: string | null
  buttons?: Array<{
    label: string
    action: "back" | "advance" | "exit" | "reset" // Añadido para los botones de los mensajes
  }>
  audioUrl?: string | null // Audio
  markdownBlocks?: string[] // Añadido para los bloques de markdown
}

export interface Chat {
  id: number
  title?: string
  createdAt: string | Date
  pdfUrl?: string
  userId: string
}
