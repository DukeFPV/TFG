import { Settings, Mic, History } from "lucide-react";
import FeatureCard from './FeatureCard'; // Assuming FeatureCard is a local component
import Image from 'next/image'; // Assuming using Next.js for <Image> component
import Link from "next/link";
import { ConvAI } from "./ConvAI";


const ChatSideBarR: React.FC = () => (
  <div className="h-[calc(100vh-var(--header-height))] max-h-[calc(100vh-var(--header-height))] overflow-hidden w-full md:w-auto">
    <aside className="h-full bg-gray-50 p-4 md:p-6 lg:w-80 md:w-60 sm:w-40 overflow-y-auto">
      {/* Feature Cards Grid */}
      <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-3">
        <FeatureCard backgroundColor="bg-cyan-50" icon="/icons/salud.svg" title="Salud digital" description="Te puedo guiar paso a paso como pedir la cita." />
        <FeatureCard backgroundColor="bg-yellow-50" icon="/icons/banca.svg" title="Banca digital" description="Aprender a usar la banca digital" />
        <FeatureCard backgroundColor="bg-green-50" icon="/icons/buscar.svg" title="Buscar en internet" description="Te puedo ayudar a buscar" />
        <FeatureCard backgroundColor="bg-purple-50" icon="/icons/any.svg" title="Cualquier pregunta" description="Pregúntame lo que quieras" />
      </div>

      {/* Avatar Section */}
      <div className="hidden sm:block sm:text-center sm:mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2">SARA</h2>
        {/* <Image 
          src="/icons/sara-avatar.png" 
          alt="SARA" 
          width={150} 
          height={150} 
          className="mx-auto w-[80px] h-[80px] md:w-[150px] md:h-[150px]"
        /> */}
      </div>

      {/* Buttons Section */}
      <div className="hidden sm:space-y-2 sm:flex sm:flex-col sm:items-center">
        <button className="w-full max-w-[208px] h-10 bg-transparent border-2 border-purple-500 hover:bg-purple-200 hover:border-0 text-gray-800 font-semibold py-2 px-4 rounded-3xl flex items-center justify-center">
          <p className="text-xs lg:text-sm font-semibold mr-1">Consulta el historial</p>
          <History className="md:ml-2 w-3 h-3 md:w-4 md:h-4" size={18} />
        </button>
        <button className="w-full max-w-[208px] h-10 bg-transparent border-2 border-purple-500 hover:bg-purple-200 hover:border-0 text-gray-800 font-semibold py-2 px-4 rounded-3xl flex items-center justify-center">
          <Link href='/panel-control'><p className="text-xs lg:text-sm font-semibold mr-1">Ajustes</p></Link>
          <Settings className="md:mr-2 w-3 h-3 md:w-4 md:h-4" size={18} />
        </button>
      </div>

      {/* Mic Button */}
      <div className="hidden sm:block sm:mt-4 md:mt-6 sm:text-center">
        {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto">
          <Mic size={36} className="md:w-12 md:h-12" />
        </button> */}
        <ConvAI />
        <p className="mt-2 text-sm text-gray-600">Pulsa aquí para hablar</p>
      </div>
    </aside>
  </div>
);

export default ChatSideBarR;
  
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribeme lo que necesites..."
          className="flex-grow border rounded-full py-2 px-4 mr-2"
        />
        <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
          <Send size={20} />
        </button>
      </div> */}
      {/* <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <p>Copyright © 2024 J.Carlos Lorenzo | Todos los derechos reservados</p>
        <div className="flex space-x-4">
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/">Inicio</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
      </div> 
    </div>
  </div> */}