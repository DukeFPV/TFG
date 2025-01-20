//**Revisado */
/**
 * Componente Contact que renderiza una página con un formulario de contacto.
 *
 * @component
 * @returns {JSX.Element} Una página con un formulario de contacto que incluye:
 * - Campo de entrada para nombre y apellidos
 * - Campo de entrada para número de teléfono
 * - Campo de entrada para correo electrónico
 * - Área de texto para mensaje
 * - Botón de envío
 *
 * El formulario está estilizado usando clases de Tailwind CSS e incluye:
 * - Diseño responsivo con disposición en cuadrícula para campos de teléfono/email
 * - Fondo con degradado
 * - Esquinas redondeadas y efectos de sombra
 * - Estados interactivos al enfocar
 * - Efectos personalizados al pasar el cursor sobre el botón de envío
 *
 * El envío del formulario actualmente se maneja con una notificación básica de alerta.
 * Todos los campos de entrada son obligatorios e incluyen validación HTML5 apropiada.
 */

"use client"

import Head from "next/head"
import { FormEvent, useState } from "react"
import Image from "next/image"

export default function Contact() {
  // Definición de estados para los campos del formulario
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  // Función que maneja el envío del formulario
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    alert("Formulario enviado!")
  }

  return (
    <>
      <Head>
        {/* Metadatos de la página */}
        <title>Contacto</title>
      </Head>

      {/* Encabezado de la página */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Contacto
          </h1>
        </div>
      </header>
      {/* Contenedor principal de la página de contacto */}
      <div className="min-h-screen bg-gradient-to-br from-pink-400/70 via-indigo-400/70 to-neutral-50 flex flex-col justify-center items-center sm:items-start px-4 sm:pl-20">
        {/* Background image */}
        <div
          className="hidden sm:block absolute right-0 top-1/2 -translate-y-3/4 mr-4 sm:mr-20 z-20"
          aria-hidden="true"
        >
          <Image
            src="/icons/contacto.png"
            alt=""
            width={800}
            height={800}
            className="opacity-60 w-[300px] sm:w-[500px] md:w-[600px] lg:w-[800px]"
          />
        </div>
        {/* Contenedor del formulario de contacto */}
        <div className="bg-pink-100 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-md z-30">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Cuéntanos lo que quieras
          </h2>
          {/* Formulario de contacto, los estilos van definidos en cada contenedor y campo */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre y apellidos
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tu nombre y apellidos"
                required
                aria-required="true"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="600123456"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="ejemplo@email.com"
                  required
                  aria-required="true"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Escribe tu mensaje
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Escribe aquí lo que nos quieras decir"
                required
                aria-required="true"
                rows={4}
              ></textarea>
            </div>
            {/* Botón para enviar el formulario con el mismo estilo que ya se aplicó en la página principal para mantener coherencia */}
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full border-2 border-black bg-purple-600 px-6 sm:px-20 py-3 text-white transition-all hover:bg-transparent hover:text-black hover:border-purple-800"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
