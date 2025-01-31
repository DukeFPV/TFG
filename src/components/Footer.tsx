//**Revisado */
// Definición del componente Footer
/**
 * Componente Footer que muestra enlaces de navegación, iconos de redes sociales e información de copyright.
 * Solo visible en pantallas pequeñas y más grandes (oculto en pantallas extra pequeñas).
 *
 * @component
 * @returns {JSX.Element} Una sección de pie de página que contiene:
 *  - Enlaces de navegación a diferentes páginas (Qué es SARA, Contacto, Quiénes somos, Aviso legal)
 *  - Enlaces a redes sociales (Facebook, Instagram, Twitter) con sus respectivos iconos
 *  - Aviso de copyright
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    // Sección del pie de página visible solo en pantallas pequeñas y mayores (hidden sm:flex)
    <footer
      className="bg-white hidden sm:flex inset-x-0 bottom-0"
      aria-label="Información de pie de página"
    >
      {/* Contenedor del pie de página */}
      <section className="max-w-screen-xl px-4 py-8 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        {/* Navegación con enlaces */}
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Enlaces de navegación"
        >
          <div className="px-5 py-2">
            <Link
              href="/"
              className="text-base leading-6 text-gray-500 hover:text-purple-900"
            >
              Que es SARA
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/contacto"
              className="text-base leading-6 text-gray-500 hover:text-purple-900"
            >
              Contacto
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/nosotros"
              className="text-base leading-6 text-gray-500 hover:text-purple-900"
            >
              Quienes somos
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-purple-900"
            >
              Aviso legal
            </Link>
          </div>
        </nav>

        {/* Enlaces a redes sociales */}
        <nav
          className="flex justify-center mt-8 space-x-6"
          aria-label="Enlaces de redes sociales"
        >
          <Link href="#" className="text-gray-400 hover:text-gray-900">
            <span className="sr-only">Facebook</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-900">
            <span className="sr-only">Instagram</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-900">
            <span className="sr-only">Twitter</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z" />
            </svg>
          </Link>
        </nav>

        {/* Nota de derechos de autor */}
        <p className="mt-8 text-base leading-6 text-center text-gray-600">
          2024 - {new Date().getFullYear()} José Carlos Lorenzo García, CC
          BY-NC-SA 4.0.
        </p>
      </section>
    </footer>
  )
}

// Exportación del componente para su uso en otros lugares
export default Footer
