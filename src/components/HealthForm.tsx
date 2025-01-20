//**Revisado */
/**
 * Un componente de formulario para gestionar la selección de centros de salud y preferencias de usuario.
 *
 * Este componente proporciona funcionalidad para:
 * - Buscar y seleccionar centros de salud basados en criterios de ubicación
 * - Gestionar la selección guardada de centros de salud del usuario
 * - Mostrar resultados de búsqueda en formato tabulado
 * - Manejar el estado del formulario y validación
 *
 * Características:
 * - Desplegables en cascada para selección de ubicación (Comunidad, Provincia, Municipio)
 * - Campos de autocompletado para dirección, código postal y teléfono
 * - Modo de solo lectura cuando se selecciona un centro de salud
 * - Funcionalidad de guardar y borrar preferencias de usuario
 * - Retroalimentación mediante notificaciones snackbar
 *
 * @component
 * @example
 * ```tsx
 * <HealthForm />
 * ```
 *
 * @returns Una interfaz de formulario para selección y gestión de centros de salud
 *
 * @dependencies
 * - useLocations - Hook personalizado para gestión de datos de ubicación
 * - useHealthCenters - Hook personalizado para datos de centros de salud
 * - useUser - Hook para estado de autenticación de usuario
 * - Componentes Material-UI (Autocomplete, TextField, Radio, Snackbar, Alert)
 *
 * @state
 * - formData - Valores de campos del formulario
 * - results - Resultados de búsqueda
 * - selectedRow - Fila de resultado seleccionada actualmente
 * - inputValues - Valores de entrada para dirección y código postal
 * - selectedCenter - Centro de salud seleccionado actualmente
 * - isReadOnly - Estado de solo lectura del formulario
 * - snackbar - Estado de notificaciones
 */

"use client"
import React, { useState, useEffect, FormEvent, useMemo, useRef } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Radio from "@mui/material/Radio"
import { useUser } from "@clerk/nextjs"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { SelectHealthCenter } from "@/lib/db/schema"
import { useLocations } from "@/components/hooks/useLocations"
import { useHealthCenters } from "@/components/hooks/useHealthCenters"
import provinciasData from "@/data/provincias.json"
import toast from "react-hot-toast"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    // Componente que muestra mensajes de estado
    // Se usa para notificar al usuario sobre el resultado de operaciones
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  },
)

interface SearchFormData {
  name?: string
  regionCA?: string
  province?: string
  municipality?: string
  locality?: string
  address?: string
  postal_code?: string
  phone?: string
  management_dependency?: string
}

export default function HealthForm() {
  const {
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
  } = useLocations()

  const { groupedData, isLoading, error } = useHealthCenters()
  const [formData, setFormData] = useState<SearchFormData>({})
  const [results, setResults] = useState<SelectHealthCenter[]>([])
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const { user, isLoaded, isSignedIn } = useUser()

  const [inputValues, setInputValues] = useState({
    address: "",
    postal_code: "",
  })
  const [selectedCenter, setSelectedCenter] =
    useState<SelectHealthCenter | null>(null)
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info" | "warning"
  }>({ open: false, message: "", severity: "success" })

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const handleAutocompleteChange = (name: string, value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value || "",
    }))
  }

  // Definición de la función resetFields
  const resetFields = (field: string) => {
    switch (field) {
      case "province":
        setSelectedMunicipio(null)
        setFormData((prev) => ({
          ...prev,
          municipality: "",
          address: "",
          postal_code: "",
          phone: "",
        }))
        break

      case "municipality":
        setFormData((prev) => {
          const newData = { ...prev }
          delete newData.address
          delete newData.postal_code
          delete newData.phone
          return newData
        })
        break

      case "address":
        if (!formData.address) {
          setFormData((prev) => {
            const newData = { ...prev }
            delete newData.postal_code
            return newData
          })
        }
        break

      // Añadir más casos si es necesario
      default:
        break
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/health-centers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Search failed")
      const data = await response.json()

      setResults(data.results)

      // Si ya hay una selección guardada, seleccionarla automáticamente
      if (data.results.length > 0) {
        const res = await fetch("/api/user-selection", {
          method: "GET",
        })

        if (res.ok) {
          const selection = await res.json()

          const selectedHealthCenterId = selection.selectedHealthCenterId

          if (selectedHealthCenterId) {
            const selectedCenter = data.results.find(
              (center: SelectHealthCenter) =>
                center.id === selectedHealthCenterId,
            )
            if (selectedCenter) {
              // Limitar los resultados a solo el centro seleccionado
              setResults([selectedCenter])
              setSelectedRow(0)
              setIsReadOnly(true) // Activar modo de lectura

              // Actualizar formData con todos los campos
              setFormData({
                name: selectedCenter.name,
                province: selectedCenter.province,
                municipality: selectedCenter.municipality,
                address: selectedCenter.address,
                postal_code: selectedCenter.postalCode,
                phone: selectedCenter.phone,
                // Agrega otros campos si es necesario
              })

              // Actualizar inputValues
              setInputValues({
                address: selectedCenter.address,
                postal_code: selectedCenter.postalCode,
              })

              // Encontrar la opción de Provincia correspondiente
              const selectedProvinciaOption = provincias.find(
                (prov) => prov.label === selectedCenter.province,
              )

              if (selectedProvinciaOption) {
                // Llamar a handleProvinciaChange para establecer Provincia y CA
                handleProvinciaChange(selectedProvinciaOption)
              }

              // Encontrar la opción de Municipio correspondiente
              const selectedMunicipioOption = ciudades.find(
                (mun) => mun.label === selectedCenter.municipality,
              )

              if (selectedMunicipioOption) {
                setSelectedMunicipio(selectedMunicipioOption)
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error("Search error:", error)
      setSnackbar({
        open: true,
        message: "Hubo un error al realizar la búsqueda",
        severity: "error",
      })
    }
  }

  // Agregar useEffect para limpiar campos
  useEffect(() => {
    if (!selectedMunicipio) {
      setInputValues({
        address: "",
        postal_code: "",
      })
      setFormData((prev) => {
        const newData = { ...prev }
        delete newData.address
        delete newData.postal_code
        return newData
      })
      setIsReadOnly(false) // Reactivar el formulario
    }
  }, [selectedMunicipio])

  // useEffect para limpiar campos al cambiar la CA
  useEffect(() => {
    if (!selectedCA) {
      // Limpiar provincia y municipio
      setSelectedProvincia(null)
      setSelectedMunicipio(null)

      // Limpiar input values
      setInputValues({
        address: "",
        postal_code: "",
      })

      // Limpiar form data
      setFormData((prev) => {
        const newData = { ...prev }
        delete newData.province
        delete newData.municipality
        delete newData.address
        delete newData.postal_code
        delete newData.phone
        return newData
      })

      setIsReadOnly(false) // Reactivar el formulario
    }
  }, [selectedCA, setSelectedMunicipio, setSelectedProvincia])

  const hasFetchedSelection = useRef(false)

  // Cargar la selección almacenada al montar el componente
  useEffect(() => {
    const fetchUserSelection = async () => {
      try {
        const res = await fetch("/api/user-selection", { method: "GET" })
        if (res.ok) {
          const data = await res.json()

          if (data.selectedHealthCenterId) {
            const centersResponse = await fetch("/api/health-centers", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({}),
            })
            if (centersResponse.ok) {
              const centersData = await centersResponse.json()
              const foundCenter = centersData.results.find(
                (center: SelectHealthCenter) =>
                  center.id === data.selectedHealthCenterId,
              )
              if (foundCenter) {
                // Actualizar el estado de selectedCenter
                setSelectedCenter(foundCenter)

                // Limitar los resultados a solo el centro seleccionado
                setResults([foundCenter])
                setSelectedRow(0)
                setIsReadOnly(true) // Activar modo de lectura

                // Actualizar formData con todos los campos
                setFormData({
                  name: foundCenter.name,
                  regionCA: foundCenter.region,
                  province: foundCenter.province,
                  municipality: foundCenter.municipality,
                  address: foundCenter.address,
                  postal_code: foundCenter.postalCode,
                  phone: foundCenter.phone,
                  // Agrega otros campos si es necesario
                })

                // Actualizar inputValues
                setInputValues({
                  address: foundCenter.address,
                  postal_code: foundCenter.postalCode,
                })

                // Encontrar la opción de Provincia correspondiente
                const selectedProvinciaOption = provincias.find(
                  (prov) => prov.label === foundCenter.province,
                )

                if (selectedProvinciaOption) {
                  // Llamar a handleProvinciaChange para establecer Provincia y CA
                  handleProvinciaChange(selectedProvinciaOption)
                }

                // Encontrar la opción de Municipio correspondiente
                const selectedMunicipioOption = ciudades.find(
                  (mun) => mun.label === foundCenter.municipality,
                )

                if (selectedMunicipioOption) {
                  setSelectedMunicipio(selectedMunicipioOption)
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching initial user selection:", error)
      }
    }

    // Solo si el usuario está cargado y autenticado, y aún no se ha hecho la llamada
    if (isLoaded && isSignedIn && !hasFetchedSelection.current) {
      hasFetchedSelection.current = true // Marcar que ya se ha hecho la llamada
      fetchUserSelection()
    }
  }, [
    isLoaded,
    isSignedIn,
    provincias,
    ciudades,
    handleProvinciaChange,
    setSelectedMunicipio,
  ])

  // Filtro para los códigos postales
  const filteredPostalCodes = useMemo(() => {
    if (!groupedData?.centers) return []

    // Primero filtrar centros por municipio
    let filteredCenters = groupedData.centers.filter(
      (c) =>
        !selectedMunicipio?.label || c.municipality === selectedMunicipio.label,
    )

    // Luego filtrar por dirección si está presente
    if (formData.address) {
      filteredCenters = filteredCenters.filter(
        (c) =>
          (c as unknown as SelectHealthCenter).address === formData.address,
      )
    }

    // Extraer códigos postales únicos
    const postalCodes = filteredCenters.map((c) => c.postalCode)
    return Array.from(new Set(postalCodes))
  }, [groupedData, formData.address, selectedMunicipio])

  // Filtro para las direcciones
  const filteredAddresses = useMemo(() => {
    if (!groupedData?.centers) return []

    let filteredCenters = groupedData.centers as unknown as SelectHealthCenter[]

    // Primero filtrar por municipio
    if (selectedMunicipio?.label) {
      filteredCenters = filteredCenters.filter(
        (c) => c.municipality === selectedMunicipio.label,
      )
    }

    // Luego filtrar por código postal si está presente
    if (formData.postal_code) {
      filteredCenters = filteredCenters.filter(
        (c: SelectHealthCenter) => c.postalCode === formData.postal_code,
      )
    }

    // Extraer direcciones únicas
    const addresses = filteredCenters.map((c: SelectHealthCenter) => c.address)
    return Array.from(new Set(addresses))
  }, [groupedData, formData.postal_code, selectedMunicipio])

  // Filtro para los teléfonos
  const filteredPhones = useMemo(() => {
    if (!groupedData?.centers) return []

    return groupedData.getFilteredPhones({
      province: selectedCA
        ? provincias.find((p) => p.value === selectedCA.value)?.label
        : selectedProvincia?.label,
      municipality: selectedMunicipio?.label,
      address: formData.address,
      postalCode: formData.postal_code,
    })
  }, [
    groupedData,
    selectedCA,
    selectedProvincia?.label,
    selectedMunicipio?.label,
    formData.address,
    formData.postal_code,
    provincias,
  ])

  // Manejar la selección del teléfono
  const handlePhoneSelection = (
    value: { id: string; phone: string; center?: SelectHealthCenter } | null,
  ) => {
    if (!value?.center) {
      setSelectedCA(null)
      setSelectedProvincia(null)
      setSelectedMunicipio(null)
      setInputValues({
        address: "",
        postal_code: "",
      })
      setIsReadOnly(false) // Asegurar que el formulario está activo
      return
    }

    const { center } = value

    // 1. Establecer valores de formulario
    handleAutocompleteChange("phone", value.phone)
    handleAutocompleteChange("address", center.address)
    handleAutocompleteChange("postal_code", center.postalCode)

    // 2. Encontrar la CA y provincia correspondientes
    const matchingProvinciaData = provinciasData.provincias.find(
      (p) => p.Provincia?.toLowerCase() === center.province?.toLowerCase(),
    )

    if (matchingProvinciaData) {
      // Seleccionar la Comunidad Autónoma
      const matchingCA = comunidadesAutonomas.find(
        (ca) => ca.value === matchingProvinciaData.CODAUTO,
      )

      if (matchingCA) {
        // Valores Iniciales
        setInputValues({
          address: center.address || "",
          postal_code: center.postalCode || "",
        })

        // Elegir la Comunidad Autónoma
        setSelectedCA(matchingCA)

        // Encontrar la provincia por el valor
        const provOption = {
          value: matchingProvinciaData.CPRO || "",
          label: center.province || "",
          CODAUTO: matchingProvinciaData.CODAUTO,
        }

        // Añadir un retraso para establecer la provincia //?Mejora la respuesta del formulario
        setTimeout(() => {
          setSelectedProvincia(provOption)
          handleProvinciaChange(provOption)

          // Seleccionar el municipio despues de un retraso
          setTimeout(() => {
            if (center.municipality) {
              const munOption = {
                value: center.municipality,
                label: center.municipality,
              }
              setSelectedMunicipio(munOption)
            }
          }, 100)
        }, 100)
      }
    }
  }

  // Manejar la acción de guardar la selección
  const handleSave = async () => {
    console.log("handleSave called")
    if (selectedRow === null) {
      return
    }
    if (!isSignedIn) {
      return
    }
    if (!user) {
      toast.error("Datos de usuario no identificado")
      return
    }

    const selectedCenter = results[selectedRow]

    // Llamar a la API para guardar la selección
    try {
      const response = await fetch("/api/user-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          healthCenterId: selectedCenter.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        throw new Error(errorData.error || "Error al guardar la selección")
      }

      const data = await response.json()

      setSnackbar({
        open: true,
        message: "Selección guardada con éxito",
        severity: "success",
      })

      // Activar modo de lectura
      setIsReadOnly(true)
    } catch (error: any) {
      console.error("Error al guardar la selección:", error)
      setSnackbar({
        open: true,
        message: error.message || "Hubo un error al guardar la selección",
        severity: "error",
      })
    }
  }

  // Manejar la acción de borrar la selección
  const handleDelete = async () => {
    if (!isSignedIn) {
      toast.error("Debes iniciar sesión para borrar la selección")
      return
    }
    if (!user) {
      toast.error("Datos de usuario no identificado")
      return
    }

    // Llamar a la API para borrar la selección
    try {
      const response = await fetch("/api/user-selection", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al borrar la selección")
      }

      const data = await response.json()

      setSelectedRow(null)
      setIsReadOnly(false) // Reactivar el formulario
      setFormData({})
      setInputValues({
        address: "",
        postal_code: "",
      })

      setSnackbar({
        open: true,
        message: "Selección borrada correctamente",
        severity: "success",
      })
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || "Hubo un error al borrar la selección",
        severity: "error",
      })
    }
  }

  // useEffect adicional para depurar los estados
  useEffect(() => {
    // console.log("Selected CA:", selectedCA)
    // console.log("Selected Provincia:", selectedProvincia)
    // console.log("Selected Municipio:", selectedMunicipio)
  }, [selectedCA, selectedProvincia, selectedMunicipio])

  return (
    <div className="md:max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Autocomplete
            value={selectedCA}
            options={comunidadesAutonomas}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  isReadOnly && selectedCenter
                    ? selectedCenter.region
                    : "Comunidad Autónoma"
                }
              />
            )}
            onChange={(_, value) => setSelectedCA(value)}
            isOptionEqualToValue={(option, value) =>
              option?.value === value?.value
            }
            disabled={isReadOnly} // Deshabilitar en modo lectura
          />

          <Autocomplete
            value={selectedProvincia}
            options={provincias}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  isReadOnly && selectedCenter
                    ? selectedCenter.province
                    : "Provincia"
                }
              />
            )}
            onChange={(_, value) => {
              handleProvinciaChange(value)
              handleAutocompleteChange("province", value?.label || null)
              resetFields("province") // Utilizar resetFields
            }}
            isOptionEqualToValue={(option, value) =>
              option?.value === value?.value
            }
            disabled={isReadOnly} // Deshabilitar en modo lectura
          />

          <Autocomplete
            disabled={!selectedProvincia || isReadOnly} // Deshabilitar si no hay provincia seleccionada o en modo lectura
            value={selectedMunicipio}
            options={ciudades}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  isReadOnly && selectedCenter
                    ? selectedCenter.municipality
                    : "Municipio"
                }
              />
            )}
            onChange={(_, value) => {
              setSelectedMunicipio(value)
              handleAutocompleteChange("municipality", value?.label || null)
              resetFields("municipality") // Utilizar resetFields
            }}
          />

          <Autocomplete
            disabled={!selectedMunicipio || isReadOnly} // Deshabilitar si no hay municipio seleccionado o en modo lectura
            options={filteredAddresses}
            freeSolo
            value={inputValues.address}
            getOptionLabel={String}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Dirección"
                value={inputValues.address}
              />
            )}
            onChange={(_, value) => {
              if (!selectedMunicipio) return
              setInputValues((prev) => ({
                ...prev,
                address: typeof value === "string" ? value : "",
              }))
              handleAutocompleteChange("address", value as string)
              if (value) {
                const center = results.find((c) => c.address === value)

                if (center) {
                  setInputValues((prev) => ({
                    ...prev,
                    postal_code: center.postalCode || "",
                  }))
                  handleAutocompleteChange("postal_code", center.postalCode)
                }
              }
            }}
          />

          <Autocomplete
            disabled={!selectedMunicipio || isReadOnly} // Deshabilitar si no hay municipio seleccionado o en modo lectura
            options={filteredPostalCodes}
            freeSolo
            value={inputValues.postal_code}
            getOptionLabel={String}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Código Postal"
                value={inputValues.postal_code}
              />
            )}
            onChange={(_, value) => {
              if (!selectedMunicipio) return
              setInputValues((prev) => ({
                ...prev,
                postal_code: (value as string) || "",
              }))
              handleAutocompleteChange("postal_code", value as string)
            }}
          />

          <Autocomplete
            options={filteredPhones}
            getOptionLabel={(option) => option.phone}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  isReadOnly && selectedCenter
                    ? selectedCenter.phone
                    : "Teléfono"
                }
              />
            )}
            onChange={(_, value) => handlePhoneSelection(value)}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            disabled={isReadOnly} // Deshabilitar en modo lectura
          />
        </div>

        <div className="flex flex-wrap justify-between gap-2 sm:mt-0">
          <button
            type="submit"
            className={`w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-800 ${
              isReadOnly ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isReadOnly} // Deshabilitar en modo lectura
          >
            Buscar
          </button>
          <button
            type="button"
            disabled={!isReadOnly} // Habilitar solo en modo lectura
            onClick={handleDelete}
            className={`w-full sm:w-[40%] border-2 border-red-600 text-purple-950 hover:text-white p-2 rounded-3xl hover:bg-red-700 sm:mr-10 ${
              !isReadOnly ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Borrar
          </button>
          <button
            type="button"
            disabled={isReadOnly} // Deshabilitar en modo lectura
            onClick={handleSave}
            className={`w-full sm:w-[40%] border-2 border-lime-600 text-purple-950 hover:text-white p-2 rounded-3xl hover:bg-lime-700 sm:ml-10 ${
              isReadOnly ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Guardar
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Resultados</h3>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-sm">
                  <th className="px-4 py-2">Seleccionar</th>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Provincia</th>
                  <th className="px-4 py-2">Municipio</th>
                  <th className="px-4 py-2">Dirección</th>
                  <th className="px-4 py-2">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {results.map((center, index) => (
                  <tr
                    key={center.id}
                    className={`border-t text-xs ${
                      selectedRow === index ? "bg-purple-200" : ""
                    }`}
                  >
                    <td className="px-4 py-2">
                      <Radio
                        checked={selectedRow === index}
                        onChange={() => {
                          if (!isReadOnly) {
                            // Evitar cambiar selección en modo lectura

                            setSelectedRow(index)
                          }
                        }}
                        value={index}
                        name="row-radio"
                        size="small"
                        aria-label={`Seleccionar fila ${index + 1}`}
                        disabled={isReadOnly} // Deshabilitar en modo lectura
                      />
                    </td>
                    <td scope="col" className="px-4 py-2">
                      {center.name}
                    </td>
                    <td scope="col" className="px-4 py-2">
                      {center.province}
                    </td>
                    <td scope="col" className="px-4 py-2">
                      {center.municipality}
                    </td>
                    <td scope="col" className="px-4 py-2">
                      {center.address}
                    </td>
                    <td scope="col" className="px-4 py-2">
                      {center.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Vista “cards” (bloques) en mobile (< md) */}
          <div className="block md:hidden">
            {results.map((center, index) => (
              <div
                key={center.id}
                className={`border p-2 mb-2 rounded shadow-sm text-sm ${
                  selectedRow === index ? "bg-purple-200" : ""
                }`}
              >
                <div className="flex items-center mb-2">
                  <Radio
                    checked={selectedRow === index}
                    onChange={() => {
                      if (!isReadOnly) setSelectedRow(index)
                    }}
                    value={index}
                    name="row-radio-mobile"
                    size="small"
                    disabled={isReadOnly}
                    aria-label={`Seleccionar item ${index + 1}`}
                  />
                  <span className="font-bold ml-2 text-sm">{center.name}</span>
                </div>
                <p className="mb-1">
                  <span className="font-semibold text-sm">Provincia:</span>{" "}
                  {center.province}
                </p>
                <p className="mb-1">
                  <span className="font-semibold text-sm">Municipio:</span>{" "}
                  {center.municipality}
                </p>
                <p className="mb-1">
                  <span className="font-semibold text-sm">Dirección:</span>{" "}
                  {center.address}
                </p>
                <p className="mb-1">
                  <span className="font-semibold text-sm">Teléfono:</span>{" "}
                  {center.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
