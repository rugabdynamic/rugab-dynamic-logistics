import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDateTime } from "@/lib/utils";

// Audit logs are already populated in Phase 1 (quotes, contact, auth), so we
// surface them here as a read-only feed.
const PAGE_SIZE = 20;

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.auditLog.count(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Audit Logs</h1>
        <p className="text-sm text-gray-500">{total} recorded actions</p>
      </div>

      {logs.length === 0 ? (
        <EmptyState title="No audit entries yet" />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Action</th>
                  <th className="px-6 py-3 font-medium">Entity</th>
                  <th className="px-6 py-3 font-medium">Actor</th>
                  <th className="px-6 py-3 font-medium">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-navy-900">{l.action}</td>
                    <td className="px-6 py-3 text-gray-600">
                      {l.entity}
                      {l.entityId && <span className="ml-1 font-mono text-xs text-gray-400">#{l.entityId.slice(0, 8)}</span>}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{l.user?.name ?? "System / Public"}</td>
                    <td className="px-6 py-3 text-gray-500">{formatDateTime(l.createdAt)}</td>
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
            {page > 1 && <a href={`?page=${page - 1}`} className="btn-outline">Previous</a>}
            {page < totalPages && <a href={`?page=${page + 1}`} className="btn-outline">Next</a>}
          </div>
        </div>
      )}
    </div>
  );
}
