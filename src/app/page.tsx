//**Revisado */
/**
 * Componente Home - Página principal de la aplicación
 *
 * Este componente renderiza la página principal con las siguientes secciones:
 * - Una sección hero con encabezado principal, subtítulo y botón CTA
 * - Mensaje de advertencia sobre el uso de IA
 * - Sección promocional de WhatsApp
 *
 * El componente utiliza diseño responsive con diferentes layouts e imágenes para móvil/escritorio:
 * - La imagen de fondo cambia entre versiones móvil/escritorio
 * - La imagen hero tiene versiones separadas para móvil/escritorio
 * - El estilo del texto y botones se adapta al tamaño de la pantalla
 *
 * @component
 * @returns {JSX.Element} El componente de página Home renderizado
 */

import React from "react"
import Image from "next/image"
import Balancer from "react-wrap-balancer"
import heroImage from "/public/icons/hero2.png"
import heroImageMobile from "/public/icons/hero2-mobile.png"
import imgWhatsApp from "/public/icons/whatsapp.png"

// Se crea el componente Home que contiene la página principal
export default function Home() {
  return (
    // Se crea el contenedor principal de la página
    <div className="lg:min-h-screen w-full">
      {/* Sección principal con fondo oculto en dispositivos móviles */}
      <div
        className="-z-10 absolute inset-0 m-auto overflow-hidden bg-homeMobile md:bg-home bg-no-repeat"
        aria-hidden="true"
      ></div>

      {/* Sección Hero */}
      <section className="mx-auto flex max-w-6xl flex-col-reverse gap-2 px-4 pb-12 transition-all md:flex-row md:gap-4">
        {/* Contenedor de textos en la sección Hero */}
        <div className="flex flex-col items-center gap-6 pt-8 text-center md:w-1/2 md:items-center md:gap-10 md:pt-5 md:text-center">
          <Balancer>
            <h1
              className="text-6xl font-semibold text-cyan-300 sm:text-cyan-300 sm:text-8xl pb-5"
              id="home-hero-title"
            >
              SARA
            </h1>
            <h2 className="text-4xl md:text-5xl md:text-white text-neutral-50">
              <span className="text-purple-300 sm:text-purple-300 font-bold">
                IA
              </span>{" "}
              para ayudarte
            </h2>
          </Balancer>

          <p className="text-neutral-50 sm:text-neutral-200 max-w-max md:max-w-[400px] text-left px-6">
            <Balancer>
              Bienvenido a SARA, tu asistente inteligente diseñado para ayudar a
              las personas mayores en el uso de las tecnologías de la
              información y comunicación (TIC). SARA ofrece asistencia
              personalizada y clara, adaptándose a tus necesidades en tiempo
              real. Ya sea que necesites guías paso a paso, recomendaciones
              específicas o simplemente una conversación amigable, SARA está
              aquí para facilitar tu experiencia tecnológica. ¡Explora el mundo
              digital con confianza y apoyo continuo con SARA!
            </Balancer>
          </p>

          <button
            aria-label="Saber más sobre SARA"
            className="w-fit rounded-full border-2 border-purple-400 bg-purple-400 sm:bg-purple-400 px-14 py-5 text-white transition-all hover:border-purple-300 hover:bg-transparent sm:hover:text-white/90 hover:text-black/90 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Saber más
          </button>
        </div>

        {/* Imagen Hero */}
        <aside className="md:w-1/2 content-center">
          <Image
            className="hidden h-auto max-w-[400px] md:block"
            src={heroImage}
            alt="Ilustración de una IA ayudando a personas"
            aria-label="Ilustración principal"
            priority
          />
          <Image
            className="h-auto w-full md:hidden"
            src={heroImageMobile}
            alt="Ilustración adaptada a móvil de una IA ayudando a personas"
            priority
          />
        </aside>
      </section>

      {/* Mensaje de advertencia sobre el uso de IA */}
      <aside
        className="flex flex-col-reverse items-center px-4 sm:px-0"
        aria-label="Advertencia sobre uso de IA"
      >
        <p className="text-white md:text-neutral-600 sm:text-neutral-200 w-full md:w-[800px] md:text-center md:text-xs px-10 text-[12px]">
          Al utilizar la inteligencia artificial se debe prestar atención a que
          no se está hablando con una persona y que algunas respuestas pueden no
          ser exactas. Ante cualquier duda puedes escribirnos a ayuda@correo.com
          o por whatsapp +34600123456. Estaremos encantados de ayudarte.
        </p>
      </aside>

      {/* Sección de promoción de WhatsApp */}
      <section
        className="mx-auto flex max-w-6xl flex-col-reverse gap-2 sm:pt-24 px-4 pb-12 transition-all sm:flex-row md:gap-4"
        aria-labelledby="whatsapp-title"
      >
        <div className="flex flex-col items-center gap-6 pt-8 text-center md:w-1/2 md:items-center md:gap-10 md:pt-5 md:text-center">
          <h2
            className="font-semibold text-neutral-200 md:text-neutral-800"
            id="whatsapp-title"
          >
            También estaremos en WhatsApp
          </h2>
          <h2 className="font-semibold text-3xl text-neutral-50 md:text-neutral-900">
            Prueba una nueva forma de hablar con SARA
          </h2>
          <p className="text-neutral-100 md:text-neutral-900">
            Descubre el nuevo método para comunicarte con a través de la mayor
            app de mensajería utilizada por todo el mundo.
          </p>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-6 pt-8 text-center md:w-1/2 md:items-center md:gap-10 md:pt-5 md:text-center">
            <button
              aria-label="Pronto se podrá hablar con SARA por WhatsApp"
              className="border-white md:border-black w-fit rounded-full border-2 bg-purple-600 px-20 sm:px-6 py-4 text-white transition-all hover:border-purple-600 hover:bg-transparent hover:text-black/90 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Pronto...
            </button>
            <button
              aria-label="Saber más sobre cómo será usar WhatsApp con SARA"
              className="border-white md:border-black w-fit rounded-full border-2 bg-purple-600 text-nowrap px-20 sm:px-6 py-4 text-white transition-all hover:border-purple-600 hover:bg-transparent hover:text-black/90 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Saber más
            </button>
          </div>
        </div>

        {/* Imagen promocional de WhatsApp */}
        <aside
          className="flex justify-center md:w-1/2 content-center"
          aria-label="Imagen promocional de WhatsApp"
        >
          <Image
            className="hidden h-auto max-w-[500px] md:block"
            src={imgWhatsApp}
            alt="WhatsApp promocional con SARA"
          />
        </aside>
      </section>
    </div>
  )
}
