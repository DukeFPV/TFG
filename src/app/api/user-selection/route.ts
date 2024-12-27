import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"
import { user_profiles, healthCenters } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getAuth } from "@clerk/nextjs/server"

interface UserSelection {
  healthCenterId?: number
}

export async function POST(req: NextRequest) {
  console.log("POST /api/user-selection called")
  try {
    const { healthCenterId }: UserSelection = await req.json()
    console.log("Received healthCenterId:", healthCenterId)

    if (!healthCenterId) {
      console.log("healthCenterId is missing")
      return NextResponse.json(
        { error: "healthCenterId es requerido" },
        { status: 400 },
      )
    }

    const { userId } = getAuth(req)
    console.log("Authenticated userId:", userId)

    if (!userId) {
      console.log("User not authenticated")
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

    console.log("Health center found:", center)

    if (center.length === 0) {
      console.log("Health center not found")
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

    console.log("User profile found:", userProfile)

    if (userProfile.length === 0) {
      console.log("User profile not found")
      return NextResponse.json(
        { error: "Perfil de usuario no encontrado" },
        { status: 404 },
      )
    }

    // Actualizar la selección en user_profiles
    await db
      .update(user_profiles)
      .set({ selectedHealthCenterId: healthCenterId })
      .where(eq(user_profiles.clerkUserId, userId))

    console.log("Selected health center updated successfully")

    return NextResponse.json(
      { message: "Selección guardada exitosamente" },
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
  console.log("DELETE /api/user-selection called")
  try {
    const { userId } = getAuth(req)
    console.log("Authenticated userId:", userId)

    if (!userId) {
      console.log("User not authenticated")
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

    console.log("User profile found:", userProfile)

    if (userProfile.length === 0) {
      console.log("User profile not found")
      return NextResponse.json(
        { error: "Perfil de usuario no encontrado" },
        { status: 404 },
      )
    }

    // Borrar la selección
    await db
      .update(user_profiles)
      .set({ selectedHealthCenterId: null })
      .where(eq(user_profiles.clerkUserId, userId))

    console.log("Selected health center cleared successfully")

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
  console.log("GET /api/user-selection called")
  try {
    const { userId } = getAuth(req)
    console.log("Authenticated userId:", userId)

    if (!userId) {
      console.log("User not authenticated")
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

    console.log("User profile found:", userProfile)

    if (userProfile.length === 0) {
      console.log("User profile not found")
      return NextResponse.json(
        { error: "Perfil de usuario no encontrado" },
        { status: 404 },
      )
    }

    console.log(
      "Returning selectedHealthCenterId:",
      userProfile[0].selectedHealthCenterId,
    )

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
