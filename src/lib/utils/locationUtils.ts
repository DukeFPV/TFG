import { useState, useMemo } from "react"
import provinciasData from "@/data/provincias.json"
import ciudadesData from "@/data/ciudades.json"
import { LocationOption } from "@/types/interfaceTypes"

export const useLocations = () => {
  const [selectedCA, setSelectedCA] = useState<LocationOption | null>(null)
  const [selectedProvincia, setSelectedProvincia] =
    useState<LocationOption | null>(null)

  const comunidadesAutonomas = useMemo<LocationOption[]>(() => {
    const uniqueCAs = Array.from(
      new Set(provinciasData.provincias.map((p) => p["Comunidad Autónoma"])),
    )
    return uniqueCAs.map((ca) => ({
      value:
        provinciasData.provincias.find((p) => p["Comunidad Autónoma"] === ca)
          ?.CODAUTO || 0,
      label: ca || "",
    }))
  }, [])

  const provincias = useMemo<LocationOption[]>(() => {
    if (!selectedCA?.value) return []
    return provinciasData.provincias
      .filter((p) => p.CODAUTO === selectedCA.value)
      .map((p) => ({
        value: p.CPRO ?? 0,
        label: p.Provincia ?? "",
      }))
  }, [selectedCA])

  const ciudades = useMemo<LocationOption[]>(() => {
    if (!selectedProvincia?.value) return []
    return ciudadesData.ciudades
      .filter((c) => Number(c.CPRO) === Number(selectedProvincia.value))
      .map((c) => ({
        value: c.CMUN,
        label: c.NOMBRE,
      }))
  }, [selectedProvincia])

  return {
    comunidadesAutonomas,
    provincias,
    ciudades,
    selectedCA,
    selectedProvincia,
    setSelectedCA,
    setSelectedProvincia,
  }
}
