"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { assertRole } from "@/lib/permissions";
import { logAudit } from "@/lib/audit";
import { createRiderSchema } from "@/lib/validations";
import { RIDER_AVAILABILITY } from "@/lib/constants";
import type { ActionResult } from "@/lib/types";

export async function createRider(formData: FormData): Promise<ActionResult> {
  const admin = await assertRole("ADMIN");
  const parsed = createRiderSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { ok: false, message: "Please correct the fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  const { name, email, phone, vehicleType, vehiclePlateNumber, password } = parsed.data;

  if (await prisma.user.findUnique({ where: { email } })) {
    return { ok: false, message: "A user with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const rider = await prisma.user.create({
    data: {
      name, email, phone: phone || null, passwordHash,
      role: "RIDER", status: "ACTIVE",
      riderProfile: { create: { vehicleType: vehicleType || null, vehiclePlateNumber: vehiclePlateNumber || null, availabilityStatus: "AVAILABLE" } },
    },
  });
  await logAudit({ userId: admin.id, action: "RIDER_CREATED", entity: "User", entityId: rider.id });
  revalidatePath("/dashboard/admin/riders");
  return { ok: true, message: `Rider ${name} created.` };
}

export async function updateRiderAvailability(formData: FormData): Promise<void> {
  const admin = await assertRole("ADMIN");
  const userId = String(formData.get("userId") ?? "");
  const availabilityStatus = String(formData.get("availabilityStatus") ?? "");
  if (!RIDER_AVAILABILITY.includes(availabilityStatus as (typeof RIDER_AVAILABILITY)[number])) return;

  await prisma.riderProfile.update({ where: { userId }, data: { availabilityStatus } });
  await logAudit({ userId: admin.id, action: "RIDER_AVAILABILITY_UPDATED", entity: "User", entityId: userId, metadata: { availabilityStatus } });
  revalidatePath("/dashboard/admin/riders");
}
