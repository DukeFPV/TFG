//**Revisado */
/**
 * Componente Panel Control que gestiona la autenticación de usuarios y el historial de conversaciones.
 *
 * Este componente realiza las siguientes operaciones:
 * 1. Obtiene el usuario actual desde la autenticación de Clerk
 * 2. Crea o verifica el perfil de usuario en la base de datos
 * 3. Carga las conversaciones recientes y estadísticas de conversación
 * 4. Permite navegar a traves de <PanelLayout> en las diferentes secciones
 * 5. Navegación dinámica a través de las secciones de la aplicación [[...rest]]
 *
 * @returns {JSX.Element} Un componente de diseño de panel con historial de conversaciones y datos de usuario
 *
 * @example
 * ```tsx
 * <PanelControl panelData= {
 *   savedChats={{}}
 *   userData={{}}
 *   healthData={{}}
 *   bankData={{}}
 * }/>
 * ```
 *
 * @throws {Error} Puede lanzar un error si fallan las operaciones de base de datos
 *
 * @async
 * @function PanelControl
 */

import { db } from "@/lib/db"
import { chats, messages, user_profiles } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { PanelLayout } from "@/components/PanelLayout"
import { currentUser } from "@clerk/nextjs/server"

interface PageParams {
  searchParams: Promise<{ tab?: string }>
}

export default async function PanelControl({ searchParams }: PageParams) {
  const params = await searchParams
  const activeSection = params.tab || "panel" //{ params: Promise<{ providerId: number }> }
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

  //Cargamos los chats guardados del usuario actual
  const savedChats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, user?.id || ""))
    .orderBy(desc(chats.createdAt))
    .limit(10)
  const latestChats = savedChats[0]

  return (
    <main id="panel-main" className="max-w-7xl mx-auto">
      <PanelLayout
        activeSection={activeSection}
        panelData={{
          totalConversations: totalConversations[0].count,
          lastConversationDate: latestConversation?.createdAt?.toISOString(),
          messages: formattedConversations,
        }}
        conversationsHistory={{
          chats: savedChats,
        }}
        savedChats={{}}
        userData={{}}
        healthData={{}}
        bankData={{}}
      />
    </main>
  )
}
