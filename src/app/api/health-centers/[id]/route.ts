import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { healthCenters } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const id = params.id

  try {
    const center = await db
      .select()
      .from(healthCenters)
      .where(eq(healthCenters.id, Number(id)))
      .limit(1)

    if (center.length === 0) {
      return NextResponse.json(
        { error: "Centro de salud no encontrado" },
        { status: 404 },
      )
    }

    return NextResponse.json({ results: center })
  } catch (error) {
    console.error("Error fetching health center by ID:", error)
    return NextResponse.json(
      { error: "Error al obtener el centro de salud" },
      { status: 500 },
    )
  }
}
