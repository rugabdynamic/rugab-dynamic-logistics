import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export default async function CustomerShipmentsPage() {
  const user = await requireRole("CUSTOMER");
  const shipments = await prisma.shipment.findMany({
    where: { customerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">My Shipments</h1>
      {shipments.length === 0 ? (
        <EmptyState title="No shipments yet" description="Approved quotes become shipments and appear here." />
      ) : (
        <div className="card divide-y divide-gray-100">
          {shipments.map((s) => (
            <Link key={s.id} href={`/dashboard/customer/shipments/${s.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
              <div>
                <p className="font-mono text-sm font-medium text-navy-900">{s.trackingCode}</p>
                <p className="text-sm text-gray-500">{s.shipmentType} · {formatDate(s.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={s.paymentStatus} kind="payment" />
                <StatusBadge status={s.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
