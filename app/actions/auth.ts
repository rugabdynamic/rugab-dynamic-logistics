"use server";

import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";
import { logAudit } from "@/lib/audit";
import type { ActionResult } from "@/lib/types";

// Credentials sign-in. On success NextAuth throws a redirect (rethrown here);
// on failure we surface a generic message to avoid user enumeration.
export async function authenticate(formData: FormData): Promise<ActionResult> {
  const h = headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const limited = rateLimit({ key: `login:${ip}`, limit: 10, windowMs: 60_000 });
  if (!limited.ok) {
    return { ok: false, message: "Too many attempts. Please try again shortly." };
  }

  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
    return { ok: true, message: "Signed in." };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, message: "Invalid email or password." };
    }
    throw error; // re-throw redirect
  }
}

// Self-service customer registration. Admins/riders are created via seed or
// the admin dashboard (Phase 2), never through this public action.
export async function registerCustomer(formData: FormData): Promise<ActionResult> {
  const h = headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";

  const limited = rateLimit({ key: `register:${ip}`, limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return { ok: false, message: "Too many attempts. Please try again shortly." };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, password } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { ok: false, message: "An account with that email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash,
        role: "CUSTOMER",
        status: "ACTIVE",
        customerProfile: { create: {} },
      },
    });

    await logAudit({
      userId: user.id,
      action: "USER_REGISTERED",
      entity: "User",
      entityId: user.id,
      ipAddress: ip,
      userAgent: h.get("user-agent"),
    });

    return { ok: true, message: "Account created. You can now sign in." };
  } catch (err) {
    console.error("registerCustomer error:", err);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
