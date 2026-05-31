import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 10;

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const q = searchParams.q?.trim() ?? "";
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  // SQLite's `contains` is case-insensitive for ASCII by default.
  const where = q
    ? {
        OR: [
          { fullName: { contains: q } },
          { email: { contains: q } },
          { trackingCode: { contains: q } },
          { shipmentType: { contains: q } },
        ],
      }
    : {};

  const [quotes, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.quoteRequest.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Quote Requests</h1>
          <p className="text-sm text-gray-500">{total} total</p>
        </div>
        <form className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, email, code…"
            className="input-field w-72 pl-9"
          />
        </form>
      </div>

      {quotes.length === 0 ? (
        <EmptyState title="No quote requests found" description="New requests will appear here." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Tracking</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/admin/quotes/${quote.id}`} className="font-medium text-navy-900 hover:text-accent">
                        {quote.fullName}
                      </Link>
                      <p className="text-xs text-gray-500">{quote.email}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">{quote.trackingCode}</td>
                    <td className="px-6 py-4 text-gray-600">{quote.shipmentType}</td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(quote.createdAt)}</td>
                    <td className="px-6 py-4"><StatusBadge status={quote.status} /></td>
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
            {page > 1 && (
              <Link href={`?q=${encodeURIComponent(q)}&page=${page - 1}`} className="btn-outline">Previous</Link>
            )}
            {page < totalPages && (
              <Link href={`?q=${encodeURIComponent(q)}&page=${page + 1}`} className="btn-outline">Next</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
