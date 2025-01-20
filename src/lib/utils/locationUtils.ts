//**Revisado */
/**
 * Hook personalizado para gestionar las selecciones de ubicación en España.
 *
 * @returns Un objeto que contiene:
 * - `comunidadesAutonomas` - Array de opciones de comunidades autónomas
 * - `provincias` - Array de opciones de provincias filtradas por la comunidad autónoma seleccionada
 * - `ciudades` - Array de opciones de ciudades filtradas por la provincia seleccionada
 * - `selectedCA` - Comunidad autónoma actualmente seleccionada
 * - `selectedProvincia` - Provincia actualmente seleccionada
 * - `setSelectedCA` - Función para establecer la comunidad autónoma seleccionada
 * - `setSelectedProvincia` - Función para establecer la provincia seleccionada
 *
 * Cada opción de ubicación sigue el formato:
 * ```
 * {
 *   value: number,  // Código de ubicación
 *   label: string   // Nombre de ubicación
 * }
 * ```
 */

import { useState, useMemo } from "react"
import provinciasData from "@/data/provincias.json"
import ciudadesData from "@/data/ciudades.json"
import { LocationOption } from "@/types/interfaceTypes"

export const useLocations = () => {
  const [selectedCA, setSelectedCA] = useState<LocationOption | null>(null)
  const [selectedProvincia, setSelectedProvincia] =
    useState<LocationOption | null>(null)

  // Obtener comunidades autónomas
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

  // Filtrar provincias por comunidad autónoma seleccionada
  const provincias = useMemo<LocationOption[]>(() => {
    if (!selectedCA?.value) return []
    return provinciasData.provincias
      .filter((p) => p.CODAUTO === selectedCA.value)
      .map((p) => ({
        value: p.CPRO ?? 0,
        label: p.Provincia ?? "",
      }))
  }, [selectedCA])

  // Filtrar ciudades por provincia seleccionada
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
