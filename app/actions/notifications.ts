"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/permissions";

// Marks the current user's notifications as read (including admin broadcasts
// for admins). Only ever touches rows the user is allowed to see.
export async function markNotificationsRead(): Promise<void> {
  const user = await requireAuth();
  const isAdmin = user.role === "ADMIN";
  await prisma.notification.updateMany({
    where: {
      readAt: null,
      ...(isAdmin ? { OR: [{ userId: user.id }, { userId: null }] } : { userId: user.id }),
    },
    data: { readAt: new Date() },
  });
  revalidatePath("/dashboard", "layout");
}
