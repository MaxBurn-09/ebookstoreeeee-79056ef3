import { Link } from "@tanstack/react-router";

type Block =
  | { kind: "h"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

function parse(raw: string, headings: string[]) {
  const lines = raw.split(/\r?\n/).map((l) => l.trim());
  const title = lines.find(Boolean) ?? "";
  const dateLine = lines.find((l) => l.startsWith("Effective Date")) ?? "";
  const body = lines.slice(lines.indexOf(dateLine) + 1);
  const heads = new Set(headings);
  const blocks: Block[] = [];
  let inList = false;
  for (const line of body) {
    if (!line) continue;
    const isHead = /^\d+\.\s+\S/.test(line) && line.length < 60 ? true : heads.has(line);
    if (isHead) {
      blocks.push({ kind: "h", text: line });
      inList = false;
      continue;
    }
    if (inList && line.length < 90) {
      const last = blocks[blocks.length - 1];
      if (last?.kind === "ul") last.items.push(line);
      else blocks.push({ kind: "ul", items: [line] });
      continue;
    }
    blocks.push({ kind: "p", text: line });
    inList = line.endsWith(":");
  }
  return { title, date: dateLine.replace("Effective Date:", "").trim(), blocks };
}

const others = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/refund-policy", label: "Refund Policy" },
  { to: "/cookies-policy", label: "Cookies Policy" },
] as const;

export function LegalPage({ raw, headings }: { raw: string; headings: string[] }) {
  const { title, date, blocks } = parse(raw, headings);
  return (
    <main className="container-page py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
        {date && <p className="mt-3 text-sm text-muted-foreground">Effective date: {date}</p>}
        <nav aria-label="Policies" className="mt-6 flex flex-wrap gap-2">
          {others.map((o) => (
            <Link
              key={o.to}
              to={o.to}
              className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!bg-foreground !text-background !border-foreground" }}
            >
              {o.label}
            </Link>
          ))}
        </nav>
        <article className="glass mt-8 rounded-2xl p-6 sm:p-10">
          {blocks.map((b, i) => {
            if (b.kind === "h")
              return (
                <h2 key={i} className="mt-9 font-sans text-lg font-semibold text-foreground first:mt-0">
                  {b.text}
                </h2>
              );
            if (b.kind === "ul")
              return (
                <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted-foreground marker:text-primary">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            return (
              <p key={i} className="mt-3 text-base leading-relaxed text-muted-foreground">
                {b.text}
              </p>
            );
          })}
        </article>
      </div>
    </main>
  );
}
