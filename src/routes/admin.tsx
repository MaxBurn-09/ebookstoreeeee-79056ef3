import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2, LogOut } from "lucide-react";
import type { Book, Category } from "@/data/catalog";
import { slugify, type Author, type Review } from "@/data/academy";
import { useCatalog } from "@/lib/catalog-store";
import { loadOrders, type Order } from "@/lib/orders";
import { formatPrice } from "@/data/catalog";
import { toast } from "sonner";

const ADMIN_KEY = "fga_admin_ok";
const ADMIN_PASSWORD = (import.meta.env['VITE_ADMIN_PASSWORD'] as string | undefined) ?? "grow-admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Store admin — Future Grow Academy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Tab = "books" | "categories" | "authors" | "reviews" | "orders";

function AdminPage() {
  const [authed, setAuthed] = useState(() =>
    typeof window === "undefined" ? false : window.sessionStorage.getItem(ADMIN_KEY) === "1",
  );
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("books");

  if (!authed) {
    return (
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <form
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          onSubmit={(e) => {
            e.preventDefault();
            if (password === ADMIN_PASSWORD) {
              sessionStorage.setItem(ADMIN_KEY, "1");
              setAuthed(true);
            } else toast.error("Incorrect password.");
          }}
        >
          <p className="eyebrow">Future Grow Academy</p>
          <h1 className="mt-2 text-2xl font-semibold">Store admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Add and edit ebooks, categories, faculty and reviews.</p>
          <label className="mt-6 block text-sm">
            <span className="mb-1.5 block text-xs text-muted-foreground">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-border px-3 text-sm outline-none focus:border-foreground/40"
            />
          </label>
          <button
            type="submit"
            className="press mt-4 h-11 w-full rounded-full bg-foreground text-sm font-semibold text-background"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">CMS</p>
          <h1 className="mt-1 text-3xl font-semibold">Store admin</h1>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(ADMIN_KEY);
            setAuthed(false);
          }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["books", "Books"],
            ["categories", "Categories"],
            ["authors", "Authors"],
            ["reviews", "Reviews"],
            ["orders", "Orders"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === id ? "bg-foreground text-background" : "border border-border hover:bg-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "books" ? <BooksPanel /> : null}
        {tab === "categories" ? <CategoriesPanel /> : null}
        {tab === "authors" ? <AuthorsPanel /> : null}
        {tab === "reviews" ? <ReviewsPanel /> : null}
        {tab === "orders" ? <OrdersPanel /> : null}
      </div>
    </div>
  );
}

function BooksPanel() {
  const { books, categories, authors, upsertBook, deleteBook, resetCatalog } = useCatalog();
  const [editing, setEditing] = useState<Book | null>(null);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() =>
            setEditing({
              id: `b-${Date.now()}`,
              slug: "",
              title: "",
              cover: books[0]?.cover ?? "",
              category: categories[0]?.name ?? "Self-Care",
              authorId: authors[0]?.id ?? "a-ankit",
              price: 2.97,
              oldPrice: 7.5,
              rating: 4.8,
              reviews: 0,
              bought: 0,
              blurb: "",
              description: [""],
              bullets: [""],
            })
          }
          className="press inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background"
        >
          <Plus className="h-4 w-4" /> Add book
        </button>
        <button
          type="button"
          onClick={() => {
            resetCatalog();
            toast.success("Catalog restored to the published library.");
          }}
          className="h-10 rounded-full border border-border px-4 text-sm font-semibold hover:bg-muted"
        >
          Reset catalog
        </button>
      </div>
      <AdminTable
        headers={["Title", "Category", "Price", ""]}
        rows={books.map((book) => [
          book.title,
          book.category,
          formatPrice(book.price),
          <RowActions
            key={book.id}
            onEdit={() => setEditing(book)}
            onDelete={() => {
              deleteBook(book.id);
              toast.success("Book removed.");
            }}
          />,
        ])}
      />
      {editing ? (
        <BookForm
          book={editing}
          categories={categories}
          authors={authors}
          covers={books.map((b) => b.cover)}
          onClose={() => setEditing(null)}
          onSave={(next) => {
            upsertBook({ ...next, slug: next.slug || slugify(next.title) });
            setEditing(null);
            toast.success("Book saved.");
          }}
        />
      ) : null}
    </div>
  );
}

function BookForm({
  book,
  categories,
  authors,
  covers,
  onClose,
  onSave,
}: {
  book: Book;
  categories: Category[];
  authors: Author[];
  covers: string[];
  onClose: () => void;
  onSave: (book: Book) => void;
}) {
  const [draft, setDraft] = useState(book);
  return (
    <Modal title={book.title || "New book"} onClose={onClose}>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...draft,
            description: draft.description.filter(Boolean),
            bullets: draft.bullets.filter(Boolean),
          });
        }}
      >
        <Text label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
        <Text label="Slug" value={draft.slug} onChange={(slug) => setDraft({ ...draft, slug })} />
        <Text label="Blurb" value={draft.blurb} onChange={(blurb) => setDraft({ ...draft, blurb })} />
        <label className="block text-sm">
          <span className="mb-1 block text-xs text-muted-foreground">Cover</span>
          <select
            value={covers.includes(draft.cover) ? draft.cover : "__url"}
            onChange={(e) => {
              if (e.target.value !== "__url") setDraft({ ...draft, cover: e.target.value });
            }}
            className="h-10 w-full rounded-lg border border-border px-3 text-sm"
          >
            {covers.filter((c, i, arr) => arr.indexOf(c) === i).map((c) => (
              <option key={c} value={c}>
                Existing cover
              </option>
            ))}
            <option value="__url">Custom URL</option>
          </select>
          <input
            className="mt-2 h-10 w-full rounded-lg border border-border px-3 text-sm"
            value={draft.cover}
            onChange={(e) => setDraft({ ...draft, cover: e.target.value })}
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Category</span>
            <select
              className="h-10 w-full rounded-lg border border-border px-3 text-sm"
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c.slug}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-xs text-muted-foreground">Author</span>
            <select
              className="h-10 w-full rounded-lg border border-border px-3 text-sm"
              value={draft.authorId ?? ""}
              onChange={(e) => setDraft({ ...draft, authorId: e.target.value })}
            >
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField label="Price" value={draft.price} onChange={(price) => setDraft({ ...draft, price })} />
          <NumberField
            label="Old price"
            value={draft.oldPrice}
            onChange={(oldPrice) => setDraft({ ...draft, oldPrice })}
          />
        </div>
        <Text
          label="Description (one paragraph per line)"
          area
          value={draft.description.join("\n")}
          onChange={(value) => setDraft({ ...draft, description: value.split("\n") })}
        />
        <Text
          label="Learning bullets (one per line)"
          area
          value={draft.bullets.join("\n")}
          onChange={(value) => setDraft({ ...draft, bullets: value.split("\n") })}
        />
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="h-10 rounded-full px-4 text-sm">
            Cancel
          </button>
          <button type="submit" className="h-10 rounded-full bg-foreground px-5 text-sm font-semibold text-background">
            Save book
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CategoriesPanel() {
  const { categories, books, upsertCategory, deleteCategory } = useCatalog();
  const [editing, setEditing] = useState<Category | null>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setEditing({ slug: "", name: "", tagline: "", cover: books[0]?.cover ?? "" })
        }
        className="press mb-4 inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background"
      >
        <Plus className="h-4 w-4" /> Add category
      </button>
      <AdminTable
        headers={["Name", "Tagline", ""]}
        rows={categories.map((c) => [
          c.name,
          c.tagline,
          <RowActions
            key={c.slug}
            onEdit={() => setEditing(c)}
            onDelete={() => {
              deleteCategory(c.slug);
              toast.success("Category removed.");
            }}
          />,
        ])}
      />
      {editing ? (
        <Modal title={editing.name || "New category"} onClose={() => setEditing(null)}>
          <CategoryForm
            category={editing}
            onCancel={() => setEditing(null)}
            onSave={(next) => {
              upsertCategory({ ...next, slug: next.slug || slugify(next.name) });
              setEditing(null);
              toast.success("Category saved.");
            }}
          />
        </Modal>
      ) : null}
    </div>
  );
}

function CategoryForm({
  category,
  onSave,
  onCancel,
}: {
  category: Category;
  onSave: (c: Category) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(category);
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
    >
      <Text label="Name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
      <Text label="Slug" value={draft.slug} onChange={(slug) => setDraft({ ...draft, slug })} />
      <Text label="Tagline" value={draft.tagline} onChange={(tagline) => setDraft({ ...draft, tagline })} />
      <Text label="Cover URL" value={draft.cover} onChange={(cover) => setDraft({ ...draft, cover })} />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="h-10 px-4 text-sm">
          Cancel
        </button>
        <button type="submit" className="h-10 rounded-full bg-foreground px-5 text-sm font-semibold text-background">
          Save
        </button>
      </div>
    </form>
  );
}

function AuthorsPanel() {
  const { authors, upsertAuthor, deleteAuthor } = useCatalog();
  const [editing, setEditing] = useState<Author | null>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setEditing({
            id: `a-${Date.now()}`,
            slug: "",
            name: "",
            role: "Faculty",
            bio: "",
            location: "",
            focus: [],
          })
        }
        className="press mb-4 inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background"
      >
        <Plus className="h-4 w-4" /> Add author
      </button>
      <AdminTable
        headers={["Name", "Role", ""]}
        rows={authors.map((a) => [
          a.name,
          a.role,
          <RowActions
            key={a.id}
            onEdit={() => setEditing(a)}
            onDelete={() => {
              deleteAuthor(a.id);
              toast.success("Author removed.");
            }}
          />,
        ])}
      />
      {editing ? (
        <Modal title={editing.name || "New author"} onClose={() => setEditing(null)}>
          <AuthorForm
            author={editing}
            onCancel={() => setEditing(null)}
            onSave={(next) => {
              upsertAuthor({ ...next, slug: next.slug || slugify(next.name) });
              setEditing(null);
              toast.success("Author saved.");
            }}
          />
        </Modal>
      ) : null}
    </div>
  );
}

function AuthorForm({
  author,
  onSave,
  onCancel,
}: {
  author: Author;
  onSave: (a: Author) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(author);
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
    >
      <Text label="Name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
      <Text label="Slug" value={draft.slug} onChange={(slug) => setDraft({ ...draft, slug })} />
      <Text label="Role" value={draft.role} onChange={(role) => setDraft({ ...draft, role })} />
      <Text label="Location" value={draft.location} onChange={(location) => setDraft({ ...draft, location })} />
      <Text label="Bio" area value={draft.bio} onChange={(bio) => setDraft({ ...draft, bio })} />
      <Text
        label="Focus topics (comma separated)"
        value={draft.focus.join(", ")}
        onChange={(value) =>
          setDraft({
            ...draft,
            focus: value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="h-10 px-4 text-sm">
          Cancel
        </button>
        <button type="submit" className="h-10 rounded-full bg-foreground px-5 text-sm font-semibold text-background">
          Save
        </button>
      </div>
    </form>
  );
}

function ReviewsPanel() {
  const { reviews, books, upsertReview, deleteReview } = useCatalog();
  const [editing, setEditing] = useState<Review | null>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          setEditing({
            id: `r-${Date.now()}`,
            bookId: books[0]?.id ?? "",
            name: "",
            location: "",
            rating: 5,
            quote: "",
            status: "published",
          })
        }
        className="press mb-4 inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-semibold text-background"
      >
        <Plus className="h-4 w-4" /> Add review
      </button>
      <AdminTable
        headers={["Reader", "Book", "Status", ""]}
        rows={reviews.map((r) => [
          `${r.name} (${r.rating})`,
          books.find((b) => b.id === r.bookId)?.title ?? r.bookId,
          r.status,
          <RowActions
            key={r.id}
            onEdit={() => setEditing(r)}
            onDelete={() => {
              deleteReview(r.id);
              toast.success("Review removed.");
            }}
          />,
        ])}
      />
      {editing ? (
        <Modal title="Review" onClose={() => setEditing(null)}>
          <ReviewForm
            review={editing}
            books={books}
            onCancel={() => setEditing(null)}
            onSave={(next) => {
              upsertReview(next);
              setEditing(null);
              toast.success("Review saved.");
            }}
          />
        </Modal>
      ) : null}
    </div>
  );
}

function ReviewForm({
  review,
  books,
  onSave,
  onCancel,
}: {
  review: Review;
  books: Book[];
  onSave: (r: Review) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(review);
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(draft);
      }}
    >
      <Text label="Name" value={draft.name} onChange={(name) => setDraft({ ...draft, name })} />
      <Text label="Location" value={draft.location} onChange={(location) => setDraft({ ...draft, location })} />
      <label className="block text-sm">
        <span className="mb-1 block text-xs text-muted-foreground">Book</span>
        <select
          className="h-10 w-full rounded-lg border border-border px-3 text-sm"
          value={draft.bookId}
          onChange={(e) => setDraft({ ...draft, bookId: e.target.value })}
        >
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </label>
      <NumberField label="Rating" value={draft.rating} onChange={(rating) => setDraft({ ...draft, rating })} />
      <label className="block text-sm">
        <span className="mb-1 block text-xs text-muted-foreground">Status</span>
        <select
          className="h-10 w-full rounded-lg border border-border px-3 text-sm"
          value={draft.status}
          onChange={(e) => setDraft({ ...draft, status: e.target.value as Review["status"] })}
        >
          <option value="published">Published</option>
          <option value="pending">Pending</option>
        </select>
      </label>
      <Text label="Quote" area value={draft.quote} onChange={(quote) => setDraft({ ...draft, quote })} />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="h-10 px-4 text-sm">
          Cancel
        </button>
        <button type="submit" className="h-10 rounded-full bg-foreground px-5 text-sm font-semibold text-background">
          Save
        </button>
      </div>
    </form>
  );
}

function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>(() => (typeof window === "undefined" ? [] : loadOrders()));

  return (
    <div>
      <button
        type="button"
        onClick={() => setOrders(loadOrders())}
        className="mb-4 h-10 rounded-full border border-border px-4 text-sm font-semibold hover:bg-muted"
      >
        Refresh orders
      </button>
      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No purchases on this browser yet.</p>
      ) : (
        <AdminTable
          headers={["Order", "Customer", "Total", "Status"]}
          rows={orders.map((o) => [
            o.id,
            o.address.email,
            formatPrice(o.total),
            `${o.status} · ${o.paymentLabel}`,
          ])}
        />
      )}
    </div>
  );
}

function AdminTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-secondary/60 text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <span className="flex justify-end gap-2">
      <button type="button" aria-label="Edit" onClick={onEdit} className="grid h-8 w-8 place-items-center rounded-md hover:bg-muted">
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Delete"
        onClick={onDelete}
        className="grid h-8 w-8 place-items-center rounded-md hover:bg-muted hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </span>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <button type="button" className="absolute inset-0 bg-charcoal/40" aria-label="Close" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-overlay)]">
        <h2 className="mb-4 text-lg font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
  area,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      {area ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-foreground/40"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-border px-3 text-sm outline-none focus:border-foreground/40"
        />
      )}
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-10 w-full rounded-lg border border-border px-3 text-sm outline-none focus:border-foreground/40"
      />
    </label>
  );
}
