//**Revisado */
/**
 * Un componente Label reutilizable que envuelve el componente LabelPrimitive.Root.
 * Utilizado en el formulario para etiquetar campos de entrada y proporcionar información adicional.
 * Este componente soporta referencias reenviadas y combina propiedades primitivas de etiquetas con propiedades de variantes personalizadas.
 *
 * @component
 * @param {object} props - Las propiedades del componente
 * @param {string} [props.className] - Nombres de clases CSS adicionales para aplicar
 * @param {React.Ref} ref - Referencia reenviada para acceder al elemento DOM subyacente
 * @returns {JSX.Element} Un elemento de etiqueta estilizado
 */
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
