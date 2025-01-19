//**Revisado */
/**
 * Un componente de diseño que gestiona diferentes paneles y su contenido.
 *
 * @component
 * @param {object} props - Las propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos a renderizar
 * @param {object} props.panelData - Datos requeridos para la visualización del panel
 * @param {object} props.userData - Datos de información del usuario
 * @param {object} props.healthData - Datos relacionados con la salud
 * @param {object} props.bankData - Datos de información bancaria
 * @param {object} props.conversationsHistory - Historial de conversaciones
 * @param {object} props.savedChats - Datos de chats guardados
 *
 * @returns {JSX.Element} Un diseño responsive con una barra de navegación lateral y área de contenido principal
 *
 * @example
 * <PanelLayout
 *   panelData={panelData}
 *   userData={userData}
 *   healthData={healthData}
 *   bankData={bankData}
 *   conversationsHistory={conversationsHistory}
 *   savedChats={savedChats}
 *   {children}
 * </PanelLayout>
 *
 *  @description Para ir a una sección específica:
 *  const goHealthData = () => {
 *    router.push("/panel-control/salud") <- "salud" es la sección
 *  }
 *
 */

"use client"
import { useState } from "react"
import { NavigationMenu } from "./NavigationMenu"
import { ControlPanel } from "./ControlPanel"
import { ConversationHistory } from "./ConversationHistory"
import { UserData } from "./UserData"
import DataForm from "./DataForm"
import HealthForm from "./HealthForm"
import { SavedChatsList } from "./SavedChatList"
//import BankData from "./BankData"
//import ConversationsHistory from "./ConversationsHistory"
//import SavedChats from "./SavedChats"

interface PanelDataProps {
  totalConversations: number
  lastConversationDate: string
  messages: any[]
}

// Panel de datos
export function PanelData({
  totalConversations,
  lastConversationDate,
}: PanelDataProps) {
  return (
    <div className="space-y-6">
      <DataForm />
      <ControlPanel
        totalConversations={totalConversations}
        lastConversationDate={
          lastConversationDate ? new Date(lastConversationDate) : null
        }
      />
    </div>
  )
}

// Panel de Datos de usuario
export function UserProfile() {
  return (
    <div className="space-y-6 max-w-2xl">
      <UserData />
      {/* Añadir contenido de usuario*/}
    </div>
  )
}

// Panel de datos de salud
export function HealthDataComponentWrapper() {
  return (
    <div className="space-y-6 max-w-6xl">
      <HealthForm />
    </div>
  )
}

// Panel de datos de banca
export function BankData() {
  return (
    <div className="space-y-6">
      {/* Añadir contenido de banca */}
      <div className="space-y-6">
        <h3>
          <span className="text-orange-600 font-semibold italic">TO-DO: </span>
          Espacio para mostrar los datos de la banca
        </h3>
      </div>
    </div>
  )
}

// Interfaz de TS Panel de Conversaciones
interface PanelHistoryProps {
  chats: any[]
}

// Panel de Conversaciones
export function ConversationsHistory({ chats }: PanelHistoryProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Chats Guardados
      </h2>
      <SavedChatsList chats={chats} />
    </div>
  )
}

// Panel de Chats guardados
export function SavedChats() {
  return (
    <div className="space-y-6">
      <h3>
        <span className="text-orange-600 font-semibold italic">TO-DO: </span>
        Espacio para mostrar los chats guardados
      </h3>
      {/* Añadir los chats guardados*/}
    </div>
  )
}

const menuItems = [
  { id: "panel", label: "Panel de Control" },
  { id: "usuario", label: "Usuario" },
  { id: "salud", label: "Salud" },
  { id: "banca", label: "Banca" },
  { id: "historial", label: "Historial" },
  { id: "chats", label: "Chats Guardados" },
]

interface PanelLayoutProps {
  children?: React.ReactNode
  panelData: PanelDataProps
  userData: any
  healthData: any
  bankData: any
  conversationsHistory: PanelHistoryProps
  savedChats: any
  activeSection?: string
}

export function PanelLayout({
  activeSection = "panel",
  children,
  panelData,
  userData,
  healthData,
  bankData,
  conversationsHistory,
  savedChats,
}: PanelLayoutProps) {
  const [activeTab, setActiveTab] = useState(activeSection)

  const renderContent = () => {
    switch (activeTab) {
      case "panel":
        return <PanelData {...panelData} />
      case "usuario":
        return <UserProfile />
      case "salud":
        return <HealthDataComponentWrapper />
      case "banca":
        return <BankData />
      case "historial":
        return <ConversationsHistory {...conversationsHistory} />
      case "chats":
        return <SavedChats />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen rounded-3xl bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <aside className="bg-purple-100 rounded-3xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Panel de control
            </h2>
            <NavigationMenu activeTab={activeTab} onTabChange={setActiveTab} />
          </aside>
          <main className="space-y-8">
            <section className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h2>
              {renderContent()}
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
