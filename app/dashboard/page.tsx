import { redirect } from "next/navigation";
import { requireAuth, dashboardPathForRole } from "@/lib/permissions";

// Entry point after login — routes each role to its dashboard.
export default async function DashboardIndex() {
  const user = await requireAuth();
  redirect(dashboardPathForRole(user.role));
}
