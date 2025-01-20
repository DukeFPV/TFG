//**Revisado */
/**
 * Maneja la solicitud POST para actualizar el centro de salud seleccionado por el usuario.
 *
 * @param req - Objeto de solicitud Next.js que contiene los datos de selección del centro de salud
 * @returns NextResponse con mensaje de éxito/error y código de estado apropiado:
 * - 200: Selección guardada con éxito
 * - 400: Falta healthCenterId
 * - 401: Usuario no autenticado
 * - 404: Centro de salud o perfil de usuario no encontrado
 * - 500: Error del servidor al guardar la selección
 *
 * @throws Lanzará un error si falla el procesamiento de la solicitud
 */

import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { user_profiles, healthCenters } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getAuth } from "@clerk/nextjs/server"

interface UserSelection {
  healthCenterId?: number
}

export async function POST(req: NextRequest) {
  try {
    const { healthCenterId }: UserSelection = await req.json()

    if (!healthCenterId) {
      return NextResponse.json(
        { error: "healthCenterId es requerido" },
        { status: 400 },
      )
    }

    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      )
    }

    // Verificar si el centro de salud existe
    const center = await db
      .select()
      .from(healthCenters)
      .where(eq(healthCenters.id, healthCenterId))
      .limit(1)

    if (center.length === 0) {
      return NextResponse.json(
        { error: "Centro de salud no encontrado" },
        { status: 404 },
      )
    }

    // Verificar si el usuario tiene un perfil
    const userProfile = await db
      .select()
      .from(user_profiles)
      .where(eq(user_profiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json(
        { error: "Perfil de usuario no encontrado" },
        { status: 404 },
      )
    }

    // Guardar la selección del usuario en la base de datos
    await db
      .update(user_profiles)
      .set({ selectedHealthCenterId: healthCenterId })
      .where(eq(user_profiles.clerkUserId, userId))

    return NextResponse.json(
      { message: "Selección guardada con éxito" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error al guardar la selección:", error)
    return NextResponse.json(
      { error: "Error al guardar la selección" },
      { status: 500 },
    )
  }
}

// Función DELETE para borrar la selección del usuario
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      )
    }

    // Verificar si el usuario tiene un perfil
    const userProfile = await db
      .select()
      .from(user_profiles)
      .where(eq(user_profiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json(
        { error: "Perfil de usuario no encontrado" },
        { status: 404 },
      )
    }

    // Borrar la selección del usuario en la base de datos
    await db
      .update(user_profiles)
      .set({ selectedHealthCenterId: null })
      .where(eq(user_profiles.clerkUserId, userId))

    return NextResponse.json(
      { message: "Selección borrada exitosamente" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error al borrar la selección:", error)
    return NextResponse.json(
      { error: "Error al borrar la selección" },
      { status: 500 },
    )
  }
}

// Función GET para obtener la selección del usuario
export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      )
    }

    // Verificar si el usuario tiene
    const userProfile = await db
      .select({ selectedHealthCenterId: user_profiles.selectedHealthCenterId })
      .from(user_profiles)
      .where(eq(user_profiles.clerkUserId, userId))
      .limit(1)

    if (userProfile.length === 0) {
      return NextResponse.json(
        { error: "Perfil de usuario no encontrado" },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { selectedHealthCenterId: userProfile[0].selectedHealthCenterId },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error al obtener la selección del usuario:", error)
    return NextResponse.json(
      { error: "Error al obtener la selección del usuario" },
      { status: 500 },
    )
  }
}
