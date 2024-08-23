import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value || "";

  const path = request.nextUrl.pathname;

  if (!token) {
    if (path !== "/login" && path !== "/" && path !== "/signup") {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  } else {
    if (path === "/login" || path === "/signup") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login","/weaktopics", "/signup", "/task/:path", "/folder/:path", "/quescount"],
};
