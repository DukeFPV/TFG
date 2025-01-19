//**Revisado */
/**
 * Un componente que renderiza un sistema de notificaciones toast.
 * Utiliza el hook useToast para gestionar y mostrar las notificaciones toast.
 *
 * El componente mapea todos los toasts activos y los renderiza con sus
 * respectivos títulos, descripciones y botones de acción si se proporcionan.
 *
 * @returns Un contenedor ToastProvider con componentes Toast y un ToastViewport
 *
 * @example
 * ```tsx
 * <Toaster />
 * ```
 */

"use client"

import { useToast } from "@/components/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
