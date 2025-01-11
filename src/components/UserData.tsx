"use client"

import React from "react"
import { UserProfile } from "@clerk/nextjs"

/**
 * Componente que renderiza la sección de datos del usuario
 * @routing virtual https://clerk.com/docs/components/user/user-profile#properties
 * @returns Un componente de React que muestra el perfil del usuario con enrutamiento virtual
 *
 */

export function UserData() {
  return (
    <>
      <UserProfile routing="virtual" />
    </>
  )
}
