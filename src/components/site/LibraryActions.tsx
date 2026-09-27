import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { BookOpen, Download, Loader2 } from "lucide-react";
import { getEbookLink } from "@/lib/library.functions";

/** Read / download buttons that fetch a fresh signed link for an owned ebook. */
export function LibraryActions({ slug, title }: { slug: string; title: string }) {
  const fetchLink = useServerFn(getEbookLink);
  const [busy, setBusy] = useState<"read" | "download" | null>(null);

  const open = async (mode: "read" | "download") => {
    setBusy(mode);
    try {
      const { url } = await fetchLink({ data: { slug } });
      if (mode === "read") {
        window.open(url, "_blank", "noopener");
      } else {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not open this ebook.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => open("read")}
        disabled={busy !== null}
        className="press inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-semibold text-background hover:bg-foreground/90 disabled:opacity-60"
      >
        {busy === "read" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <BookOpen className="h-3.5 w-3.5" />
        )}
        Read
      </button>
      <button
        type="button"
        onClick={() => open("download")}
        disabled={busy !== null}
        className="press inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-semibold hover:bg-muted disabled:opacity-60"
      >
        {busy === "download" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Download className="h-3.5 w-3.5" />
        )}
        Download
      </button>
    </>
  );
}

