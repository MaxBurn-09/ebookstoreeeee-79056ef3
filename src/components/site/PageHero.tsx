export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.16_0.02_250)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_300px_at_88%_-20%,oklch(0.55_0.2_35/24%),transparent_55%),radial-gradient(500px_220px_at_0%_120%,oklch(0.45_0.12_250/30%),transparent_50%)]"
      />
      <div className="container-page relative py-12 sm:py-16">
        <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-white/50 uppercase">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl leading-[1.08] font-semibold sm:text-[2.55rem]">{title}</h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-[0.98rem]">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
