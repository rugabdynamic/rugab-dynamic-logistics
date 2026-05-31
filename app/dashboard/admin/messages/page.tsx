import { Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatDateTime } from "@/lib/utils";
import { updateMessageStatus } from "./actions";

const PAGE_SIZE = 10;

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  const [messages, total, newCount] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Contact Messages</h1>
        <p className="text-sm text-gray-500">{total} total · {newCount} new</p>
      </div>

      {messages.length === 0 ? (
        <EmptyState title="No messages yet" description="Contact form submissions will appear here." />
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy-900">{m.subject}</p>
                  <p className="text-sm text-gray-500">
                    {m.name} · <a href={`mailto:${m.email}`} className="text-accent hover:underline">{m.email}</a>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={m.status} kind="contact" />
                  <span className="text-xs text-gray-400">{formatDateTime(m.createdAt)}</span>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{m.message}</p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1"><Mail className="h-4 w-4" /> {m.email}</span>
                {m.phone && <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" /> {m.phone}</span>}

                <div className="ml-auto flex gap-2">
                  {m.status !== "READ" && (
                    <form action={updateMessageStatus}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="status" value="READ" />
                      <button className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-navy-700 hover:bg-gray-50">
                        Mark read
                      </button>
                    </form>
                  )}
                  {m.status !== "RESOLVED" && (
                    <form action={updateMessageStatus}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="status" value="RESOLVED" />
                      <button className="rounded-md bg-accent px-3 py-1 text-xs font-medium text-white hover:bg-accent-dark">
                        Resolve
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ))}
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
