//**Revisado */
/**
 * Actualiza la información del perfil de usuario en la base de datos.
 *
 * @param req - El objeto de solicitud API de Next.js que contiene la autenticación del usuario y datos del perfil
 * @returns Una respuesta JSON indicando éxito o fallo
 * - Devuelve 401 si el usuario no está autenticado
 * - Devuelve 500 si hay un error durante el proceso de actualización
 * - Devuelve 200 con success:true si la actualización es exitosa
 *
 * @throws Lanzará un error si la operación en la base de datos falla
 *
 * Estructura esperada del cuerpo de la solicitud:
 * ```
 * {
 *   age: number,
 *   genero: string,
 *   provincia: string,
 *   telefono: string,
 *   birthday?: Date | null
 * }
 * ```
 */

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { user_profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getAuth } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      )
    }

    const body = await req.json()

    // Extraer los campos requeridos del cuerpo de la solicitud
    const { age, genero, provincia, telefono, birthday } = body

    // Actualizar el perfil del usuario en la base de datos
    await db
      .update(user_profiles)
      .set({
        age,
        genero,
        provincia,
        telefono,
        birthday: birthday ?? null,
      })
      .where(eq(user_profiles.clerkUserId, userId))

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error al actualizar perfil:", error)
    return NextResponse.json(
      { error: "Error al actualizar perfil" },
      { status: 500 },
    )
  }
}
