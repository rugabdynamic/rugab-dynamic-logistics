import Link from "next/link";
import { FileText, Truck, MessageSquare, Clock } from "lucide-react";
import { prisma } from "@/lib/db";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";

export default async function AdminOverview() {
  const [totalQuotes, pendingQuotes, totalShipments, newMessages, recentQuotes] =
    await Promise.all([
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: "PENDING" } }),
      prisma.shipment.count(),
      prisma.contactMessage.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Operational snapshot at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Quotes" value={totalQuotes} icon={FileText} />
        <StatCard label="Pending Review" value={pendingQuotes} icon={Clock} accent="bg-orange-50 text-warn" />
        <StatCard label="Shipments" value={totalShipments} icon={Truck} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="New Messages" value={newMessages} icon={MessageSquare} accent="bg-blue-50 text-blue-600" />
      </div>

      <div className="card">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-navy-900">Recent Quote Requests</h2>
          <Link href="/dashboard/admin/quotes" className="text-sm font-medium text-accent hover:underline">
            View all
          </Link>
        </div>
        {recentQuotes.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-gray-500">No quote requests yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentQuotes.map((q) => (
              <Link
                key={q.id}
                href={`/dashboard/admin/quotes/${q.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy-900">{q.fullName}</p>
                  <p className="truncate text-sm text-gray-500">
                    {q.shipmentType} · <span className="font-mono">{q.trackingCode}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-sm text-gray-400 sm:block">{formatDate(q.createdAt)}</span>
                  <StatusBadge status={q.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
