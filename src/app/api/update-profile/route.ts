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
    const { age, genero, provincia, telefono, birthday } = body

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
