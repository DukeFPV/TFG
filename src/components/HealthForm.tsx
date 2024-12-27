"use client"
import React, { useState, FormEvent, useMemo, useEffect } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useLocations } from "@/components/hooks/useLocations"
import { useHealthCenters } from "@/components/hooks/useHealthCenters"
import provinciasData from "@/data/provincias.json"
import Radio from "@mui/material/Radio"
import { useUser } from "@clerk/nextjs" // Importar el hook de Clerk
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { SelectHealthCenter } from "@/lib/db/schema" // Importa el tipo inferido

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  },
)

interface SearchFormData {
  name?: string
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log("handleSubmit called with formData:", formData)
    try {
      const response = await fetch("/api/health-centers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      console.log("Response from /api/health-centers:", response)

      if (!response.ok) throw new Error("Search failed")
      const data = await response.json()
      console.log("Data received from /api/health-centers:", data)
      setResults(data.results)

      // Si ya hay una selección guardada, seleccionarla automáticamente
      if (data.results.length > 0) {
        const res = await fetch("/api/user-selection", {
          method: "GET",
        })
        console.log("Response from /api/user-selection GET:", res)
        if (res.ok) {
          const selection = await res.json()
          console.log("Selection received:", selection)
          const selectedHealthCenterId = selection.selectedHealthCenterId

          if (selectedHealthCenterId) {
            const index = data.results.findIndex(
              (center: SelectHealthCenter) =>
                center.id === selectedHealthCenterId,
            )
            console.log("Index of selectedHealthCenterId:", index)
            if (index !== -1) {
              setSelectedRow(index)
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
    }
  }, [selectedMunicipio])

  // Add new useEffect at the top level of the component
  useEffect(() => {
    if (!selectedCA) {
      // Clear provincia and municipio
      setSelectedProvincia(null)
      setSelectedMunicipio(null)

      // Clear input values
      setInputValues({
        address: "",
        postal_code: "",
      })

      // Clear form data
      setFormData((prev) => {
        const newData = { ...prev }
        delete newData.province
        delete newData.municipality
        delete newData.address
        delete newData.postal_code
        return newData
      })
    }
  }, [selectedCA, setSelectedMunicipio, setSelectedProvincia])

  // Actualizar memo de códigos postales filtrados
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

  // Actualizar memo de direcciones filtradas
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

  // Actualizar los inputs en caso de borrar un campo
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
    }
  }

  // Manejar la selección del teléfono
  const handlePhoneSelection = (
    value: { id: string; phone: string; center?: SelectHealthCenter } | null,
  ) => {
    console.log("Phone selection value:", value) // Debug

    if (!value?.center) {
      setSelectedCA(null)
      setSelectedProvincia(null)
      setSelectedMunicipio(null)
      setInputValues({
        address: "",
        postal_code: "",
      })
      return
    }

    const { center } = value
    console.log("Center data:", center) // Debug

    // 1. Set form data first
    handleAutocompleteChange("phone", value.phone)
    handleAutocompleteChange("address", center.address)
    handleAutocompleteChange("postal_code", center.postalCode)

    // 2. Find and set CA
    const matchingProvinciaData = provinciasData.provincias.find(
      (p) => p.Provincia?.toLowerCase() === center.province?.toLowerCase(),
    )

    console.log("Matching provincia:", matchingProvinciaData) // Debug

    if (matchingProvinciaData) {
      // Set CA
      const matchingCA = comunidadesAutonomas.find(
        (ca) => ca.value === matchingProvinciaData.CODAUTO,
      )

      if (matchingCA) {
        // Set initial values
        setInputValues({
          address: center.address || "",
          postal_code: center.postalCode || "",
        })

        // Set CA
        setSelectedCA(matchingCA)

        // Create provincia option
        const provOption = {
          value: matchingProvinciaData.CPRO || "",
          label: center.province || "",
          CODAUTO: matchingProvinciaData.CODAUTO,
        }

        // Set provincia after small delay
        setTimeout(() => {
          setSelectedProvincia(provOption)
          handleProvinciaChange(provOption)

          // Set municipio after provincia
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
      console.log("handleSave: selectedRow is null")
      return
    }
    if (!isSignedIn) {
      console.log("handleSave: user is not signed in")
      return
    }
    if (!user) {
      console.log("handleSave: user data is missing")
      return
    }

    const selectedCenter = results[selectedRow]
    console.log("Selected center to save:", selectedCenter)

    try {
      const response = await fetch("/api/user-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          healthCenterId: selectedCenter.id,
        }),
      })

      console.log("Response from /api/user-selection POST:", response)

      if (!response.ok) {
        const errorData = await response.json()
        console.log("Error response data:", errorData)
        throw new Error(errorData.error || "Error al guardar la selección")
      }

      const data = await response.json()
      console.log("Data received from /api/user-selection POST:", data)

      setSnackbar({
        open: true,
        message: "Selección guardada con éxito",
        severity: "success",
      })
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
    console.log("handleDelete called")
    if (!isSignedIn) {
      console.log("handleDelete: user is not signed in")
      return
    }
    if (!user) {
      console.log("handleDelete: user data is missing")
      return
    }

    try {
      const response = await fetch("/api/user-selection", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })

      console.log("Response from /api/user-selection DELETE:", response)

      if (!response.ok) {
        const errorData = await response.json()
        console.log("Error response data:", errorData)
        throw new Error(errorData.error || "Error al borrar la selección")
      }

      const data = await response.json()
      console.log("Data received from /api/user-selection DELETE:", data)

      setSelectedRow(null)
      setSnackbar({
        open: true,
        message: "Selección borrada exitosamente",
        severity: "success",
      })
    } catch (error: any) {
      console.error("Error al borrar la selección:", error)
      setSnackbar({
        open: true,
        message: error.message || "Hubo un error al borrar la selección",
        severity: "error",
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Autocomplete
            value={selectedCA}
            options={comunidadesAutonomas}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Comunidad Autónoma" />
            )}
            onChange={(_, value) => setSelectedCA(value)}
            isOptionEqualToValue={(option, value) =>
              option?.value === value?.value
            }
          />

          <Autocomplete
            value={selectedProvincia}
            options={provincias}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Provincia" />
            )}
            onChange={(_, value) => {
              handleProvinciaChange(value)
              handleAutocompleteChange("province", value?.label || null)
              resetFields("province")
            }}
            isOptionEqualToValue={(option, value) =>
              option?.value === value?.value
            }
          />

          <Autocomplete
            disabled={!selectedProvincia}
            value={selectedMunicipio}
            options={ciudades}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Municipio" />
            )}
            onChange={(_, value) => {
              setSelectedMunicipio(value)
              handleAutocompleteChange("municipality", value?.label || null)
              resetFields("municipality")
            }}
          />

          <Autocomplete
            disabled={!selectedMunicipio}
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
                console.log("Found center based on address:", center)
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
            disabled={!selectedMunicipio}
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
            renderInput={(params) => <TextField {...params} label="Teléfono" />}
            onChange={(_, value) => handlePhoneSelection(value)}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-700"
        >
          Buscar
        </button>
        <button
          type="button"
          disabled={selectedRow === null}
          onClick={handleDelete}
          className={`w-[45%] border-2 border-red-600 text-purple-950 hover:text-white p-2 rounded-3xl hover:bg-red-700 mr-10 ${
            selectedRow === null ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Borrar
        </button>
        <button
          type="button"
          disabled={selectedRow === null}
          onClick={handleSave}
          className={`w-[45%] border-2 border-lime-600 text-purple-950 hover:text-white p-2 rounded-3xl hover:bg-lime-700 ml-10 ${
            selectedRow === null ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Guardar
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Resultados</h3>
          <div className="overflow-x-auto">
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
                          console.log(`Radio button for row ${index} clicked`)
                          setSelectedRow(index)
                        }}
                        value={index}
                        name="row-radio"
                        size="small"
                      />
                    </td>
                    <td className="px-4 py-2">{center.name}</td>
                    <td className="px-4 py-2">{center.province}</td>
                    <td className="px-4 py-2">{center.municipality}</td>
                    <td className="px-4 py-2">{center.address}</td>
                    <td className="px-4 py-2">{center.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
