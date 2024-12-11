'use client'
import { useState } from 'react';

interface NavigationMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
import { Activity, BarChart2, BookOpen, ChevronDown, ChevronUp, CreditCard, LogOut, MessageSquare, User } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

export function NavigationMenu({ activeTab, onTabChange }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { id: 'panel', icon: <BarChart2 className="w-5 h-5" />, label: 'Panel de datos' },
    { id: 'usuario', icon: <User className="w-5 h-5" />, label: 'Datos de usuario' },
    { id: 'salud', icon: <Activity className="w-5 h-5" />, label: 'Salud digital' },
    { id: 'banca', icon: <CreditCard className="w-5 h-5" />, label: 'Banca online' },
    { id: 'historial', icon: <MessageSquare className="w-5 h-5" />, label: 'Coversaciones' },
    { id: 'chats', icon: <BookOpen className="w-5 h-5" />, label: 'Chats guardados' },
  ];

  const activeItem = menuItems.find(item => item.id === activeTab);

  return (
    <nav>
      {/* Mobile Dropdown */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={` w-full border-2 border-purple-600 text-center justify-items-center rounded-full mr-5 cursor-pointer ease-in transition-all duration-500 ${
            activeTab ? 'bg-purple-600 text-purple-50' : ''
          }`}
        >
          <div className="flex items-center justify-between hover:text-purple-50 py-2 px-4">
            <div className="flex items-center space-x-2">
              {activeItem?.icon}
              <span>{activeItem?.label}</span>
            </div>
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul className="mt-2 space-y-2">
            {menuItems
              .filter(item => item.id !== activeTab)
              .map((item) => (
                <li 
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsOpen(false);
                  }}
                  className="border-2 border-purple-600 hover:bg-purple-400 text-center justify-items-center rounded-full mx-5 cursor-pointer transition-all duration-500"
                >
                  <div className="flex items-center space-x-2 hover:text-purple-50 py-2 px-4">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex sm:flex-col space-y-6">
        {menuItems.map((item) => (
          <li 
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`border-2 border-purple-600 hover:bg-purple-400 text-center justify-items-center rounded-full mx-5 cursor-pointer transition-all duration-500 ${
              activeTab === item.id ? 'bg-purple-600 text-purple-50' : ''
            }`}
          >
            <div className="flex items-center space-x-2 hover:text-purple-50 py-2 px-4">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Logout Button */}
      <div className="space-y-10 mt-20">
        <SignOutButton>
          <div className='border-2 border-red-400 hover:border-red-500 text-center justify-items-center rounded-full mx-5'>
            <button className="flex items-center space-x-2 text-red-400 hover:text-red-600 py-2 px-4">
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Salir de la aplicación</span>
            </button>
          </div>
        </SignOutButton>
      </div>
    </nav>
  );
}