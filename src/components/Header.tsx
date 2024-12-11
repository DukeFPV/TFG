"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowDown, IoMdMenu, IoMdClose } from 'react-icons/io';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../components/MoonIcon";
import { SunIcon } from "../components/SunIcon";
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from "@clerk/nextjs";
import { useClerk } from '@clerk/nextjs'

// Icons
import microIcon from "/public/icons/microphone.svg";
import microVoice from "/public/icons/voice.svg";
import microData from "/public/icons/data.svg";
import microGoals from "/public/icons/goals.svg";
import microUi from "/public/icons/browser_ui.svg";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: string;
};

const navItems: NavItem[] = [
  { label: "Que es SARA", link: "/nosotros" },
  { label: "Contacto", link: "/contacto" },
  { label: "Quienes somos", link: "/nosotros" },
];

const protectedNavItems: NavItem[] = [
  {
    label: "Chat con SARA",
    link: "/sara-ia",
  },
  {
    label: 'Ajustes',
    link: '#',
    children: [
      { label: "Interfaz", link: "#", iconImage: microUi, children: [{ label: "Sugerencias", iconImage: "", link: "#" }, { label: "Modo Oscuro", iconImage: "", link: "#" }] },
      { label: "Micrófono", link: "#", iconImage: microIcon },
      { label: "Voz de Sara", link: "#", iconImage: microVoice },
      { label: "Mis Datos", link: "#", iconImage: microData },
      { label: "Mis Logros", link: "#", iconImage: microGoals },
    ]
  },
];

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationParent] = useAutoAnimate();

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const { signOut } = useClerk()

  return (
    <nav className={`z-50 mr-auto flex max-w-7xl justify-between px-4 py-5 text-sm ${isHomePage ? 'text-neutral-200' : 'text-neutral-800 hover:text-purple-700'}`}>
      <section ref={animationParent} className='flex items-center gap-10'>
        <Link href="/">
          <Image src='/icons/logo2.svg' className='' width={150} height={50} alt='logo' />
        </Link>
        {isMenuOpen && <MobileNav closeMenu={closeMenu} />}
        <div className={`hidden md:flex items-center gap-4 transition-all ${isHomePage ? 'text-neutral-200' : 'text-neutral-800 '}`}>
          {navItems.map((d, i) => (
            <span key={i} className={`relative group px-2 py-3 transition-all ${isHomePage ? 'text-neutral-200 hover:text-purple-400' : 'text-neutral-800 hover:text-purple-500'}`}>
              <Link href={d.link ?? "#"}>
                <p className='flex cursor-pointer items-center gap-2 '>
                  <span>{d.label}</span>
                </p>
              </Link>
            </span>
          ))}
          {isSignedIn && protectedNavItems.map((d, i) => (
            <span key={i} className={`relative group px-2 py-3 transition-all ${isHomePage ? 'text-neutral-200 hover:text-purple-400' : 'text-neutral-800 hover:text-purple-500'}`}>
              <Link href={d.link ?? "#"}>
                <p className='flex cursor-pointer items-center gap-2 '>
                  <span>{d.label}</span>
                  {d.children && (
                    <IoIosArrowDown className='rotate-180 transition-all group-hover:rotate-0' />
                  )}
                </p>
              </Link>
              {d.children && (
                <div className="z-50 absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex">
                  {d.children.map((c, i) => (
                    <Link key={i} href={c.link ?? "#"} className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-800 hover:text-purple-500">
                      {c.iconImage && (
                        <Image src={c.iconImage} alt="item-icon" />
                      )}
                      <span className="whitespace-nowrap pl-3">
                        {c.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </span>
          ))}
        </div>
      </section>
      <section className='hidden md:flex items-center gap-8'>
        {isSignedIn ? (
          <div className='flex items-center gap-4'>
            <UserButton afterSwitchSessionUrl="/" />
              <span className={` ${isHomePage ? 'text-white text-nowrap' : 'text-neutral-800 text-nowrap hover:text-purple-600'}`}>
                Hola!👋 {user?.firstName}
              </span>
              <button 
                className={`w-full max-w-[180px] border-2 px-3 py-2 rounded-full transition-all ${isHomePage ? 'text-neutral-400 border-red-300 hover:border-red-600 hover:text-white/90' : 'text-black hover:text-red-500 border-red-300 hover:border-red-600'}`} 
                onClick={() => signOut({ redirectUrl: '/'})}
              >
                Desconectar
              </button>
                
          </div>
        ) : (
          <>
            <Link href="/sign-in" className={`w-28 text-center border-purple-300 border-2 px-3 py-2 rounded-full transition-all hover:border-purple-600 hover:text-purple-700/90 text-nowrap ${isHomePage ? 'text-neutral-400' : 'text-neutral-600 hover:text-cyan-500'}`}>
              Entrar
            </Link>
            <Link href="/sign-up" className={`w-28 text-center text-neutral-400 border-cyan-300 border-2 px-3 py-2 rounded-full transition-all hover:border-cyan-700 hover:text-cyan-700/90 ${isHomePage ? 'text-neutral-400' : 'text-neutral-600 hover:text-cyan-500'}`}>
              Registro
            </Link>
          </>
        )}
      </section>
      <IoMdMenu onClick={openMenu} className='cursor-pointer text-4xl md:hidden text-black' />
    </nav>
  );
}

function MobileNav({ closeMenu }: { closeMenu: () => void }) {
  const { isSignedIn, user } = useUser();
  const ajustesItem = protectedNavItems.find(item => item.label === "Ajustes");

  return (
    <div className='fixed left-0 top-0 flex h-full w-full justify-end bg-black/60 md:hidden z-50'>
      <div className='h-full w-[65%] bg-white px-4 py-4 justify-between z-50'>
        <figure className='flex justify-end'>
          <IoMdClose onClick={closeMenu} className='cursor-pointer text-4xl' />
        </figure>
        <div className='flex flex-col gap-4 transition-all items-start z-50'>
          {navItems.map((d, i) => (
            <Link key={i} href={d.link ?? "#"}>
              <span className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                {d.label}
              </span>
            </Link>
          ))}
          {isSignedIn && (
            <>
              <Link href="/sara-ia">
                <span className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
                  Chat con SARA
                </span>
              </Link>
              {ajustesItem?.children?.map((c, i) => (
                <SingleNavItem
                  key={i}
                  label={c.label}
                  link={c.link}
                  iconImage={c.iconImage}
                  children={c.children}
                />
              ))}
            </>
          )}
        </div>
        {isSignedIn ? (
          <section className='flex flex-col items-center gap-8 mt-40'>
            <Link href="/" className='w-full max-w-[180px]'>
              <button className='w-full rounded-xl bg-black border-neutral-100 text-neutral-100 transition-all border-2 px-4 py-2 hover:border-purple-400 hover:text-white/90'>
                Cerrar Aplicación
              </button>
            </Link>
            <hr className='w-full border-b-purple-950 border-2' />
            <div className='flex flex-col items-center gap-4'>
              <span className='text-neutral-800'>Hola!👋 {user?.firstName}</span>
              <Link href="/sign-out" className='text-center w-full max-w-[180px] text-neutral-400 border-cyan-600 border-2 px-3 py-2 rounded-full transition-all hover:border-cyan-300 hover:text-white/90'>
                Desconectar
              </Link>
            </div>
          </section>
        ) : (
          <section className='flex flex-col items-center gap-8 mt-40'>
            <Link href="/sign-in" className='text-center w-full max-w-[180px] text-neutral-400 border-purple-800 border-2 px-3 py-2 rounded-full transition-all hover:text-black/90 mt-10'>
              Entrar
            </Link>
            <Link href="/sign-up" className='text-center w-full max-w-[180px] text-neutral-400 border-cyan-600 border-2 px-3 py-2 rounded-full transition-all hover:text-black/90'>
              Registro
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

function SingleNavItem({ label, link, iconImage, children }: NavItem) {
  const [animationParent] = useAutoAnimate();
  const [isOpen, setIsOpen] = useState(false);

  function toggleItem() {
    setIsOpen(!isOpen);
  }

  return (
    <div ref={animationParent} className='relative px-2 py-3 transition-all'>
      <div onClick={toggleItem} className='relative flex cursor-pointer items-center gap-2 text-neutral-400 hover:text-black'>
        {iconImage && (
          <Image src={iconImage} alt="item-icon" width={20} height={20} />
        )}
        <span>{label}</span>
        {children && (
          <IoIosArrowDown className={`ml-auto mr-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        )}
      </div>
      {isOpen && children && (
        <div className="w-auto flex flex-col gap-1 rounded-lg bg-white py-3 transition-all">
          {children.map((c, i) => (
            <div key={i} className="flex items-center justify-between py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
              {c.iconImage && (
                <Image src={c.iconImage} alt="item-icon" width={20} height={20} />
              )}
              <span className="whitespace-nowrap pl-2 pr-5">
                {c.label}
              </span>
              {c.label === "Sugerencias" && (
                <div className="flex items-center ml-auto">
                  <Switch 
                    size="lg"
                    color="success"
                  />
                </div>
              )}
              {c.label === "Modo Oscuro" && (
                <div className="flex items-center ml-auto">
                  <Switch
                    defaultSelected
                    size="lg"
                    color="secondary"
                    thumbIcon={({ isSelected, className }) =>
                      isSelected ? (
                        <SunIcon className={className} />
                      ) : (
                        <MoonIcon className={className} />
                      )
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}