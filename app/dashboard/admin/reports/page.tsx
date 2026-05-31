import { prisma } from "@/lib/db";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FileText, Truck, Wallet, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { SHIPMENT_STATUSES } from "@/lib/constants";

function groupCounts(rows: { status: string; _count: { status: number } }[]) {
  const map: Record<string, number> = {};
  for (const r of rows) map[r.status] = r._count.status;
  return map;
}

export default async function ReportsPage() {
  const [quoteCount, shipmentCount, customerCount, revenue, quotesByStatus, shipmentsByStatus, deliveredCount] =
    await Promise.all([
      prisma.quoteRequest.count(),
      prisma.shipment.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
      prisma.quoteRequest.groupBy({ by: ["status"], _count: { status: true } }),
      prisma.shipment.groupBy({ by: ["status"], _count: { status: true } }),
      prisma.shipment.count({ where: { status: "DELIVERED" } }),
    ]);

  const qMap = groupCounts(quotesByStatus);
  const sMap = groupCounts(shipmentsByStatus);
  const sMax = Math.max(1, ...Object.values(sMap));
  const deliveryRate = shipmentCount ? Math.round((deliveredCount / shipmentCount) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Reports</h1>
        <p className="text-sm text-gray-500">Operational summary and totals.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Quotes" value={quoteCount} icon={FileText} />
        <StatCard label="Total Shipments" value={shipmentCount} icon={Truck} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Customers" value={customerCount} icon={Users} accent="bg-blue-50 text-blue-600" />
        <StatCard label="Revenue (paid)" value={formatCurrency(revenue._sum.amount ?? 0)} icon={Wallet} accent="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-4 font-semibold text-navy-900">Shipments by Status</h2>
          {Object.keys(sMap).length === 0 ? (
            <p className="text-sm text-gray-500">No shipments yet.</p>
          ) : (
            <div className="space-y-3">
              {SHIPMENT_STATUSES.filter((s) => sMap[s]).map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-28 shrink-0"><StatusBadge status={s} /></span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-navy-600" style={{ width: `${(sMap[s] / sMax) * 100}%` }} />
                  </div>
                  <span className="w-8 text-right text-sm font-medium text-navy-900">{sMap[s]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="mb-4 font-semibold text-navy-900">Quotes by Status</h2>
          {Object.keys(qMap).length === 0 ? (
            <p className="text-sm text-gray-500">No quotes yet.</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(qMap).map(([s, n]) => (
                <div key={s} className="flex items-center justify-between border-b border-gray-50 py-2">
                  <StatusBadge status={s} />
                  <span className="text-sm font-medium text-navy-900">{n}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 rounded-lg bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Delivery rate</p>
            <p className="text-2xl font-bold text-emerald-800">{deliveryRate}%</p>
            <p className="text-xs text-emerald-600">{deliveredCount} of {shipmentCount} shipments delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
}
