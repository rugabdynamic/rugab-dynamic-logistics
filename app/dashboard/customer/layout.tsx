import { requireRole } from "@/lib/permissions";
import { getNotifications } from "@/lib/notify";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("CUSTOMER");
  const { items, unread } = await getNotifications(user.id, false);
  return (
    <DashboardShell role="CUSTOMER" title="Rugab · My Account" userName={user.name ?? "Customer"} notifications={items} unread={unread}>
      {children}
    </DashboardShell>
  );
}
