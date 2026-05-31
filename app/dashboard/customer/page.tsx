import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/permissions";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export default async function CustomerOverview() {
  const user = await requireRole("CUSTOMER");

  // Phase 1: public quote requests are linked to the customer by email.
  // Phase 2 attaches them via customerId at submission time.
  const quotes = await prisma.quoteRequest.findMany({
    where: { OR: [{ customerId: user.id }, { email: user.email ?? "" }] },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Welcome, {user.name?.split(" ")[0]}</h1>
          <p className="text-sm text-gray-500">Track your quotes and shipments.</p>
        </div>
        <Link href="/quote" className="btn-accent">
          <Plus className="h-4 w-4" /> New Quote
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="My Quote Requests" value={quotes.length} icon={FileText} />
      </div>

      <div className="card">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-navy-900">My Quote Requests</h2>
        </div>
        {quotes.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No quotes yet"
              description="Submit a quote request to get started — it'll appear here."
            />
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
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
    </div>
  );
}
