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

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      )
    }

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

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      )
    }

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
