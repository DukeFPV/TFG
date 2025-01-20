//**Revisado */
/**
 * Componente de barra de navegación que muestra el menú principal, el logo y los controles de autenticación de usuario.
 * @component
 * @returns {JSX.Element} La barra de navegación renderizada
 *
 * @remarks
 * Este componente maneja:
 * - Navegación responsiva con soporte para menú móvil
 * - Visualización del estado de autenticación del usuario
 * - Estilizado dinámico basado en el estado de la página principal
 * - Elementos de navegación protegidos para usuarios autenticados
 * - Menús desplegables para elementos de navegación anidados
 * - Funcionalidad de inicio/registro de sesión y cierre de sesión
 *
 * @example
 * ```tsx
 * <Navbar />
 * ```
 *
 * @dependencies
 * - useUser - Para el estado de autenticación del usuario
 * - useAutoAnimate - Para animaciones suaves
 * - usePathname - Para estilizado basado en la ruta
 * - useClerk - Para acciones de autenticación
 *
 * @param {void} props - Este componente no acepta ningún prop
 */

"use client"

import { useState, ReactNode, ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  History,
  Mic,
  AudioLines,
  Speech,
  Settings,
  MonitorCog,
} from "lucide-react"
import { IoIosArrowDown, IoMdMenu, IoMdClose } from "react-icons/io"
import { useAutoAnimate } from "@formkit/auto-animate/react"
// import { Switch } from "@nextui-org/react"
// import { MoonIcon } from "../components/MoonIcon"
// import { SunIcon } from "../components/SunIcon"
import { usePathname, useRouter } from "next/navigation"
import { UserButton, useUser } from "@clerk/nextjs"
import { useClerk } from "@clerk/nextjs"

type NavItem = {
  label: string
  link?: string
  children?: NavItem[]
  iconImage?: string | ReactElement
}

// Contenido de la barra de navegación pública
const navItems: NavItem[] = [
  { label: "Que es SARA", link: "/nosotros" },
  { label: "Contacto", link: "/contacto" },
  { label: "Quienes somos", link: "/nosotros" },
]

// Contenido de la barra de navegación protegida
const protectedNavItems: NavItem[] = [
  {
    label: "Chat con SARA",
    link: "/sara-ia",
  },
  {
    label: "Ajustes",
    link: "#",
    children: [
      {
        label: "Interfaz",
        link: "#",
        iconImage: <MonitorCog size={18} />,
        children: [
          { label: "Sugerencias", iconImage: "", link: "#" },
          { label: "Modo Oscuro", iconImage: "", link: "#" },
        ],
      },
      {
        label: "Mis Datos",
        link: "/panel-control", // <- Ajuste
        iconImage: <Settings size={18} />,
      },
      {
        label: "Historial",
        link: "/panel-control?tab=historial", // <- Ajuste, renombrado
        iconImage: <History size={18} />,
      },
      { label: "Micrófono", link: "#", iconImage: <Mic size={18} /> },
      { label: "Voz de Sara", link: "#", iconImage: <Speech size={18} /> },
    ],
  },
]

export default function Navbar() {
  const { isSignedIn, user } = useUser()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animationParent] = useAutoAnimate()

  // Comprueba si la página actual es la página de inicio para renderizar el estilizado correcto
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  function openMenu() {
    setIsMenuOpen(true)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  const { signOut } = useClerk()

  return (
    <nav
      className={`z-50 mr-auto flex max-w-7xl justify-between px-4 py-5 text-sm ${isHomePage ? "text-neutral-200" : "text-neutral-800 hover:text-purple-700"}`}
    >
      <section ref={animationParent} className="flex items-center gap-10">
        <Link href="/">
          <Image
            src={`${isHomePage ? "/icons/logo3.svg" : "/icons/logo2.svg"}`}
            className="shadow-purple-200"
            width={150}
            height={50}
            alt="logo"
          />
        </Link>

        {/* Menú hamburguesa  */}
        {isMenuOpen && <MobileNav closeMenu={closeMenu} />}

        {/* Menú de escritorio */}
        <div
          className={`hidden lg:flex items-center gap-4 transition-all ${isHomePage ? "text-neutral-200" : "text-neutral-800 "}`}
        >
          {navItems.map((d, i) => (
            <span
              key={i}
              className={`relative px-2 py-3 transition-all ${
                isHomePage
                  ? "text-neutral-200 hover:text-purple-400"
                  : "text-neutral-800 hover:text-purple-500"
              }`}
            >
              <Link href={d.link ?? "#"}>
                <p className="flex cursor-pointer items-center gap-2 ">
                  <span>{d.label}</span>
                </p>
              </Link>
            </span>
          ))}
          {isSignedIn &&
            protectedNavItems.map((d, i) => (
              <span
                key={i}
                className={`relative group px-2 py-3 transition-all ${
                  isHomePage
                    ? "text-neutral-200 hover:text-purple-400"
                    : "text-neutral-800 hover:text-purple-500"
                }`}
              >
                <Link href={d.link ?? "#"}>
                  <p className="flex cursor-pointer items-center gap-2 ">
                    <span>{d.label}</span>
                    {d.children && (
                      <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
                    )}
                  </p>
                </Link>
                {d.children && (
                  <div className="z-50 absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex">
                    {d.children.map((c, j) => (
                      <Link
                        key={j}
                        href={c.link ?? "#"}
                        className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-800 hover:text-purple-500"
                      >
                        {c.iconImage &&
                          (typeof c.iconImage === "string" ? (
                            <Image src={c.iconImage} alt="item-icon" />
                          ) : (
                            c.iconImage
                          ))}
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

      {/* Controles de autenticación */}
      <section className="hidden lg:flex items-center gap-8">
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <UserButton afterSwitchSessionUrl="/" />
            <span
              className={` ${isHomePage ? "text-white text-nowrap" : "text-neutral-800 text-nowrap hover:text-purple-600"}`}
            >
              Hola!👋 {user?.firstName}
            </span>
            <button
              className={`w-full max-w-[180px] border-2 px-3 py-2 rounded-full transition-all ${isHomePage ? "text-neutral-400 border-red-300 hover:border-red-600 hover:text-white/90" : "text-black hover:text-red-500 border-red-300 hover:border-red-600"}`}
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              Desconectar
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className={`w-28 text-center border-purple-300 border-2 px-3 py-2 rounded-full transition-all hover:border-purple-600 hover:text-purple-700/90 text-nowrap ${
                isHomePage
                  ? "text-neutral-400"
                  : "text-neutral-600 hover:text-cyan-500"
              }`}
            >
              Entrar
            </Link>
            <Link
              href="/sign-up"
              className={`w-28 text-center text-neutral-400 border-cyan-300 border-2 px-3 py-2 rounded-full transition-all hover:border-cyan-700 hover:text-cyan-700/90 ${
                isHomePage
                  ? "text-neutral-400"
                  : "text-neutral-600 hover:text-cyan-500"
              }`}
            >
              Registro
            </Link>
          </>
        )}
      </section>

      {/* Botón de menú hamburguesa */}
      <IoMdMenu
        onClick={openMenu}
        aria-label="Abrir menú de navegación"
        className={`cursor-pointer text-4xl lg:hidden ${isHomePage ? "text-white" : "text-black"}`}
      />
    </nav>
  )
}
// --- Funcion de navegacion para dispositivos moviles ---
function MobileNav({ closeMenu }: { closeMenu: () => void }) {
  const router = useRouter()
  const { isSignedIn, user } = useUser()
  const ajustesItem = protectedNavItems.find((item) => item.label === "Ajustes")

  const { signOut } = useClerk()

  function handleLinkClick(href: string) {
    closeMenu()
    router.push(href)
  }

  // Botón desconectar
  const handleSignOut = async () => {
    closeMenu()
    await signOut({ redirectUrl: "/" })
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full justify-end bg-black/60 lg:hidden z-50">
      <div className="h-full w-[65%] bg-white px-4 py-4 justify-between z-50">
        <figure className="flex justify-end">
          <IoMdClose
            onClick={closeMenu}
            className="cursor-pointer text-4xl"
            aria-label="Cerrar menú"
          />
        </figure>
        <div className="flex flex-col gap-3 transition-all items-start z-50">
          {navItems.map((d, i) => (
            <button
              key={i}
              onClick={() => handleLinkClick(d.link ?? "#")}
              className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-800 hover:text-black text-left w-full"
            >
              <span className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-800 hover:text-black">
                {d.label}
              </span>
            </button>
          ))}
          {isSignedIn && (
            <>
              <button
                onClick={() => handleLinkClick("/sara-ia")}
                className="flex cursor-pointer justify-center py-1 pl-4 pr-8 pb-8 text-purple-900 hover:text-black text-left w-full"
              >
                Chat con SARA
              </button>
              {ajustesItem?.children?.map((c, i) => (
                <SingleNavItemMobile
                  key={i}
                  label={c.label}
                  iconImage={c.iconImage}
                  link={c.link}
                  closeMenu={closeMenu}
                >
                  {c.children?.map((child, index) => (
                    <SingleNavItemMobile
                      key={index}
                      label={child.label}
                      iconImage={child.iconImage}
                      link={child.link}
                      closeMenu={closeMenu}
                    />
                  ))}
                </SingleNavItemMobile>
              ))}
            </>
          )}
        </div>

        {isSignedIn ? (
          <section className="flex flex-col items-center gap-6 mt-8">
            <span className="text-neutral-800">Hola!👋 {user?.firstName}</span>
            <button
              onClick={handleSignOut}
              className="w-full max-w-[180px] text-neutral-800 border-red-600 border-2 px-3 py-2 rounded-full transition-all hover:text-white/90 hover:border-cyan-300"
            >
              Desconectar
            </button>
          </section>
        ) : (
          <section className="flex flex-col items-center gap-6 mt-4">
            <button
              onClick={() => handleLinkClick("/sign-in")}
              className="text-center w-full max-w-[180px] text-neutral-400 border-purple-800 border-2 px-3 py-2 rounded-full transition-all hover:text-black/90 mt-10"
            >
              Entrar
            </button>
            <button
              onClick={() => handleLinkClick("/sign-up")}
              className="text-center w-full max-w-[180px] text-neutral-400 border-cyan-600 border-2 px-3 py-2 rounded-full transition-all hover:text-black/90"
            >
              Registro
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

// Componente para items con submenú en móvil
function SingleNavItemMobile({
  label,
  iconImage,
  link,
  children,
  closeMenu,
}: {
  label: string
  iconImage?: string | ReactElement
  link?: string
  children?: ReactNode
  closeMenu: () => void
}) {
  const [animationParent] = useAutoAnimate()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  function toggleItem() {
    // Si hay children, hacemos toggle
    if (children) {
      setIsOpen(!isOpen)
    } else if (link) {
      // Si no hay submenú, navegar y cerrar
      closeMenu()
      router.push(link)
    }
  }

  return (
    <div
      ref={animationParent}
      className="relative px-2 py-1 transition-all w-full"
    >
      <button
        onClick={toggleItem}
        className="relative flex cursor-pointer items-center gap-2 text-neutral-800 hover:text-black w-full text-left"
        aria-label={`Abrir submenú de ${label}`}
      >
        {iconImage &&
          (typeof iconImage === "string" ? (
            <Image src={iconImage} alt="item-icon" width={18} height={18} />
          ) : (
            iconImage
          ))}
        <span>{label}</span>
        {children && (
          <IoIosArrowDown
            className={`ml-auto mr-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </button>

      {isOpen && children && (
        <div className="w-auto flex flex-col gap-1 rounded-lg bg-white py-3 transition-all mt-2 ml-6">
          {children}
        </div>
      )}
    </div>
  )
}
