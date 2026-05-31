import Link from "next/link";
import { Truck, CheckCheck, Clock } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

const ACTIVE = ["ASSIGNED", "ACCEPTED", "PICKED_UP", "IN_TRANSIT"];

export default async function RiderOverview() {
  const user = await requireRole("RIDER");

  const [active, completed, pending] = await Promise.all([
    prisma.shipment.findMany({
      where: { riderId: user.id, status: { in: ACTIVE } },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.shipment.count({ where: { riderId: user.id, status: { in: ["DELIVERED", "FAILED"] } } }),
    prisma.shipment.count({ where: { riderId: user.id, status: "ASSIGNED" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Welcome, {user.name?.split(" ")[0]}</h1>
        <p className="text-sm text-gray-500">Your assigned deliveries.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active" value={active.length} icon={Truck} />
        <StatCard label="Awaiting Acceptance" value={pending} icon={Clock} accent="bg-orange-50 text-warn" />
        <StatCard label="Completed" value={completed} icon={CheckCheck} accent="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="card">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-navy-900">Active Shipments</h2>
        </div>
        {active.length === 0 ? (
          <div className="p-6"><EmptyState title="No active shipments" description="Assigned deliveries will appear here." /></div>
        ) : (
          <div className="divide-y divide-gray-100">
            {active.map((s) => (
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
    </div>
  );
}
