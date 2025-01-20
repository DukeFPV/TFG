//**Revisado */
/**
 * Un componente que renderiza el contenido de un popover con posicionamiento y animaciones personalizables.
 *
 * @component
 * @param {Object} props - Las propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales para aplicar al contenido del popover
 * @param {string} [props.align='center'] - La alineación del popover relativa a su disparador ('start' | 'center' | 'end')
 * @param {number} [props.sideOffset=4] - La distancia (en píxeles) entre el popover y su disparador
 * @param {React.Ref<React.ElementRef<typeof PopoverPrimitive.Content>>} ref - Referencia reenviada
 *
 * @returns {JSX.Element} Un Portal que contiene el contenido del popover con estilos y animaciones
 */

"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
