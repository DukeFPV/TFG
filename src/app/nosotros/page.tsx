// "use client" indica que este archivo contiene código del cliente
"use client"

// Importaciones necesarias desde React y Next.js
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Head from 'next/head';

// Definición del componente QuienesSomos
export default function QuienesSomos() {
  // Contenido predeterminado para las secciones del acordeón
  const defaultContent1 = (
    <div className="text-gray-500 mt-2">
      <p>SARA es el acrónimo de Sistema Avanzado de Respuestas y Ayuda, es una herramienta de IA que está para ayudar a las personas mayores en el uso de las TIC a través de la automatización inteligente y el análisis de datos. Con la capacidad de aprender de tus interacciones, SARA puede ofrecerte soluciones personalizadas y asistencia en tiempo real. </p>
    </div>
  )
  const defaultContent2 = (
    <div className="text-gray-500 mt-2">
      <p>La seguridad y la privacidad son pilares fundamentales en el diseño y operación de SARA. Nos comprometemos a proteger tus datos y asegurar que tu interacción con el sistema sea segura.</p>
    </div>
  )
  const defaultContent3 = (
    <div className="text-gray-500 mt-2">
      <p>Entendemos la importancia de tu privacidad y te proporcionamos el control total sobre tus datos. Si deseas borrar los chats almacenados en SARA, puedes hacerlo en la ventana de chat pulsando sobre el icono de borrar.</p>
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
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-lg text-center leading-6 font-medium text-gray-900">Descubre un poco del proyecto</h2>
            <p className="mt-1 text-center text-sm text-gray-500">Te enseñamos de donde surge la idea y el proyecto que tenemos.</p>
            
            {/* Contenedor con información sobre el equipo y la aplicación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-4 shadow-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-center text-lg">El equipo</h3>
                  <p className="text-white text-center text-opacity-80 mt-2">El grupo de personas que hay detrás de SARA.</p>
                </div>
                <a href="#" className="text-sm text-right pr-10 text-teal-200 hover:text-teal-100 mt-4 inline-block">Saber más →</a>
              </div>
              <div className="flex flex-col space-y-6">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-4 shadow-lg">
                  <h3 className="text-white text-lg">La aplicación</h3>
                  <p className="text-white text-opacity-80 mt-2">Un poco de historia de como llegamos a esta aplicación.</p>
                  <a href="#" className="text-sm text-blue-200 hover:text-blue-100 mt-4 inline-block">Saber más →</a>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 shadow-lg">
                  <h3 className="text-white text-lg">Usuarios</h3>
                  <p className="text-white text-opacity-80 mt-2">Lo que opinan de nosotros algunos usuarios.</p>
                  <a href="#" className="text-sm text-pink-200 hover:text-pink-100 mt-4 inline-block">Saber más →</a>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de preguntas y respuestas con un accordeon importado de la libreria nextUI */}
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mt-6">
            <h2 className="text-lg text-center leading-6 font-medium text-gray-900">Preguntas y respuestas</h2>
            <div className="mt-2">
              <p className="text-sm text-center text-gray-500 pb-10">A continuación, algunas preguntas frecuentes sobre nuestro proyecto.</p>
              <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="Respuesta 1" title="Que puede hacer SARA por mi">
                  {defaultContent1}
                </AccordionItem>
                <AccordionItem key="2" aria-label="Respuesta 2" title="Es seguro utilizar SARA">
                  {defaultContent2}
                </AccordionItem>
                <AccordionItem key="3" aria-label="Respuesta 3" title="Como puedo pedir que borre los chats">
                  {defaultContent3}
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
