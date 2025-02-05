/**
 * Maneja las peticiones POST para buscar centros de salud según los filtros proporcionados.
 * @param req - El objeto de solicitud HTTP que contiene los criterios de búsqueda en formato JSON
 * @returns {Promise<NextResponse>} Una Promesa que se resuelve en una NextResponse que contiene:
 *   - En caso de éxito: Objeto JSON con un array de centros de salud que coinciden
 *   - En caso de error: Objeto JSON con mensaje de error y código de estado 500
 * @throws Devolverá una respuesta 500 si hay un error al procesar la solicitud
 * @example
 * {
 *   id?: string,
 *   name?: string,
 *   province?: string,
 *   municipality?: string,
 *   locality?: string,
 *   address?: string,
 *   postal_code?: string,
 *   phone?: string,
 *   management_dependency?: string
 * }
 */

import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { healthCenters } from "@/lib/db/schema"
import { eq, ilike, and } from "drizzle-orm"

interface SearchFormData {
  id?: number
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
    const results = await db.select().from(healthCenters)
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

    // Construir filtros de búsqueda
    if (formData.id) filters.push(eq(healthCenters.id, formData.id))
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
    const results =
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
