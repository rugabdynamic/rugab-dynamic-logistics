import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";
import { SHIPMENT_STATUSES } from "@/lib/constants";

const PAGE_SIZE = 10;

export default async function AdminShipmentsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; page?: string };
}) {
  const q = searchParams.q?.trim() ?? "";
  const status = searchParams.status?.trim() ?? "";
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { trackingCode: { contains: q } },
      { shipmentType: { contains: q } },
      { destinationCity: { contains: q } },
    ];
  }

  const [shipments, total] = await Promise.all([
    prisma.shipment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { rider: { select: { name: true } }, customer: { select: { name: true } } },
    }),
    prisma.shipment.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Shipments</h1>
          <p className="text-sm text-gray-500">{total} total</p>
        </div>
        <form className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input name="q" defaultValue={q} placeholder="Search code, type…" className="input-field w-56 pl-9" />
          </div>
          <select name="status" defaultValue={status} className="input-field w-40">
            <option value="">All statuses</option>
            {SHIPMENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
          <button className="btn-primary">Filter</button>
        </form>
      </div>

      {shipments.length === 0 ? (
        <EmptyState title="No shipments found" description="Approve a quote to create the first shipment." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Tracking</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Rider</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Payment</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shipments.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/admin/shipments/${s.id}`} className="font-mono text-xs font-medium text-navy-900 hover:text-accent">
                        {s.trackingCode}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{s.shipmentType}</td>
                    <td className="px-6 py-4 text-gray-600">{s.rider?.name ?? "—"}</td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(s.createdAt)}</td>
                    <td className="px-6 py-4"><StatusBadge status={s.paymentStatus} kind="payment" /></td>
                    <td className="px-6 py-4"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            {page > 1 && <Link href={`?q=${encodeURIComponent(q)}&status=${status}&page=${page - 1}`} className="btn-outline">Previous</Link>}
            {page < totalPages && <Link href={`?q=${encodeURIComponent(q)}&status=${status}&page=${page + 1}`} className="btn-outline">Next</Link>}
          </div>
        </div>
      )}
    </div>
  );
}
