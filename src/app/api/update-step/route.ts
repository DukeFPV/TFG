import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { user_profiles } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json(
      { error: "Usuario no autenticado" },
      { status: 401 },
    )
  }

  const { nextStep } = await req.json()

  await db
    .update(user_profiles)
    .set({ currentStep: nextStep })
    .where(eq(user_profiles.clerkUserId, userId))

  return NextResponse.json({ success: true })
}
