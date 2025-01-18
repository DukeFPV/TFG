//**Revisado */
/**
 * Objeto de configuración para el enrutamiento del middleware de clerk.
 * @property {string[]} matcher - Array de patrones de ruta para comparar con las solicitudes entrantes
 * - Excluye rutas internas de Next.js y archivos estáticos (a menos que se encuentren en parámetros de búsqueda)
 * - Incluye todas las rutas de API (/api/*, /trpc/*)
 * - Incluye la ruta específica de sara-ia y sus sub-rutas
 */

import {
  clerkMiddleware,
  createRouteMatcher,
  ClerkMiddlewareAuth,
  auth,
} from "@clerk/nextjs/server"
import { NextResponse, type NextRequest } from "next/server"

function getTenant(req: NextRequest): "tenant1" {
  // Add your tenant resolution logic here
  return "tenant1"
}

const tenantKeys = {
  tenant1: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretkey: process.env.CLERK_SECRET_KEY,
  },
}

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/panel-control(.*)",
  "/api/webhooks/clerk(.*)",
])

export default clerkMiddleware(
  async (auth, req) => {
    const { pathname } = req.nextUrl

    // (a) Excluir la ruta /api/health-centers/ para que no aplique la protección
    if (pathname.startsWith("/api/health-centers/")) {
      return NextResponse.next()
    }
    // (b) Si no es ruta pública, protegerla con Clerk
    if (!isPublicRoute(req)) {
      // `auth.protect()` arroja un error 401 o redirige si el usuario no está autenticado
      await auth.protect()
    }
  },
  (req) => {
    // Resolve tenant based on the request
    const tenant = getTenant(req)
    return tenantKeys[tenant]
  },
)

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
