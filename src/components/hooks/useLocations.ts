//**Revisado */
/**
 * Hook personalizado para gestionar la selección de ubicaciones en las divisiones administrativas de España.
 * Maneja el estado y las relaciones entre Comunidades Autónomas,
 * Provincias y Municipios.
 *
 * @returns {Object} Un objeto que contiene:
 * - comunidadesAutonomas: Array de comunidades autónomas disponibles
 * - provincias: Array de provincias, filtradas por la comunidad autónoma seleccionada
 * - ciudades: Array de ciudades/municipios, filtrados por la provincia seleccionada
 * - selectedCA: Comunidad autónoma actualmente seleccionada
 * - selectedProvincia: Provincia actualmente seleccionada
 * - selectedMunicipio: Municipio actualmente seleccionado
 * - setSelectedCA: Función para establecer la comunidad autónoma seleccionada
 * - setSelectedProvincia: Función para establecer la provincia seleccionada
 * - setSelectedMunicipio: Función para establecer el municipio seleccionado
 * - handleProvinciaChange: Función que maneja la selección de provincia y actualiza automáticamente la comunidad autónoma correspondiente
 */

import { useState, useMemo } from "react"
import provinciasData from "@/data/provincias.json"
import ciudadesData from "@/data/ciudades.json"
import { LocationOption } from "@/types/interfaceTypes"

export const useLocations = () => {
  const [selectedCA, setSelectedCA] = useState<LocationOption | null>(null)
  const [selectedProvincia, setSelectedProvincia] =
    useState<LocationOption | null>(null)
  const [selectedMunicipio, setSelectedMunicipio] =
    useState<LocationOption | null>(null)

  // Obtener las comunidades autónomas
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
      // Retorna todas las provincias cuando no se ha seleccionado una CA
      return provinciasData.provincias.map((p) => ({
        value: p.CPRO ?? 0,
        label: p.Provincia ?? "",
        CODAUTO: p.CODAUTO ?? 0,
      }))
    }
    // Retorna las provincias de la CA seleccionada
    return provinciasData.provincias
      .filter((p) => p.CODAUTO === selectedCA.value)
      .map((p) => ({
        value: p.CPRO ?? 0,
        label: p.Provincia ?? "",
        CODAUTO: p.CODAUTO ?? 0,
      }))
  }, [selectedCA])

  // Auto-seleccionar la CA cuando se selecciona una provincia
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
