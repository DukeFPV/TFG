import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

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
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/api/:path*",
    // Include the sara-ia route
    "/sara-ia(.*)",
  ],
}
