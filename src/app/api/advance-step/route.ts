// src/app/api/advance-step/route.ts

import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { user_profiles, messages } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import stepsSergas from "@/data/stepMedicoSergas"

// Definir el esquema de validación con Zod
const AdvanceStepSchema = z.object({
  chatId: z.number(),
  action: z.enum(["advance", "back"]).optional(), // Nuevo parámetro
})

export async function POST(req: Request) {
  // Autenticación del usuario
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: "Usuario no autenticado" },
      { status: 401 },
    )
  }

  try {
    const body = await req.json()
    const parsed = AdvanceStepSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
    }

    const { chatId, action = "advance" } = parsed.data

    // Obtener el perfil del usuario para saber el paso actual
    const userProfileResult = await db
      .select()
      .from(user_profiles)
      .where(eq(user_profiles.clerkUserId, userId))
      .execute()

    if (userProfileResult.length === 0) {
      return NextResponse.json(
        { error: "Perfil de usuario no encontrado" },
        { status: 404 },
      )
    }

    let currentStep = userProfileResult[0].currentStep ?? 1

    if (action === "advance") {
      if (currentStep < stepsSergas.length) {
        const step = stepsSergas[currentStep]
        const assistantMessage = {
          chatId,
          content: step.text,
          role: "assistant" as const,
          image: step.image || null,
          buttons: [
            { label: "Atrás", action: "back" },
            { label: "Siguiente", action: "advance" },
            { label: "Salir", action: "exit" },
          ],
        }

        // Insertar el mensaje en la base de datos
        await db.insert(messages).values(assistantMessage).execute()

        // Actualizar el paso en la base de datos
        await db
          .update(user_profiles)
          .set({ currentStep: currentStep + 1 })
          .where(eq(user_profiles.clerkUserId, userId))
          .execute()

        return NextResponse.json({
          message: "Paso avanzado correctamente",
          step: {
            text: step.text,
            image: step.image || null,
            buttons: assistantMessage.buttons,
          },
          currentStep: currentStep + 1,
        })
      } else if (currentStep === stepsSergas.length) {
        // Proceso completado
        const finalMessage = {
          chatId,
          content:
            "¡Enhorabuena! Has completado todos los pasos para pedir una cita médica. Si necesitas más ayuda, no dudes en preguntar.",
          role: "assistant" as const,
          image: null,
          buttons: [{ label: "Salir", action: "exit" }],
        }

        // Insertar el mensaje de finalización en la base de datos
        await db.insert(messages).values(finalMessage).execute()

        return NextResponse.json({
          message: "Proceso completado",
          finalMessage: {
            content: finalMessage.content,
            image: finalMessage.image,
            buttons: finalMessage.buttons,
          },
          currentStep,
        })
      } else {
        return NextResponse.json(
          { error: "Ya has completado todos los pasos" },
          { status: 400 },
        )
      }
    } else if (action === "back") {
      if (currentStep > 1) {
        const newStep = currentStep - 1 // Decrementar en 1
        const step = stepsSergas[newStep - 1] // stepsSergas es 0-indexed

        const assistantMessage = {
          chatId,
          content: step.text,
          role: "assistant" as const,
          image: step.image || null,
          buttons: [
            { label: "Atrás", action: "back" },
            { label: "Siguiente", action: "advance" },
            { label: "Salir", action: "exit" },
          ],
        }

        // Insertar el mensaje en la base de datos
        await db.insert(messages).values(assistantMessage).execute()

        // Actualizar el paso en la base de datos
        await db
          .update(user_profiles)
          .set({ currentStep: newStep })
          .where(eq(user_profiles.clerkUserId, userId))
          .execute()

        return NextResponse.json({
          message: "Paso retrocedido correctamente",
          step: {
            text: step.text,
            image: step.image || null,
            buttons: assistantMessage.buttons,
          },
          currentStep: newStep,
        })
      } else {
        return NextResponse.json(
          { error: "Ya estás en el primer paso" },
          { status: 400 },
        )
      }
    } else {
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error al avanzar/retroceder el paso:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    )
  }
}
