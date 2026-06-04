import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Adds hover lift + teal ring — for interactive/linked cards. */
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-surface p-6 shadow-brand transition-all duration-200",
        interactive &&
          "hover:-translate-y-1 hover:shadow-brand-lg hover:ring-2 hover:ring-brand-teal/40",
        className,
      )}
      {...props}
    />
  );
}
