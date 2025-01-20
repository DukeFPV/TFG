//**Revisado */
/**
 * Maneja las solicitudes POST de los webhooks de Clerk para procesar eventos relacionados con usuarios.
 *
 * Este endpoint maneja específicamente el evento 'user.created' creando un nuevo
 * perfil de usuario en la base de datos con los datos recibidos de Clerk.
 *
 * @param req - La solicitud HTTP entrante que contiene la carga útil del webhook
 * @returns Una respuesta JSON indicando éxito (200) o fallo (500)
 * @throws Devolverá un código de estado 500 si falla el procesamiento del webhook
 *
 * @example
 * Carga útil del webhook para user.created:
 * {
 *   type: "user.created",
 *   data: {
 *     id: string,
 *     firstName: string,
 *     lastName: string,
 *     emailAddresses: Array<{emailAddress: string}>
 *   }
 * }
 */

import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { user_profiles } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

// Importar funciones para verificar el webhook de Clerk si es necesario
export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // Verificar el tipo de evento
    const eventType = payload.type

    if (eventType === "user.created") {
      const user = payload.data

      // Crear un perfil de usuario en la base de datos
      await db.insert(user_profiles).values({
        clerkUserId: user.id,
        name: user.firstName + " " + user.lastName,
        email: user.emailAddresses[0]?.emailAddress || "",
        // Añade los demás campos necesarios con valores por defecto o desde el payload
        birthday: null,
        age: 0,
        health: "",
        bank: "",
        provincia: "",
        genero: "",
        telefono: "",
      })
    }

    // Manejar otros eventos si es necesario

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    )
  }
}
