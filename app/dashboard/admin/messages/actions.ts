"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { assertRole } from "@/lib/permissions";
import { logAudit } from "@/lib/audit";
import { CONTACT_STATUSES } from "@/lib/constants";

export async function updateMessageStatus(formData: FormData) {
  const admin = await assertRole("ADMIN");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !CONTACT_STATUSES.includes(status as (typeof CONTACT_STATUSES)[number])) {
    return;
  }

  await prisma.contactMessage.update({ where: { id }, data: { status } });
  await logAudit({
    userId: admin.id,
    action: "CONTACT_MESSAGE_STATUS_UPDATED",
    entity: "ContactMessage",
    entityId: id,
    metadata: { status },
  });

  revalidatePath("/dashboard/admin/messages");
}
