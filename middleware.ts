import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

// Edge middleware uses the DB-free auth config (JWT only) to gate dashboards.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;
  const path = nextUrl.pathname;

  const isDashboard = path.startsWith("/dashboard");
  if (!isDashboard) return NextResponse.next();

  if (!isLoggedIn) {
    const url = new URL("/login", nextUrl);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  // Role-scoped areas: keep users inside their own dashboard tree.
  const guard: Record<string, string> = {
    "/dashboard/admin": "ADMIN",
    "/dashboard/rider": "RIDER",
    "/dashboard/customer": "CUSTOMER",
  };
  for (const [prefix, requiredRole] of Object.entries(guard)) {
    if (path.startsWith(prefix) && role !== requiredRole) {
      const home =
        role === "ADMIN"
          ? "/dashboard/admin"
          : role === "RIDER"
            ? "/dashboard/rider"
            : "/dashboard/customer";
      return NextResponse.redirect(new URL(home, nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
