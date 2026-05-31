import { requireRole } from "@/lib/permissions";
import { getNotifications } from "@/lib/notify";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function RiderLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("RIDER");
  const { items, unread } = await getNotifications(user.id, false);
  return (
    <DashboardShell role="RIDER" title="Rugab · Operator" userName={user.name ?? "Rider"} notifications={items} unread={unread}>
      {children}
    </DashboardShell>
  );
}
