//**Revisado */
/**
 * Un componente reutilizable de tarjeta de característica que muestra un icono, título y descripción.
 *
 * @component
 * @param {object} props - Los props del componente
 * @param {StaticImageData} props.icon - El icono a mostrar en la tarjeta
 * @param {string} props.title - El texto del título de la tarjeta
 * @param {string} props.description - El texto de descripción de la tarjeta
 * @param {string} props.backgroundColor - Nombre de clase CSS para el color de fondo
 * @param {(text: string) => void} [props.onClick] - Función callback opcional cuando se hace clic en la tarjeta
 * @param {string} [props.text] - Texto opcional pasado al callback onClick
 * @param {boolean} [props.isLoading] - Bandera opcional para mostrar estado de carga y deshabilitar la tarjeta
 *
 * @returns {JSX.Element} Un botón que contiene el contenido de la tarjeta de característica
 *
 * @example
 * <FeatureCard
 *   icon={miIcono}
 *   title="Título de Característica"
 *   description="Descripción de la característica"
 *   backgroundColor="bg-blue-100"
 *   onClick={(text) => console.log(text)}
 *   text="Texto de ejemplo"
 *   isLoading={false}
 * />
 */

import React from "react"
import Image from "next/image"

type FeatureCardProps = {
  icon: string
  title?: string
  description?: string
  backgroundColor?: string
  text: string
  onClick?: (text: string) => void
  isLoading?: boolean
}

// Utilizar React.memo para evitar renderizados innecesarios - Fuente: https://refine.dev/blog/react-memo-guide/#introduction
const FeatureCard = React.memo(
  ({
    icon,
    title,
    description,
    backgroundColor,
    onClick,
    text,
    isLoading,
  }: FeatureCardProps) => {
    const handleClick = React.useCallback(() => {
      if (onClick && !isLoading) {
        onClick(text)
      }
    }, [onClick, isLoading, text])

    return (
      <button
        className={`${backgroundColor} p-2 rounded-xl shadow-md flex flex-col items-left gap-1 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleClick}
        disabled={isLoading}
        aria-label={`${title}: ${description}`}
        role="button"
      >
        <Image
          src={icon}
          alt={`${title} icon`}
          aria-label={`${title} icon`}
          width={48}
          height={48}
          className="mb-1"
        />
        <h4 className="text-md font-bold">{title}</h4>
        <p className="text-sm font-extralight text-gray-600">{description}</p>
      </button>
    )
  },
)

// Asignar displayName al componente con memo
FeatureCard.displayName = "FeatureCard"

export default FeatureCard
