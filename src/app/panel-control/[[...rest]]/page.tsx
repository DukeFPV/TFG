import { db } from "@/lib/db"
import { messages, user_profiles } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { PanelLayout } from "@/components/PanelLayout"
import { currentUser } from "@clerk/nextjs/server"

export default async function PanelControl() {
  // Obtener el usuario actual de Clerk
  const user = await currentUser()

  if (user) {
    const email = user.emailAddresses[0]?.emailAddress
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()

    if (email) {
      // Verificar si el usuario ya existe en la BD através de su email
      const existingUser = await db
        .select()
        .from(user_profiles)
        .where(eq(user_profiles.email, email))
        .limit(1)

      // Si no existe, insertar el nuevo usuario
      if (existingUser.length === 0) {
        await db.insert(user_profiles).values({
          name: name || "No name provided",
          email,
          clerkUserId: user.id,
          age: 0,
          health: "N/A",
          bank: "N/A",
          provincia: "N/A",
          genero: "N/A",
          telefono: "N/A",
          birthday: null,
        })
      }
    }
  }

  // Se cargan las conversaciones TODO: Capturar tiempo de duración de la conversación
  const latestConversations = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt))
    .limit(5)
  const totalConversations = await db
    .select({ count: messages.id })
    .from(messages)
  const latestConversation = latestConversations[0]
  const formattedConversations = latestConversations.map((msg) => ({
    ...msg,
    id: msg.id.toString(),
    date: msg.createdAt,
    duration: 0,
  }))

  return (
    <div className="max-w-7xl mx-auto">
      <PanelLayout
        panelData={{
          totalConversations: totalConversations[0].count,
          lastConversationDate: latestConversation?.createdAt?.toISOString(),
          messages: formattedConversations,
        }}
        conversationsHistory={{
          messages: formattedConversations,
        }}
        savedChats={{}}
        userData={{}}
        healthData={{}}
        bankData={{}}
      />
    </div>
  )
}
