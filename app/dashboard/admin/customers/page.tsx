import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDate } from "@/lib/utils";

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: {
      customerProfile: true,
      _count: { select: { customerShipments: true, quoteRequests: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Customers</h1>
        <p className="text-sm text-gray-500">{customers.length} total</p>
      </div>

      {customers.length === 0 ? (
        <EmptyState title="No customers yet" description="Registered customers will appear here." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium">Quotes</th>
                  <th className="px-6 py-3 font-medium">Shipments</th>
                  <th className="px-6 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy-900">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{c.customerProfile?.companyName ?? "—"}</td>
                    <td className="px-6 py-4 text-gray-600">{c._count.quoteRequests}</td>
                    <td className="px-6 py-4 text-gray-600">{c._count.customerShipments}</td>
                    <td className="px-6 py-4 text-gray-500">{formatDate(c.createdAt)}</td>
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
