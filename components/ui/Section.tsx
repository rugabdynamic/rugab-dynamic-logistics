import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Render without the inner <Container> (e.g. full-bleed dark sections). */
  bare?: boolean;
  /** Vertical rhythm. */
  spacing?: "sm" | "md" | "lg";
};

const SPACING = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
} as const;

export function Section({
  className,
  children,
  bare = false,
  spacing = "md",
  ...props
}: SectionProps) {
  return (
    <section className={cn(SPACING[spacing], className)} {...props}>
      {bare ? children : <Container>{children}</Container>}
    </section>
  );
}
