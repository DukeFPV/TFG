import { useState, useMemo } from "react"
import provinciasData from "@/data/provincias.json"
import ciudadesData from "@/data/ciudades.json"
import { LocationOption } from "@/types/location"

export const useLocations = () => {
  const [selectedCA, setSelectedCA] = useState<LocationOption | null>(null)
  const [selectedProvincia, setSelectedProvincia] =
    useState<LocationOption | null>(null)
  const [selectedMunicipio, setSelectedMunicipio] =
    useState<LocationOption | null>(null)

  const comunidadesAutonomas = useMemo<LocationOption[]>(() => {
    const uniqueCAs = Array.from(
      new Set(provinciasData.provincias.map((p) => p["Comunidad Autónoma"])),
    )
    return uniqueCAs.map((ca) => ({
      value:
        provinciasData.provincias.find((p) => p["Comunidad Autónoma"] === ca)
          ?.CODAUTO ?? 0,
      label: ca ?? "",
    }))
  }, [])

  const provincias = useMemo<LocationOption[]>(() => {
    if (!selectedCA?.value) {
      // Return all provinces when no CA is selected
      return provinciasData.provincias.map((p) => ({
        value: p.CPRO ?? 0,
        label: p.Provincia ?? "",
        CODAUTO: p.CODAUTO ?? 0,
      }))
    }
    // Filter by selected CA
    return provinciasData.provincias
      .filter((p) => p.CODAUTO === selectedCA.value)
      .map((p) => ({
        value: p.CPRO ?? 0,
        label: p.Provincia ?? "",
        CODAUTO: p.CODAUTO ?? 0,
      }))
  }, [selectedCA])

  // Auto-select CA when province is selected
  const handleProvinciaChange = (newProvincia: LocationOption | null) => {
    setSelectedProvincia(newProvincia)
    if (newProvincia) {
      const provincia = provinciasData.provincias.find(
        (p) => p.CPRO === newProvincia.value,
      )
      if (provincia) {
        const ca = comunidadesAutonomas.find(
          (ca) => ca.value === provincia.CODAUTO,
        )
        setSelectedCA(ca || null)
      }
    }
  }

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
    selectedMunicipio,
    setSelectedCA,
    setSelectedProvincia,
    setSelectedMunicipio,
    handleProvinciaChange,
  }
}
