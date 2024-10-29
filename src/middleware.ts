import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
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

export const config = {
  matcher: [
    "/login",
    "/weaktopics",
    "/task/:path",
    "/folder/:path",
    "/quescount",
  ],
};
