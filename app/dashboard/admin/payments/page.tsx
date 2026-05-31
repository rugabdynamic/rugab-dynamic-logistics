import Link from "next/link";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/dashboard/StatCard";
import { CreditCard, Wallet } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

export default async function AdminPaymentsPage() {
  const [payments, paidAgg] = await Promise.all([
    prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { shipment: { select: { id: true, trackingCode: true } } },
    }),
    prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Payments</h1>
        <p className="text-sm text-gray-500">Recorded payment entries</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total Collected" value={formatCurrency(paidAgg._sum.amount ?? 0)} icon={Wallet} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Payment Records" value={payments.length} icon={CreditCard} />
      </div>

      {payments.length === 0 ? (
        <EmptyState title="No payments recorded" description="Record payments from a shipment's detail page." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Shipment</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Method</th>
                  <th className="px-6 py-3 font-medium">Reference</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/admin/shipments/${p.shipment.id}`} className="font-mono text-xs text-navy-900 hover:text-accent">
                        {p.shipment.trackingCode}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-navy-900">{formatCurrency(p.amount)}</td>
                    <td className="px-6 py-4 text-gray-600">{p.method}</td>
                    <td className="px-6 py-4 text-gray-500">{p.transactionReference ?? "—"}</td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(p.createdAt)}</td>
                    <td className="px-6 py-4"><StatusBadge status={p.status} kind="payment" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
