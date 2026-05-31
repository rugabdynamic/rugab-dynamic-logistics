import { Construction } from "lucide-react";

export function ComingSoon({ title, phase = "Phase 2" }: { title: string; phase?: string }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-navy-900">{title}</h1>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
        <Construction className="mb-3 h-10 w-10 text-warn" />
        <p className="text-sm font-semibold text-navy-800">Coming in {phase}</p>
        <p className="mt-1 max-w-md text-sm text-gray-500">
          This area is scaffolded and ready. The full workflow (data tables, actions,
          and permissions) is implemented in {phase}.
        </p>
      </div>
    </div>
  );
}
