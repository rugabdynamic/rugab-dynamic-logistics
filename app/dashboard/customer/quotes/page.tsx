import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export default async function CustomerQuotesPage() {
  const user = await requireRole("CUSTOMER");
  const quotes = await prisma.quoteRequest.findMany({
    where: { OR: [{ customerId: user.id }, { email: user.email ?? "" }] },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">My Quote Requests</h1>
      {quotes.length === 0 ? (
        <EmptyState title="No quotes yet" description="Submit a quote from the public site to see it here." />
      ) : (
        <div className="card divide-y divide-gray-100">
          {quotes.map((q) => (
            <div key={q.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium text-navy-900">{q.shipmentType}</p>
                <p className="font-mono text-xs text-gray-500">{q.trackingCode}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden text-sm text-gray-400 sm:block">{formatDate(q.createdAt)}</span>
                <StatusBadge status={q.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
