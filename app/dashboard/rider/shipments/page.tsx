import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

const ACTIVE = ["ASSIGNED", "ACCEPTED", "PICKED_UP", "IN_TRANSIT"];

export default async function RiderShipmentsPage() {
  const user = await requireRole("RIDER");
  const shipments = await prisma.shipment.findMany({
    where: { riderId: user.id, status: { in: ACTIVE } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">Assigned Shipments</h1>
      {shipments.length === 0 ? (
        <EmptyState title="Nothing assigned" description="New assignments will appear here." />
      ) : (
        <div className="card divide-y divide-gray-100">
          {shipments.map((s) => (
            <Link key={s.id} href={`/dashboard/rider/shipments/${s.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
              <div>
                <p className="font-mono text-sm font-medium text-navy-900">{s.trackingCode}</p>
                <p className="text-sm text-gray-500">{s.shipmentType} → {s.destinationCity ?? s.destinationAddress}</p>
              </div>
              <StatusBadge status={s.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
