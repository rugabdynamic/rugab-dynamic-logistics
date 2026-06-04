import { PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({
  inverted = false,
  compact = false,
  className,
}: {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky to-accent text-white shadow-glow">
        <span className="absolute inset-0 rounded-lg border border-white/25" />
        <PackageCheck className="relative h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-extrabold tracking-tight",
            inverted ? "text-white" : "text-navy-900"
          )}
        >
          {compact ? "RUGAB Dynamic" : "RUGAB Dynamic Logistics"}
        </span>
        <span
          className={cn(
            "block text-[10px] font-bold uppercase tracking-[0.22em]",
            inverted ? "text-sky-100" : "text-sky-700"
          )}
        >
          Fast freight worldwide
        </span>
      </span>
    </span>
  );
}
