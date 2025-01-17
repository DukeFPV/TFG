//**Revisado */
/**
 * Un componente de formulario para manejar los datos del perfil de usuario se utiliza en el panel de ajustes.
 *
 * @component
 * @returns {JSX.Element} Un formulario con campos para fecha de nacimiento, género, provincia y número de teléfono
 *
 * @description
 * Este componente proporciona una interfaz de formulario que:
 * - Carga y muestra los datos existentes del perfil de usuario
 * - Permite a los usuarios actualizar su información personal
 * - Maneja el envío de formularios y la comunicación con la API
 * - Proporciona cálculo de edad en tiempo real basado en la fecha de nacimiento
 *
 * @dependencies
 * - useUser: Para gestión del estado de autenticación
 * - useForm: Para manejo del formulario
 * - dayjs: Para manipulación de fechas
 * - toast: Para mostrar notificaciones
 *
 * @remarks
 * El componente incluye:
 * - Selector de fecha para fecha de nacimiento
 * - Menú desplegable de género con múltiples opciones
 * - Campo de provincia con autocompletado
 * - Campo para número de teléfono
 * - Botón de envío para guardar cambios
 *
 * @state
 * - selectedDate: Almacena la fecha de nacimiento seleccionada
 * - age: Almacena la edad calculada basada en la fecha de nacimiento
 */

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import Calendar from "./ui/calendar"
import dayjs, { Dayjs } from "dayjs"
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"

export default function DataForm() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs("1990-01-31"), // Fecha por defecto
  )
  const [age, setAge] = useState<number>(0)

  const { register, setValue, handleSubmit } = useForm()

  // Calcular la edad a partir de la fecha de nacimiento para la etiqueta del calendario
  useEffect(() => {
    if (selectedDate) {
      const today = dayjs()
      const years = today.diff(selectedDate, "year")
      setAge(years)
    }
  }, [selectedDate])

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoaded && isSignedIn && user) {
        const userEmail = user.emailAddresses[0]?.emailAddress
        if (!userEmail) return

        const res = await fetch(
          `/api/get-profile?email=${encodeURIComponent(userEmail)}`,
        )
        const result = await res.json()

        if (result.user) {
          // Llenar campos del formulario
          setValue("Género", result.user.genero)
          setValue("provincia", result.user.provincia)
          setValue("Teléfono Móvil", result.user.telefono)

          // Si hay fecha de nacimiento, cubrir el componente calendario
          if (result.user.birthday) {
            const dateFromDb = dayjs(result.user.birthday)
            setSelectedDate(dateFromDb)
            // Edad en función de la fecha de BD
            const years = dayjs().diff(dateFromDb, "year")
            setAge(years)
          }
        }
      }
    }

    fetchUserData()
  }, [isLoaded, isSignedIn, user, setValue])

  const onSubmit = async (data: any) => {
    if (!isLoaded || !isSignedIn || !user) {
      toast.error("Usuario no autenticado")
      return
    }
    try {
      const userEmail = user.emailAddresses[0]?.emailAddress
      const payload = {
        userEmail,
        birthday: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
        age: age,
        genero: data["Género"],
        provincia: data["provincia"],
        telefono: data["Teléfono Móvil"],
      }
      // Actualizar los datos a traves de la API
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (result.success) {
        toast.success("Datos actualizados correctamente")
      } else {
        toast.error("Error al actualizar datos:", result.error)
      }
    } catch (error) {
      console.error("Error al enviar datos:", error)
    }
  }

  return (
    <>
      <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col ml-7 sm:ml-0 mb-5 sm:flex-row sm:justify-evenly">
          <div className="sm:flex sm:flex-col sm:mb-5">
            <div className="flex flex-col">
              <label>
                <span className="mb-5 font-semibold">Fecha de nacimiento</span>
              </label>
              <div className="flex flex-col max-w-60 mt-3 mb-3">
                <Calendar
                  label={age}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </div>
            </div>
            <div className="flex flex-col mb-5">
              <label>
                <span className="font-semibold max-w-60">Género</span>
              </label>
              <select
                className="border-2 border-purple-300 max-w-60 py-1 pl-2 rounded-xl"
                {...register("Género")}
              >
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="No Binario">No Binario</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="sm:flex sm:flex-col mb-5">
            <div className="flex flex-col sm:mb-6">
              <label>
                <span className="max-w-60 font-semibold">Provincia</span>
              </label>
              <input
                {...register("provincia")}
                className="border-2 border-purple-300 max-w-60 py-0.5 pr-2 rounded-xl px-3 mb-5"
                placeholder="Provincia"
                type="text"
                list="provincia"
              />
              <datalist id="provincia">
                <option value="Albacete" />
                <option value="Alicante" />
                <option value="Almeria" />
                <option value="Alava" />
                <option value="Asturias" />
                <option value="Avila" />
                <option value="Badajoz" />
                <option value="Balears" />
                <option value="Barcelona" />
                <option value="Bizkaia" />
                <option value="Burgos" />
                <option value="Caceres" />
                <option value="Cadiz" />
                <option value="Cantabria" />
                <option value="Castellon" />
                <option value="Ciudad Real" />
                <option value="Cordoba" />
                <option value="Coruna" />
                <option value="Cuenca" />
                <option value="Gipuzkoa" />
                <option value="Girona" />
                <option value="Granada" />
                <option value="Guadalajara" />
                <option value="Huelva" />
                <option value="Huesca" />
                <option value="Jaen" />
                <option value="Leon" />
                <option value="Lleida" />
                <option value="Lugo" />
                <option value="Madrid" />
                <option value="Malaga" />
                <option value="Murcia" />
                <option value="Navarra" />
                <option value="Ourense" />
                <option value="Palencia" />
                <option value="Palmas" />
                <option value="Pontevedra" />
                <option value="Rioja" />
                <option value="Salamanca" />
                <option value="Santa Cruz de Tenerife" />
                <option value="Segovia" />
                <option value="Sevilla" />
                <option value="Soria" />
                <option value="Tarragona" />
                <option value="Teruel" />
                <option value="Toledo" />
                <option value="Valencia" />
                <option value="Valladolid" />
                <option value="Zamora" />
                <option value="Zaragoza" />
                <option value="Ceuta" />
                <option value="Melilla" />
              </datalist>
            </div>
            <div className="flex flex-col">
              <label>
                <span className="max-w-60 font-semibold h-8">Teléfono</span>
              </label>
              <input
                className="max-w-60 border-2 border-purple-300 rounded-xl pl-1 h-8"
                type="tel"
                placeholder="Teléfono Móvil"
                {...register("Teléfono Móvil")}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start sm:justify-center">
          <input
            className="border-purple-500 flex flex-row hover:bg-purple-500 hover:text-purple-50 border-2 py-2 w-24 rounded-full"
            type="submit"
          />
        </div>
      </form>
    </>
  )
}
