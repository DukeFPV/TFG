// Se importan las librerías necesarias
import React from 'react';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer'; 
import heroImage from '/public/icons/hero2.png';
import heroImageMobile from '/public/icons/hero2-mobile.png';
import imgWhatsApp from '/public/icons/whatsapp.png';

// Se crea el componente Home que contiene la página principal
export default function Home() {
  return (
    // Se crea el contenedor principal de la página
    <div className="max-h-screen w-full">
      {/* Sección principal con fondo oculto en dispositivos móviles */}
      <div className='-z-10 absolute hidden md:block inset-0 m-auto overflow-hidden bg-home bg-no-repeat'></div>
      
      {/* Sección Hero */}
      <section className='mx-auto flex max-w-6xl flex-col-reverse gap-2 px-4 pb-12 transition-all md:flex-row md:gap-4'>
        {/* Contenedor de textos en la sección Hero */}
        <div className='flex flex-col items-center gap-6 pt-8 text-center md:w-1/2 md:items-center md:gap-10 md:pt-5 md:text-center'>
          <Balancer>
            <h1 className='text-6xl font-semibold text-cyan-500 sm:text-cyan-400 md:text-8xl pb-5'>
              SARA
            </h1>
            <h2 className='text-4xl md:text-5xl md:text-white text-neutral-800'>
              <span className='text-purple-500 sm:text-purple-400 font-bold'>IA</span> para ayudarte
            </h2>
          </Balancer>
          
          <p className='text-neutral-800 sm:text-neutral-200 md-max-w-[400px] md:text-left'>
            <Balancer>
              Bienvenido a SARA, tu asistente inteligente diseñado para ayudar a las personas mayores en el uso de las tecnologías de la información y comunicación (TIC). SARA ofrece asistencia personalizada y clara, adaptándose a tus necesidades en tiempo real. Ya sea que necesites guías paso a paso, recomendaciones específicas o simplemente una conversación amigable, SARA está aquí para facilitar tu experiencia tecnológica. ¡Explora el mundo digital con confianza y apoyo continuo con SARA!
            </Balancer>
          </p>
          
          <button className="w-fit rounded-full border-2 bg-purple-400 sm:bg-purple-400 px-14 py-5 text-white transition-all hover:border-purple-400 hover:bg-transparent sm:hover:text-white/90 hover:text-black/90">
            Saber más
          </button>
        </div>
      
        {/* Imagen Hero */}
        <section className='md:w-1/2 content-center'>
          <Image 
            className='hidden h-auto max-w-[400px] md:block' 
            src={heroImage}
            alt='hero-imagen'
          />
          <Image 
            className='h-auto w-full md:hidden' 
            src={heroImageMobile}
            alt='hero-imagen'
          />
        </section>
      </section>
      
      {/* Mensaje de advertencia sobre el uso de IA */}
      <div className='flex flex-col-reverse items-center px-4 sm:px-0'>
        <p className='text-neutral-600 sm:text-neutral-200 w-full md:w-[800px] md:text-center md:text-xs text-[12px]'>
          Al utilizar la inteligencia artificial se debe prestar atención a que no se está hablando con una persona y que algunas respuestas pueden no ser exactas. Ante cualquier duda puedes escribirnos a ayuda@correo.com o por whatsapp +34600123456. Estaremos encantados de ayudarte.
        </p>
      </div>
      
      {/* Sección de promoción de WhatsApp */}
      <section className='mx-auto flex max-w-6xl flex-col-reverse gap-2 sm:pt-24 px-4 pb-12 transition-all sm:flex-row md:gap-4'>
        <div className='flex flex-col items-center gap-6 pt-8 text-center md:w-1/2 md:items-center md:gap-10 md:pt-5 md:text-center'>
          <span className='font-semibold text-neutral-800'>TAMBIÉN ESTAMOS</span>
          <h3 className='font-semibold text-3xl'>En WhatsApp. Prueba una nueva forma de hablar con SARA</h3>
          <p>Descubre el nuevo método para comunicarte con a través de la mayor app de mensajería utilizada por todo el mundo.</p>
        
          <div className='flex flex-col-reverse sm:flex-row items-center justify-center gap-6 pt-8 text-center md:w-1/2 md:items-center md:gap-10 md:pt-5 md:text-center'>
            <button className="border-black w-fit rounded-full border-2 bg-purple-400 px-20 sm:px-6 py-4 text-white transition-all hover:border-purple-400 hover:bg-transparent hover:text-black/90">
              Comenzar
            </button>
            <button className="border-black w-fit rounded-full border-2 bg-purple-400 text-nowrap px-20 sm:px-6 py-4 text-white transition-all hover:border-purple-400 hover:bg-transparent hover:text-black/90">
              Saber más
            </button>
          </div>
        </div>
        
        {/* Imagen promocional de WhatsApp */}
        <section className='flex justify-center md:w-1/2 content-center'>
          <Image 
            className='hidden h-auto max-w-[500px] md:block' 
            src={imgWhatsApp}
            alt='imagen-whatsapp'
          />
        </section>
      </section>
    </div>
  );
}