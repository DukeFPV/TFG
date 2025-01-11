import { Message as AIMessage } from "ai/react"

export interface LocationOption {
  value: number | string
  label: string
}

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

export interface CustomMessage extends AIMessage {
  image?: string | null
  buttons?: Array<{ label: string; action: "back" | "advance" | "exit" }> // Añadido
}
