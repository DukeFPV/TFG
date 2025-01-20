//**Revisado */
/**
 * Define variantes de estilo para botones usando class-variance-authority (cva).
 *
 * @constant
 * @type  - {(props?: ButtonVariantsProps) => string}
 *
 * @property {Object} variants - Opciones de variantes disponibles para personalización de botones
 * @property {Object} variants.variant - Variantes de estilo visual
 * @property {string} variants.variant.default - Estilo de botón primario con color de fondo
 * @property {string} variants.variant.destructive - Estilo de botón rojo/peligro
 * @property {string} variants.variant.outline - Botón con borde y efectos hover
 * @property {string} variants.variant.secondary - Estilo de botón alternativo
 * @property {string} variants.variant.ghost - Botón transparente con efectos hover
 * @property {string} variants.variant.link - Botón que aparece como enlace de texto
 *
 * @property {Object} variants.size - Variantes de tamaño para el botón
 * @property {string} variants.size.default - Tamaño estándar de botón (h-10)
 * @property {string} variants.size.sm - Tamaño pequeño de botón (h-9)
 * @property {string} variants.size.lg - Tamaño grande de botón (h-11)
 * @property {string} variants.size.icon - Botón cuadrado para iconos (h-10 w-10)
 *
 * @property {Object} defaultVariants - Estilos por defecto si no se especifican variantes
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
