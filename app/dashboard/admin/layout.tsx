import { requireRole } from "@/lib/permissions";
import { getNotifications } from "@/lib/notify";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("ADMIN");
  const { items, unread } = await getNotifications(user.id, true);
  return (
    <DashboardShell role="ADMIN" title="Admin · Rugab" userName={user.name ?? "Admin"} notifications={items} unread={unread}>
      {children}
    </DashboardShell>
  );
}
