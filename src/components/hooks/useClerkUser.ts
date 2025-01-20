//**Revisado */
/**
 * Hook personalizado que proporciona acceso a los datos de usuario de Clerk con valores de retorno simplificados.
 *
 * @returns Un objeto que contiene:
 * - user: El objeto usuario de Clerk si está cargado y ha iniciado sesión, null en caso contrario
 * - isLoaded: Booleano que indica si los datos del usuario han terminado de cargar
 * - isSignedIn: Booleano que indica si un usuario ha iniciado sesión actualmente
 */

import { useUser as useClerkUser } from "@clerk/nextjs"

export const useClerkUserData = () => {
  const { user, isLoaded, isSignedIn } = useClerkUser()

  return {
    user: isLoaded && isSignedIn ? user : null,
    isLoaded,
    isSignedIn,
  }
}
