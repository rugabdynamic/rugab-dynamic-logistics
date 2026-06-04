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
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        inverted && "rounded-lg bg-white px-3 py-2 shadow-soft",
        className,
      )}
    >
      <img
        src="/rugab-logo.png"
        alt="RUGAB Dynamic Logistics Company Ltd"
        className={cn(
          "h-auto w-auto object-contain",
          compact
            ? "max-h-11 max-w-[190px] sm:max-w-[230px]"
            : "max-h-16 max-w-[280px] sm:max-w-[340px]",
        )}
      />
    </span>
  );
}
