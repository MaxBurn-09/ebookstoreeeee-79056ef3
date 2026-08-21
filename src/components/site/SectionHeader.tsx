import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  linkLabel,
  linkTo,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  linkLabel?: string;
  linkTo?: string;
}) {
  return (
    <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {linkLabel && linkTo ? (
        <Link
          to={linkTo}
          className="group inline-flex shrink-0 items-center gap-2 text-[0.7rem] font-semibold tracking-[0.16em] text-foreground uppercase hover:text-primary"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
