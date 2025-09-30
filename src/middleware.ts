// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth")?.value; // read cookie set by backend

  console.log("middle" ,token)

  // Protect /dashboard route
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      // if no token, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If logged in and visiting /login, redirect to dashboard
  if (req.nextUrl.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware only on these routes
export const config = {
  matcher: ["/dashboard/:path*", "/login"], 
};
