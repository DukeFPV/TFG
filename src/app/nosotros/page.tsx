//**Revisado */
// Definición del componente QuienesSomos
/**
 * Página "Quiénes somos" que muestra información sobre el proyecto SARA.
 *
 * Esta página contiene:
 * - Un encabezado con el título de la página
 * - Una sección principal con información sobre el equipo y la aplicación
 * - Una sección de preguntas frecuentes implementada como un acordeón
 *
 * @returns Componente React que renderiza la página completa de "Quiénes somos"
 *
 * @example
 * ```tsx
 * <QuienesSomos />
 * ```
 *
 * @remarks
 * El componente utiliza:
 * - Tailwind CSS para los estilos
 * - NextUI para el componente Accordion
 * - Contenido predefinido para las secciones del acordeón
 *
 * La página está estructurada en secciones:
 * - Header: Título de la página
 * - Main: Contenido principal con cards informativas
 * - FAQ: Preguntas frecuentes en formato acordeón
 */

"use client"

import React from "react"
import { Accordion, AccordionItem } from "@nextui-org/react"
import Head from "next/head"

export default function QuienesSomos() {
  // Contenido predeterminado para las secciones del acordeón
  const defaultContent1 = (
    <div className="text-gray-500 mt-2">
      <p>
        SARA es el acrónimo de Sistema Avanzado de Respuestas y Ayuda, es una
        herramienta de IA que está para ayudar a las personas mayores en el uso
        de las TIC a través de la automatización inteligente y el análisis de
        datos. Con la capacidad de aprender de tus interacciones, SARA puede
        ofrecerte soluciones personalizadas y asistencia en tiempo real.{" "}
      </p>
    </div>
  )
  const defaultContent2 = (
    <div className="text-gray-500 mt-2">
      <p>
        La seguridad y la privacidad son pilares fundamentales en el diseño y
        operación de SARA. Nos comprometemos a proteger tus datos y asegurar que
        tu interacción con el sistema sea segura.
      </p>
    </div>
  )
  const defaultContent3 = (
    <div className="text-gray-500 mt-2">
      <p>
        Entendemos la importancia de tu privacidad y te proporcionamos el
        control total sobre tus datos. Si deseas borrar los chats almacenados en
        SARA, puedes hacerlo en la ventana de chat pulsando sobre el icono de
        borrar.
      </p>
    </div>
  )

  return (
    // Contenedor principal de la página "Quiénes somos"
    <div className="min-h-screen bg-gray-50">
      <Head>
        {/* Metadatos de la página */}
        <title>Quiénes somos</title>
      </Head>

      {/* Encabezado de la página */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Quiénes somos</h1>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Sección principal de contenido */}
          <section
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6"
            aria-labelledby="section-descubrir"
          >
            <h2
              id="section-descubrir"
              className="text-lg text-center leading-6 font-medium text-gray-900"
            >
              Descubre un poco del proyecto
            </h2>
            <p className="mt-1 text-center text-sm text-gray-500">
              Te enseñamos de donde surge la idea y el proyecto que tenemos.
            </p>

            {/* Contenedor con información sobre el equipo y la aplicación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div
                className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 shadow-lg flex flex-col justify-between"
                role="region"
                aria-labelledby="equipo-title"
              >
                <div>
                  <h3
                    className="text-white text-left sm:text-center text-lg"
                    id="equipo-title"
                  >
                    El equipo
                  </h3>
                  <p className="text-white text-left sm:text-center text-opacity-80 mt-2">
                    El grupo de personas que hay detrás de SARA.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-sm text-left sm:text-right pr-10 text-teal-50 hover:text-teal-950 mt-4 inline-block"
                  aria-label="Saber más sobre el equipo de SARA"
                >
                  Saber más sobre el equipo →
                </a>
              </div>
              <div className="flex flex-col space-y-6">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-4 shadow-lg"
                  aria-labelledby="historia-title"
                >
                  <h3 id="historia-title" className="text-white text-lg">
                    La aplicación
                  </h3>
                  <p className="text-white text-opacity-80 mt-2">
                    Un poco de historia de como llegamos a esta aplicación.
                  </p>
                  <a
                    href="#"
                    className="text-sm text-blue-50 hover:text-blue-950 mt-4 inline-block"
                    aria-label="Saber más sobre la aplicación de SARA"
                  >
                    Saber más de la aplicación →
                  </a>
                </div>
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 shadow-lg"
                  aria-labelledby="opinion-title"
                >
                  <h3 id="opinion-title" className="text-white text-lg">
                    Usuarios
                  </h3>
                  <p className="text-white text-opacity-80 mt-2">
                    Lo que opinan de nosotros algunos usuarios.
                  </p>
                  <a
                    href="#"
                    className="text-sm text-pink-50 hover:text-pink-950 mt-4 inline-block"
                    aria-label="Saber más sobre lo que opinan los usuarios de SARA"
                  >
                    Saber más de las opiniones →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de preguntas y respuestas con un accordeon importado de la libreria nextUI */}
          <section
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mt-6"
            aria-labelledby="section-preguntas"
          >
            <h2
              id="section-preguntas"
              className="text-lg text-center leading-6 font-medium text-gray-900"
            >
              Preguntas y respuestas
            </h2>
            <div className="mt-2">
              <p className="text-sm text-center text-gray-500 pb-10">
                A continuación, algunas preguntas frecuentes sobre nuestro
                proyecto.
              </p>
              <Accordion variant="splitted">
                <AccordionItem
                  key="1"
                  aria-label="Pregunta: ¿Qué puede hacer SARA por mí?"
                  title="Que puede hacer SARA por mi"
                >
                  {defaultContent1}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Pregunta: ¿Es seguro utilizar SARA?"
                  title="Es seguro utilizar SARA"
                >
                  {defaultContent2}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Pregunta: ¿Cómo puedo pedir que borre los chats?"
                  title="Como puedo pedir que borre los chats"
                >
                  {defaultContent3}
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
