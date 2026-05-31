import { cn } from "@/lib/utils";

const SHIPMENT_COLORS: Record<string, string> = {
  PENDING: "bg-gray-100 text-gray-700",
  QUOTED: "bg-blue-100 text-blue-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
  ASSIGNED: "bg-indigo-100 text-indigo-700",
  ACCEPTED: "bg-cyan-100 text-cyan-700",
  PICKED_UP: "bg-amber-100 text-amber-700",
  IN_TRANSIT: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-200 text-gray-600",
};

const PAYMENT_COLORS: Record<string, string> = {
  UNPAID: "bg-gray-100 text-gray-700",
  PENDING_CONFIRMATION: "bg-amber-100 text-amber-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-purple-100 text-purple-700",
};

const CONTACT_COLORS: Record<string, string> = {
  NEW: "bg-orange-100 text-orange-700",
  READ: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-green-100 text-green-700",
};

export function StatusBadge({
  status,
  kind = "shipment",
}: {
  status: string;
  kind?: "shipment" | "payment" | "contact";
}) {
  const map =
    kind === "payment"
      ? PAYMENT_COLORS
      : kind === "contact"
        ? CONTACT_COLORS
        : SHIPMENT_COLORS;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        map[status] ?? "bg-gray-100 text-gray-700"
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}
