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
// import { Webhook } from "svix"
// import { headers } from "next/headers"
// import { WebhookEvent } from "@clerk/nextjs/server"

// export async function POST(req: Request) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET

//   if (!SIGNING_SECRET) {
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
//     )
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET)

//   // Get headers
//   const headerPayload = await headers()
//   const svix_id = headerPayload.get("svix-id")
//   const svix_timestamp = headerPayload.get("svix-timestamp")
//   const svix_signature = headerPayload.get("svix-signature")

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error: Missing Svix headers", {
//       status: 400,
//     })
//   }

//   // Get body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   let evt: WebhookEvent

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error("Error: Could not verify webhook:", err)
//     return new Response("Error: Verification error", {
//       status: 400,
//     })
//   }

//   // Do something with payload
//   // For this guide, log payload to console
//   const { id } = evt.data
//   const eventType = evt.type
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   console.log("Webhook payload:", body)

//   return new Response("Webhook received", { status: 200 })
// }
