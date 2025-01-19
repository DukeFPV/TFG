//**Revisado */
/**
 * Componente de diseño raíz que envuelve toda la aplicación.
 * Proporciona autenticación, gestión de estado y proveedores de UI.
 *
 * @component
 * @async
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que se renderizarán dentro del diseño
 * @returns {Promise<JSX.Element>} El componente de diseño renderizado
 *
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { esES } from "@clerk/localizations"
import Provider from "@/components/Provider"
import { Toaster } from "react-hot-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sara IA",
  description: "Sara IA, tu asistente virtual",
  icons: { icon: "/icons/favicon-24x24.png" },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider localization={esES}>
      <Provider>
        <html className={inter.className} lang="es">
          <body className="relative max-w-7xl m-auto">
            <NextUIProvider>
              <Header />
              {children}
              <Toaster />
              <Footer />
            </NextUIProvider>
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  )
}
