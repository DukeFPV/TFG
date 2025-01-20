//**Revisado */
"use client"
import React from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

/**
 * Un componente que envuelve la aplicación con un QueryClientProvider.
 * Este componente habilita la funcionalidad de React Query para todos los componentes hijos.
 *
 * @component
 * @param {object} props - Los props del componente
 * @param {ReactNode} props.children - Los elementos hijos que serán envueltos por el proveedor
 * @returns {JSX.Element} Un QueryClientProvider envolviendo los elementos hijos
 */

const Provider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Provider
