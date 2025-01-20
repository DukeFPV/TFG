//**Revisado */
/**
 * Maneja las peticiones GET para obtener datos del perfil de usuario.
 *
 * @param req - El objeto de petición Next.js que contiene la información de autenticación
 * @returns Un objeto NextResponse con:
 *  - Datos del perfil de usuario (200 OK)
 *  - Mensaje de error para usuario no autenticado (401 No autorizado)
 *  - Datos de usuario nulos si no se encuentra el perfil (404 No encontrado)
 * @throws Lanzará un error si la consulta a la base de datos falla
 */

import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { user_profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getAuth } from "@clerk/nextjs/server"

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json(
      { error: "Usuario no autenticado" },
      { status: 401 },
    )
  }

  const userData = await db
    .select()
    .from(user_profiles)
    .where(eq(user_profiles.clerkUserId, userId))
    .limit(1)

  // Comprobar si el usuario existe
  if (userData.length === 0) {
    return NextResponse.json({ user: null }, { status: 404 })
  }

  return NextResponse.json({ user: userData[0] })
}
