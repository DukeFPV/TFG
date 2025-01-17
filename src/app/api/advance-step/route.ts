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
  action: z.enum(["advance", "back", "exit", "reset"]).optional(),
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
          buttons: [
            { label: "Salir", action: "exit" },
            { label: "Reiniciar", action: "reset" },
          ],
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
          { status: 200 },
        )
      }
    } else if (currentStep >= 1 && action === "back") {
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
        return NextResponse.json({ error: "Ya estás en el primer paso" })
      }
    } else if (action === "exit") {
      // Crear el mensaje de salida
      const exitContent = `Has salido de la guía paso a paso, te has quedado en el paso ${currentStep}. Si quieres continuar desde donde lo dejaste, vuelve a pulsar en el botón **Salud Digital**.`
      const exitMessage = {
        chatId,
        content: exitContent,
        role: "assistant" as const,
        image: null,
        buttons: [],
      }
      // Insertar el mensaje de salida en la base de datos
      await db.insert(messages).values(exitMessage).execute()

      // Actualizar el perfil del usuario si deseas restablecer el paso
      // await db
      //   .update(user_profiles)
      //   .set({ currentStep: 1 }) // O mantener el currentStep actual
      //   .where(eq(user_profiles.clerkUserId, userId))
      //   .execute()

      return NextResponse.json({
        message: "Has salido de la guía paso a paso.",
        exitMessage: {
          content: exitMessage.content,
          image: exitMessage.image,
          buttons: exitMessage.buttons,
        },
        currentStep, // Mantiene el paso actual
      })
    } else if (action === "reset") {
      // Crear el mensaje de reinicio
      const step = stepsSergas[0]
      const reiniciarContent = `Has reiniciado la guía paso a paso. Ahora estás en el **paso 1**. Puedes continuar desde el inicio si lo deseas.`
      const reiniciarMessage = {
        chatId,
        content: reiniciarContent,
        role: "assistant" as const,
        image: step.image || null,
        buttons: [
          { label: "Siguiente", action: "advance" },
          { label: "Salir", action: "exit" },
        ],
      }

      // Insertar el mensaje de reinicio en la base de datos
      await db.insert(messages).values(reiniciarMessage).execute()

      // Restablecer el paso actual en el perfil del usuario
      await db
        .update(user_profiles)
        .set({ currentStep: 1 })
        .where(eq(user_profiles.clerkUserId, userId))
        .execute()

      return NextResponse.json({
        message: "Has reiniciado la guía paso a paso.",
        reiniciarMessage: {
          content: reiniciarMessage.content,
          image: reiniciarMessage.image,
          buttons: reiniciarMessage.buttons,
        },
        currentStep: 1, // Paso restablecido a 1
      })
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
