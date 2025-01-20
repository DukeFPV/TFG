//**Revisado */
/**
 * Un componente de entrada reutilizable con estilo personalizado y soporte para referencias.
 *
 * @component
 * @param {object} props - Las propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales para aplicar a la entrada
 * @param {string} [props.type] - El atributo tipo del elemento input
 * @param {React.RefObject<HTMLInputElement>} ref - Referencia reenviada para el elemento input
 *
 * @returns {JSX.Element} Un elemento input estilizado con propiedades y referencia reenviadas
 *
 * @example
 * ```tsx
 * <Input
 *   type="text"
 *   className="clase-personalizada"
 *   placeholder="Ingrese texto..."
 * />
 * ```
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // Añade una propiedad personalizada para el componente Input
  customAttribute?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
