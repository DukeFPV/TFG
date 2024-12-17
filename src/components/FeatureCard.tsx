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
      >
        <Image
          src={icon}
          alt={`${title} icon`}
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

// Asignar displayName al componente memoizado para usar con React DevTools
FeatureCard.displayName = "FeatureCard"

export default FeatureCard
