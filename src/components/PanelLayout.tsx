// components/PanelLayout.tsx
'use client'
import { useState } from 'react';
import { NavigationMenu } from './NavigationMenu';
import { ControlPanel } from './ControlPanel';
import { ConversationHistory } from './ConversationHistory';
import { UserData } from './UserData';
import  DataForm  from './DataForm';

interface PanelDataProps {
  totalConversations: number;
  lastConversationDate: string;
  messages: any[];
}

// Panel de datos
export function PanelData({ totalConversations, lastConversationDate, messages }: PanelDataProps) {
  return (
    <div className="space-y-6">
      <DataForm />
      <ControlPanel 
        totalConversations={totalConversations} 
        lastConversationDate={lastConversationDate ? new Date(lastConversationDate) : null}
      />
      
    </div>
  );
}
// Panel de Datos de usuario
export function UserProfile() {
  return (
    <div className="space-y-6 max-w-2xl">
      <UserData />
      {/* Añadir contenido de usuario*/}
    </div>
  );
}

// panel de datos de salud
export function HealthData() {
  return (
    <div className="space-y-6">
      {/* Añadir contenido de salud */}
      <div className="space-y-6">
        <h3><span className='text-orange-600 font-semibold italic'>TO-DO: </span>Espacio para mostrar los datos de la salud</h3>
      </div>
    </div>
  );
}

// Panel de datos de banca
export function BankData() {
  return (
    <div className="space-y-6">
      {/* Añadir contenido de banca */}
      <div className="space-y-6">
        <h3><span className='text-orange-600 font-semibold italic'>TO-DO: </span>Espacio para mostrar los datos de la banca</h3>
      </div>
    </div>
  );
}

// Interfaz de TS Panel de Conversaciones
interface PanelHistoryProps {
  messages: any[];
}

// Panel de Conversaciones
export function ConversationsHistory({ messages }: PanelHistoryProps) {
  return (
    <div className="space-y-6">
      <ConversationHistory messages={messages} />
    </div>
  );
}

// TODO interface PanelSavedProps {
//   savedMessages: any[];
// }

// Panel de Chats guardados
export function SavedChats() {
  return (
    <div className="space-y-6">
      <h3><span className='text-orange-600 font-semibold italic'>TO-DO: </span>Espacio para mostrar los chats guardados los chats</h3>
      {/* Add saved chats components */}
    </div>
  );
}

const menuItems = [
  { id: 'panel', label: 'Panel de Control' },
  { id: 'usuario', label: 'Usuario' },
  { id: 'salud', label: 'Salud' },
  { id: 'banca', label: 'Banca' },
  { id: 'historial', label: 'Historial' },
  { id: 'chats', label: 'Chats Guardados' }
];

interface PanelLayoutProps {
  children?: React.ReactNode;
  panelData: PanelDataProps;
  userData: any;
  healthData: any;
  bankData: any;
  conversationsHistory: PanelHistoryProps;
  savedChats: any;
}

export function PanelLayout({ children, panelData, userData, healthData, bankData, conversationsHistory, savedChats }: PanelLayoutProps) {
  const [activeTab, setActiveTab] = useState('panel');

  const renderContent = () => {
    switch(activeTab) {
      case 'panel':
        return <PanelData {...panelData} />;
      case 'usuario':
        return <UserProfile {...userData} />;
      case 'salud':
        return <HealthData {...healthData} />;
      case 'banca':
        return <BankData {...bankData} />;
      case 'historial':
        return <ConversationsHistory {...conversationsHistory} />;
      case 'chats':
        return <SavedChats {...savedChats} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen rounded-3xl bg-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          <aside className="bg-purple-100 rounded-3xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-center">Panel de control</h2>
            <NavigationMenu activeTab={activeTab} onTabChange={setActiveTab} />
          </aside>
          <main className="space-y-8">
            <section className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{menuItems.find(item => item.id === activeTab)?.label}</h2>
              {renderContent()}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}