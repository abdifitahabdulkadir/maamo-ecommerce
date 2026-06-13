import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/actions/user.actions";

const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  const session = await getSession();
  const authenticated = session.status && !!session.data;
  if (!isAuthRoute && !authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
