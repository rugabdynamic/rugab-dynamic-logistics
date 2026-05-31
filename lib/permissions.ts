import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Role } from "./constants";

// Server-side guards. Always call these inside server components / server
// actions / route handlers — never rely on the UI alone for authorization.

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(...roles: Role[]) {
  const user = await requireAuth();
  if (!roles.includes(user.role as Role)) {
    redirect("/login?error=unauthorized");
  }
  return user;
}

// Non-redirecting variant for use inside server actions that return errors.
export async function assertRole(...roles: Role[]) {
  const user = await getCurrentUser();
  if (!user || !roles.includes(user.role as Role)) {
    throw new Error("Unauthorized");
  }
  return user;
}

export function dashboardPathForRole(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin";
    case "RIDER":
      return "/dashboard/rider";
    default:
      return "/dashboard/customer";
  }
}
