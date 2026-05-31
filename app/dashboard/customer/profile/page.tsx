import { requireRole } from "@/lib/permissions";

export default async function CustomerProfilePage() {
  const user = await requireRole("CUSTOMER");
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">Profile</h1>
      <div className="card max-w-lg p-6">
        <dl className="divide-y divide-gray-100">
          <div className="flex justify-between py-3 text-sm">
            <dt className="text-gray-500">Name</dt>
            <dd className="font-medium text-navy-900">{user.name}</dd>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-navy-900">{user.email}</dd>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium text-navy-900">{user.role}</dd>
          </div>
        </dl>
        <p className="mt-4 rounded-lg bg-navy-50 p-3 text-xs text-navy-600">
          Editing profile details is enabled in Phase 2.
        </p>
      </div>
    </div>
  );
}
