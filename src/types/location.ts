export interface LocationOption {
  value: number | string
  label: string
}

export interface Provincia {
  CODAUTO: number
  "Comunidad Autónoma": string
  CPRO: number
  Provincia: string
}

export interface Ciudad {
  CODAUTO: number
  CPRO: number
  CMUN: number
  DC: number
  NOMBRE: string
}
