import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Clock, TrendingUp, CornerDownLeft } from "lucide-react";
import { formatPrice } from "@/data/catalog";
import { useCatalog } from "@/lib/catalog-store";
import { cn } from "@/lib/utils";

const RECENT_KEY = "fga_recent_searches";
const POPULAR = ["Marriage", "Habits", "Purpose", "Passive income", "Parenting", "Self love"];

type Row =
  | { kind: "book"; id: string; label: string; slug: string; cover: string; price: number }
  | { kind: "category"; id: string; label: string; slug: string }
  | { kind: "term"; id: string; label: string };

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { books, categories, authors } = useCatalog();

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    try {
      setRecent(JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]") as string[]);
    } catch {
      setRecent([]);
    }
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  const term = q.trim().toLowerCase();

  const rows = useMemo<Row[]>(() => {
    if (!term) {
      return [
        ...recent.slice(0, 4).map((r) => ({ kind: "term" as const, id: `r-${r}`, label: r })),
        ...POPULAR.map((p) => ({ kind: "term" as const, id: `p-${p}`, label: p })),
      ];
    }
    const matchedBooks = books
      .filter((b) => {
        const author = authors.find((a) => a.id === b.authorId);
        return (
          b.title.toLowerCase().includes(term) ||
          b.category.toLowerCase().includes(term) ||
          b.blurb.toLowerCase().includes(term) ||
          (author?.name.toLowerCase().includes(term) ?? false)
        );
      })
      .slice(0, 6)
      .map((b) => ({
        kind: "book" as const,
        id: b.id,
        label: b.title,
        slug: b.slug,
        cover: b.cover,
        price: b.price,
      }));
    const matchedCats = categories
      .filter((c) => c.name.toLowerCase().includes(term))
      .slice(0, 3)
      .map((c) => ({ kind: "category" as const, id: c.slug, label: c.name, slug: c.slug }));
    return [...matchedBooks, ...matchedCats];
  }, [term, recent, books, categories, authors]);

  useEffect(() => setActive(0), [term]);

  const remember = (value: string) => {
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, 6);
    setRecent(next);
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  };

  const go = (row: Row) => {
    if (row.kind === "book") {
      navigate({ to: "/book/$slug", params: { slug: row.slug } });
    } else if (row.kind === "category") {
      navigate({ to: "/books", search: { q: undefined, category: row.slug } });
    } else {
      remember(row.label);
      navigate({ to: "/books", search: { q: row.label, category: undefined } });
    }
    onClose();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = rows[active];
    if (chosen) return go(chosen);
    if (!term) return;
    remember(q.trim());
    navigate({ to: "/books", search: { q: q.trim(), category: undefined } });
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(rows.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + rows.length) % Math.max(rows.length, 1));
    }
  };

  if (!open) return null;

  const noResults = term.length > 0 && rows.length === 0;

  return (
    <div
      className="fixed inset-0 z-[80] animate-[fade-in_0.18s_ease-out_both]"
      role="dialog"
      aria-modal="true"
      aria-label="Search the store"
    >
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 mx-auto w-full max-w-2xl px-4 pt-4 sm:pt-16">
        <div className="animate-[fade-up_0.22s_cubic-bezier(0.22,1,0.36,1)_both] overflow-hidden rounded-xl border border-border bg-popover shadow-[var(--shadow-overlay)]">
          <form onSubmit={submit} className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4.5 w-4.5 shrink-0 text-muted-foreground" aria-hidden />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search ebooks, topics, categories…"
              aria-label="Search ebooks"
              className="h-14 w-full bg-transparent text-[0.95rem] outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="press grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </form>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!term ? (
              <>
                {recent.length > 0 ? (
                  <GroupLabel icon={<Clock className="h-3.5 w-3.5" />}>Recent</GroupLabel>
                ) : null}
                {rows.map((row, i) => (
                  <RowButton key={row.id} active={i === active} onClick={() => go(row)}>
                    {row.id.startsWith("r-") ? (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="truncate">{row.label}</span>
                    {i === 0 && recent.length === 0 ? null : null}
                  </RowButton>
                ))}
                <GroupLabel>Browse by category</GroupLabel>
                <div className="flex flex-wrap gap-2 px-3 pt-1 pb-3">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() =>
                        go({ kind: "category", id: c.slug, label: c.name, slug: c.slug })
                      }
                      className="press rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-foreground/30 hover:bg-muted"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </>
            ) : noResults ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm font-medium">No ebooks match “{q}”</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a broader word, or start with one of these.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {POPULAR.slice(0, 4).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setQ(p)}
                      className="press rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              rows.map((row, i) => (
                <RowButton key={row.id} active={i === active} onClick={() => go(row)}>
                  {row.kind === "book" ? (
                    <>
                      <img
                        src={row.cover}
                        alt=""
                        loading="lazy"
                        className="h-11 w-8 shrink-0 rounded-[3px] object-cover"
                      />
                      <span className="min-w-0 flex-1 truncate">{row.label}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatPrice(row.price)}
                      </span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">
                        {row.label} <span className="text-muted-foreground">— category</span>
                      </span>
                    </>
                  )}
                </RowButton>
              ))
            )}
          </div>

          <div className="hidden items-center gap-4 border-t border-border px-4 py-2.5 text-[0.68rem] text-muted-foreground sm:flex">
            <Key>↑</Key>
            <Key>↓</Key>
            <span>to navigate</span>
            <Key>
              <CornerDownLeft className="h-3 w-3" />
            </Key>
            <span>to open</span>
            <Key>esc</Key>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 px-3 pt-3 pb-1 text-[0.62rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
      {icon}
      {children}
    </p>
  );
}

function RowButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
        active ? "bg-muted text-foreground" : "hover:bg-muted/60",
      )}
    >
      {children}
    </button>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="grid h-5 min-w-5 place-items-center rounded border border-border bg-muted px-1 font-sans text-[0.62rem]">
      {children}
    </kbd>
  );
}
