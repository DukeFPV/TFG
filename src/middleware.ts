//**Revisado */
/**
 * Objeto de configuración para el enrutamiento del middleware de clerk.
 * @property {string[]} matcher - Array de patrones de ruta para comparar con las solicitudes entrantes
 * - Excluye rutas internas de Next.js y archivos estáticos (a menos que se encuentren en parámetros de búsqueda)
 * - Incluye todas las rutas de API (/api/*, /trpc/*)
 * - Incluye la ruta específica de sara-ia y sus sub-rutas
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/panel-control(.*)",
  "/api/webhooks/clerk(.*)",
])

export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl
  // Excluir rutas específicas
  if (pathname.startsWith("/api/health-centers/")) {
    return NextResponse.next()
  }
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Siempre incluir las rutas de API
    "/(api|trpc)(.*)",
    "/api/:path*",
    // Incluir rutas específicas
    "/sara-ia(.*)",
  ],
}
