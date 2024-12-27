// src/app/api/health-centers/route.ts

import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { healthCenters } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"
import { SelectHealthCenter } from "@/lib/db/schema" // Importa el tipo

interface SearchFormData {
  name?: string
  province?: string
  municipality?: string
  locality?: string
  address?: string
  postal_code?: string
  phone?: string
  management_dependency?: string
}

export async function GET() {
  try {
    const results: SelectHealthCenter[] = await db.select().from(healthCenters)
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching health centers:", error)
    return NextResponse.json(
      { error: "Error al obtener los centros de salud" },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  try {
    const formData: SearchFormData = await req.json()
    const filters: any[] = []

    if (formData.name)
      filters.push(ilike(healthCenters.name, `%${formData.name}%`))
    if (formData.province)
      filters.push(ilike(healthCenters.province, `%${formData.province}%`))
    if (formData.municipality)
      filters.push(
        ilike(healthCenters.municipality, `%${formData.municipality}%`),
      )
    if (formData.locality)
      filters.push(ilike(healthCenters.locality, `%${formData.locality}%`))
    if (formData.address)
      filters.push(ilike(healthCenters.address, `%${formData.address}%`))
    if (formData.postal_code)
      filters.push(eq(healthCenters.postalCode, formData.postal_code))
    if (formData.phone) filters.push(eq(healthCenters.phone, formData.phone))
    if (formData.management_dependency)
      filters.push(
        ilike(
          healthCenters.managementDependency,
          `%${formData.management_dependency}%`,
        ),
      )

    const query = db.select().from(healthCenters)
    const results: SelectHealthCenter[] =
      filters.length > 0 ? await query.where(and(...filters)) : await query

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error searching health centers:", error)
    return NextResponse.json(
      { error: "Error al obtener los datos de los centros de salud" },
      { status: 500 },
    )
  }
}
