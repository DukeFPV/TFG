// "use client" indica que este archivo contiene código del cliente
"use client"

// Importaciones necesarias desde React y Next.js
import Head from 'next/head';
import { FormEvent, useState } from 'react';

// Definición del componente de contacto
export default function Contact() {
  // Definición de estados para los campos del formulario
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Función que maneja el envío del formulario
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    alert('Formulario enviado!');
  };

  return (
    <>
      <Head>
        {/* Metadatos de la página */}
        <title>Contacto</title>
      </Head>
  
      {/* Encabezado de la página */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Contacto</h1>
        </div>
      </header>
      {/* Contenedor principal de la página de contacto */}
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-indigo-400 to-neutral-50 flex flex-col justify-center items-left pl-20">
      {/* Contenedor del formulario de contacto */}
      <div className="bg-neutral-200 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Cuéntanos lo que quieras</h1>
        {/* Formulario de contacto, los estilos van definidos en cada contenedor y campo */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre y apellidos</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-full"
              placeholder="Tu nombre y apellidos" 
              required 
            />
          </div>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input 
                type="text" 
                id="phone" 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="600123456" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="ejemplo@email.com" 
                required 
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Escribe tu mensaje</label>
            <textarea 
              id="message" 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Escribe aquí lo que nos quieras decir" 
              required 
              rows={4}
            ></textarea>
          </div>
          {/* Botón para enviar el formulario con el mismo estilo que ya se aplicó en la página principal para mantener coherencia */}
          <button 
            type="submit" 
            className="border-black w-fit rounded-full border-2 bg-purple-400 text-nowrap px-20 sm:px-6 py-4 text-white transition-all hover:border-purple-400 hover:bg-transparent hover:text-black/90"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
