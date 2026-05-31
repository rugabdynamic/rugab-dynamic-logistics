import { prisma } from "@/lib/db";
import { EmptyState } from "@/components/ui/EmptyState";
import { CreateRiderForm } from "@/components/dashboard/CreateRiderForm";
import { updateRiderAvailability } from "@/app/actions/users";
import { RIDER_AVAILABILITY } from "@/lib/constants";

export default async function AdminRidersPage() {
  const riders = await prisma.user.findMany({
    where: { role: "RIDER" },
    orderBy: { createdAt: "desc" },
    include: {
      riderProfile: true,
      _count: { select: { riderShipments: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Riders / Operators</h1>
          <p className="text-sm text-gray-500">{riders.length} total</p>
        </div>
        <CreateRiderForm />
      </div>

      {riders.length === 0 ? (
        <EmptyState title="No riders yet" description="Create your first rider to start assigning shipments." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Vehicle</th>
                  <th className="px-6 py-3 font-medium">Shipments</th>
                  <th className="px-6 py-3 font-medium">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {riders.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy-900">{r.name}</p>
                      <p className="text-xs text-gray-500">{r.email}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {r.riderProfile?.vehicleType ?? "—"}
                      {r.riderProfile?.vehiclePlateNumber && (
                        <span className="ml-1 text-xs text-gray-400">({r.riderProfile.vehiclePlateNumber})</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{r._count.riderShipments}</td>
                    <td className="px-6 py-4">
                      <form action={updateRiderAvailability} className="flex items-center gap-2">
                        <input type="hidden" name="userId" value={r.id} />
                        <select
                          name="availabilityStatus"
                          defaultValue={r.riderProfile?.availabilityStatus ?? "OFFLINE"}
                          className="rounded-md border border-gray-300 px-2 py-1 text-xs"
                        >
                          {RIDER_AVAILABILITY.map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                        <button className="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-navy-700 hover:bg-gray-50">
                          Save
                        </button>
                      </form>
                    </td>
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
