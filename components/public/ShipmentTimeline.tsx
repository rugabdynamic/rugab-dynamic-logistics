import { CheckCircle2, Circle } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export function ShipmentTimeline({
  timeline,
}: {
  timeline: { status: string; note: string | null; at: string }[];
}) {
  if (!timeline.length) {
    return <p className="text-sm text-gray-500">No status updates yet.</p>;
  }

  return (
    <ol className="relative space-y-6 border-l border-sky-100 pl-6">
      {timeline.map((t, i) => {
        const last = i === timeline.length - 1;
        return (
          <li key={i} className="relative">
            <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-white ring-4 ring-white">
              {last ? (
                <CheckCircle2 className="h-5 w-5 text-accent" />
              ) : (
                <Circle className="h-4 w-4 text-sky-300" />
              )}
            </span>
            <p className="text-sm font-semibold text-navy-900">
              {t.status.replace(/_/g, " ")}
            </p>
            {t.note && <p className="text-sm text-gray-600">{t.note}</p>}
            <p className="text-xs text-gray-400">{formatDateTime(t.at)}</p>
          </li>
        );
      })}
    </ol>
  );
}
