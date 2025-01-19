//**Revisado */
/**
 * Obtiene un centro de salud por su ID desde la base de datos.
 * La url de la solicitud debe contener el ID del centro de salud de forma dinámica.
 *
 * @param request - El objeto de solicitud HTTP entrante
 * @param context - El objeto de contexto que contiene los parámetros de ruta
 * @param context.params - Promise que contiene los parámetros de ruta
 * @param context.params.id - El ID del centro de salud a recuperar
 *
 * @returns Una Promise que se resuelve en una NextResponse que contiene:
 * - Un objeto JSON con los datos del centro de salud en el campo 'results'
 * - Una respuesta de error 404 si no se encuentra el centro de salud
 * - Una respuesta de error 500 si hay un error del servidor
 *
 * @throws Capturará y manejará cualquier error de base de datos, retornando una respuesta 500
 */

import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { healthCenters } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const id = (await context.params).id

  // Obtener el centro de salud por ID
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
